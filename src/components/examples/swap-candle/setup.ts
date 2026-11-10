import { exampleState, wasmExecutor } from '@/lib/wasm-executor-singleton';
import { SETUP, insertSwaps } from './swap-candle';
import type { Swap } from './swap-candle';

type Row = Record<string, unknown>;

const SLOT_MS = 400;
const START_SLOT = 1_000;
const HISTORY_SLOTS = 80;

const state = exampleState('swap-candle', () => ({
  setup: null as Promise<void> | null,
  clockStart: 0,
  nextId: 1,
  mid: 142.5,
  seed: 7,
  lastSwap: null as Swap | null,
}));

export function getLastSwap(): Swap | null {
  return state.lastSwap;
}

export function setLastSwap(swap: Swap) {
  state.lastSwap = swap;
}

function random(): number {
  state.seed = (state.seed * 16807) % 2147483647;
  return (state.seed - 1) / 2147483646;
}

export function makeSwap(slot: number, isBuy?: boolean, size?: number): Swap {
  const side = isBuy ?? random() < 0.5 + (142.5 - state.mid) * 0.04;
  const amount = size ?? Math.round((0.2 + random() * 6) * 100) / 100;
  state.mid *= 1 + (side ? 1 : -1) * amount * 0.00012 + (random() - 0.5) * 0.0012;
  const price = Math.round(state.mid * 1000000) / 1000000;
  return { id: state.nextId++, slot, isBuy: side, size: amount, price };
}

export async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`swap to candle failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

export function currentSlot(now: number): number {
  return START_SLOT + Math.floor((now - state.clockStart) / SLOT_MS);
}

export function ensureSetup(): Promise<void> {
  state.setup ??= (async () => {
    await exec(SETUP);
    const history: Swap[] = [];
    for (let slot = START_SLOT - HISTORY_SLOTS; slot < START_SLOT; slot++) {
      const count = Math.floor(random() * 3);
      for (let k = 0; k < count; k++) history.push(makeSwap(slot));
    }
    await exec(insertSwaps(history));
    state.lastSwap = history[history.length - 1];
    state.clockStart = performance.now();
  })();
  return state.setup;
}
