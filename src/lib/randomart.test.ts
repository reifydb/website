import { describe, it, expect } from 'vitest';
import { sigil, frameSigil, postSeed } from './randomart';

const TITLE = 'The Cron Job You Deleted';
const SLUG = 'the-cron-job-you-deleted';
const DATE = '2026-08-12';

describe('randomart', () => {
  it('produces the same board for the same seed', () => {
    // Build-time PNG and browser render must agree, otherwise card and page differ.
    const seed = postSeed(TITLE, SLUG, DATE);
    expect(sigil(seed)).toEqual(sigil(seed));
  });

  it('changes completely when any seed field changes', () => {
    // Without avalanche two posts look alike at card size and the art stops identifying anything.
    const base = sigil(postSeed(TITLE, SLUG, DATE));
    const variants = [
      sigil(postSeed('The Cron Job You Kept', SLUG, DATE)),
      sigil(postSeed(TITLE, 'the-cron-job-you-kept', DATE)),
      sigil(postSeed(TITLE, SLUG, '2026-08-13')),
    ];

    for (const variant of variants) {
      expect(variant.rows).not.toEqual(base.rows);
      expect(variant.fingerprint).not.toEqual(base.fingerprint);

      const shared = variant.rows.flatMap((row, y) =>
        [...row].filter((glyph, x) => glyph === base.rows[y][x])
      ).length;
      expect(shared).toBeLessThan(17 * 9 * 0.9);
    }
  });

  it('emits a fixed 17x9 board', () => {
    // A ragged board silently misaligns both the PNG grid and the frame padding.
    const { rows } = sigil(postSeed(TITLE, SLUG, DATE));
    expect(rows).toHaveLength(9);
    for (const row of rows) {
      expect(row).toHaveLength(17);
    }
  });

  it('marks exactly one start and one end cell', () => {
    // E must always survive; S disappears exactly when the walk ends where it began.
    for (let i = 0; i < 200; i++) {
      const { rows } = sigil(postSeed(`Post ${i}`, `post-${i}`, DATE));
      const board = rows.join('');
      expect(board.split('E')).toHaveLength(2);
      expect(board.split('S').length).toBeLessThanOrEqual(2);
    }
  });

  it('never emits a glyph outside the density ramp', () => {
    // An out-of-range visit count would index past the ramp and render as "undefined".
    const ramp = new Set([...' .o+=*BOX@%&#/^', 'S', 'E']);
    for (let i = 0; i < 200; i++) {
      const { rows } = sigil(postSeed(`Post ${i}`, `post-${i}`, DATE));
      for (const glyph of rows.join('')) {
        expect(ramp.has(glyph)).toBe(true);
      }
    }
  });

  it('frames the board with equal-width borders', () => {
    // Every framed line must be the same width or the monospace block edge goes ragged.
    const entry = sigil(postSeed(TITLE, SLUG, DATE));
    const framed = frameSigil(entry, 'REIFYDB 002');
    expect(framed).toHaveLength(11);
    for (const line of framed) {
      expect(line).toHaveLength(19);
    }
    expect(framed[0]).toContain('REIFYDB 002');
    expect(framed.at(-1)).toContain(entry.fingerprint);
  });

  it('rejects a label too wide for the board', () => {
    // Truncating instead of throwing would corrupt border alignment without a signal.
    expect(() =>
      frameSigil(sigil(postSeed(TITLE, SLUG, DATE)), 'REIFYDB SEQUENCE 002')
    ).toThrow(/does not fit/);
  });
});
