import { decode, type TypeValuePair } from '@reifydb/core';
import type { WasmDB as RawWasmDB } from './wasm/reifydb_webassembly';

function transformToValueInstances(result: unknown): unknown {
  if (result === null || result === undefined) return result;
  if (typeof result !== 'object') return result;
  if (Array.isArray(result)) {
    return result.map(transformToValueInstances);
  }
  // Check if it's a TypeValuePair
  const obj = result as Record<string, unknown>;
  if ('type' in obj && 'value' in obj && Object.keys(obj).length === 2) {
    return decode(obj as unknown as TypeValuePair);
  }
  // Transform object properties
  const transformed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    transformed[key] = transformToValueInstances(value);
  }
  return transformed;
}

export async function createWasmDB(): Promise<WasmDB> {
  const { WasmDB: RawDB } = await import('./wasm/reifydb_webassembly');
  return new WasmDB(new RawDB());
}

export class WasmDB {
  private db: RawWasmDB;

  constructor(db: RawWasmDB) {
    this.db = db;
  }

  command(rql: string): unknown {
    return transformToValueInstances(this.db.command(rql));
  }

  query(rql: string): unknown {
    return transformToValueInstances(this.db.query(rql));
  }
}
