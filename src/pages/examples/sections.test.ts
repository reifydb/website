import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import {
  exViewsDeclareExample,
  exViewsWriteExample,
  exViewsReadExample,
  exPoliciesSetupExample,
  exPoliciesInspectExample,
  exProceduresExample,
  exRingBufferExample,
} from './sections.examples';

type Row = Record<string, unknown>;

function run(db: WasmDB, code: string): Row[] {
  const result = executeExample(db, code);
  expect(result.success, result.error).toBe(true);
  return (result.data ?? []) as Row[];
}

describe('examples page sections', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
  });

  it('a deferred view has caught up by the time it is read', () => {
    // The page claims the view is current with no cron, worker or cache bust. That claim
    // is only true if reading the view right after the insert already shows the new totals,
    // so assert the arithmetic - a stale or empty view must fail here.
    run(db, exViewsDeclareExample.code);
    run(db, exViewsWriteExample.code);

    const rows = run(db, exViewsReadExample.code);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ region: 'eu', revenue: '165.5' });
    expect(rows[1]).toMatchObject({ region: 'us', revenue: '80' });
  });

  it('policies are catalog objects attached to the table', () => {
    // The page's argument is that a rule lives on the data rather than in an API layer.
    // If a policy stopped being registered in the catalog it would still "work" in a demo
    // while silently no longer being the database's business - assert both are enabled.
    run(db, exPoliciesSetupExample.code);

    const rows = run(db, exPoliciesInspectExample.code);
    const names = rows.map((r) => r.name).sort();
    expect(names).toEqual(['no_private_inserts', 'public_only']);
    for (const row of rows) {
      expect(row).toMatchObject({ target_type: 'table', target_object: 'documents', enabled: 'true' });
    }
  });

  it('a procedure commits both writes of a transfer together', () => {
    // Debit and credit must move by the same amount in one call. A partial application
    // would leave the pair inconsistent, which is exactly the failure the example exists
    // to rule out, so assert both sides and the conserved total.
    const rows = run(db, exProceduresExample.code);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ owner: 'alice', balance: '425' });
    expect(rows[1]).toMatchObject({ owner: 'bob', balance: '195' });

    const total = rows.reduce((sum, r) => sum + Number(r.balance), 0);
    expect(total).toBe(620);
  });

  it('a ring buffer evicts the oldest row instead of growing', () => {
    // Four rows into a capacity of three: the point is the bound holds and the row that
    // leaves is the oldest one. A buffer that grew, or dropped the newest write, would
    // break the claim that it is bounded state rather than a cache.
    const rows = run(db, exRingBufferExample.code);
    expect(rows).toHaveLength(3);
    expect(rows.map((r) => r.user_id)).toEqual(['2', '3', '4']);
  });
});
