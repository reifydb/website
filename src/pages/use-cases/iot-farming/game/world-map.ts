import type { WorldTile } from '../engine/types';
import { WORLD_WIDTH, WORLD_HEIGHT, FARM_OFFSET_X, FARM_OFFSET_Y, GRID_WIDTH, GRID_HEIGHT } from '../engine/constants';

// Seeded LCG random number generator
function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function isInsideEllipse(
  x: number, y: number,
  cx: number, cy: number,
  rx: number, ry: number,
  rng: () => number,
  wobble: number,
): boolean {
  const angle = Math.atan2(y - cy, x - cx);
  // Seeded wobble on the edge for irregular shape
  const noiseIdx = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * 32);
  // Use a simple hash for per-edge-segment noise
  const noise = (Math.sin(noiseIdx * 127.1 + seed) * 0.5 + 0.5) * wobble;
  const dx = (x - cx) / (rx + noise * rx);
  const dy = (y - cy) / (ry + noise * ry);
  return dx * dx + dy * dy <= 1;
}

const seed = 42;

export function generateWorldMap(): WorldTile[] {
  const rng = createRng(seed);
  const map: WorldTile[] = new Array(WORLD_WIDTH * WORLD_HEIGHT).fill('water');

  // Main island: irregular ellipse centered at (24, 18), rx~14, ry~10
  // Must fully encompass farm area (16-31, 12-23) with 2-3 tile border
  const mainCx = 24;
  const mainCy = 18;
  const mainRx = 15;
  const mainRy = 11;

  // Pre-generate wobble values for main island edge
  const mainWobble: number[] = [];
  for (let i = 0; i < 64; i++) {
    mainWobble.push(rng() * 0.15 - 0.075);
  }

  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      // Main island check with wobble
      const angle = Math.atan2(y - mainCy, x - mainCx);
      const segment = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * 64);
      const wobbleVal = mainWobble[segment];
      const dx = (x - mainCx) / (mainRx * (1 + wobbleVal));
      const dy = (y - mainCy) / (mainRy * (1 + wobbleVal));
      if (dx * dx + dy * dy <= 1) {
        map[y * WORLD_WIDTH + x] = 'grass';
      }
    }
  }

  // Ensure farm area + 2-tile border is always grass
  for (let y = FARM_OFFSET_Y - 2; y < FARM_OFFSET_Y + GRID_HEIGHT + 2; y++) {
    for (let x = FARM_OFFSET_X - 2; x < FARM_OFFSET_X + GRID_WIDTH + 2; x++) {
      if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
        map[y * WORLD_WIDTH + x] = 'grass';
      }
    }
  }

  // Small island NW: dark_grass, centered at (6, 5), size 6x4
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      const dx = (x - 6) / 3;
      const dy = (y - 5) / 2;
      if (dx * dx + dy * dy <= 1) {
        map[y * WORLD_WIDTH + x] = 'dark_grass';
      }
    }
  }

  // Small island SE: grass, centered at (39, 29), size 5x4
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      const dx = (x - 39) / 2.5;
      const dy = (y - 29) / 2;
      if (dx * dx + dy * dy <= 1) {
        map[y * WORLD_WIDTH + x] = 'grass';
      }
    }
  }

  // Tiny island NE: grass, centered at (41, 6), size 3x3
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      const dx = (x - 41) / 1.5;
      const dy = (y - 6) / 1.5;
      if (dx * dx + dy * dy <= 1) {
        map[y * WORLD_WIDTH + x] = 'grass';
      }
    }
  }

  return map;
}

export function getWorldTile(map: WorldTile[], x: number, y: number): WorldTile {
  if (x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT) return 'water';
  return map[y * WORLD_WIDTH + x];
}

export function isGrassTile(tile: WorldTile): boolean {
  return tile === 'grass' || tile === 'dark_grass';
}
