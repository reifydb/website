import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateRingbufferExample: CodeExample = {
    id: 'scripting-rb-create',
    title: 'Create a Ringbuffer',
    code: `create namespace st_rb;
create ringbuffer st_rb::logs {
  id: int4,
  level: utf8,
  msg: utf8
} with { capacity: 3 }`,
    expected: `id    | namespace | ringbuffer | created
------+-----------+------------+--------
16416 | st_rb     | logs       | true`,
  };

export const scriptingRbCapacityRequiredExample: CodeExample = {
    id: 'scripting-rb-capacity-required',
    title: 'Capacity Is Required',
    description: 'A ringbuffer without a capacity is rejected at parse time.',
    code: `create ringbuffer st_rb::nocap { id: int4 } with { }`,
    expectsError: true,
  };

export const scriptingRbFillExample: CodeExample = {
    id: 'scripting-rb-fill',
    title: 'Fill the Buffer to Capacity',
    code: `insert st_rb::logs [
  { id: 1, level: "info", msg: "service started" },
  { id: 2, level: "info", msg: "listening on :8080" },
  { id: 3, level: "warn", msg: "slow request" }
];
from st_rb::logs`,
    expected: `id | level | msg
---+-------+-------------------
1  | info  | service started
2  | info  | listening on :8080
3  | warn  | slow request`,
  };

export const scriptingRbEvictExample: CodeExample = {
    id: 'scripting-rb-evict',
    title: 'One Insert Past Capacity Evicts the Oldest Row',
    code: `insert st_rb::logs [{ id: 4, level: "error", msg: "upstream timeout" }];
from st_rb::logs`,
    expected: `id | level | msg
---+-------+-------------------
2  | info  | listening on :8080
3  | warn  | slow request
4  | error | upstream timeout`,
  };

export const scriptingRbTableOrderExample: CodeExample = {
    id: 'scripting-rb-table-order',
    title: 'Tables Scan Latest-First, Ringbuffers Do Not',
    code: `create table st_rb::audit { id: int4, action: utf8 };
insert st_rb::audit [
  { id: 1, action: "created" },
  { id: 2, action: "updated" },
  { id: 3, action: "deleted" }
];
from st_rb::audit`,
    expected: `id | action
---+--------
3  | deleted
2  | updated
1  | created`,
  };

export const scriptingRbPartitionExample: CodeExample = {
    id: 'scripting-rb-partition',
    title: 'Partitioned Ringbuffer: Capacity per Partition',
    code: `create ringbuffer st_rb::region_logs {
  region: utf8,
  msg: utf8
} with { capacity: 2, partition: { by: { region } } };
insert st_rb::region_logs [
  { region: "east", msg: "cache miss" },
  { region: "east", msg: "retry scheduled" },
  { region: "east", msg: "shard rebalanced" },
  { region: "west", msg: "backup complete" }
];
from st_rb::region_logs`,
    expected: `region | msg
-------+-----------------
east   | retry scheduled
east   | shard rebalanced
west   | backup complete`,
  };

export const scriptingRbUpdateExample: CodeExample = {
    id: 'scripting-rb-update',
    title: 'Update Rows in Place',
    code: `update st_rb::logs { level: "fatal" } filter { id == 4 }`,
    expected: `namespace | ringbuffer | updated
----------+------------+--------
st_rb     | logs       | 1`,
  };

export const scriptingRbDeleteExample: CodeExample = {
    id: 'scripting-rb-delete',
    title: 'Delete Ahead of Eviction',
    code: `delete st_rb::logs filter { id == 2 };
from st_rb::logs`,
    expected: `id | level | msg
---+-------+-----------------
3  | warn  | slow request
4  | fatal | upstream timeout`,
  };

export const scriptingRbViewSetupExample: CodeExample = {
    id: 'scripting-rb-view-setup',
    title: 'A Deferred View Backed by a Ringbuffer',
    code: `create table st_rb::events { id: int4, action: utf8 };
create deferred ringbuffer view st_rb::recent_events {
  id: int4,
  action: utf8
} with { capacity: 2 } as {
  from st_rb::events
}`,
    expected: `id    | namespace | view          | created
------+-----------+---------------+--------
16421 | st_rb     | recent_events | true`,
  };

export const scriptingRbViewInsertExample: CodeExample = {
    id: 'scripting-rb-view-insert',
    title: 'Write to the Source Table',
    code: `insert st_rb::events [
  { id: 1, action: "login" },
  { id: 2, action: "logout" },
  { id: 3, action: "login" }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
st_rb     | events | 3`,
  };

export const scriptingRbViewReadExample: CodeExample = {
    id: 'scripting-rb-view-read',
    title: 'The View Keeps Only Its Newest Rows',
    code: `from st_rb::recent_events`,
    expected: `id | action
---+-------
3  | login
2  | logout`,
  };

export const scriptingStorageRingbuffersExamples: CodeExample[] = [
  scriptingCreateRingbufferExample,
  scriptingRbCapacityRequiredExample,
  scriptingRbFillExample,
  scriptingRbEvictExample,
  scriptingRbTableOrderExample,
  scriptingRbPartitionExample,
  scriptingRbUpdateExample,
  scriptingRbDeleteExample,
  scriptingRbViewSetupExample,
  scriptingRbViewInsertExample,
  scriptingRbViewReadExample,
];
