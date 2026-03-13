import type { Scene } from 'phaser';

export function preloadAssets(scene: Scene): void {
  // Individual grass tiles for farm interior
  scene.load.image('grass-mid', '/assets/sprout-lands/grass-mid.png');
  scene.load.image('grass-flowers1', '/assets/sprout-lands/grass-flowers1.png');
  scene.load.image('grass-flowers2', '/assets/sprout-lands/grass-flowers2.png');
  scene.load.image('grass-detail1', '/assets/sprout-lands/grass-detail1.png');
  scene.load.image('grass-detail2', '/assets/sprout-lands/grass-detail2.png');

  // Farming plants spritesheet: 80x240 = 5 cols x 15 rows of 16x16
  scene.load.spritesheet('farming-plants', '/assets/sprout-lands/farming-plants.png', {
    frameWidth: 16,
    frameHeight: 16,
  });

  // Water tiles for rain particles (4 frames of 16x16)
  scene.load.spritesheet('water-tiles', '/assets/sprout-lands/water-tiles.png', {
    frameWidth: 16,
    frameHeight: 16,
  });

  // Grass autotiles (~59 tiles)
  const grassFiles = [
    // Row 0: cols 0-9
    ...Array.from({ length: 10 }, (_, c) => `grass_0_${c}`),
    // Row 1: cols 0-9
    ...Array.from({ length: 10 }, (_, c) => `grass_1_${c}`),
    // Row 2: cols 0-10
    ...Array.from({ length: 11 }, (_, c) => `grass_2_${c}`),
    // Row 3: cols 0-10
    ...Array.from({ length: 11 }, (_, c) => `grass_3_${c}`),
    // Row 4: cols 4-8
    ...Array.from({ length: 5 }, (_, i) => `grass_4_${i + 4}`),
    // Row 5: cols 0-5
    ...Array.from({ length: 6 }, (_, c) => `grass_5_${c}`),
    // Row 6: cols 0-5
    ...Array.from({ length: 6 }, (_, c) => `grass_6_${c}`),
  ];
  for (const name of grassFiles) {
    scene.load.image(name, `/assets/sprout-lands/${name}.png`);
  }

  // Water animation tiles (4 frames)
  for (let c = 0; c < 4; c++) {
    scene.load.image(`water_0_${c}`, `/assets/sprout-lands/water_0_${c}.png`);
  }

  // Trees (2 variants, each 2x2)
  // Variant 1: trees_0_0, trees_0_1, trees_1_0, trees_1_1
  // Variant 2: trees_0_4, trees_0_5, trees_1_4, trees_1_5
  for (const name of [
    'trees_0_0', 'trees_0_1', 'trees_1_0', 'trees_1_1',
    'trees_0_4', 'trees_0_5', 'trees_1_4', 'trees_1_5',
  ]) {
    scene.load.image(name, `/assets/sprout-lands/${name}.png`);
  }

  // Bushes (4 variants)
  for (let c = 0; c < 4; c++) {
    scene.load.image(`bush_0_${c}`, `/assets/sprout-lands/bush_0_${c}.png`);
  }

  // Decorations (5 variants)
  for (let c = 0; c < 5; c++) {
    scene.load.image(`decorations_0_${c}`, `/assets/sprout-lands/decorations_0_${c}.png`);
  }

  // Water objects (lily pads/rocks)
  scene.load.image('water-objects_0_0', '/assets/sprout-lands/water-objects_0_0.png');
  scene.load.image('water-objects_0_2', '/assets/sprout-lands/water-objects_0_2.png');

  // Fences (3x3 block for corners/edges)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      scene.load.image(`fences_${r}_${c}`, `/assets/sprout-lands/fences_${r}_${c}.png`);
    }
  }
}

// Map crop type + growth stage to spritesheet frame index
// Farming plants sheet: 5 columns, 15 rows
// Each crop type uses a column, growth stages go down rows
// Frame = row * 5 + column
const CROP_COLUMN: Record<string, number> = {
  wheat: 0,
  tomato: 1,
  corn: 2,
  lettuce: 3,
};

const STAGE_ROW: Record<string, number> = {
  seed: 0,
  sprout: 1,
  growing: 2,
  mature: 3,
  harvestable: 4,
};

export function getCropFrame(cropType: string, growthStage: string): number {
  const col = CROP_COLUMN[cropType] ?? 0;
  const row = STAGE_ROW[growthStage] ?? 0;
  return row * 5 + col;
}
