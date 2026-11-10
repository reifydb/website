import { describe, it, expect } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { ALERT_CAPACITY, CLAIM, READS, SETUP, ack, insertAlert, insertCommand, insertDevice, insertReading } from './shared-dictionary';

type Row = Record<string, unknown>;

function run(db: WasmDB, code: string): Row[] {
  const result = executeExample(db, code);
  expect(result.success, result.error).toBe(true);
  return (result.data ?? []) as Row[];
}

async function fleet(): Promise<WasmDB> {
  const db = await createTestDB();
  run(db, SETUP);
  return db;
}

function entries(db: WasmDB): Row[] {
  return run(db, READS.names);
}

describe('shared dictionary', () => {
  it('every storage writes into the same dictionary, and a repeat across storages adds nothing', async () => {
    // Each storage must point at the shared dictionary, otherwise its names never reach it and a repeat is stored twice.
    const db = await fleet();
    run(db, insertDevice('pump-1', 'online'));
    run(db, insertReading(1_000, 'pump-2', 2.5));
    run(db, insertAlert(1_000, 'valve-1', 'high'));
    run(db, insertCommand(1, 'gate-1', 'open'));
    expect(entries(db).map((r) => r.value).sort()).toEqual(['gate-1', 'pump-1', 'pump-2', 'valve-1']);
    run(db, insertReading(1_001, 'pump-1', 2.6));
    run(db, insertAlert(1_001, 'pump-2', 'low'));
    run(db, insertCommand(2, 'valve-1', 'close'));
    run(db, insertDevice('gate-1', 'online'));
    expect(entries(db).map((r) => r.value).sort()).toEqual(['gate-1', 'pump-1', 'pump-2', 'valve-1']);
  });

  it('a new device adds exactly one entry with the next id', async () => {
    // Ids must be handed out once per new value and in order, otherwise two storages could disagree on what an id means.
    const db = await fleet();
    run(db, insertDevice('pump-1', 'online'));
    run(db, insertReading(1_000, 'pump-1', 2.5));
    run(db, insertDevice('gate-1', 'new'));
    const ids = Object.fromEntries(entries(db).map((r) => [r.value, Number(r.id)]));
    expect(ids).toEqual({ 'pump-1': 1, 'gate-1': 2 });
  });

  it('reads from every storage return the name, not the id', async () => {
    // Decoding must be transparent, otherwise every reader has to join the dictionary by hand.
    const db = await fleet();
    run(db, insertDevice('valve-1', 'online'));
    run(db, insertReading(1_000, 'valve-1', 3.1));
    run(db, insertAlert(1_000, 'valve-1', 'low'));
    run(db, insertCommand(1, 'valve-1', 'close'));
    for (const read of [READS.devices, READS.readings, READS.alerts, 'from fleet::commands']) {
      expect(run(db, read)[0].name, read).toBe('valve-1');
    }
  });

  it('the alerts ring keeps only the last five', async () => {
    // The ring must evict, otherwise alerts grow without bound like a table.
    const db = await fleet();
    for (let k = 0; k < ALERT_CAPACITY + 2; k++) run(db, insertAlert(1_000 + k, 'pump-1', `level-${k}`));
    const levels = run(db, READS.alerts).map((r) => r.level);
    expect(levels).toHaveLength(ALERT_CAPACITY);
    expect(levels).not.toContain('level-0');
    expect(levels).not.toContain('level-1');
  });

  it('a claimed and acked command is not handed out again', async () => {
    // Ack must finish the item, otherwise a device runs the same command twice.
    const db = await fleet();
    run(db, insertCommand(1, 'gate-1', 'open'));
    run(db, insertCommand(2, 'pump-1', 'restart'));
    const [first] = run(db, CLAIM);
    expect(first.name).toBe('gate-1');
    run(db, ack(String(first.token)));
    const [second] = run(db, CLAIM);
    expect(Number(second.id)).toBe(2);
    expect(second.name).toBe('pump-1');
  });
});
