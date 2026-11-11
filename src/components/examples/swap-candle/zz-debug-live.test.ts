import { it } from 'vitest';
import { createTestDB, executeExample } from '@/lib/test-utils/wasm-test-db';
import { READS, SETUP, insertSwaps } from './swap-candle';

it('debug live rows', async () => {
  const db = await createTestDB();
  executeExample(db, SETUP);
  let id = 0;
  let bad = 0;
  for (let round = 0; round < 300; round++) {
    const swaps = Array.from({ length: 3 }, () => { id++; return { id, slot: 1000 + id, isBuy: id % 2 === 0, size: 1 + (id % 5), price: 140 + (id % 7) }; });
    executeExample(db, insertSwaps(swaps));
    await new Promise((r) => setTimeout(r, 5));
    const result = executeExample(db, READS.live);
    const rows = result.data as Record<string, unknown>[];
    const odd = rows.filter((r) => r.bucket === undefined);
    if ((odd.length || rows.length > 10) && bad++ < 3) console.log('ROUND', round, rows.length, JSON.stringify(rows));
  }
  console.log('BAD', bad);
});
