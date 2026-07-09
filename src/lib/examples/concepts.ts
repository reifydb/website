import type { CodeExample } from './index';

// Examples for the Concepts overview page. The derived-state examples form an
// ordered sequence sharing the cpt namespace (same pattern as quickstart):
// views only reflect writes committed after the view exists, so schema, write,
// and read are separate statements.
export const conceptsOverviewExamples: CodeExample[] = [
  {
    id: 'concepts-derived-schema',
    title: 'A Table and Two Views Derived From It',
    category: 'concept',
    code: `create namespace cpt;
create table cpt::orders { id: int4, region: utf8, total: float8 };
create transactional view cpt::revenue_by_region { region: utf8, revenue: float8 } as {
  from cpt::orders
  aggregate { revenue: math::sum(total) } by { region }
};
create deferred view cpt::order_count { orders: int8 } as {
  from cpt::orders
  aggregate { orders: math::count(id) } by {}
}`,
  },
  {
    id: 'concepts-derived-insert',
    title: 'Write to the Table',
    category: 'concept',
    code: `insert cpt::orders [
  { id: 1, region: "North", total: 120.0 },
  { id: 2, region: "South", total: 80.0 },
  { id: 3, region: "North", total: 45.5 }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
cpt       | orders | 3`,
  },
  {
    id: 'concepts-derived-query',
    title: 'The View Is Already Current',
    category: 'concept',
    code: `from cpt::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
North  | 165.5
South  | 80`,
  },
  {
    id: 'concepts-deferred-query',
    title: 'The Deferred View Caught Up',
    category: 'concept',
    code: `from cpt::order_count`,
    expected: `orders
------
3`,
  },
  {
    id: 'concepts-ringbuffer',
    title: 'A Ring Buffer Keeps the Last N Rows',
    category: 'concept',
    code: `create namespace cpt_rb;
create ringbuffer cpt_rb::recent_logins {
  user_id: int4,
  at: utf8
} with { capacity: 3 };
insert cpt_rb::recent_logins [
  { user_id: 1, at: "09:00" },
  { user_id: 2, at: "09:05" },
  { user_id: 3, at: "09:12" },
  { user_id: 4, at: "09:20" }
];
from cpt_rb::recent_logins`,
    expected: `user_id | at
--------+------
2       | 09:05
3       | 09:12
4       | 09:20`,
  },
];
