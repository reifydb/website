type Row = Record<string, unknown>;

export const LIMIT = 5;
export const WINDOW_MS = 10_000;
export const USERS = ['alice', 'bob', 'carol'] as const;
export type User = (typeof USERS)[number];

export const RING = 'limits::requests';

export const SETUP = `create namespace limits;
create ringbuffer ${RING} { id: int8, user: utf8, at: datetime } with { capacity: ${LIMIT}, partition: { by: { user } } }`;

export const READS = {
  ring: `from ${RING}`,
  live: `from ${RING}`,
};

export function windowQuery(nowMs: number, user?: User): string {
  const who = user ? `user == "${user}" and ` : '';
  return `from ${RING} filter { ${who}at > datetime::from_epoch_millis(${nowMs - WINDOW_MS}) } aggregate { in_window: math::count(id) } by { user }`;
}

export function insertRequest(id: number, user: User, atMs: number): string {
  return `insert ${RING} [{ id: ${id}, user: "${user}", at: datetime::from_epoch_millis(${atMs}) }]`;
}

export interface Outcome {
  blocked: boolean;
  inWindow: number;
  rql: string;
}

export async function sendRequest(
  exec: (rql: string) => Promise<Row[]>,
  id: number,
  user: User,
  atMs: number,
): Promise<Outcome> {
  const check = windowQuery(atMs, user);
  const [row] = await exec(check);
  const inWindow = Number(row?.in_window ?? 0);
  if (inWindow >= LIMIT) return { blocked: true, inWindow, rql: check };
  const insert = insertRequest(id, user, atMs);
  await exec(insert);
  return { blocked: false, inWindow: inWindow + 1, rql: insert };
}
