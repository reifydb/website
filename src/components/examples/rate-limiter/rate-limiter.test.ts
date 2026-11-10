import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { LIMIT, READS, SETUP, WINDOW_MS, sendRequest } from './rate-limiter';

type Row = Record<string, unknown>;

const RING_BUFFER = `create namespace ex_rb;
create ringbuffer ex_rb::recent_logins {
  user_id: int4,
  at: utf8
} with { capacity: 3 };

insert ex_rb::recent_logins [
  { user_id: 1, at: "09:00" },
  { user_id: 2, at: "09:05" },
  { user_id: 3, at: "09:12" },
  { user_id: 4, at: "09:20" }
];

from ex_rb::recent_logins`;

function run(db: WasmDB, code: string): Row[] {
  const result = executeExample(db, code);
  expect(result.success, result.error).toBe(true);
  return (result.data ?? []) as Row[];
}

describe('rate limiter', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
  });

  it('a ring buffer evicts the oldest row instead of growing', () => {
    // The bound must hold and the oldest row must leave, otherwise it is a growing cache.
    const rows = run(db, RING_BUFFER);
    expect(rows).toHaveLength(3);
    expect(rows.map((r) => r.user_id)).toEqual(['2', '3', '4']);
  });

  async function limiter() {
    const fresh = await createTestDB();
    run(fresh, SETUP);
    let id = 0;
    const exec = async (rql: string) => run(fresh, rql);
    return {
      db: fresh,
      send: (user: 'alice' | 'bob' | 'carol', at: number) => sendRequest(exec, ++id, user, at),
    };
  }

  it('the request after five inside the window is blocked', async () => {
    // Exactly the sixth must fail, otherwise the limit is off by one in either direction.
    const { send } = await limiter();
    for (let k = 0; k < LIMIT; k++) expect((await send('alice', 1_000 + k)).blocked).toBe(false);
    expect((await send('alice', 1_000 + LIMIT)).blocked).toBe(true);
  });

  it('a user is let through again once the oldest request leaves the window', async () => {
    // The window must slide with time, otherwise a user stays blocked forever after one burst.
    const { send } = await limiter();
    for (let k = 0; k < LIMIT; k++) await send('alice', 1_000 + k);
    expect((await send('alice', 1_000 + WINDOW_MS)).blocked).toBe(false);
  });

  it('one user hitting the limit does not block another', async () => {
    // Each user must have their own ring, otherwise one spammer locks everyone out.
    const { send } = await limiter();
    for (let k = 0; k < LIMIT; k++) await send('carol', 1_000 + k);
    expect((await send('carol', 1_010)).blocked).toBe(true);
    expect((await send('bob', 1_010)).blocked).toBe(false);
  });

  it('a blocked request is not stored and the ring keeps only the last five', async () => {
    // A stored rejection would refill the window and keep the spammer blocked by their own rejections.
    const { db, send } = await limiter();
    for (let k = 0; k < LIMIT + 3; k++) await send('alice', 1_000 + k * WINDOW_MS);
    await send('alice', 1_000 + (LIMIT + 3) * WINDOW_MS);
    await send('alice', 1_000 + (LIMIT + 3) * WINDOW_MS + 1);
    for (let k = 0; k < 3; k++) await send('alice', 1_000 + (LIMIT + 3) * WINDOW_MS + 2 + k);
    const ids = run(db, READS.ring).map((r) => Number(r.id)).sort((a, b) => a - b);
    expect(ids).toEqual([9, 10, 11, 12, 13]);
    expect((await send('alice', 1_000 + (LIMIT + 3) * WINDOW_MS + 9)).blocked).toBe(true);
    expect(run(db, READS.ring).map((r) => Number(r.id)).sort((a, b) => a - b)).toEqual([9, 10, 11, 12, 13]);
  });
});
