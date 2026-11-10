import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { SETUP, insertSwaps } from './swap-candle';
import type { Swap } from './swap-candle';

type Row = Record<string, unknown>;

const SLOT_MS = 400;
const START_SLOT = 1_000;
const HISTORY_SLOTS = 80;

let setupPromise: Promise<void> | null = null;
let clockStart = 0;
let nextId = 1;
let mid = 142.5;
let seed = 7;
let lastSwap: Swap | null = null;

export function getLastSwap(): Swap | null {
  return lastSwap;
}

export function setLastSwap(swap: Swap) {
  lastSwap = swap;
}

function random(): number {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

export function makeSwap(slot: number, isBuy?: boolean, size?: number): Swap {
  const side = isBuy ?? random() < 0.5 + (142.5 - mid) * 0.04;
  const amount = size ?? Math.round((0.2 + random() * 6) * 100) / 100;
  mid *= 1 + (side ? 1 : -1) * amount * 0.00012 + (random() - 0.5) * 0.0012;
  const price = Math.round(mid * 1000000) / 1000000;
  return { id: nextId++, slot, isBuy: side, size: amount, price };
}

export async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`swap to candle failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

export function currentSlot(now: number): number {
  return START_SLOT + Math.floor((now - clockStart) / SLOT_MS);
}

export function ensureSetup(): Promise<void> {
  setupPromise ??= (async () => {
    await exec(SETUP);
    const history: Swap[] = [];
    for (let slot = START_SLOT - HISTORY_SLOTS; slot < START_SLOT; slot++) {
      const count = Math.floor(random() * 3);
      for (let k = 0; k < count; k++) history.push(makeSwap(slot));
    }
    await exec(insertSwaps(history));
    lastSwap = history[history.length - 1];
    clockStart = performance.now();
  })();
  return setupPromise;
}
