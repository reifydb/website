import { exampleState, wasmExecutor } from '@/lib/wasm-executor-singleton';
import { EVENTS, SETUP, URLS, placeOrder } from './webhook-outbox';

type Row = Record<string, unknown>;

export type HookStatus = 'ready' | 'backoff' | 'claimed' | 'returning' | 'done' | 'dead';

export interface Hook {
  id: number;
  event: string;
  url: string;
  status: HookStatus;
  attempt: number;
  token?: string;
  until?: number;
  at: number;
}

const START_HOOKS = 3;

const state = exampleState('webhook-outbox', () => ({
  setup: null as Promise<void> | null,
  nextId: 1,
  hooks: [] as Hook[],
}));

export function outboxState() {
  return state;
}

export async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`webhook outbox failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

export async function produce(): Promise<string> {
  const id = state.nextId++;
  const event = EVENTS[(id - 1) % EVENTS.length];
  const url = URLS[(id - 1) % URLS.length];
  const rql = placeOrder(id, event, url);
  await exec(rql);
  state.hooks.push({ id, event, url, status: 'ready', attempt: 0, at: Date.now() });
  return rql;
}

export function ensureSetup(): Promise<void> {
  state.setup ??= (async () => {
    await exec(SETUP);
    for (let k = 0; k < START_HOOKS; k++) await produce();
  })();
  return state.setup;
}
