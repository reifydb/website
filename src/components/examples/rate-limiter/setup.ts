import { exampleState, wasmExecutor } from '@/lib/wasm-executor-singleton';
import { SETUP } from './rate-limiter';

type Row = Record<string, unknown>;

const state = exampleState('rate-limiter', () => ({ setup: null as Promise<void> | null, nextId: 1 }));

export function takeId(): number {
  return state.nextId++;
}

export async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`rate limiter failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

export function call(rql: string) {
  return wasmExecutor.execute(rql);
}

export function ensureSetup(): Promise<void> {
  state.setup ??= exec(SETUP).then(() => undefined);
  return state.setup;
}
