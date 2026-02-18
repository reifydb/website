import { createWasmDB, type WasmDB } from './wasm-db';
import { seedCommand } from './seed-data';

let dbInstance: WasmDB | null = null;
let dbPromise: Promise<WasmDB> | null = null;

export async function getWasmDB(): Promise<WasmDB> {
  if (dbInstance) return dbInstance;
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    const instance = await createWasmDB();
    instance.admin(seedCommand);
    dbInstance = instance;
    dbPromise = null;
    return instance;
  })();

  return dbPromise;
}

// Sync getter for when we know it's ready
export function getWasmDBSync(): WasmDB | null {
  return dbInstance;
}
