import type {
  GameState, Tile, Crop, Sensor, Actuator, Rule, CropType, SensorType, ActuatorType,
  GrowthStage, WeatherCondition,
} from './types';
import {
  GRID_WIDTH, GRID_HEIGHT, CROP_CONFIGS, WEATHER_EFFECTS, WEATHER_CYCLE,
  WEATHER_MIN_TICKS, WEATHER_MAX_TICKS, SOIL_MOISTURE_DECAY,
  SPRINKLER_MOISTURE_BOOST, HEATER_TEMP_BOOST, LAMP_LIGHT_BOOST,
  ACTUATOR_DEFAULT_RADIUS, SENSOR_DEFAULT_RADIUS, READINGS_MAX_AGE,
  HEALTH_DECAY_RATE, HEALTH_RECOVERY_RATE, GROWTH_STAGES,
} from './constants';
import type { WasmDB } from '@reifydb/wasm';

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function checkConditions(crop: Crop, tile: Tile): { inRange: number; outOfRange: boolean } {
  const config = CROP_CONFIGS[crop.crop_type];
  let inCount = 0;
  let outCount = 0;

  const checks = [
    { val: tile.moisture, range: config.moisture },
    { val: tile.temperature, range: config.temperature },
    { val: tile.light, range: config.light },
  ];

  for (const { val, range } of checks) {
    if (val >= range[0] && val <= range[1]) inCount++;
    else outCount++;
  }

  if (outCount === 0) return { inRange: 1.0, outOfRange: false };
  if (inCount > 0) return { inRange: 0.5, outOfRange: false };
  return { inRange: 0, outOfRange: true };
}

export function createInitialState(): GameState {
  const tiles: Tile[] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      let soil_type: 'normal' | 'sandy' | 'clay' = 'normal';
      if ((x < 4 && y < 3) || (x > 12 && y > 9)) soil_type = 'sandy';
      if (x >= 10 && x <= 13 && y >= 4 && y <= 7) soil_type = 'clay';
      tiles.push({ x, y, soil_type, moisture: 0.5, temperature: 0.5, light: 1.0 });
    }
  }

  return {
    tiles,
    crops: [],
    sensors: [],
    readings: [],
    actuators: [],
    rules: [],
    weather: { condition: 'sunny', intensity: 1.0, tick_changed: 0 },
    stats: { water_used: 0, energy_used: 0, total_yield: 0, current_tick: 0 },
    selectedTile: null,
    toolMode: 'select',
    speed: 1,
  };
}

export function getTile(state: GameState, x: number, y: number): Tile | undefined {
  return state.tiles.find(t => t.x === x && t.y === y);
}

export function getCropAt(state: GameState, x: number, y: number): Crop | undefined {
  return state.crops.find(c => c.x === x && c.y === y);
}

export function getSensorAt(state: GameState, x: number, y: number): Sensor | undefined {
  return state.sensors.find(s => s.x === x && s.y === y);
}

export function getActuatorAt(state: GameState, x: number, y: number): Actuator | undefined {
  return state.actuators.find(a => a.x === x && a.y === y);
}

let nextCropId = 1;
let nextSensorId = 1;
let nextActuatorId = 1;
let nextRuleId = 1;

export function placeCrop(state: GameState, cropType: CropType, x: number, y: number): boolean {
  if (getCropAt(state, x, y) || getSensorAt(state, x, y) || getActuatorAt(state, x, y)) return false;
  state.crops.push({
    id: nextCropId++,
    crop_type: cropType,
    x, y,
    growth_stage: 'seed',
    growth_progress: 0,
    health: 1.0,
    planted_tick: state.stats.current_tick,
  });
  return true;
}

export function placeSensor(state: GameState, sensorType: SensorType, x: number, y: number): boolean {
  if (getSensorAt(state, x, y) || getActuatorAt(state, x, y)) return false;
  state.sensors.push({
    id: nextSensorId++,
    sensor_type: sensorType,
    x, y,
    radius: SENSOR_DEFAULT_RADIUS,
  });
  return true;
}

export function placeActuator(state: GameState, actuatorType: ActuatorType, x: number, y: number): boolean {
  if (getSensorAt(state, x, y) || getActuatorAt(state, x, y)) return false;
  state.actuators.push({
    id: nextActuatorId++,
    actuator_type: actuatorType,
    x, y,
    active: false,
    power_usage: actuatorType === 'sprinkler' ? 1.0 : actuatorType === 'heater' ? 2.0 : 1.5,
    radius: ACTUATOR_DEFAULT_RADIUS,
  });
  return true;
}

export function addRule(state: GameState, rule: Omit<Rule, 'id'>): Rule {
  const newRule = { ...rule, id: nextRuleId++ };
  state.rules.push(newRule);
  return newRule;
}

export function removeAt(state: GameState, x: number, y: number): boolean {
  const ci = state.crops.findIndex(c => c.x === x && c.y === y);
  if (ci >= 0) { state.crops.splice(ci, 1); return true; }
  const si = state.sensors.findIndex(s => s.x === x && s.y === y);
  if (si >= 0) { state.sensors.splice(si, 1); return true; }
  const ai = state.actuators.findIndex(a => a.x === x && a.y === y);
  if (ai >= 0) { state.actuators.splice(ai, 1); return true; }
  return false;
}

export function harvestCrop(state: GameState, x: number, y: number): boolean {
  const crop = getCropAt(state, x, y);
  if (!crop || crop.growth_stage !== 'harvestable') return false;
  state.stats.total_yield += 1;
  const idx = state.crops.indexOf(crop);
  state.crops.splice(idx, 1);
  return true;
}

function tickWeather(state: GameState): void {
  const tick = state.stats.current_tick;
  const elapsed = tick - state.weather.tick_changed;
  const duration = WEATHER_MIN_TICKS + Math.floor(Math.random() * (WEATHER_MAX_TICKS - WEATHER_MIN_TICKS));

  if (elapsed >= duration) {
    const currentIdx = WEATHER_CYCLE.indexOf(state.weather.condition);
    const nextIdx = (currentIdx + 1) % WEATHER_CYCLE.length;
    state.weather.condition = WEATHER_CYCLE[nextIdx] as WeatherCondition;
    state.weather.intensity = 0.8 + Math.random() * 0.4;
    state.weather.tick_changed = tick;
  }
}

function tickSoil(state: GameState): void {
  const effects = WEATHER_EFFECTS[state.weather.condition];
  for (const tile of state.tiles) {
    const decayMul = SOIL_MOISTURE_DECAY[tile.soil_type] || 1.0;
    tile.moisture = clamp01(tile.moisture + effects.moistureDelta * decayMul);
    tile.temperature = clamp01(tile.temperature + effects.tempDelta);
    tile.light = effects.light;
  }
}

function tickActuators(state: GameState): void {
  for (const act of state.actuators) {
    if (!act.active) continue;
    for (const tile of state.tiles) {
      if (dist(act.x, act.y, tile.x, tile.y) <= act.radius) {
        switch (act.actuator_type) {
          case 'sprinkler':
            tile.moisture = clamp01(tile.moisture + SPRINKLER_MOISTURE_BOOST);
            state.stats.water_used += 0.1;
            break;
          case 'heater':
            tile.temperature = clamp01(tile.temperature + HEATER_TEMP_BOOST);
            state.stats.energy_used += 0.2;
            break;
          case 'lamp':
            tile.light = clamp01(tile.light + LAMP_LIGHT_BOOST);
            state.stats.energy_used += 0.15;
            break;
        }
      }
    }
  }
}

function tickSensors(state: GameState): void {
  const tick = state.stats.current_tick;
  for (const sensor of state.sensors) {
    const nearbyTiles = state.tiles.filter(t => dist(sensor.x, sensor.y, t.x, t.y) <= sensor.radius);
    if (nearbyTiles.length === 0) continue;

    let sum = 0;
    for (const tile of nearbyTiles) {
      switch (sensor.sensor_type) {
        case 'moisture': sum += tile.moisture; break;
        case 'temperature': sum += tile.temperature; break;
        case 'light': sum += tile.light; break;
      }
    }
    const avg = sum / nearbyTiles.length;
    state.readings.push({ sensor_id: sensor.id, tick, value: Math.round(avg * 1000) / 1000 });
  }

  const cutoff = tick - READINGS_MAX_AGE;
  state.readings = state.readings.filter(r => r.tick > cutoff);
}

function tickRules(state: GameState): void {
  for (const act of state.actuators) {
    act.active = false;
  }

  for (const rule of state.rules) {
    if (!rule.enabled) continue;

    const matchingSensors = state.sensors.filter(s => s.sensor_type === rule.sensor_type);
    if (matchingSensors.length === 0) continue;

    const sensorIds = new Set(matchingSensors.map(s => s.id));
    const sensorReadings = state.readings.filter(r => sensorIds.has(r.sensor_id));
    if (sensorReadings.length === 0) continue;

    const latestTick = Math.max(...sensorReadings.map(r => r.tick));
    const latestReadings = sensorReadings.filter(r => r.tick === latestTick);
    const avgValue = latestReadings.reduce((sum, r) => sum + r.value, 0) / latestReadings.length;

    let triggered = false;
    switch (rule.operator) {
      case '<': triggered = avgValue < rule.threshold; break;
      case '>': triggered = avgValue > rule.threshold; break;
      case '<=': triggered = avgValue <= rule.threshold; break;
      case '>=': triggered = avgValue >= rule.threshold; break;
      case '==': triggered = Math.abs(avgValue - rule.threshold) < 0.01; break;
      case '!=': triggered = Math.abs(avgValue - rule.threshold) >= 0.01; break;
    }

    if (triggered) {
      for (const act of state.actuators) {
        if (act.actuator_type === rule.actuator_type) {
          act.active = true;
        }
      }
    }
  }
}

function tickCrops(state: GameState): void {
  for (const crop of state.crops) {
    if (crop.growth_stage === 'harvestable' || crop.health <= 0) continue;

    const tile = getTile(state, crop.x, crop.y);
    if (!tile) continue;

    const { inRange, outOfRange } = checkConditions(crop, tile);

    if (outOfRange) {
      crop.health = Math.max(0, crop.health - HEALTH_DECAY_RATE);
    } else {
      crop.health = Math.min(1, crop.health + HEALTH_RECOVERY_RATE);
    }

    if (crop.health > 0) {
      crop.growth_progress += inRange;
      const stageIdx = GROWTH_STAGES.indexOf(crop.growth_stage);
      const config = CROP_CONFIGS[crop.crop_type];
      if (crop.growth_progress >= config.stagesNeeded && stageIdx < GROWTH_STAGES.length - 1) {
        crop.growth_stage = GROWTH_STAGES[stageIdx + 1] as GrowthStage;
        crop.growth_progress = 0;
      }
    }
  }
}

export function simulationTick(state: GameState): void {
  state.stats.current_tick += 1;
  tickWeather(state);
  tickSoil(state);
  tickActuators(state);
  tickSensors(state);
  tickRules(state);
  tickCrops(state);
}

export function syncToDb(state: GameState, db: WasmDB): void {
  try {
    const tileRows = state.tiles.map(t =>
      `{ x: ${t.x}, y: ${t.y}, soil_type: "${t.soil_type}", moisture: ${t.moisture.toFixed(3)}, temperature: ${t.temperature.toFixed(3)}, light: ${t.light.toFixed(3)} }`
    ).join(',\n  ');
    db.admin(`DELETE farm::tiles;\nINSERT farm::tiles [\n  ${tileRows}\n]`);

    if (state.crops.length > 0) {
      const cropRows = state.crops.map(c =>
        `{ id: ${c.id}, crop_type: "${c.crop_type}", x: ${c.x}, y: ${c.y}, growth_stage: "${c.growth_stage}", growth_progress: ${c.growth_progress.toFixed(1)}, health: ${c.health.toFixed(3)}, planted_tick: ${c.planted_tick} }`
      ).join(',\n  ');
      db.admin(`DELETE farm::crops;\nINSERT farm::crops [\n  ${cropRows}\n]`);
    } else {
      db.admin('DELETE farm::crops');
    }

    if (state.sensors.length > 0) {
      const sensorRows = state.sensors.map(s =>
        `{ id: ${s.id}, sensor_type: "${s.sensor_type}", x: ${s.x}, y: ${s.y}, radius: ${s.radius} }`
      ).join(',\n  ');
      db.admin(`DELETE farm::sensors;\nINSERT farm::sensors [\n  ${sensorRows}\n]`);
    } else {
      db.admin('DELETE farm::sensors');
    }

    if (state.readings.length > 0) {
      const readingRows = state.readings.map(r =>
        `{ sensor_id: ${r.sensor_id}, tick: ${r.tick}, value: ${r.value.toFixed(3)} }`
      ).join(',\n  ');
      db.admin(`DELETE farm::readings;\nINSERT farm::readings [\n  ${readingRows}\n]`);
    } else {
      db.admin('DELETE farm::readings');
    }

    if (state.actuators.length > 0) {
      const actRows = state.actuators.map(a =>
        `{ id: ${a.id}, actuator_type: "${a.actuator_type}", x: ${a.x}, y: ${a.y}, active: ${a.active}, power_usage: ${a.power_usage.toFixed(1)}, radius: ${a.radius} }`
      ).join(',\n  ');
      db.admin(`DELETE farm::actuators;\nINSERT farm::actuators [\n  ${actRows}\n]`);
    } else {
      db.admin('DELETE farm::actuators');
    }

    if (state.rules.length > 0) {
      const ruleRows = state.rules.map(r =>
        `{ id: ${r.id}, sensor_type: "${r.sensor_type}", operator: "${r.operator}", threshold: ${r.threshold.toFixed(2)}, actuator_type: "${r.actuator_type}", enabled: ${r.enabled} }`
      ).join(',\n  ');
      db.admin(`DELETE farm::rules;\nINSERT farm::rules [\n  ${ruleRows}\n]`);
    } else {
      db.admin('DELETE farm::rules');
    }

    db.admin(`DELETE farm::weather;\nINSERT farm::weather [\n  { condition: "${state.weather.condition}", intensity: ${state.weather.intensity.toFixed(2)}, tick_changed: ${state.weather.tick_changed} }\n]`);

    db.admin(`DELETE farm::stats;\nINSERT farm::stats [\n  { water_used: ${state.stats.water_used.toFixed(1)}, energy_used: ${state.stats.energy_used.toFixed(1)}, total_yield: ${state.stats.total_yield.toFixed(0)}, current_tick: ${state.stats.current_tick} }\n]`);
  } catch (e) {
    console.warn('Failed to sync game state to DB:', e);
  }
}
