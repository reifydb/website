import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';

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
});
