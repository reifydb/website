import type { CodeExample } from '@/lib/examples/types';

export const dmQueuesCreateExample: CodeExample = {
    id: 'dm-queues-create',
    title: 'Create a Queue',
    code: `create namespace cpt_queue;
create queue cpt_queue::jobs {
  id: int4,
  payload: utf8
} with { fifo: {} }`,
  };

export const dmQueuesEnqueueExample: CodeExample = {
    id: 'dm-queues-enqueue',
    title: 'Enqueue Items with insert',
    code: `insert cpt_queue::jobs [
  { id: 1, payload: "alpha" },
  { id: 2, payload: "beta" },
  { id: 3, payload: "gamma" }
]`,
    expected: `namespace | queue | inserted | duplicates
----------+-------+----------+-----------
cpt_queue | jobs  | 3        | 0`,
  };

export const dmQueuesScanExample: CodeExample = {
    id: 'dm-queues-scan',
    title: 'Items Are Rows in Enqueue Order',
    code: `from cpt_queue::jobs`,
    expected: `id | payload
---+--------
1  | alpha
2  | beta
3  | gamma`,
  };

export const dmQueuesImmutableExample: CodeExample = {
    id: 'dm-queues-immutable',
    title: 'Items Cannot Be Edited',
    description: 'Queue items are immutable; update and delete fail with QUEUE_001.',
    code: `update cpt_queue::jobs { payload: "changed" } filter { id == 1 }`,
    expectsError: true,
  };

export const dmQueuesClaimExample: CodeExample = {
    id: 'dm-queues-claim',
    title: 'Lease Items to a Worker',
    code: `call queue::claim("w1", "cpt_queue::jobs", 2, duration::seconds(30))`,
  };

export const dmQueuesOrderedExample: CodeExample = {
    id: 'dm-queues-ordered',
    title: 'A Queue Ordered per Key',
    code: `create queue cpt_queue::per_tenant {
  id: int4,
  tenant: utf8
} with { fifo: { partitions: 1, ordered_by: tenant } };
insert cpt_queue::per_tenant [
  { id: 1, tenant: "a" },
  { id: 2, tenant: "a" },
  { id: 3, tenant: "b" }
]`,
    expected: `namespace | queue      | inserted | duplicates
----------+------------+----------+-----------
cpt_queue | per_tenant | 3        | 0`,
  };

export const dmQueuesOrderedClaimExample: CodeExample = {
    id: 'dm-queues-ordered-claim',
    title: 'Only the Head of Each Key Is Claimable',
    code: `call queue::claim("w1", "cpt_queue::per_tenant", 5, duration::seconds(30))`,
  };

export const dmQueuesCatalogExample: CodeExample = {
    id: 'dm-queues-catalog',
    title: 'Queues in the System Catalog',
    code: `from system::queues
filter { name == "per_tenant" }
map { name, partitions, ordered_by, depth, in_flight, blocked_keys }`,
  };

export const dmQueuesPartitionsExample: CodeExample = {
    id: 'dm-queues-partitions',
    title: 'Per-Partition Counters',
    code: `from system::queue_partitions
map { queue_id, partition, depth, in_flight, blocked_keys }`,
  };

export const dmQueuesDropExample: CodeExample = {
    id: 'dm-queues-drop',
    title: 'Drop a Queue',
    code: `drop queue cpt_queue::per_tenant`,
  };

export const dmQueuesExamples: CodeExample[] = [
  dmQueuesCreateExample,
  dmQueuesEnqueueExample,
  dmQueuesScanExample,
  dmQueuesImmutableExample,
  dmQueuesClaimExample,
  dmQueuesOrderedExample,
  dmQueuesOrderedClaimExample,
  dmQueuesCatalogExample,
  dmQueuesPartitionsExample,
  dmQueuesDropExample,
];
