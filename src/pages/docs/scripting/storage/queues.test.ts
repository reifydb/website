import { describe, it, expect, beforeAll } from 'vitest';
import { createTestDB, executeExample, verifyExample } from '@/lib/test-utils/wasm-test-db';
import type { WasmDB } from '@/lib/wasm-db';
import { scriptingStorageQueuesExamples } from './queues.examples';

describe('scripting/storage/queues examples', () => {
  // shipped @reifydb/wasm 0.8.1 traps on create queue, so this probe skips the run until a build that parses it ships
  let db: WasmDB;
  let supported = false;

  beforeAll(async () => {
    db = await createTestDB();
    supported = executeExample(db, 'create namespace st_queue_gate; create queue st_queue_gate::probe { id: int4 } with { fifo: {} }').success;
  });

  it.for(scriptingStorageQueuesExamples)('$id - $title', (example, ctx) => {
    if (!supported) ctx.skip();
    const result = verifyExample(db, example);
    if (!result.success) {
      console.error(`Example ${example.id} failed:`, result.error);
    }
    expect(result.success, result.error).toBe(true);
  });
});
