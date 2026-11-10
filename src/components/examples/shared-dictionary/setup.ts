import { exampleState, wasmExecutor } from '@/lib/wasm-executor-singleton';
import { FLEET, SETUP, START_DEVICES, insertDevice, insertReading } from './shared-dictionary';

type Row = Record<string, unknown>;

export type CommandStatus = 'waiting' | 'claimed' | 'delivered';

export interface Command {
  id: number;
  name: string;
  cmd: string;
  status: CommandStatus;
  token?: string;
  doneAt?: number;
}

const state = exampleState('shared-dictionary', () => ({
  setup: null as Promise<void> | null,
  devices: 0,
  written: 0,
  lastAt: 0,
  nextCommand: 1,
  seed: 11,
  commands: [] as Command[],
}));

export function fleetState() {
  return state;
}

export function random(): number {
  state.seed = (state.seed * 16807) % 2147483647;
  return (state.seed - 1) / 2147483646;
}

export function activeDevices(): string[] {
  return FLEET.slice(0, state.devices);
}

export function nextAt(): number {
  state.lastAt = Math.max(Date.now(), state.lastAt + 1);
  return state.lastAt;
}

export async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`shared dictionary failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

export async function write(rql: string): Promise<Row[]> {
  const rows = await exec(rql);
  state.written += 1;
  return rows;
}

export function ensureSetup(): Promise<void> {
  state.setup ??= (async () => {
    await exec(SETUP);
    for (const name of FLEET.slice(0, START_DEVICES)) await write(insertDevice(name, 'online'));
    state.devices = START_DEVICES;
    for (let k = 0; k < 6; k++) {
      const name = FLEET[k % START_DEVICES];
      await write(insertReading(nextAt(), name, 2 + random() * 2));
    }
  })();
  return state.setup;
}
