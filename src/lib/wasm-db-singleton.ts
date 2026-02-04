import { createWasmDB, type WasmDB } from './wasm-db';
import { seedCommand } from './seed-data';

let dbInstance: WasmDB | null = null;
let dbPromise: Promise<WasmDB> | null = null;

export async function getWasmDB(): Promise<WasmDB> {
  if (dbInstance) return dbInstance;
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    const instance = await createWasmDB();
    try { instance.command(seedCommand); } catch {}
    dbInstance = instance;
    dbPromise = null;
    return instance;
  })();

  return dbPromise;
}

export function isWasmDBReady(): boolean {
  return dbInstance !== null;
}

// Sync getter for when we know it's ready
export function getWasmDBSync(): WasmDB | null {
  return dbInstance;
}
