import type {
  GameSnapshot, Tile, Crop, Sensor, SensorReading,
  CropType, SensorType, GrowthStage, WeatherCondition, Weather, FarmStats,
  UIStateRow, CropSummary, SoilOverview, Alert, LatestReading,
} from './types';
import {
  CROP_CONFIGS, WEATHER_EFFECTS, WEATHER_CYCLE,
  WEATHER_MIN_TICKS, WEATHER_MAX_TICKS, SOIL_MOISTURE_DECAY,
  SENSOR_DEFAULT_RADIUS, READINGS_MAX_AGE,
  HEALTH_DECAY_RATE, HEALTH_RECOVERY_RATE, GROWTH_STAGES,
} from './constants';
import type { WasmDB } from '@reifydb/wasm';

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

// --- Tick functions (targeted UPDATE/INSERT/DELETE for incremental view updates) ---

function tickWeather(db: WasmDB, currentTick: number): void {
  const weather = queryRows<Weather>(db, 'FROM farm::weather')[0];
  if (!weather) return;

  const elapsed = currentTick - weather.tick_changed;
  const duration = WEATHER_MIN_TICKS + Math.floor(Math.random() * (WEATHER_MAX_TICKS - WEATHER_MIN_TICKS));

  if (elapsed >= duration) {
    const currentIdx = WEATHER_CYCLE.indexOf(weather.condition);
    const nextIdx = (currentIdx + 1) % WEATHER_CYCLE.length;
    const newCondition = WEATHER_CYCLE[nextIdx];
    const newIntensity = (0.8 + Math.random() * 0.4).toFixed(2);
    db.admin(`UPDATE farm::weather { condition: "${newCondition}", intensity: ${newIntensity}, tick_changed: ${currentTick} } FILTER true`);
  }
}

function tickSoil(db: WasmDB): void {
  const weather = queryRows<Weather>(db, 'FROM farm::weather')[0];
  if (!weather) return;
  const effects = WEATHER_EFFECTS[weather.condition];

  // Batch UPDATE per soil type — 3 statements instead of rewriting 192 rows
  for (const [soilType, decayMul] of Object.entries(SOIL_MOISTURE_DECAY)) {
    const moistureDelta = effects.moistureDelta * decayMul;
    db.admin(`UPDATE farm::tiles { moisture: math::min(1.0, math::max(0.0, moisture + ${moistureDelta.toFixed(4)})), temperature: math::min(1.0, math::max(0.0, temperature + ${effects.tempDelta.toFixed(4)})), light: ${effects.light.toFixed(1)} } FILTER soil_type == "${soilType}"`);
  }
}

function tickSensors(db: WasmDB, currentTick: number): void {
  const sensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  if (sensors.length === 0) return;

  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');

  const newReadings: string[] = [];
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
    const avg = Math.round(sum / nearbyTiles.length * 1000) / 1000;
    newReadings.push(`{ sensor_id: ${sensor.id}, tick: ${currentTick}, value: ${avg.toFixed(3)} }`);
  }

  // INSERT only new readings (append)
  if (newReadings.length > 0) {
    db.admin(`INSERT farm::readings [\n  ${newReadings.join(',\n  ')}\n]`);
  }
  // DELETE only stale readings
  const cutoff = currentTick - READINGS_MAX_AGE;
  db.admin(`DELETE farm::readings FILTER tick <= ${cutoff}`);
}

function tickCrops(db: WasmDB): void {
  const crops = queryRows<Crop>(db, 'FROM farm::crops');
  if (crops.length === 0) return;

  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');

  for (const crop of crops) {
    if (crop.growth_stage === 'harvestable' || crop.health <= 0) continue;

    const tile = tiles.find(t => t.x === crop.x && t.y === crop.y);
    if (!tile) continue;

    const { inRange, outOfRange } = checkConditions(crop, tile);

    let newHealth = crop.health;
    if (outOfRange) {
      newHealth = Math.max(0, newHealth - HEALTH_DECAY_RATE);
    } else {
      newHealth = Math.min(1, newHealth + HEALTH_RECOVERY_RATE);
    }

    let newProgress = crop.growth_progress;
    let newStage = crop.growth_stage;

    if (newHealth > 0) {
      newProgress += inRange;
      const stageIdx = GROWTH_STAGES.indexOf(crop.growth_stage);
      const config = CROP_CONFIGS[crop.crop_type];
      if (newProgress >= config.stagesNeeded && stageIdx < GROWTH_STAGES.length - 1) {
        newStage = GROWTH_STAGES[stageIdx + 1] as GrowthStage;
        newProgress = 0;
      }
    }

    // Only UPDATE if values changed — triggers incremental view recomputation only for affected rows
    if (newHealth !== crop.health || newProgress !== crop.growth_progress || newStage !== crop.growth_stage) {
      db.admin(`UPDATE farm::crops { health: ${newHealth.toFixed(3)}, growth_progress: ${newProgress.toFixed(1)}, growth_stage: "${newStage}" } FILTER id == ${crop.id}`);
    }
  }
}

// --- Public API ---

export function simulationTick(db: WasmDB): void {
  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0];
  if (!stats) return;
  const currentTick = stats.current_tick + 1;
  db.admin(`UPDATE farm::stats { current_tick: ${currentTick} } FILTER true`);

  tickWeather(db, currentTick);
  tickSoil(db);
  tickSensors(db, currentTick);
  tickCrops(db);
}

export function placeCrop(db: WasmDB, cropType: CropType, x: number, y: number): boolean {
  const existing = queryRows<Crop>(db, `FROM farm::crops FILTER x == ${x} AND y == ${y}`);
  if (existing.length > 0) return false;
  const existingSensors = queryRows<Sensor>(db, `FROM farm::sensors FILTER x == ${x} AND y == ${y}`);
  if (existingSensors.length > 0) return false;

  const allCrops = queryRows<Crop>(db, 'FROM farm::crops');
  const nextId = allCrops.length > 0 ? Math.max(...allCrops.map(c => c.id)) + 1 : 1;

  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0];
  const tick = stats?.current_tick ?? 0;

  db.admin(`INSERT farm::crops [\n  { id: ${nextId}, crop_type: "${cropType}", x: ${x}, y: ${y}, growth_stage: "seed", growth_progress: 0.0, health: 1.000, planted_tick: ${tick} }\n]`);
  return true;
}

export function placeSensor(db: WasmDB, sensorType: SensorType, x: number, y: number): boolean {
  const existing = queryRows<Sensor>(db, `FROM farm::sensors FILTER x == ${x} AND y == ${y}`);
  if (existing.length > 0) return false;

  const allSensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  const nextId = allSensors.length > 0 ? Math.max(...allSensors.map(s => s.id)) + 1 : 1;

  db.admin(`INSERT farm::sensors [\n  { id: ${nextId}, sensor_type: "${sensorType}", x: ${x}, y: ${y}, radius: ${SENSOR_DEFAULT_RADIUS} }\n]`);
  return true;
}

export function removeAt(db: WasmDB, x: number, y: number): boolean {
  const crops = queryRows<Crop>(db, `FROM farm::crops FILTER x == ${x} AND y == ${y}`);
  if (crops.length > 0) {
    db.admin(`DELETE farm::crops FILTER x == ${x} AND y == ${y}`);
    return true;
  }

  const sensors = queryRows<Sensor>(db, `FROM farm::sensors FILTER x == ${x} AND y == ${y}`);
  if (sensors.length > 0) {
    db.admin(`DELETE farm::sensors FILTER x == ${x} AND y == ${y}`);
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
    db.admin(`UPDATE farm::stats { total_yield: ${(stats.total_yield + 1).toFixed(1)} } FILTER true`);
  }

  db.admin(`DELETE farm::crops FILTER x == ${x} AND y == ${y}`);
  return true;
}

export function queryUIState(db: WasmDB): UIStateRow {
  const rows = queryRows<UIStateRow>(db, 'FROM farm::ui_state');
  return rows[0] ?? { tool_mode: 'select', speed: 1, selected_x: -1, selected_y: -1, camera_x: 0, camera_y: 0 };
}

export function writeUIState(db: WasmDB, state: UIStateRow): void {
  db.admin(`UPDATE farm::ui_state { tool_mode: "${state.tool_mode}", speed: ${state.speed}, selected_x: ${state.selected_x}, selected_y: ${state.selected_y}, camera_x: ${Number(state.camera_x).toFixed(1)}, camera_y: ${Number(state.camera_y).toFixed(1)} } FILTER true`);
}

export function queryGameSnapshot(db: WasmDB): GameSnapshot {
  const tiles = queryRows<Tile>(db, 'FROM farm::tiles');
  const crops = queryRows<Crop>(db, 'FROM farm::crops');
  const sensors = queryRows<Sensor>(db, 'FROM farm::sensors');
  const readings = queryRows<SensorReading>(db, 'FROM farm::readings');
  const weather = queryRows<Weather>(db, 'FROM farm::weather')[0] ?? { condition: 'sunny' as WeatherCondition, intensity: 1.0, tick_changed: 0 };
  const stats = queryRows<FarmStats>(db, 'FROM farm::stats')[0] ?? { water_used: 0, energy_used: 0, total_yield: 0, current_tick: 0 };
  const cropSummary = queryRows<CropSummary>(db, 'FROM farm::crop_summary');
  const soilOverview = queryRows<SoilOverview>(db, 'FROM farm::soil_overview');
  const alerts = queryRows<Alert>(db, 'FROM farm::alerts');
  const latestReadings = queryRows<LatestReading>(db, 'FROM farm::latest_readings');

  return { tiles, crops, sensors, readings, weather, stats, cropSummary, soilOverview, alerts, latestReadings };
}
