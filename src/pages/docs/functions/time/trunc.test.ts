import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, verifyExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { timeTruncExamples } from './trunc.examples';

describe('Time Trunc Examples', () => {
  let db: WasmDB;
  beforeAll(async () => { db = await createTestDB(); });
  it.each(timeTruncExamples)('$id - $title', (example) => {
    const result = verifyExample(db, example);
    if (!result.success) console.error(`Example ${example.id} failed:`, result.error);
    expect(result.success, result.error).toBe(true);
  });
});
