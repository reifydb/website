import type { Scene } from 'phaser';

export function preloadAssets(scene: Scene): void {
  // Individual grass tiles
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
