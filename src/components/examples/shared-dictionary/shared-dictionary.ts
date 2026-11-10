export const FLEET = ['pump-1', 'pump-2', 'valve-1', 'gate-1', 'fan-1', 'pump-3', 'valve-2', 'gate-2'];
export const START_DEVICES = 3;
export const ALERT_CAPACITY = 5;

export const NAMES_DDL = 'create dictionary fleet::names for utf8 as uint2';

export const DEVICES_DDL = `create table fleet::devices {
  name: utf8 with { dictionary: fleet::names },
  status: utf8
}`;

export const READINGS_DDL = `create series fleet::readings {
  at: datetime,
  name: utf8 with { dictionary: fleet::names },
  bar: float8
} with { key: at }`;

export const ALERTS_DDL = `create ringbuffer fleet::alerts {
  at: datetime,
  name: utf8 with { dictionary: fleet::names },
  level: utf8
} with { capacity: ${ALERT_CAPACITY} }`;

export const COMMANDS_DDL = `create queue fleet::commands {
  id: int4,
  name: utf8 with { dictionary: fleet::names },
  cmd: utf8
} with { fifo: {} }`;

export const STORAGES_DDL = [DEVICES_DDL, READINGS_DDL, ALERTS_DDL, COMMANDS_DDL].join(';\n');

export const SETUP = ['create namespace fleet', NAMES_DDL, STORAGES_DDL].join(';\n');

export const READS = {
  names: 'from fleet::names',
  devices: 'from fleet::devices',
  readings: 'from fleet::readings sort { at } take 4',
  alerts: 'from fleet::alerts sort { at }',
};

export const CLAIM = 'call queue::claim("device", "fleet::commands", 1, duration::seconds(30))';

function at(ms: number): string {
  return `datetime::from_epoch_millis(${ms})`;
}

export function insertDevice(name: string, status: string): string {
  return `insert fleet::devices [{ name: "${name}", status: "${status}" }]`;
}

export function insertReading(atMs: number, name: string, bar: number): string {
  return `insert fleet::readings [{ at: ${at(atMs)}, name: "${name}", bar: ${bar.toFixed(2)} }]`;
}

export function insertAlert(atMs: number, name: string, level: string): string {
  return `insert fleet::alerts [{ at: ${at(atMs)}, name: "${name}", level: "${level}" }]`;
}

export function insertCommand(id: number, name: string, cmd: string): string {
  return `insert fleet::commands [{ id: ${id}, name: "${name}", cmd: "${cmd}" }]`;
}

export function ack(token: string): string {
  return `call queue::ack("${token}")`;
}
