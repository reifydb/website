import type { CodeExample } from '@/lib/examples/types';

export const stQueueCreateExample: CodeExample = {
    id: 'st-queue-create',
    title: 'Create a Queue',
    code: `create namespace st_queue;
create queue st_queue::jobs {
  id: int4,
  payload: utf8
} with { fifo: {} }`,
  };

export const stQueueAllOptionsExample: CodeExample = {
    id: 'st-queue-all-options',
    title: 'Every Option Spelled Out',
    code: `create queue st_queue::emails {
  id: int4,
  tenant: utf8,
  address: utf8
} with {
  fifo: { partitions: 8, ordered_by: tenant },
  deduplicate: { by: { tenant, address }, ttl: 1h },
  retention: { done: 7d },
  retry: { attempts: 3, backoff: 5s },
  time: processing
}`,
  };

export const stQueueNoDispatchExample: CodeExample = {
    id: 'st-queue-no-dispatch',
    title: 'The Dispatch Block Is Required',
    description: 'A queue without a dispatch block is rejected at parse time (AST_005), not defaulted to fifo.',
    code: `create queue st_queue::bare { id: int4 }`,
    expectsError: true,
  };

export const stQueueBadPartitionsExample: CodeExample = {
    id: 'st-queue-bad-partitions',
    title: 'Partitions Must Be Between 1 and 1024',
    description: 'Zero partitions would make the queue undeliverable; the engine rejects it (AST_005).',
    code: `create queue st_queue::zero { id: int4 } with { fifo: { partitions: 0 } }`,
    expectsError: true,
  };

export const stQueueInsertExample: CodeExample = {
    id: 'st-queue-insert',
    title: 'Enqueue a Batch',
    code: `insert st_queue::jobs [
  { id: 1, payload: "alpha" },
  { id: 2, payload: "beta" },
  { id: 3, payload: "gamma" }
]`,
    expected: `namespace | queue | inserted | duplicates
----------+-------+----------+-----------
st_queue  | jobs  | 3        | 0`,
  };

export const stQueueScanExample: CodeExample = {
    id: 'st-queue-scan',
    title: 'Read Items Back',
    code: `from st_queue::jobs`,
    expected: `id | payload | #rownum
---+---------+--------
1  | alpha   | 1
2  | beta    | 2
3  | gamma   | 3`,
  };

export const stQueueReturningExample: CodeExample = {
    id: 'st-queue-returning',
    title: 'returning Hands Back the Enqueued Item',
    code: `insert st_queue::jobs [{ id: 4, payload: "delta" }] returning { id, payload }`,
    expected: `id | payload | #rownum
---+---------+--------
4  | delta   | 4`,
  };

export const stQueueNotBeforeExample: CodeExample = {
    id: 'st-queue-not-before',
    title: 'Delay an Item with not_before',
    code: `insert st_queue::jobs [{ id: 5, payload: "epsilon" }]
with { not_before: datetime::from_epoch_millis(1700000000000) }`,
    expected: `namespace | queue | inserted | duplicates
----------+-------+----------+-----------
st_queue  | jobs  | 1        | 0`,
  };

export const stQueueDedupKeyExample: CodeExample = {
    id: 'st-queue-dedup-key',
    title: 'A Statement-Level Deduplication Key',
    code: `create queue st_queue::dedup { id: int4 } with { fifo: {} };
insert st_queue::dedup [{ id: 1 }] with { deduplication_key: "job-1" }`,
    expected: `namespace | queue | inserted | duplicates
----------+-------+----------+-----------
st_queue  | dedup | 1        | 0`,
  };

export const stQueueDedupRepeatExample: CodeExample = {
    id: 'st-queue-dedup-repeat',
    title: 'The Same Key Again Is a Duplicate',
    code: `insert st_queue::dedup [{ id: 2 }] with { deduplication_key: "job-1" }`,
    expected: `namespace | queue | inserted | duplicates
----------+-------+----------+-----------
st_queue  | dedup | 0        | 1`,
  };

export const stQueueDedupScanExample: CodeExample = {
    id: 'st-queue-dedup-scan',
    title: 'Only the First Item Was Enqueued',
    code: `from st_queue::dedup`,
    expected: `id | #rownum
---+--------
1  | 1`,
  };

export const stQueueDeclaredDedupExample: CodeExample = {
    id: 'st-queue-declared-dedup',
    title: 'A Declared Deduplication Key',
    code: `create queue st_queue::tenants {
  id: int4,
  tenant: utf8
} with { fifo: {}, deduplicate: { by: { tenant } } };
insert st_queue::tenants [
  { id: 1, tenant: "a" },
  { id: 2, tenant: "b" },
  { id: 3, tenant: "a" }
]`,
    expected: `namespace | queue   | inserted | duplicates
----------+---------+----------+-----------
st_queue  | tenants | 2        | 1`,
  };

export const stQueueDeclaredDedupScanExample: CodeExample = {
    id: 'st-queue-declared-dedup-scan',
    title: 'The Repeated Tenant Collapsed',
    code: `from st_queue::tenants`,
    expected: `id | tenant | #rownum
---+--------+--------
1  | a      | 1
2  | b      | 2`,
  };

export const stQueueDedupConflictExample: CodeExample = {
    id: 'st-queue-dedup-conflict',
    title: 'A Declared Key Rejects a Statement Key',
    description: 'A queue that declares deduplicate does not accept deduplication_key on insert (INSERT_008).',
    code: `insert st_queue::tenants [{ id: 4, tenant: "c" }] with { deduplication_key: "k" }`,
    expectsError: true,
  };

export const stQueueUnknownOptionExample: CodeExample = {
    id: 'st-queue-unknown-option',
    title: 'Unknown insert Options Are Rejected',
    description: 'insert ... with accepts only deduplication_key and not_before (INSERT_006).',
    code: `insert st_queue::jobs [{ id: 9, payload: "iota" }] with { delay: 10 }`,
    expectsError: true,
  };

export const stQueueImmutableExample: CodeExample = {
    id: 'st-queue-immutable',
    title: 'Items Cannot Be Deleted',
    description: 'Queue items are immutable; update and delete fail with QUEUE_001.',
    code: `delete st_queue::jobs filter { id == 1 }`,
    expectsError: true,
  };

export const stQueueClaimExample: CodeExample = {
    id: 'st-queue-claim',
    title: 'Claim Items for a Worker',
    code: `call queue::claim("w1", "st_queue::jobs", 5, duration::seconds(30))`,
  };

export const stQueueDropExample: CodeExample = {
    id: 'st-queue-drop',
    title: 'Drop a Queue',
    code: `drop queue st_queue::dedup`,
  };

export const stQueueDropIfExistsExample: CodeExample = {
    id: 'st-queue-drop-if-exists',
    title: 'drop queue if exists',
    code: `drop queue if exists st_queue::dedup`,
  };

export const scriptingStorageQueuesExamples: CodeExample[] = [
  stQueueCreateExample,
  stQueueAllOptionsExample,
  stQueueNoDispatchExample,
  stQueueBadPartitionsExample,
  stQueueInsertExample,
  stQueueScanExample,
  stQueueReturningExample,
  stQueueNotBeforeExample,
  stQueueDedupKeyExample,
  stQueueDedupRepeatExample,
  stQueueDedupScanExample,
  stQueueDeclaredDedupExample,
  stQueueDeclaredDedupScanExample,
  stQueueDedupConflictExample,
  stQueueUnknownOptionExample,
  stQueueImmutableExample,
  stQueueClaimExample,
  stQueueDropExample,
  stQueueDropIfExistsExample,
];
