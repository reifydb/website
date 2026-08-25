import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { playgroundExamples, playgroundRevenueExample } from './playground.examples';

describe('playground chip examples', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
  });

  it.each(playgroundExamples)('$id - $title runs against the seeded database', (example) => {
    // Every chip is one click away from a visitor's first impression, so a chip that
    // errors is worse than no chip at all - assert execution, not just construction.
    const result = executeExample(db, example.code);
    expect(result.success, result.error).toBe(true);
  });

  it.each(playgroundExamples)('$id - $title only reads', (example) => {
    // A chip that writes can fail on a second click, and a chip that runs DDL the engine
    // has not implemented panics and poisons the shared wasm instance for the whole page.
    // Keeping every chip read-only is what makes them safe to click in any order.
    expect(example.code).not.toMatch(/\b(create|insert|update|delete|drop)\b/i);
  });

  it('the auto-run query returns at least one row', () => {
    // The warm start decides the first frame of the page: an empty grid on arrival is
    // the exact failure this whole change exists to remove.
    const result = executeExample(db, playgroundRevenueExample.code);
    expect(result.success, result.error).toBe(true);
    expect(result.data?.length ?? 0).toBeGreaterThan(0);
  });
});
