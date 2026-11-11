import { it } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';

it('debug now', async () => {
  const db = await createTestDB();
  console.log('NOW', JSON.stringify(executeExample(db, 'map { t: datetime::now() }')), 'JS', new Date().toISOString());
});
