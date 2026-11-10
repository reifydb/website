import { describe, it, expect } from 'vitest';
import { changesOf } from '@/components/ui/live-subscription-changes';

const COLUMNS = ['bucket', 'close'];

describe('live subscription panel', () => {
  it('the first delivery is hydration and marks nothing', () => {
    // Hydration must not flash every row as an insert, otherwise the first paint reads as a burst of new candles.
    expect(changesOf(null, [{ bucket: 1, close: 10 }], 'bucket', COLUMNS)).toEqual([]);
  });

  it('a new key is an insert, a changed row is an update, an unchanged row is neither', () => {
    // The _op column must match what a server subscription would send, otherwise the panel teaches the wrong protocol.
    const before = [{ bucket: 1, close: 10 }, { bucket: 2, close: 11 }];
    const after = [{ bucket: 1, close: 10 }, { bucket: 2, close: 12 }, { bucket: 3, close: 13 }];
    expect(changesOf(before, after, 'bucket', COLUMNS).map(({ key, kind }) => [key, kind])).toEqual([
      ['2', 'update'],
      ['3', 'insert'],
    ]);
  });

  it('a key that leaves the result counts as removed', () => {
    // A candle sliding out of the take window must count as _op 3, otherwise rows vanish without a delivery.
    const before = [{ bucket: 1, close: 10 }, { bucket: 2, close: 11 }];
    const after = [{ bucket: 2, close: 11 }, { bucket: 3, close: 12 }];
    expect(changesOf(before, after, 'bucket', COLUMNS).map(({ key, kind }) => [key, kind])).toEqual([
      ['3', 'insert'],
      ['1', 'remove'],
    ]);
  });

  it('an update lists exactly the cells that changed, with before and after', () => {
    // Only changed cells may flash, otherwise every update lights the whole row and hides what moved.
    const before = [{ bucket: 1, open: 9, close: 10 }];
    const after = [{ bucket: 1, open: 9, close: 12 }];
    const [change] = changesOf(before, after, 'bucket', ['bucket', 'open', 'close']);
    expect(change.cells).toEqual([{ column: 'close', before: 10, after: 12 }]);
  });
});
