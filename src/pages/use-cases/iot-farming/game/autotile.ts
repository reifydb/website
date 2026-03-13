import type { WorldTile } from '../engine/types';
import { WORLD_WIDTH, WORLD_HEIGHT } from '../engine/constants';
import { isGrassTile } from './world-map';

/**
 * Grass tileset layout (row_col naming):
 *
 * 3 variant blocks: cols 0-2, 3-5, 6-8
 * Each block:
 *   (row, col+0) TL corner   (row, col+1) top edge     (row, col+2) TR corner
 *   (row+1, col+0) left edge (row+1, col+1) center fill (row+1, col+2) right edge
 *   (row+2, col+0) BL corner (row+2, col+1) bottom edge (row+2, col+2) BR corner
 *
 * Inner corners (concave):
 *   (2, 9)  inner TL    (2, 10) inner TR
 *   (3, 9)  inner BL    (3, 10) inner BR
 */

// Cardinal bitmask: N=1, E=2, S=4, W=8
// Bit is SET if neighbor is also grass

// Map bitmask → [row_offset, col_offset] within a variant block (3x3)
// row_offset/col_offset are relative to the variant block's top-left
const BITMASK_TO_TILE: Record<number, [number, number]> = {
  0b0000: [0, 0],   // isolated → TL corner (looks like a dot)
  0b0001: [2, 1],   // N only → bottom edge (grass above)
  0b0010: [1, 0],   // E only → left edge (grass to right)
  0b0011: [2, 0],   // N+E → BL corner
  0b0100: [0, 1],   // S only → top edge (grass below)
  0b0101: [1, 1],   // N+S → center (vertical strip)
  0b0110: [0, 0],   // S+E → TL corner
  0b0111: [1, 0],   // N+S+E → left edge
  0b1000: [1, 2],   // W only → right edge (grass to left)
  0b1001: [2, 2],   // N+W → BR corner
  0b1010: [1, 1],   // E+W → center (horizontal strip)
  0b1011: [2, 1],   // N+E+W → bottom edge
  0b1100: [0, 2],   // S+W → TR corner
  0b1101: [1, 2],   // N+S+W → right edge
  0b1110: [0, 1],   // S+E+W → top edge
  0b1111: [1, 1],   // all cardinals → center fill
};

// Variant block column offsets (3 blocks)
const VARIANT_COL_OFFSETS = [0, 3, 6];

export interface AutotileResult {
  /** Primary tile key: grass_ROW_COL */
  key: string;
  /** Optional inner corner overlays (for concave corners) */
  innerCorners: string[];
}

export function computeAutotile(
  map: WorldTile[],
  x: number,
  y: number,
  rng: () => number,
): AutotileResult {
  const get = (tx: number, ty: number): boolean => {
    if (tx < 0 || tx >= WORLD_WIDTH || ty < 0 || ty >= WORLD_HEIGHT) return false;
    return isGrassTile(map[ty * WORLD_WIDTH + tx]);
  };

  // Cardinal neighbors
  const n = get(x, y - 1);
  const e = get(x + 1, y);
  const s = get(x, y + 1);
  const w = get(x - 1, y);

  const bitmask = (n ? 1 : 0) | (e ? 2 : 0) | (s ? 4 : 0) | (w ? 8 : 0);

  // Pick random variant block
  const variant = Math.floor(rng() * 3);
  const colOffset = VARIANT_COL_OFFSETS[variant];

  const [rowOff, colOff] = BITMASK_TO_TILE[bitmask];
  const row = rowOff;
  const col = colOffset + colOff;

  const key = `grass_${row}_${col}`;
  const innerCorners: string[] = [];

  // If all 4 cardinals are grass, check diagonals for inner corners
  if (bitmask === 0b1111) {
    const ne = get(x + 1, y - 1);
    const se = get(x + 1, y + 1);
    const sw = get(x - 1, y + 1);
    const nw = get(x - 1, y - 1);

    // Inner corner: water at diagonal means concave corner
    // inner TL = water at NW diagonal → grass_2_9
    if (!nw) innerCorners.push('grass_2_9');
    // inner TR = water at NE diagonal → grass_2_10
    if (!ne) innerCorners.push('grass_2_10');
    // inner BL = water at SW diagonal → grass_3_9
    if (!sw) innerCorners.push('grass_3_9');
    // inner BR = water at SE diagonal → grass_3_10
    if (!se) innerCorners.push('grass_3_10');
  }

  return { key, innerCorners };
}
