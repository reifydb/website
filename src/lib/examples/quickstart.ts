import type { CodeExample } from './index';

export const quickstartExamples: CodeExample[] = [
  {
    id: 'quickstart-create-table',
    title: 'Create a Table',
    category: 'guide',
    code: `create namespace shop;
create table shop::orders { id: int4, item: utf8, amount: float8, status: utf8 }`,
  },
  {
    id: 'quickstart-create-view',
    title: 'Create a Transactional View',
    category: 'guide',
    code: `create transactional view shop::open_orders { id: int4, item: utf8, amount: float8 } as {
  from shop::orders
  filter { status == "open" }
  map { id, item, amount }
}`,
  },
  {
    id: 'quickstart-insert',
    title: 'Insert Rows',
    category: 'guide',
    code: `INSERT shop::orders [
  { id: 1, item: "keyboard", amount: 89.0, status: "open" },
  { id: 2, item: "monitor", amount: 349.5, status: "open" },
  { id: 3, item: "cable", amount: 12.5, status: "shipped" },
  { id: 4, item: "desk", amount: 420.0, status: "shipped" }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
shop      | orders | 4`,
  },
  {
    id: 'quickstart-query-table',
    title: 'Query the Table',
    category: 'guide',
    code: `from shop::orders
filter { status == "open" }
sort { id: asc }`,
    expected: `id | item     | amount | status
---+----------+--------+-------
1  | keyboard | 89     | open
2  | monitor  | 349.5  | open`,
  },
  {
    id: 'quickstart-query-view',
    title: 'Query the View',
    category: 'guide',
    code: `from shop::open_orders
sort { id: asc }`,
    expected: `id | item     | amount
---+----------+-------
1  | keyboard | 89
2  | monitor  | 349.5`,
  },
  {
    id: 'quickstart-ship-order',
    title: 'Update a Row',
    category: 'guide',
    code: `UPDATE shop::orders { status: "shipped" } FILTER { id == 1 }`,
    expected: `namespace | table  | updated
----------+--------+--------
shop      | orders | 1`,
  },
  {
    id: 'quickstart-view-updated',
    title: 'The View Maintained Itself',
    category: 'guide',
    code: `from shop::open_orders
sort { id: asc }`,
    expected: `id | item    | amount
---+---------+-------
2  | monitor | 349.5`,
  },
  {
    id: 'quickstart-aggregate',
    title: 'Aggregate Revenue by Status',
    category: 'guide',
    code: `from shop::orders
aggregate { revenue: math::sum(amount), orders: math::count(id) } by { status }
sort { status: asc }`,
    expected: `status  | revenue | orders
--------+---------+-------
open    | 349.5   | 1
shipped | 521.5   | 3`,
  },
];
