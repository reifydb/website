import type { CodeExample } from '@/lib/examples/types';

// Note: gen::series is only safe as a for-loop source. Using it as a pipeline
// source (`from gen::series(...)`) panics the current WASM build.
export const rqlControlFlowForExamples: CodeExample[] = [
{
    id: 'cf-for-range',
    title: 'Iterate a Numeric Range',
    category: 'rql',
    code: `let $factorial = 1;
for $i in gen::series(1, 5) {
  $factorial = $factorial * $i
};
map { factorial: $factorial }`,
    expected: `factorial
---------
120`,
  },
{
    id: 'cf-for-frame',
    title: 'Iterate Query Results',
    category: 'rql',
    code: `create namespace cf_for;
create table cf_for::carts { id: int4, qty: int4, price: int4 };
insert cf_for::carts [
  { id: 1, qty: 2, price: 10 },
  { id: 2, qty: 1, price: 25 },
  { id: 3, qty: 4, price: 5 }
];
let $rows = from cf_for::carts;
let $revenue = 0;
for $row in $rows {
  $revenue = $revenue + $row.qty * $row.price
};
map { revenue: $revenue }`,
    expected: `revenue
-------
65`,
  },
{
    id: 'cf-for-inline-source',
    title: 'Iterating an Inline Query',
    description: 'A query wrapped in curly braces can be used directly as the for source, without binding it to a frame variable first.',
    category: 'rql',
    code: `let $count = 0;
for $row in { from cf_for::carts } {
  $count = $count + 1
};
map { count: $count }`,
    expected: `count
-----
3`,
  },
{
    id: 'cf-for-writes',
    title: 'A for Loop That Writes',
    category: 'rql',
    code: `create table cf_for::restock { id: int4, qty: int4 };
let $items = from cf_for::carts;
for $item in $items {
  if $item.qty >= 2 {
    insert cf_for::restock [{ id: $item.id, qty: $item.qty }]
  }
};
from cf_for::restock sort { id: asc }`,
    expected: `id | qty
---+----
1  | 2
3  | 4`,
  },
];
