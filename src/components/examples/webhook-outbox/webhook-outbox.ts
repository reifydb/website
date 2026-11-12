export const ATTEMPTS = 2;
export const BACKOFF_MS = 2_000;
export const LEASE_S = 10;
export const QUEUE = 'hooks::outbox';

export const EVENTS = ['order.paid', 'order.shipped', 'order.refunded'];
export const URLS = ['shop.reifydb.com', 'crm.reifydb.com', 'mail.reifydb.com'];

export const OUTBOX_DDL = `create queue ${QUEUE} { id: int4, event: utf8, url: utf8 }
with { fifo: {}, retry: { attempts: ${ATTEMPTS}, backoff: ${BACKOFF_MS / 1000}s } }`;

export const ORDERS_DDL = 'create table hooks::orders { id: int4, event: utf8 }';

export const SETUP = ['create namespace hooks', ORDERS_DDL, OUTBOX_DDL].join(';\n');

export const CLAIM = `call queue::claim("worker", "${QUEUE}", 1, duration::seconds(${LEASE_S}))`;

export const COUNTERS = 'from system::queue::partitions map { depth, in_flight, oldest_due_at }';

export const READS = {
  all: `from ${QUEUE} sort { id: asc }`,
  paid: `from ${QUEUE} filter { event == "order.paid" } sort { id }`,
  perUrl: `from ${QUEUE} aggregate { webhooks: math::count(id) } by { url }`,
  catalog: 'from system::queues filter { name == "outbox" } map { name, depth, in_flight }',
};

export function placeOrder(id: number, event: string, url: string): string {
  return `insert hooks::orders [{ id: ${id}, event: "${event}" }];
insert ${QUEUE} [{ id: ${id}, event: "${event}", url: "${url}" }]`;
}

export function ack(token: string): string {
  return `call queue::ack("${token}")`;
}

export function fail(token: string, reason: string): string {
  return `call queue::fail("${token}", "${reason}")`;
}

export function replay(id: number): string {
  return `call queue::replay("${QUEUE}", ${id})`;
}

export function backoffAfter(attempt: number): number {
  return BACKOFF_MS * 2 ** (attempt - 1);
}
