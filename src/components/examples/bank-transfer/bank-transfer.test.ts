import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';

type Row = Record<string, unknown>;

const TRANSFER = `create namespace ex_proc;
create table ex_proc::accounts { id: int4, owner: utf8, balance: float8 };
insert ex_proc::accounts [
  { id: 1, owner: "alice", balance: 500.0 },
  { id: 2, owner: "bob", balance: 120.0 }
];

create procedure ex_proc::transfer { from_id: int4, to_id: int4, amount: float8 } as {
  update ex_proc::accounts { balance: balance - $amount } filter { id == $from_id };
  update ex_proc::accounts { balance: balance + $amount } filter { id == $to_id }
};

call ex_proc::transfer(1, 2, 75.0);
from ex_proc::accounts sort { id: asc }`;

function run(db: WasmDB, code: string): Row[] {
  const result = executeExample(db, code);
  expect(result.success, result.error).toBe(true);
  return (result.data ?? []) as Row[];
}

describe('bank transfer', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
  });

  it('a procedure commits both writes of a transfer together', () => {
    // Debit and credit must move by exactly the same amount, otherwise money appears or vanishes.
    const rows = run(db, TRANSFER);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ owner: 'alice', balance: '425' });
    expect(rows[1]).toMatchObject({ owner: 'bob', balance: '195' });

    const total = rows.reduce((sum, r) => sum + Number(r.balance), 0);
    expect(total).toBe(620);
  });
});
