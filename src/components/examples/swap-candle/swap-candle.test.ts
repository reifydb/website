import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { RAW_COLUMNS, READS, SETUP, insertSwaps } from './swap-candle';
import type { Swap } from './swap-candle';
import { EXAMPLES } from '../index';

const READ_BOXES = EXAMPLES.find((example) => example.id === 'swap-candle')!.reads;

type Row = Record<string, unknown>;

function run(db: WasmDB, code: string): Row[] {
  const result = executeExample(db, code);
  expect(result.success, `${result.error}\n${code}`).toBe(true);
  return result.data as Row[];
}

const SETTLE_TIMEOUT_MS = 2000;
const SETTLE_READS = ['from market::trades', 'from market::block', 'from market::volume', 'from market::twap', 'from market::candles'];

async function swap(db: WasmDB, swaps: Swap[]) {
  // Deferred views catch up after the insert returns; reading once right away tests timing, not the pipeline.
  run(db, insertSwaps(swaps));
  const deadline = performance.now() + SETTLE_TIMEOUT_MS;
  let previous = '';
  for (;;) {
    const caughtUp = swaps.every((s) => run(db, READS.normalized(s.id)).length === 1 && run(db, `from market::trades filter { id == ${s.id} }`).length === 1);
    const key = JSON.stringify(SETTLE_READS.map((read) => run(db, read)));
    if (caughtUp && key === previous) return;
    previous = key;
    if (performance.now() > deadline) throw new Error(`views did not catch up within ${SETTLE_TIMEOUT_MS}ms`);
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
}

function rowsBy(rows: Row[], key: string): Record<string, Row> {
  return Object.fromEntries(rows.map((row) => [String(row[key]), row]));
}

function num(value: unknown): number {
  return Number(value);
}

describe('market hall pipeline', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
    run(db, SETUP);
  });

  it('raw venue amounts normalize to rdb and usd through the pool decimals', async () => {
    // Normalization is the first board the visitor sees; if the decimals join or the lamport math drifts, every view after it is wrong.
    await swap(db, [1, 2, 3].map((id) => ({ id, slot: 1000, isBuy: true, size: 2, price: 140 })));
    for (const id of [1, 2, 3]) {
      const [row] = run(db, READS.normalized(id));
      expect(num(row.base_volume)).toBeCloseTo(2, 9);
      expect(num(row.quote_volume)).toBeCloseTo(280, 6);
      expect(num(row.price)).toBeCloseTo(140, 6);
      expect(String(row.is_buy)).toBe('true');
    }
  });

  it('zero_for_one true normalizes to a sell', async () => {
    // The venue encodes direction as zero_for_one; a flipped flag silently inverts buy volume and every candle color.
    await swap(db, [10, 11, 12].map((id) => ({ id, slot: 1001, isBuy: false, size: 1, price: 150 })));
    for (const id of [10, 11, 12]) {
      const [row] = run(db, READS.normalized(id));
      expect(num(row.id)).toBe(id);
      expect(String(row.is_buy)).toBe('false');
    }
  });

  it('the normalize card reads exactly one raw row and its own normalized row', () => {
    // The card pairs a raw row with its normalized row; pairing by anything but id would show one swap's input next to another's output.
    for (const id of [10, 11, 12]) {
      const raw = run(db, READS.raw(id));
      const normalized = run(db, READS.normalized(id));
      expect(raw).toHaveLength(1);
      expect(normalized).toHaveLength(1);
      expect(num(raw[0].id)).toBe(id);
      expect(num(normalized[0].id)).toBe(id);
      for (const column of RAW_COLUMNS) expect(raw[0]).toHaveProperty(column);
    }
  });

  it('block vwap weights by size', async () => {
    // Slot 1000 holds three 2 RDB buys at 140; slot 1001 three 1 RDB sells at 150; an unweighted mean would also pass slot 1000, so slot 1002 mixes sizes.
    await swap(db, [
      { id: 20, slot: 1002, isBuy: true, size: 3, price: 100 },
      { id: 21, slot: 1002, isBuy: false, size: 1, price: 200 },
    ]);
    const block = rowsBy(run(db, 'from market::block'), 'slot');
    expect(num(block['1000'].vwap)).toBeCloseTo(140, 6);
    expect(num(block['1002'].vwap)).toBeCloseTo(125, 6);
    expect(num(block['1002'].swaps)).toBe(2);
    expect(num(block['1002'].buy_volume)).toBeCloseTo(300, 6);
  });

  it('volume and twap aggregate the bucket of slot blocks', () => {
    // Bucket 100 covers slots 1000-1009: volume is every quote unit, twap is the mean of slot vwaps, not of trades.
    const volume = rowsBy(run(db, 'from market::volume'), 'bucket');
    expect(num(volume['100'].volume)).toBeCloseTo(840 + 450 + 500, 6);
    expect(num(volume['100'].buy_volume)).toBeCloseTo(840 + 300, 6);
    expect(num(volume['100'].swaps)).toBe(8);
    const twap = rowsBy(run(db, 'from market::twap'), 'bucket');
    expect(num(twap['100'].twap)).toBeCloseTo((140 + 150 + 125) / 3, 6);
  });

  it('candles open at the first slot and close at the last', () => {
    // Open and close come from joins on first_slot and last_slot; swapping them would still give a plausible looking candle.
    const candles = rowsBy(run(db, 'from market::candles'), 'bucket');
    expect(num(candles['100'].open)).toBeCloseTo(140, 6);
    expect(num(candles['100'].close)).toBeCloseTo(125, 6);
    expect(num(candles['100'].high)).toBeCloseTo(150, 6);
    expect(num(candles['100'].low)).toBeCloseTo(125, 6);
  });

  it('a late swap moves only its own candle', async () => {
    // The hero claims only touched views change; a swap in bucket 101 must leave bucket 100 exactly as it was.
    const before = rowsBy(run(db, 'from market::candles'), 'bucket')['100'];
    await swap(db, [{ id: 30, slot: 1015, isBuy: true, size: 1, price: 160 }]);
    const after = rowsBy(run(db, 'from market::candles'), 'bucket');
    expect(after['100']).toEqual(before);
    expect(num(after['101'].open)).toBeCloseTo(160, 6);
    await swap(db, [{ id: 31, slot: 1019, isBuy: true, size: 1, price: 170 }]);
    const later = rowsBy(run(db, 'from market::candles'), 'bucket')['101'];
    expect(num(later.close)).toBeCloseTo(170, 6);
    expect(num(later.high)).toBeCloseTo(170, 6);
  });

  it('reads come back newest first', () => {
    // The boards show the head of each view; ascending order would show stale rows forever.
    const ids = run(db, READS.trades).map((row) => num(row.id));
    expect(ids).toEqual([31, 30, 21, 20]);
  });

  it('never touches namespaces the docs read or create', () => {
    // The hero shares one wasm instance with every docs snippet.
    const all = [SETUP, ...Object.values(READS).map((read) => (typeof read === 'string' ? read : read(1))), insertSwaps([{ id: 1, slot: 1, isBuy: true, size: 1, price: 1 }])].join('\n');
    expect(all).not.toMatch(/\b(app|shop|store)::/);
  });

  it('the just ran statement is exactly the insert behind the raw board', async () => {
    // The strip must show the statement that produced the raw row, otherwise visitors read RQL that never ran.
    const shown = { id: 40, slot: 1030, isBuy: false, size: 0.5, price: 151.25 };
    const statement = insertSwaps([shown]);
    expect(statement).toContain('id: 40');
    expect(statement).toContain('amount0: 500000000');
    expect(statement).toContain('amount1: 75625000');
    expect(statement).toContain('zero_for_one: true');
    await swap(db, [shown]);
    const [raw] = run(db, READS.raw(40));
    expect(num(raw.amount0)).toBe(500000000);
    expect(num(raw.amount1)).toBe(75625000);
    expect(String(raw.zero_for_one)).toBe('true');
  });

  it.each(READ_BOXES.filter((read) => read.title !== 'Big trades'))('read "$title" runs against the live views and returns rows', ({ rql }) => {
    // Every read box is a promise that pressing Run works; a box that errors or comes back empty breaks it.
    expect(run(db, rql).length).toBeGreaterThan(0);
  });

  it('big trades is empty until a visitor buys 25 RDB, then shows exactly that swap', async () => {
    // The box tells visitors to buy 25 to see their swap; otherwise the description is a lie.
    const { rql } = READ_BOXES.find((read) => read.title === 'Big trades')!;
    expect(run(db, rql)).toHaveLength(0);
    await swap(db, [{ id: 50, slot: 1040, isBuy: true, size: 25, price: 150 }]);
    expect(run(db, rql).map((row) => num(row.id))).toEqual([50]);
  });

  it('the live subscription read keeps exactly the newest candles, so older ones retract', async () => {
    // The panel claims take 10 drops the oldest candle; if the scan order were not newest first it would drop the wrong one.
    await swap(db, Array.from({ length: 12 }, (_, i) => ({ id: 60 + i, slot: 1100 + i * 10, isBuy: true, size: 1, price: 150 })));
    const buckets = run(db, 'from market::candles').map((row) => num(row.bucket)).sort((a, b) => b - a);
    const live = run(db, READS.live).map((row) => num(row.bucket));
    expect(buckets.length).toBeGreaterThan(10);
    expect(live).toEqual(buckets.slice(0, 10));
  });
});
