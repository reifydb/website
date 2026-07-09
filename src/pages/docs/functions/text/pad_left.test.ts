import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, verifyExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { functionsTextPadLeftExamples } from './pad_left.examples';

describe('functions/text/pad_left examples', () => {
  let db: WasmDB;

  beforeAll(async () => {
    db = await createTestDB();
  });

  it.each(functionsTextPadLeftExamples)('$id - $title', (example) => {
    const result = verifyExample(db, example);
    if (!result.success) {
      console.error(`Example ${example.id} failed:`, result.error);
    }
    expect(result.success, result.error).toBe(true);
  });
});
