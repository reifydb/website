export type WorldTile = 'water' | 'grass' | 'dark_grass';
export type SoilType = 'normal' | 'sandy' | 'clay';
export type CropType = 'wheat' | 'tomato' | 'corn' | 'lettuce';
export type SensorType = 'moisture' | 'temperature' | 'light';
export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';
export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'mature' | 'harvestable';

export type ToolMode =
  | 'select'
  | 'plant_wheat' | 'plant_tomato' | 'plant_corn' | 'plant_lettuce'
  | 'place_moisture_sensor' | 'place_temperature_sensor' | 'place_light_sensor'
  | 'harvest' | 'remove';

export interface Tile {
  x: number;
  y: number;
  soil_type: SoilType;
  moisture: number;
  temperature: number;
  light: number;
}

export interface Crop {
  id: number;
  crop_type: CropType;
  x: number;
  y: number;
  growth_stage: GrowthStage;
  growth_progress: number;
  health: number;
  planted_tick: number;
}

export interface Sensor {
  id: number;
  sensor_type: SensorType;
  x: number;
  y: number;
  radius: number;
}

export interface SensorReading {
  sensor_id: number;
  tick: number;
  value: number;
}

export interface Weather {
  condition: WeatherCondition;
  intensity: number;
  tick_changed: number;
}

export interface FarmStats {
  water_used: number;
  energy_used: number;
  total_yield: number;
  current_tick: number;
}

export interface UIStateRow {
  tool_mode: string;
  speed: number;
  selected_x: number;
  selected_y: number;
  camera_x: number;
  camera_y: number;
}

export interface GameSnapshot {
  tiles: Tile[];
  crops: Crop[];
  sensors: Sensor[];
  readings: SensorReading[];
  weather: Weather;
  stats: FarmStats;
}

export interface UIState {
  selectedTile: { x: number; y: number } | null;
  toolMode: ToolMode;
  speed: number;
}

export type GameState = GameSnapshot & UIState;
