import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, verifyExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { rqlFiveMinutesExamples, rqlForSqlUsersExamples } from '@/lib/examples';

// These examples back the "RQL in five minutes" and "RQL for SQL users"
// flagship pages. Each one is self-contained (inline data or read-only queries
// against seed data), so order does not matter.
describe('RQL Flagship Examples', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
  });

  it.each([...rqlFiveMinutesExamples, ...rqlForSqlUsersExamples])('$id - $title', (example) => {
    const result = verifyExample(db, example);
    if (!result.success) {
      console.error(`Example ${example.id} failed:`, result.error);
    }
    expect(result.success, result.error).toBe(true);
  });
});
