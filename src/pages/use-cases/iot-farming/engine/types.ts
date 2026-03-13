export type WorldTile = 'water' | 'grass' | 'dark_grass';
export type SoilType = 'normal' | 'sandy' | 'clay';
export type CropType = 'wheat' | 'tomato' | 'corn' | 'lettuce';
export type SensorType = 'moisture' | 'temperature' | 'light';
export type ActuatorType = 'sprinkler' | 'heater' | 'lamp';
export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';
export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'mature' | 'harvestable';
export type Operator = '<' | '>' | '<=' | '>=' | '==' | '!=';

export type ToolMode =
  | 'select'
  | 'plant_wheat' | 'plant_tomato' | 'plant_corn' | 'plant_lettuce'
  | 'place_moisture_sensor' | 'place_temperature_sensor' | 'place_light_sensor'
  | 'place_sprinkler' | 'place_heater' | 'place_lamp'
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

export interface Actuator {
  id: number;
  actuator_type: ActuatorType;
  x: number;
  y: number;
  active: boolean;
  power_usage: number;
  radius: number;
}

export interface Rule {
  id: number;
  sensor_type: SensorType;
  operator: Operator;
  threshold: number;
  actuator_type: ActuatorType;
  enabled: boolean;
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

export interface GameState {
  tiles: Tile[];
  crops: Crop[];
  sensors: Sensor[];
  readings: SensorReading[];
  actuators: Actuator[];
  rules: Rule[];
  weather: Weather;
  stats: FarmStats;
  selectedTile: { x: number; y: number } | null;
  toolMode: ToolMode;
  speed: number;
}
