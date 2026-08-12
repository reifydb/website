import type { CodeExample } from '@/lib/examples/types';

export const cfForRangeExample: CodeExample = {
    id: 'cf-for-range',
    title: 'Iterate a Numeric Range',
    code: `let $factorial = 1;
for $i in gen::series(1, 5) {
  $factorial = $factorial * $i
};
map { factorial: $factorial }`,
    expected: `factorial
---------
120`,
  };

export const cfForFrameExample: CodeExample = {
    id: 'cf-for-frame',
    title: 'Iterate Query Results',
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
  };

export const cfForWritesExample: CodeExample = {
    id: 'cf-for-writes',
    title: 'A for Loop That Writes',
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
  };

export const rqlControlFlowForExamples: CodeExample[] = [
  cfForRangeExample,
  cfForFrameExample,
  cfForWritesExample,
];
