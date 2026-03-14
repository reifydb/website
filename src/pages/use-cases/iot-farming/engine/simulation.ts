import type {
  GameSnapshot, Tile, Crop, Sensor, SensorReading,
  CropType, SensorType, GrowthStage, WeatherCondition, Weather, FarmStats,
  UIStateRow,
} from './types';
import {
  CROP_CONFIGS, WEATHER_EFFECTS, WEATHER_CYCLE,
  WEATHER_MIN_TICKS, WEATHER_MAX_TICKS, SOIL_MOISTURE_DECAY,
  SENSOR_DEFAULT_RADIUS, READINGS_MAX_AGE,
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

// --- DB helpers ---

// WasmDB returns Value wrapper objects (Float4Value, Int4Value, etc.);
// unwrap to plain JS primitives using explicit type coercion.
function unwrap(v: unknown): unknown {
  if (v == null || typeof v !== 'object') return v;
  const obj = v as any;
  const t = obj.type;
  if (typeof t !== 'string') return v;
  // Numeric types → Number() coercion (calls valueOf internally)
  if (t === 'Float4' || t === 'Float8' || t === 'Int4' || t === 'Int2' || t === 'Int1' ||
      t === 'Uint4' || t === 'Uint2' || t === 'Uint1' || t === 'Decimal') {
    return obj.value !== undefined ? Number(obj.value) : 0;
  }
  // BigInt numeric types (cast to JS number for game use)
  if (t === 'Int8' || t === 'Int16' || t === 'Uint8' || t === 'Uint16') {
    return obj.value !== undefined ? Number(obj.value) : 0;
  }
  // String type
  if (t === 'Utf8') return obj.value !== undefined ? String(obj.value) : '';
  // Boolean type
  if (t === 'Boolean') return obj.value !== undefined ? Boolean(obj.value) : false;
  // None type
  if (t === 'None') return undefined;
  // Fallback for unknown types
  const raw = typeof obj.valueOf === 'function' ? obj.valueOf() : v;
  return raw !== v ? raw : (obj.value !== undefined ? obj.value : v);
}

function toPlain<T>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = unwrap(v);
  }
  return out as T;
}

function queryRows<T>(db: WasmDB, rql: string): T[] {
  const raw = db.admin(rql);
  if (!Array.isArray(raw)) return [];
  return raw.map(r => toPlain<T>(r as Record<string, unknown>));
}

function writeTiles(db: WasmDB, tiles: Tile[]): void {
  const rows = tiles.map(t =>
    `{ x: ${t.x}, y: ${t.y}, soil_type: "${t.soil_type}", moisture: ${t.moisture.toFixed(3)}, temperature: ${t.temperature.toFixed(3)}, light: ${t.light.toFixed(3)} }`
  ).join(',\n  ');
  db.admin(`DELETE farm::tiles FILTER true;\nINSERT farm::tiles [\n  ${rows}\n]`);
}

function writeStats(db: WasmDB, stats: FarmStats): void {
  db.admin(`DELETE farm::stats FILTER true;\nINSERT farm::stats [\n  { water_used: ${stats.water_used.toFixed(1)}, energy_used: ${stats.energy_used.toFixed(1)}, total_yield: ${stats.total_yield.toFixed(0)}, current_tick: ${stats.current_tick} }\n]`);
}

function writeCrops(db: WasmDB, crops: Crop[]): void {
  if (crops.length > 0) {
    const rows = crops.map(c =>
      `{ id: ${c.id}, crop_type: "${c.crop_type}", x: ${c.x}, y: ${c.y}, growth_stage: "${c.growth_stage}", growth_progress: ${c.growth_progress.toFixed(1)}, health: ${c.health.toFixed(3)}, planted_tick: ${c.planted_tick} }`
    ).join(',\n  ');
    db.admin(`DELETE farm::crops FILTER true;\nINSERT farm::crops [\n  ${rows}\n]`);
  } else {
    db.admin('DELETE farm::crops FILTER true');
  }
}

function writeSensors(db: WasmDB, sensors: Sensor[]): void {
  if (sensors.length > 0) {
    const rows = sensors.map(s =>
      `{ id: ${s.id}, sensor_type: "${s.sensor_type}", x: ${s.x}, y: ${s.y}, radius: ${s.radius} }`
    ).join(',\n  ');
    db.admin(`DELETE farm::sensors FILTER true;\nINSERT farm::sensors [\n  ${rows}\n]`);
  } else {
    db.admin('DELETE farm::sensors FILTER true');
  }
}

function writeReadings(db: WasmDB, readings: SensorReading[]): void {
  if (readings.length > 0) {
    const rows = readings.map(r =>
      `{ sensor_id: ${r.sensor_id}, tick: ${r.tick}, value: ${r.value.toFixed(3)} }`
    ).join(',\n  ');
    db.admin(`DELETE farm::readings FILTER true;\nINSERT farm::readings [\n  ${rows}\n]`);
  } else {
    db.admin('DELETE farm::readings FILTER true');
  }
}

function writeWeather(db: WasmDB, weather: Weather): void {
  db.admin(`DELETE farm::weather FILTER true;\nINSERT farm::weather [\n  { condition: "${weather.condition}", intensity: ${weather.intensity.toFixed(2)}, tick_changed: ${weather.tick_changed} }\n]`);
}

// --- Tick functions (all DB-driven) ---

function tickWeather(db: WasmDB, currentTick: number): void {
  const weather = queryRows<Weather>(db, 'FROM farm::weather')[0];
  if (!weather) return;

  const elapsed = currentTick - weather.tick_changed;
  const duration = WEATHER_MIN_TICKS + Math.floor(Math.random() * (WEATHER_MAX_TICKS - WEATHER_MIN_TICKS));

  if (elapsed >= duration) {
    const currentIdx = WEATHER_CYCLE.indexOf(weather.condition);
    const nextIdx = (currentIdx + 1) % WEATHER_CYCLE.length;
    weather.condition = WEATHER_CYCLE[nextIdx] as WeatherCondition;
    weather.intensity = 0.8 + Math.random() * 0.4;
    weather.tick_changed = currentTick;
    writeWeather(db, weather);
  }
}

function tickSoil(db: WasmDB): void {
  const weather = queryRows<Weather>(db, 'FROM farm::weather')[0];
  if (!weather) return;
  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');

  const effects = WEATHER_EFFECTS[weather.condition];
  for (const tile of tiles) {
    const decayMul = SOIL_MOISTURE_DECAY[tile.soil_type] || 1.0;
    tile.moisture = clamp01(tile.moisture + effects.moistureDelta * decayMul);
    tile.temperature = clamp01(tile.temperature + effects.tempDelta);
    tile.light = effects.light;
  }

  writeTiles(db, tiles);
}

function tickSensors(db: WasmDB, currentTick: number): void {
  const sensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  if (sensors.length === 0) return;

  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');
  const readings = queryRows<SensorReading>(db, 'FROM farm::readings');

  for (const sensor of sensors) {
    const nearbyTiles = tiles.filter(t => dist(sensor.x, sensor.y, t.x, t.y) <= sensor.radius);
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
    readings.push({ sensor_id: sensor.id, tick: currentTick, value: Math.round(avg * 1000) / 1000 });
  }

  const cutoff = currentTick - READINGS_MAX_AGE;
  const filtered = readings.filter(r => r.tick > cutoff);
  writeReadings(db, filtered);
}

function tickCrops(db: WasmDB): void {
  const crops = queryRows<Crop>(db, 'FROM farm::crops');
  if (crops.length === 0) return;

  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');
  let changed = false;

  for (const crop of crops) {
    if (crop.growth_stage === 'harvestable' || crop.health <= 0) continue;

    const tile = tiles.find(t => t.x === crop.x && t.y === crop.y);
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

    changed = true;
  }

  if (changed) {
    writeCrops(db, crops);
  }
}

// --- Public API ---

export function simulationTick(db: WasmDB): void {
  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0];
  if (!stats) return;
  stats.current_tick += 1;
  writeStats(db, stats);

  const currentTick = stats.current_tick;
  tickWeather(db, currentTick);
  tickSoil(db);
  tickSensors(db, currentTick);
  tickCrops(db);
}

export function placeCrop(db: WasmDB, cropType: CropType, x: number, y: number): boolean {
  const allCrops = queryRows<Crop>(db, 'FROM farm::crops');
  if (allCrops.some(c => c.x === x && c.y === y)) return false;
  const allSensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  if (allSensors.some(s => s.x === x && s.y === y)) return false;

  const nextId = allCrops.length > 0 ? Math.max(...allCrops.map(c => c.id)) + 1 : 1;

  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0];
  const tick = stats?.current_tick ?? 0;

  allCrops.push({ id: nextId, crop_type: cropType, x, y, growth_stage: 'seed' as GrowthStage, growth_progress: 0, health: 1, planted_tick: tick });
  writeCrops(db, allCrops);
  return true;
}

export function placeSensor(db: WasmDB, sensorType: SensorType, x: number, y: number): boolean {
  const allSensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  if (allSensors.some(s => s.x === x && s.y === y)) return false;

  const nextId = allSensors.length > 0 ? Math.max(...allSensors.map(s => s.id)) + 1 : 1;

  allSensors.push({ id: nextId, sensor_type: sensorType, x, y, radius: SENSOR_DEFAULT_RADIUS });
  writeSensors(db, allSensors);
  return true;
}

export function removeAt(db: WasmDB, x: number, y: number): boolean {
  const crops = queryRows<Crop>(db, `FROM farm::crops FILTER x == ${x} AND y == ${y}`);
  if (crops.length > 0) {
    // Re-read all crops, remove the one at position, rewrite
    const allCrops = queryRows<Crop>(db, 'FROM farm::crops');
    const filtered = allCrops.filter(c => !(c.x === x && c.y === y));
    writeCrops(db, filtered);
    return true;
  }

  const sensors = queryRows<Sensor>(db, `FROM farm::sensors FILTER x == ${x} AND y == ${y}`);
  if (sensors.length > 0) {
    const allSensors = queryRows<Sensor>(db, 'FROM farm::sensors');
    const filtered = allSensors.filter(s => !(s.x === x && s.y === y));
    writeSensors(db, filtered);
    return true;
  }

  return false;
}

export function harvestCrop(db: WasmDB, x: number, y: number): boolean {
  const crops = queryRows<Crop>(db, `FROM farm::crops FILTER x == ${x} AND y == ${y}`);
  const crop = crops[0];
  if (!crop || crop.growth_stage !== 'harvestable') return false;

  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0];
  if (stats) {
    stats.total_yield += 1;
    writeStats(db, stats);
  }

  const allCrops = queryRows<Crop>(db, 'FROM farm::crops');
  const filtered = allCrops.filter(c => !(c.x === x && c.y === y));
  writeCrops(db, filtered);
  return true;
}

export function queryUIState(db: WasmDB): UIStateRow {
  const rows = queryRows<UIStateRow>(db, 'FROM farm::ui_state');
  return rows[0] ?? { tool_mode: 'select', speed: 1, selected_x: -1, selected_y: -1, camera_x: 0, camera_y: 0 };
}

export function writeUIState(db: WasmDB, state: UIStateRow): void {
  db.admin(`DELETE farm::ui_state FILTER true;\nINSERT farm::ui_state [\n  { tool_mode: "${state.tool_mode}", speed: ${state.speed}, selected_x: ${state.selected_x}, selected_y: ${state.selected_y}, camera_x: ${Number(state.camera_x).toFixed(1)}, camera_y: ${Number(state.camera_y).toFixed(1)} }\n]`);
}

export function queryGameSnapshot(db: WasmDB): GameSnapshot {
  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');
  const crops = queryRows<Crop>(db, 'FROM farm::crops');
  const sensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  const readings = queryRows<SensorReading>(db, 'FROM farm::readings');
  const weather = queryRows<Weather>(db, 'FROM farm::weather')[0] ?? { condition: 'sunny' as WeatherCondition, intensity: 1.0, tick_changed: 0 };
  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0] ?? { water_used: 0, energy_used: 0, total_yield: 0, current_tick: 0 };

  return { tiles, crops, sensors, readings, weather, stats };
}
