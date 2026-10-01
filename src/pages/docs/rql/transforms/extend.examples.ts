import type { CodeExample } from '@/lib/examples/types';

export const extendBasicExample: CodeExample = {
    id: 'extend-basic',
    title: 'Add a Computed Column',
    code: `create namespace tf_extend;
create table tf_extend::items { id: int4, price: float8, qty: Option(int4) };
insert tf_extend::items [
  { id: 1, price: 2.5, qty: 4 },
  { id: 2, price: 10.0 },
  { id: 3, price: 1.25, qty: 8 }
];
from tf_extend::items
extend { line: price * qty }`,
    expected: `id | price | qty    | line   | #rownum
---+-------+--------+--------+--------
3  | 1.25  | 8      | 10     | 3
2  | 10    | ⟪none⟫ | ⟪none⟫ | 2
1  | 2.5   | 4      | 10     | 1`,
  };

export const extendMultipleExample: CodeExample = {
    id: 'extend-multiple',
    title: 'Several Columns, Later Ones See Earlier Ones',
    code: `from tf_extend::items
extend { doubled: price * 2, quadrupled: doubled * 2 }`,
    expected: `id | price | qty    | doubled | quadrupled | #rownum
---+-------+--------+---------+------------+--------
3  | 1.25  | 8      | 2.5     | 5          | 3
2  | 10    | ⟪none⟫ | 20      | 40         | 2
1  | 2.5   | 4      | 5       | 10         | 1`,
  };

export const extendFilterExample: CodeExample = {
    id: 'extend-filter',
    title: 'Filter on the New Column',
    code: `from tf_extend::items
extend { has_qty: is::some(qty) }
filter { has_qty }`,
    expected: `id | price | qty | has_qty | #rownum
---+-------+-----+---------+--------
3  | 1.25  | 8   | true    | 3
1  | 2.5   | 4   | true    | 1`,
  };

export const extendAfterAggregateExample: CodeExample = {
    id: 'extend-after-aggregate',
    title: 'Extend an Aggregate Result',
    code: `from tf_extend::items
aggregate { units: math::sum(qty), lines: math::count(id) } by {}
extend { units_per_line: units / lines }`,
    expected: `units | lines | units_per_line
------+-------+---------------
12    | 3     | 4`,
  };

export const extendDuplicateExample: CodeExample = {
    id: 'extend-duplicate',
    title: 'An Existing Name Is an Error',
    code: `from tf_extend::items
extend { price: price * 2 }`,
    expectsError: true,
  };

export const extendUnaliasedExample: CodeExample = {
    id: 'extend-unaliased',
    title: 'An Expression Without an Alias',
    code: `from tf_extend::items
extend { price * 2 }`,
    expected: `id | price | qty    | price * 2 | #rownum
---+-------+--------+-----------+--------
3  | 1.25  | 8      | 2.5       | 3
2  | 10    | ⟪none⟫ | 20        | 2
1  | 2.5   | 4      | 5         | 1`,
  };

export const extendUnknownColumnExample: CodeExample = {
    id: 'extend-unknown-column',
    title: 'A Column Dropped Upstream Reads as none',
    code: `from tf_extend::items
map { id, price }
extend { line: price * qty }`,
    expected: `id | price | line
---+-------+-------
3  | 1.25  | ⟪none⟫
2  | 10    | ⟪none⟫
1  | 2.5   | ⟪none⟫`,
  };

export const rqlTransformsExtendExamples: CodeExample[] = [
  extendBasicExample,
  extendMultipleExample,
  extendFilterExample,
  extendAfterAggregateExample,
  extendDuplicateExample,
  extendUnaliasedExample,
  extendUnknownColumnExample,
];
