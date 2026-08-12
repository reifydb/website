import type { CodeExample } from '@/lib/examples/types';

export const blog002Examples: CodeExample[] = [
  {
    id: 'blog002-schema',
    title: 'Table',
    code: `create namespace shop002;
create table shop002::orders { id: int4, region: utf8, total: float4, status: utf8 }`,
  },
  {
    id: 'blog002-view',
    title: 'Deferred View',
    code: `create deferred view shop002::revenue_by_region { region: utf8, revenue: float4 } as {
  from shop002::orders
  filter { status == "paid" }
  aggregate { revenue: math::sum(total) } by { region }
}`,
  },
  {
    id: 'blog002-insert-initial',
    title: 'Three Orders Arrive',
    code: `insert shop002::orders [
  { id: 1, region: "north", total: 120.00, status: "paid" },
  { id: 2, region: "south", total: 80.50, status: "paid" },
  { id: 3, region: "north", total: 240.00, status: "pending" }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
shop002   | orders | 3`,
  },
  {
    id: 'blog002-read-initial',
    title: 'Read The View',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
north  | 120
south  | 80.5`,
  },
  {
    id: 'blog002-insert-north',
    title: 'One More Paid Order',
    code: `insert shop002::orders [
  { id: 4, region: "north", total: 300.00, status: "paid" }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
shop002   | orders | 1`,
  },
  {
    id: 'blog002-read-after-insert',
    title: 'One Row In, One Row Out',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
north  | 420
south  | 80.5`,
  },
  {
    id: 'blog002-update-total',
    title: 'Correct The Total',
    code: `update shop002::orders { total: 180.50 } filter { id == 2 }`,
    expected: `namespace | table  | updated
----------+--------+--------
shop002   | orders | 1`,
  },
  {
    id: 'blog002-read-after-total',
    title: 'The Number Goes Down',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
north  | 420
south  | 180.5`,
  },
  {
    id: 'blog002-update-status-paid',
    title: 'Pending Becomes Paid',
    code: `update shop002::orders { status: "paid" } filter { id == 3 }`,
    expected: `namespace | table  | updated
----------+--------+--------
shop002   | orders | 1`,
  },
  {
    id: 'blog002-read-after-paid',
    title: 'A Row Enters The View',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
north  | 660
south  | 180.5`,
  },
  {
    id: 'blog002-update-status-refunded',
    title: 'Paid Becomes Refunded',
    code: `update shop002::orders { status: "refunded" } filter { id == 1 }`,
    expected: `namespace | table  | updated
----------+--------+--------
shop002   | orders | 1`,
  },
  {
    id: 'blog002-read-after-refund',
    title: 'A Row Leaves The View',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
north  | 540
south  | 180.5`,
  },
  {
    id: 'blog002-update-region',
    title: 'Booked Against The Wrong Region',
    code: `update shop002::orders { region: "south" } filter { id == 4 }`,
    expected: `namespace | table  | updated
----------+--------+--------
shop002   | orders | 1`,
  },
  {
    id: 'blog002-read-after-region',
    title: 'A Row Changes Groups',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
north  | 240
south  | 480.5`,
  },
  {
    id: 'blog002-delete',
    title: 'Delete The Last Paid North Order',
    code: `delete shop002::orders filter { id == 3 }`,
    expected: `namespace | table  | deleted
----------+--------+--------
shop002   | orders | 1`,
  },
  {
    id: 'blog002-read-after-delete',
    title: 'The Group Is Gone',
    code: `from shop002::revenue_by_region
sort { region: asc }`,
    expected: `region | revenue
-------+--------
south  | 480.5`,
  },
];
