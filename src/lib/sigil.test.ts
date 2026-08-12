import { describe, it, expect } from 'vitest';
import { sigil, postSeed, BITS_PER_ROW, ROWS, TOTAL_BITS } from './sigil';

const TITLE = 'The Cron Job You Deleted';
const SLUG = 'the-cron-job-you-deleted';
const DATE = '2026-08-12';

const UNSET = 0;
const MAX_SHADE = 3;

function flatten(cells: number[][]): number[] {
  return cells.flat();
}

describe('sigil', () => {
  it('produces the same bitmap for the same seed', () => {
    // Build-time PNG and browser render must agree, otherwise card and page differ.
    const seed = postSeed(TITLE, SLUG, DATE);
    expect(sigil(seed)).toEqual(sigil(seed));
  });

  it('renders every bit of the digest and nothing else', () => {
    // The bitmap must be the whole 128-bit digest or it stops being the checksum it claims to be.
    const { cells, setBits } = sigil(postSeed(TITLE, SLUG, DATE));
    expect(cells).toHaveLength(ROWS);
    for (const row of cells) {
      expect(row).toHaveLength(BITS_PER_ROW);
    }

    const flat = flatten(cells);
    expect(flat).toHaveLength(TOTAL_BITS);
    expect(flat.every((shade) => shade >= 0 && shade <= MAX_SHADE)).toBe(true);
    expect(flat.filter((shade) => shade !== UNSET)).toHaveLength(setBits);
  });

  it('flips close to half the bits when any seed field changes', () => {
    // Without avalanche two posts render near-identical bitmaps and the art identifies nothing.
    const base = flatten(sigil(postSeed(TITLE, SLUG, DATE)).cells);
    const variants = [
      postSeed('The Cron Job You Kept', SLUG, DATE),
      postSeed(TITLE, 'the-cron-job-you-kept', DATE),
      postSeed(TITLE, SLUG, '2026-08-13'),
    ];

    for (const seed of variants) {
      const other = flatten(sigil(seed).cells);
      const differing = other.filter((shade, i) => shade !== base[i]).length;
      expect(differing).toBeGreaterThan(TOTAL_BITS * 0.25);
      expect(differing).toBeLessThan(TOTAL_BITS * 0.9);
    }
  });

  it('keeps fill near half across many seeds', () => {
    // A biased digest would make every post look like the same washed-out or solid block.
    let total = 0;
    const runs = 400;
    for (let i = 0; i < runs; i++) {
      const { setBits } = sigil(postSeed(`Post ${i}`, `post-${i}`, DATE));
      total += setBits;
      expect(setBits).toBeGreaterThan(TOTAL_BITS * 0.2);
      expect(setBits).toBeLessThan(TOTAL_BITS * 0.8);
    }
    const mean = total / runs / TOTAL_BITS;
    expect(mean).toBeGreaterThan(0.45);
    expect(mean).toBeLessThan(0.55);
  });

  it('shades a set cell by how clustered it is', () => {
    // Shade must track local density, otherwise the ramp is decoration rather than data.
    const { cells } = sigil(postSeed(TITLE, SLUG, DATE));

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < BITS_PER_ROW; column++) {
        if (cells[row][column] === UNSET) continue;

        let neighbours = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const line = cells[row + dy];
            if (!line || line[column + dx] === undefined) continue;
            if (line[column + dx] !== UNSET) neighbours++;
          }
        }

        const expected = neighbours <= 2 ? 1 : neighbours <= 4 ? 2 : 3;
        expect(cells[row][column]).toBe(expected);
      }
    }
  });

  it('uses every step of the shade ramp across a corpus', () => {
    // A ramp that never reaches its darkest step is four tokens pretending to be one.
    const used = new Set<number>();
    for (let i = 0; i < 200; i++) {
      for (const shade of flatten(sigil(postSeed(`Post ${i}`, `post-${i}`, DATE)).cells)) {
        used.add(shade);
      }
    }
    expect([...used].sort()).toEqual([0, 1, 2, 3]);
  });

  it('gives distinct fingerprints to distinct seeds', () => {
    // A collision would label two different cards with the same digest.
    const seen = new Set<string>();
    for (let i = 0; i < 400; i++) {
      seen.add(sigil(postSeed(`Post ${i}`, `post-${i}`, DATE)).fingerprint);
    }
    expect(seen.size).toBe(400);
  });

  it('renders a six-character hex fingerprint', () => {
    // The fingerprint is drawn into a fixed-width capsule on both the card and the page.
    const { fingerprint } = sigil(postSeed(TITLE, SLUG, DATE));
    expect(fingerprint).toMatch(/^[0-9a-f]{6}$/);
  });
});
