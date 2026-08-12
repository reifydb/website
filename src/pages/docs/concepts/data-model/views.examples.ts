import type { CodeExample } from '@/lib/examples/types';

export const dmViewsTransactionalExample: CodeExample = {
    id: 'dm-views-transactional',
    title: 'A Transactional View Is Maintained by the Write Itself',
    code: `create namespace dm_vw;
create table dm_vw::orders { id: int4, region: utf8, total: float8 };
create transactional view dm_vw::revenue { region: utf8, revenue: float8 } as {
  from dm_vw::orders
  aggregate { revenue: math::sum(total) } by { region }
}`,
  };

export const dmViewsTransactionalWriteExample: CodeExample = {
    id: 'dm-views-transactional-write',
    title: 'Write to the Source Table',
    code: `insert dm_vw::orders [
  { id: 1, region: "eu", total: 10.0 },
  { id: 2, region: "us", total: 20.0 },
  { id: 3, region: "eu", total: 5.0 }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
dm_vw     | orders | 3`,
  };

export const dmViewsTransactionalReadExample: CodeExample = {
    id: 'dm-views-transactional-read',
    title: 'The View Is Already Current',
    code: `from dm_vw::revenue sort { region: asc }`,
    expected: `region | revenue
-------+--------
eu     | 15
us     | 20`,
  };

export const dmViewsFilterMembershipExample: CodeExample = {
    id: 'dm-views-filter-membership',
    title: 'Rows Enter and Leave a Filtered View',
    code: `create table dm_vw::users { id: int4, name: utf8, active: bool };
create view dm_vw::active_users { id: int4, name: utf8 } as {
  from dm_vw::users
  filter { active == true }
  map { id, name }
}`,
  };

export const dmViewsFilterInsertExample: CodeExample = {
    id: 'dm-views-filter-insert',
    title: 'Only Matching Rows Appear',
    code: `insert dm_vw::users [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false }
];`,
    expected: `namespace | table | inserted
----------+-------+---------
dm_vw     | users | 2`,
  };

export const dmViewsFilterReadExample: CodeExample = {
    id: 'dm-views-filter-read',
    title: 'Read the View',
    code: `from dm_vw::active_users`,
    expected: `id | name
---+------
1  | Alice`,
  };

export const dmViewsFilterLeaveExample: CodeExample = {
    id: 'dm-views-filter-leave',
    title: 'A Row That Stops Matching Leaves the View',
    code: `update dm_vw::users { active: false } filter { id == 1 }`,
    expected: `namespace | table | updated
----------+-------+--------
dm_vw     | users | 1`,
  };

export const dmViewsFilterLeaveReadExample: CodeExample = {
    id: 'dm-views-filter-leave-read',
    title: 'The View Reflects the Change',
    code: `from dm_vw::active_users`,
    expected: `(empty)`,
  };

export const dmViewsGateExample: CodeExample = {
    id: 'dm-views-gate',
    title: 'GATE Tracks Membership Explicitly',
    code: `create view dm_vw::gated_users { id: int4, name: utf8 } as {
  from dm_vw::users
  gate { active }
  map { id, name }
}`,
  };

export const dmViewsGateEnterExample: CodeExample = {
    id: 'dm-views-gate-enter',
    title: 'A Row Enters When Its Gate Turns True',
    code: `update dm_vw::users { active: true } filter { id == 2 }`,
    expected: `namespace | table | updated
----------+-------+--------
dm_vw     | users | 1`,
  };

export const dmViewsGateReadExample: CodeExample = {
    id: 'dm-views-gate-read',
    title: 'Read the Gated View',
    code: `from dm_vw::gated_users`,
    expected: `id | name
---+-----
2  | Bob`,
  };

export const dmViewsDeferredExample: CodeExample = {
    id: 'dm-views-deferred',
    title: 'A Deferred View Catches Up After the Commit',
    code: `create deferred view dm_vw::order_count { orders: int8 } as {
  from dm_vw::orders
  aggregate { orders: math::count(id) } by {}
}`,
  };

export const dmViewsDeferredWriteReadExample: CodeExample = {
    id: 'dm-views-deferred-write-read',
    title: 'Write, Then Read the Deferred View',
    code: `insert dm_vw::orders [{ id: 4, region: "eu", total: 7.5 }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
dm_vw     | orders | 1`,
  };

export const dmViewsDeferredReadExample: CodeExample = {
    id: 'dm-views-deferred-read',
    title: 'The Deferred View Has Caught Up',
    code: `from dm_vw::order_count`,
    expected: `orders
------
4`,
  };

export const dmViewsRingbufferBackedExample: CodeExample = {
    id: 'dm-views-ringbuffer-backed',
    title: 'A View Backed by a Ring Buffer',
    code: `create table dm_vw::clicks { id: int4, page: utf8 };
create deferred ringbuffer view dm_vw::recent_clicks {
  id: int4,
  page: utf8
} with { capacity: 2 } as {
  from dm_vw::clicks
  map { id, page }
}`,
  };

export const dmViewsRingbufferWriteExample: CodeExample = {
    id: 'dm-views-ringbuffer-write',
    title: 'The Backing Buffer Evicts Old Derived Rows',
    code: `insert dm_vw::clicks [
  { id: 1, page: "/home" },
  { id: 2, page: "/pricing" },
  { id: 3, page: "/docs" }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
dm_vw     | clicks | 3`,
  };

export const dmViewsRingbufferReadExample: CodeExample = {
    id: 'dm-views-ringbuffer-read',
    title: 'Only the Newest Derived Rows Remain',
    code: `from dm_vw::recent_clicks`,
    expected: `id | page
---+---------
3  | /docs
2  | /pricing`,
  };

export const dmViewsSeriesBackedExample: CodeExample = {
    id: 'dm-views-series-backed',
    title: 'A View Backed by a Series',
    code: `create deferred series view dm_vw::click_log {
  id: int4
} with { precision: millisecond } as {
  from dm_vw::clicks
  map { id }
}`,
  };

export const dmViewsChainExample: CodeExample = {
    id: 'dm-views-chain',
    title: 'Views Can Source From Other Views',
    code: `create view dm_vw::big_clicks { id: int4 } as {
  from dm_vw::clicks
  filter { id > 1 }
  map { id }
};
create view dm_vw::biggest_clicks { id: int4 } as {
  from dm_vw::big_clicks
  filter { id > 2 }
  map { id }
}`,
  };

export const dmViewsChainWriteExample: CodeExample = {
    id: 'dm-views-chain-write',
    title: 'One Write Flows Through the Whole Chain',
    code: `insert dm_vw::clicks [{ id: 4, page: "/blog" }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
dm_vw     | clicks | 1`,
  };

export const dmViewsChainReadExample: CodeExample = {
    id: 'dm-views-chain-read',
    title: 'Read the End of the Chain',
    code: `from dm_vw::biggest_clicks`,
    expected: `id
--
4`,
  };

export const dmViewsSortedExample: CodeExample = {
    id: 'dm-views-sorted',
    title: 'Materialized Sort Order',
    code: `create view dm_vw::sorted_clicks { id: int4 } as {
  from dm_vw::clicks
  map { id }
  sort { id: desc }
}`,
  };

export const dataModelViewsExamples: CodeExample[] = [
  dmViewsTransactionalExample,
  dmViewsTransactionalWriteExample,
  dmViewsTransactionalReadExample,
  dmViewsFilterMembershipExample,
  dmViewsFilterInsertExample,
  dmViewsFilterReadExample,
  dmViewsFilterLeaveExample,
  dmViewsFilterLeaveReadExample,
  dmViewsGateExample,
  dmViewsGateEnterExample,
  dmViewsGateReadExample,
  dmViewsDeferredExample,
  dmViewsDeferredWriteReadExample,
  dmViewsDeferredReadExample,
  dmViewsRingbufferBackedExample,
  dmViewsRingbufferWriteExample,
  dmViewsRingbufferReadExample,
  dmViewsSeriesBackedExample,
  dmViewsChainExample,
  dmViewsChainWriteExample,
  dmViewsChainReadExample,
  dmViewsSortedExample,
];
