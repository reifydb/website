import { createWasmDB, type WasmDB } from '@reifydb/wasm';
import { WasmExecutor } from '@reifydb/console';
import type { Executor, ExecutionResult } from '@reifydb/console';
import { GRID_WIDTH, GRID_HEIGHT } from './constants';

function generateSeedCommand(): string {
  let cmd = 'create namespace farm;\n\n';

  cmd += 'create table farm::tiles { x: int4, y: int4, soil_type: utf8, moisture: float4, temperature: float4, light: float4 };\n';
  cmd += 'create table farm::crops { id: int4, crop_type: utf8, x: int4, y: int4, growth_stage: utf8, growth_progress: float4, health: float4, planted_tick: int4 };\n';
  cmd += 'create table farm::sensors { id: int4, sensor_type: utf8, x: int4, y: int4, radius: int4 };\n';
  cmd += 'create table farm::readings { sensor_id: int4, tick: int4, value: float4 };\n';
  cmd += 'create table farm::weather { condition: utf8, intensity: float4, tick_changed: int4 };\n';
  cmd += 'create table farm::stats { water_used: float4, energy_used: float4, total_yield: float4, current_tick: int4 };\n';
  cmd += 'create table farm::ui_state { tool_mode: utf8, speed: int4, selected_x: int4, selected_y: int4, camera_x: float4, camera_y: float4 };\n\n';

  const tiles: string[] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      let soil = 'normal';
      if ((x < 4 && y < 3) || (x > 12 && y > 9)) soil = 'sandy';
      if (x >= 10 && x <= 13 && y >= 4 && y <= 7) soil = 'clay';
      tiles.push(`  { x: ${x}, y: ${y}, soil_type: "${soil}", moisture: 0.5, temperature: 0.5, light: 1.0 }`);
    }
  }
  cmd += `INSERT farm::tiles [\n${tiles.join(',\n')}\n];\n\n`;

  cmd += 'INSERT farm::weather [\n  { condition: "sunny", intensity: 1.0, tick_changed: 0 }\n];\n\n';
  cmd += 'INSERT farm::stats [\n  { water_used: 0.0, energy_used: 0.0, total_yield: 0.0, current_tick: 0 }\n];\n\n';
  cmd += 'INSERT farm::ui_state [\n  { tool_mode: "select", speed: 1, selected_x: -1, selected_y: -1, camera_x: 0.0, camera_y: 0.0 }\n];\n\n';

  // Materialized views — ReifyDB recomputes only affected rows on UPDATE
  cmd += 'CREATE DEFERRED VIEW farm::crop_summary { crop_type: utf8, total: int4, avg_health: float4 } AS {\n';
  cmd += '  FROM farm::crops\n';
  cmd += '  | aggregate { total: math::count(), avg_health: math::avg(health) } by { crop_type }\n';
  cmd += '};\n\n';

  cmd += 'CREATE DEFERRED VIEW farm::soil_overview { soil_type: utf8, avg_moisture: float4, avg_temp: float4, avg_light: float4 } AS {\n';
  cmd += '  FROM farm::tiles\n';
  cmd += '  | aggregate { avg_moisture: math::avg(moisture), avg_temp: math::avg(temperature), avg_light: math::avg(light) } by { soil_type }\n';
  cmd += '};\n\n';

  cmd += 'CREATE DEFERRED VIEW farm::alerts { id: int4, crop_type: utf8, x: int4, y: int4, health: float4, growth_stage: utf8 } AS {\n';
  cmd += '  FROM farm::crops\n';
  cmd += '  | FILTER health < 0.3\n';
  cmd += '};\n\n';

  cmd += 'CREATE DEFERRED VIEW farm::latest_readings { sensor_id: int4, value: float4, tick: int4 } AS {\n';
  cmd += '  FROM farm::readings\n';
  cmd += '  | aggregate { value: math::avg(value), tick: math::max(tick) } by { sensor_id }\n';
  cmd += '}';

  return cmd;
}

let dbInstance: WasmDB | null = null;
let dbPromise: Promise<WasmDB> | null = null;

export async function getFarmDB(): Promise<WasmDB> {
  if (dbInstance) return dbInstance;
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    const instance = await createWasmDB();
    instance.admin(generateSeedCommand());
    dbInstance = instance;
    dbPromise = null;
    return instance;
  })();

  return dbPromise;
}

export function getFarmDBSync(): WasmDB | null {
  return dbInstance;
}

export function destroyFarmDB(): void {
  dbInstance = null;
  dbPromise = null;
}

class FarmExecutor implements Executor {
  private inner: WasmExecutor | null = null;
  private initializing: Promise<WasmExecutor> | null = null;

  private async getExecutor(): Promise<WasmExecutor> {
    if (this.inner) return this.inner;
    const sync = getFarmDBSync();
    if (sync) {
      this.inner = new WasmExecutor(sync);
      return this.inner;
    }
    if (!this.initializing) {
      this.initializing = getFarmDB().then(db => {
        this.inner = new WasmExecutor(db);
        this.initializing = null;
        return this.inner;
      });
    }
    return this.initializing!;
  }

  async execute(statement: string): Promise<ExecutionResult> {
    const exec = await this.getExecutor();
    return exec.execute(statement);
  }
}

export function createFarmExecutor(): Executor {
  return new FarmExecutor();
}
