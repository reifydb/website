import type { CodeExample } from '@/lib/examples/types';

export const dmRingBuffersCreateExample: CodeExample = {
    id: 'dm-ring-buffers-create',
    title: 'Create a Ring Buffer',
    code: `create namespace dm_rb;
create ringbuffer dm_rb::recent_logins {
  user_id: int4,
  at: utf8
} with { capacity: 3 }`,
    expected: `id    | namespace | ringbuffer    | created
------+-----------+---------------+--------
16416 | dm_rb     | recent_logins | true`,
  };

export const dmRingBuffersFillExample: CodeExample = {
    id: 'dm-ring-buffers-fill',
    title: 'Fill It to Capacity',
    code: `insert dm_rb::recent_logins [
  { user_id: 1, at: "09:00" },
  { user_id: 2, at: "09:05" },
  { user_id: 3, at: "09:12" }
];
from dm_rb::recent_logins`,
    expected: `user_id | at    | #rownum
--------+-------+--------
1       | 09:00 | 1
2       | 09:05 | 2
3       | 09:12 | 3`,
  };

export const dmRingBuffersEvictExample: CodeExample = {
    id: 'dm-ring-buffers-evict',
    title: 'One More Insert Evicts the Oldest Row',
    code: `insert dm_rb::recent_logins [{ user_id: 4, at: "09:20" }];
from dm_rb::recent_logins`,
    expected: `user_id | at    | #rownum
--------+-------+--------
2       | 09:05 | 2
3       | 09:12 | 3
4       | 09:20 | 4`,
  };

export const dmRingBuffersBatchExample: CodeExample = {
    id: 'dm-ring-buffers-batch',
    title: 'A Batch Larger Than the Capacity',
    code: `insert dm_rb::recent_logins [
  { user_id: 5, at: "09:31" },
  { user_id: 6, at: "09:32" },
  { user_id: 7, at: "09:33" },
  { user_id: 8, at: "09:34" }
];
from dm_rb::recent_logins`,
    expected: `user_id | at    | #rownum
--------+-------+--------
6       | 09:32 | 6
7       | 09:33 | 7
8       | 09:34 | 8`,
  };

export const dmRingBuffersPartitionExample: CodeExample = {
    id: 'dm-ring-buffers-partition',
    title: 'One Buffer per Partition',
    code: `create ringbuffer dm_rb::region_events {
  id: int4,
  region: utf8
} with { capacity: 2, partition: { by: { region } } };
insert dm_rb::region_events [
  { id: 1, region: "east" },
  { id: 2, region: "east" },
  { id: 3, region: "east" },
  { id: 4, region: "west" }
];
from dm_rb::region_events sort { id: asc }`,
    expected: `id | region | #rownum
---+--------+--------
2  | east   | 2
3  | east   | 3
4  | west   | 4`,
  };

export const dmRingBuffersUpdateExample: CodeExample = {
    id: 'dm-ring-buffers-update',
    title: 'Rows Stay Mutable',
    code: `update dm_rb::recent_logins { at: "09:35" }
filter { user_id == 8 }
returning { user_id, at }`,
    expected: `user_id | at    | #rownum
--------+-------+--------
8       | 09:35 | 8`,
  };

export const dmRingBuffersDeleteExample: CodeExample = {
    id: 'dm-ring-buffers-delete',
    title: 'A Delete Frees a Slot',
    code: `delete dm_rb::recent_logins filter { user_id == 6 };
insert dm_rb::recent_logins [{ user_id: 9, at: "09:40" }];
from dm_rb::recent_logins`,
    expected: `user_id | at    | #rownum
--------+-------+--------
7       | 09:33 | 7
8       | 09:35 | 8
9       | 09:40 | 9`,
  };

export const dmRingBuffersViewSetupExample: CodeExample = {
    id: 'dm-ring-buffers-view-setup',
    title: 'A View That Counts a Ring Buffer',
    code: `create ringbuffer dm_rb::errors {
  id: int4,
  message: utf8
} with { capacity: 3 };
create view dm_rb::error_count { n: int8 } as {
  from dm_rb::errors
  aggregate { n: math::count(id) } by {}
}`,
    expected: `id    | namespace | view        | created
------+-----------+-------------+--------
16420 | dm_rb     | error_count | true`,
  };

export const dmRingBuffersViewInsertExample: CodeExample = {
    id: 'dm-ring-buffers-view-insert',
    title: 'Insert Past the Capacity',
    code: `insert dm_rb::errors [
  { id: 1, message: "timeout" },
  { id: 2, message: "refused" },
  { id: 3, message: "timeout" },
  { id: 4, message: "reset" }
]`,
    expected: `namespace | ringbuffer | inserted
----------+------------+---------
dm_rb     | errors     | 4`,
  };

export const dmRingBuffersViewReadExample: CodeExample = {
    id: 'dm-ring-buffers-view-read',
    title: 'The View Saw the Eviction',
    code: `from dm_rb::error_count`,
    expected: `n
-
3`,
  };

export const dmRingBuffersDeferredViewExample: CodeExample = {
    id: 'dm-ring-buffers-deferred-view',
    title: 'A Ring-Buffer-Backed View',
    code: `create deferred ringbuffer view dm_rb::latest_errors {
  id: int4,
  message: utf8
} with { capacity: 2 } as {
  from dm_rb::errors
}`,
    expected: `id    | namespace | view          | created
------+-----------+---------------+--------
16422 | dm_rb     | latest_errors | true`,
  };

export const dmRingBuffersDeferredReadExample: CodeExample = {
    id: 'dm-ring-buffers-deferred-read',
    title: 'Derived Rows, Newest Two, Newest First',
    code: `from dm_rb::latest_errors`,
    expected: `id | message
---+--------
4  | reset
3  | timeout`,
  };

export const dmRingBuffersNoCapacityExample: CodeExample = {
    id: 'dm-ring-buffers-no-capacity',
    title: 'Capacity Is Required',
    description: 'A ring buffer without a capacity clause does not parse.',
    code: `create ringbuffer dm_rb::unbounded { id: int4 }`,
    expectsError: true,
  };

export const dmRingBuffersCatalogExample: CodeExample = {
    id: 'dm-ring-buffers-catalog',
    title: 'Ring Buffers in the System Catalog',
    code: `from system::ringbuffers
filter { name == "errors" or name == "region_events" }
map { name, capacity }`,
    expected: `name          | capacity
--------------+---------
errors        | 3
region_events | 2`,
  };

export const dmRingBuffersDropExample: CodeExample = {
    id: 'dm-ring-buffers-drop',
    title: 'Drop a Ring Buffer',
    code: `drop ringbuffer dm_rb::recent_logins`,
    expected: `namespace | ringbuffer    | dropped
----------+---------------+--------
dm_rb     | recent_logins | true`,
  };

export const dataModelRingBuffersExamples: CodeExample[] = [
  dmRingBuffersCreateExample,
  dmRingBuffersFillExample,
  dmRingBuffersEvictExample,
  dmRingBuffersBatchExample,
  dmRingBuffersPartitionExample,
  dmRingBuffersUpdateExample,
  dmRingBuffersDeleteExample,
  dmRingBuffersViewSetupExample,
  dmRingBuffersViewInsertExample,
  dmRingBuffersViewReadExample,
  dmRingBuffersDeferredViewExample,
  dmRingBuffersDeferredReadExample,
  dmRingBuffersNoCapacityExample,
  dmRingBuffersCatalogExample,
  dmRingBuffersDropExample,
];
