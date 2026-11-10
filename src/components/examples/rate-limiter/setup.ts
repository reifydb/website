import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { SETUP } from './rate-limiter';

type Row = Record<string, unknown>;

let setupPromise: Promise<void> | null = null;
let nextId = 1;

export function takeId(): number {
  return nextId++;
}

export async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`rate limiter failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

export function ensureSetup(): Promise<void> {
  setupPromise ??= exec(SETUP).then(() => undefined);
  return setupPromise;
}
