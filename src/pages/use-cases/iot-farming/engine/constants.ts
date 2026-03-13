import type { CropType } from './types';

export const GRID_WIDTH = 16;
export const GRID_HEIGHT = 12;
export const TILE_SIZE = 16;
export const DISPLAY_SCALE = 3;
export const DISPLAY_TILE_SIZE = TILE_SIZE * DISPLAY_SCALE;
export const CANVAS_WIDTH = GRID_WIDTH * TILE_SIZE;
export const CANVAS_HEIGHT = GRID_HEIGHT * TILE_SIZE;

export const BASE_TICK_MS = 500;

export const SOIL_MOISTURE_DECAY: Record<string, number> = {
  normal: 1.0,
  sandy: 2.0,
  clay: 0.5,
};

export const CROP_CONFIGS: Record<CropType, {
  moisture: [number, number];
  temperature: [number, number];
  light: [number, number];
  stagesNeeded: number;
}> = {
  wheat:   { moisture: [0.3, 0.7], temperature: [0.3, 0.7], light: [0.4, 0.9], stagesNeeded: 10 },
  tomato:  { moisture: [0.4, 0.8], temperature: [0.5, 0.8], light: [0.6, 1.0], stagesNeeded: 10 },
  corn:    { moisture: [0.3, 0.6], temperature: [0.4, 0.8], light: [0.5, 1.0], stagesNeeded: 10 },
  lettuce: { moisture: [0.5, 0.9], temperature: [0.2, 0.5], light: [0.3, 0.7], stagesNeeded: 10 },
};

export const GROWTH_STAGES: readonly string[] = ['seed', 'sprout', 'growing', 'mature', 'harvestable'] as const;

export const WEATHER_EFFECTS: Record<string, { tempDelta: number; moistureDelta: number; light: number }> = {
  sunny:  { tempDelta: 0.01,  moistureDelta: -0.01,  light: 1.0 },
  cloudy: { tempDelta: 0.0,   moistureDelta: -0.005, light: 0.5 },
  rainy:  { tempDelta: -0.005, moistureDelta: 0.02,  light: 0.3 },
};

export const WEATHER_CYCLE: readonly string[] = ['sunny', 'cloudy', 'rainy', 'cloudy'] as const;
export const WEATHER_MIN_TICKS = 20;
export const WEATHER_MAX_TICKS = 40;

export const SPRINKLER_MOISTURE_BOOST = 0.05;
export const HEATER_TEMP_BOOST = 0.03;
export const LAMP_LIGHT_BOOST = 0.3;

export const SENSOR_DEFAULT_RADIUS = 3;
export const ACTUATOR_DEFAULT_RADIUS = 2;

export const READINGS_MAX_AGE = 50;

export const HEALTH_DECAY_RATE = 0.02;
export const HEALTH_RECOVERY_RATE = 0.01;

// World-level constants
export const WORLD_WIDTH = 48;   // tiles
export const WORLD_HEIGHT = 36;  // tiles
export const FARM_OFFSET_X = 16; // farm grid starts at world tile 16
export const FARM_OFFSET_Y = 12; // farm grid starts at world tile 12
