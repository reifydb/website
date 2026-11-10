export const LIMIT = 5;
export const WINDOW_MS = 10_000;
export const USERS = ['alice', 'bob', 'carol'] as const;
export type User = (typeof USERS)[number];

export const RING = 'limits::requests';

export const RING_DDL = `create ringbuffer ${RING} { id: int8, user: utf8, at: datetime }
with { capacity: ${LIMIT}, partition: { by: { user } } }`;

export const PROCEDURE_DDL = `create procedure limits::request { id: int8, user: utf8, at: int8 } as {
  from ${RING}
  filter { user == $user and at > datetime::from_epoch_millis($at - ${WINDOW_MS}) }
  aggregate { in_window: math::count(id) } by { user }
  assert { in_window < ${LIMIT} } "rate limited";
  insert ${RING} [{ id: $id, user: $user, at: datetime::from_epoch_millis($at) }]
}`;

export const SETUP = ['create namespace limits', RING_DDL, PROCEDURE_DDL].join(';\n');

export const READS = {
  ring: `from ${RING}`,
  live: `from ${RING}`,
};

export function windowQuery(nowMs: number, user?: User): string {
  const who = user ? `user == "${user}" and ` : '';
  return `from ${RING} filter { ${who}at > datetime::from_epoch_millis(${nowMs - WINDOW_MS}) } aggregate { in_window: math::count(id) } by { user }`;
}

export function requestCall(id: number, user: User, atMs: number): string {
  return `call limits::request(${id}, "${user}", ${atMs})`;
}

export interface CallResult {
  success: boolean;
  error?: string;
}

export interface Outcome {
  blocked: boolean;
  rql: string;
}

export async function sendRequest(
  call: (rql: string) => Promise<CallResult>,
  id: number,
  user: User,
  atMs: number,
): Promise<Outcome> {
  const rql = requestCall(id, user, atMs);
  const result = await call(rql);
  if (result.success) return { blocked: false, rql };
  if (result.error?.includes('ASSERT')) return { blocked: true, rql };
  throw new Error(`rate limiter failed on "${rql}": ${result.error}`);
}
