import { describe, it, expect } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { CLAIM, COUNTERS, QUEUE, READS, SETUP, ack, backoffAfter, fail, placeOrder, replay } from './webhook-outbox';

type Row = Record<string, unknown>;

function run(db: WasmDB, code: string): Row[] {
  const result = executeExample(db, code);
  expect(result.success, result.error).toBe(true);
  return (result.data ?? []) as Row[];
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function outbox(): Promise<WasmDB> {
  const db = await createTestDB();
  run(db, SETUP);
  return db;
}

function depth(db: WasmDB): number {
  return run(db, COUNTERS).reduce((sum, row) => sum + Number(row.depth), 0);
}

function claimAndFail(db: WasmDB): Row {
  const [item] = run(db, CLAIM);
  run(db, fail(String(item.token), '503'));
  return item;
}

describe('webhook outbox', () => {
  it('the order and its webhook land together, or not at all', async () => {
    // The outbox pattern breaks if an order can be saved without its webhook, so a failed webhook insert must roll back the order.
    const db = await outbox();
    run(db, placeOrder(1, 'order.paid', 'shop.io'));
    expect(run(db, 'from hooks::orders').map((r) => Number(r.id))).toEqual([1]);
    expect(run(db, READS.all).map((r) => Number(r.id))).toEqual([1]);
    const broken = executeExample(db, `insert hooks::orders [{ id: 2, event: "order.paid" }];
insert ${QUEUE} [{ id: "two", event: "order.paid", url: "shop.io" }]`);
    expect(broken.success).toBe(false);
    expect(run(db, 'from hooks::orders').map((r) => Number(r.id))).toEqual([1]);
  });

  it('a failed webhook waits out its backoff, then comes back as the next try', async () => {
    // Claiming during backoff would hammer a receiver that just failed; never coming back would lose the webhook.
    const db = await outbox();
    run(db, placeOrder(1, 'order.paid', 'shop.io'));
    expect(Number(claimAndFail(db).attempt)).toBe(1);
    expect(run(db, CLAIM)).toHaveLength(0);
    await wait(backoffAfter(1) + 150);
    const [retry] = run(db, CLAIM);
    expect(Number(retry.attempt)).toBe(2);
  });

  it('an acked webhook is not handed out again but stays readable', async () => {
    // Ack must finish delivery, otherwise a receiver gets the same webhook twice.
    const db = await outbox();
    run(db, placeOrder(1, 'order.paid', 'shop.io'));
    run(db, placeOrder(2, 'order.shipped', 'crm.io'));
    const [first] = run(db, CLAIM);
    run(db, ack(String(first.token)));
    const [second] = run(db, CLAIM);
    expect(Number(second.id)).toBe(2);
    expect(run(db, READS.all).map((r) => Number(r.id))).toEqual([1, 2]);
  });

  it('a backoff counts in depth and a dead webhook does not, until it is replayed', async () => {
    // The scene tells backoff from dead by depth, so depth must count waiting webhooks and drop dead ones exactly.
    const db = await outbox();
    run(db, placeOrder(1, 'order.paid', 'shop.io'));
    claimAndFail(db);
    expect(depth(db)).toBe(1);
    await wait(backoffAfter(1) + 150);
    claimAndFail(db);
    await wait(backoffAfter(2) + 150);
    expect(Number(claimAndFail(db).attempt)).toBe(3);
    expect(depth(db)).toBe(0);
    expect(run(db, CLAIM)).toHaveLength(0);
    run(db, replay(1));
    expect(depth(db)).toBe(1);
    expect(Number(run(db, CLAIM)[0].id)).toBe(1);
  }, 15_000);

  it('a lease that runs out brings the webhook back as a used try, and the late ack is stale', async () => {
    // Without the lease reaper a crashed worker keeps the webhook forever; a late ack must not finish it for the new worker.
    const db = await outbox();
    run(db, placeOrder(1, 'order.paid', 'shop.io'));
    const [lost] = run(db, `call queue::claim("crashed", "${QUEUE}", 1, duration::seconds(1))`);
    await wait(6_500);
    await wait(backoffAfter(1) + 150);
    const [again] = run(db, CLAIM);
    expect(Number(again.attempt)).toBe(2);
    expect(String(run(db, ack(String(lost.token)))[0].status)).toBe('stale');
  }, 15_000);
});
