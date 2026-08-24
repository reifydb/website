import type { CodeExample } from '@/lib/examples/types';

export const mapSelectExample: CodeExample = {
    id: 'map-select',
    title: 'Pick Columns',
    code: `create namespace tf_map;
create table tf_map::orders { id: int4, customer: utf8, total: float8, note: Option(utf8) };
insert tf_map::orders [
  { id: 1, customer: "ada", total: 30.5, note: "rush" },
  { id: 2, customer: "bob", total: 12.0 },
  { id: 3, customer: "ada", total: 8.25, note: "gift" },
  { id: 4, customer: "cy", total: 45.0 }
];
from tf_map::orders
map { customer, total }`,
    expected: `customer | total
---------+------
cy       | 45
ada      | 8.25
bob      | 12
ada      | 30.5`,
  };

export const mapComputeExample: CodeExample = {
    id: 'map-compute',
    title: 'Rename and Compute',
    code: `from tf_map::orders
map { order_id: id, half: total / 2 }`,
    expected: `order_id | half
---------+------
4        | 22.5
3        | 4.125
2        | 6
1        | 15.25`,
  };

export const mapUnaliasedExample: CodeExample = {
    id: 'map-unaliased',
    title: 'An Expression Without an Alias',
    code: `from tf_map::orders
map { id, total * 2 }`,
    expected: `id | total * 2
---+----------
4  | 90
3  | 16.5
2  | 24
1  | 61`,
  };

export const mapLiteralsOnlyExample: CodeExample = {
    id: 'map-literals-only',
    title: 'map Without a Source',
    code: `map { answer: 42, label: "constant", ok: true }`,
    expected: `answer | label    | ok
-------+----------+-----
42     | constant | true`,
  };

export const mapNoneExample: CodeExample = {
    id: 'map-none',
    title: 'none Propagates Through Expressions',
    code: `create table tf_map::items { id: int4, price: float8, qty: Option(int4) };
insert tf_map::items [
  { id: 1, price: 2.5, qty: 4 },
  { id: 2, price: 10.0 },
  { id: 3, price: 1.25, qty: 8 }
];
from tf_map::items
map { id, cost: price * qty }`,
    expected: `id | cost
---+-------
3  | 10
2  | ⟪none⟫
1  | 10`,
  };

export const mapRownumExample: CodeExample = {
    id: 'map-rownum',
    title: 'Project a System Column',
    code: `from tf_map::orders
map { row: #rownum, customer }`,
    expected: `row | customer
----+---------
4   | cy
3   | ada
2   | bob
1   | ada`,
  };

export const mapMatchExample: CodeExample = {
    id: 'map-match',
    title: 'Derive a Label with match',
    code: `from tf_map::orders
map { id, size: match { total > 20 => "large", else => "small" } }`,
    expected: `id | size
---+------
4  | large
3  | small
2  | small
1  | large`,
  };

export const mapDropsColumnsExample: CodeExample = {
    id: 'map-drops-columns',
    title: 'Columns Not Mapped Are Gone',
    code: `from tf_map::orders
map { id }
sort { total: asc }`,
    expectsError: true,
  };

export const mapUnknownColumnExample: CodeExample = {
    id: 'map-unknown-column',
    title: 'An Unknown Column Reads as none',
    code: `from tf_map::orders
map { id, who: custmer }`,
    expected: `id | who
---+-------
4  | ⟪none⟫
3  | ⟪none⟫
2  | ⟪none⟫
1  | ⟪none⟫`,
  };

export const rqlTransformsMapExamples: CodeExample[] = [
  mapSelectExample,
  mapComputeExample,
  mapUnaliasedExample,
  mapLiteralsOnlyExample,
  mapNoneExample,
  mapRownumExample,
  mapMatchExample,
  mapDropsColumnsExample,
  mapUnknownColumnExample,
];
