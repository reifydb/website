import type { CodeExample } from '@/lib/examples/types';

// Note: the partition example must run before any other ring buffer holds
// rows. The current WASM build duplicates rows when reading a partitioned
// ring buffer after another ring buffer has been populated (engine bug).
export const dataModelRingBuffersExamples: CodeExample[] = [
{
    id: 'dm-ring-buffers-partition',
    title: 'One Buffer per Partition',
    category: 'concept',
    code: `create namespace dm_rbp;
create ringbuffer dm_rbp::region_events {
  id: int4,
  region: utf8
} with { capacity: 2, partition_by: { region } };
insert dm_rbp::region_events [
  { id: 1, region: "east" },
  { id: 2, region: "east" },
  { id: 3, region: "east" },
  { id: 4, region: "west" }
];
from dm_rbp::region_events`,
    expected: `id | region
---+-------
2  | east
3  | east
4  | west`,
  },
{
    id: 'dm-ring-buffers-create',
    title: 'Create a Ring Buffer and Fill It to Capacity',
    category: 'concept',
    code: `create namespace dm_rb;
create ringbuffer dm_rb::recent_logins {
  user_id: int4,
  at: utf8
} with { capacity: 3 };
insert dm_rb::recent_logins [
  { user_id: 1, at: "09:00" },
  { user_id: 2, at: "09:05" },
  { user_id: 3, at: "09:12" }
];
from dm_rb::recent_logins`,
    expected: `user_id | at
--------+------
1       | 09:00
2       | 09:05
3       | 09:12`,
  },
{
    id: 'dm-ring-buffers-evict',
    title: 'One More Insert Evicts the Oldest Row',
    category: 'concept',
    code: `insert dm_rb::recent_logins [{ user_id: 4, at: "09:20" }];
from dm_rb::recent_logins`,
    expected: `user_id | at
--------+------
2       | 09:05
3       | 09:12
4       | 09:20`,
  },
{
    id: 'dm-ring-buffers-update',
    title: 'Ring Buffer Rows Are Mutable',
    category: 'concept',
    code: `update dm_rb::recent_logins { at: "09:21" } filter { user_id == 4 }`,
    expected: `namespace | ringbuffer    | updated
----------+---------------+--------
dm_rb     | recent_logins | 1`,
  },
{
    id: 'dm-ring-buffers-delete',
    title: 'Delete Without Waiting for Eviction',
    category: 'concept',
    code: `delete dm_rb::recent_logins filter { user_id == 2 };
from dm_rb::recent_logins`,
    expected: `user_id | at
--------+------
3       | 09:12
4       | 09:21`,
  },
];
