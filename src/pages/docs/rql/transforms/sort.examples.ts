import type { CodeExample } from '@/lib/examples/types';

export const sortAscExample: CodeExample = {
    id: 'sort-asc',
    title: 'Ascending',
    code: `create namespace tf_sort;
create table tf_sort::orders { id: int4, customer: utf8, total: float8, note: Option(utf8) };
insert tf_sort::orders [
  { id: 1, customer: "ada", total: 30.5, note: "rush" },
  { id: 2, customer: "bob", total: 12.0 },
  { id: 3, customer: "ada", total: 8.25, note: "gift" },
  { id: 4, customer: "cy", total: 45.0 },
  { id: 5, customer: "bob", total: 12.0, note: "repeat" }
];
from tf_sort::orders
sort { total: asc }`,
    expected: `id | customer | total | note
---+----------+-------+-------
3  | ada      | 8.25  | gift
5  | bob      | 12    | repeat
2  | bob      | 12    | ⟪none⟫
1  | ada      | 30.5  | rush
4  | cy       | 45    | ⟪none⟫`,
  };

export const sortDescExample: CodeExample = {
    id: 'sort-desc',
    title: 'Descending',
    code: `from tf_sort::orders
sort { total: desc }`,
    expected: `id | customer | total | note
---+----------+-------+-------
4  | cy       | 45    | ⟪none⟫
1  | ada      | 30.5  | rush
5  | bob      | 12    | repeat
2  | bob      | 12    | ⟪none⟫
3  | ada      | 8.25  | gift`,
  };

export const sortBareExample: CodeExample = {
    id: 'sort-bare',
    title: 'No Direction Means Descending',
    code: `from tf_sort::orders
sort { total }`,
    expected: `id | customer | total | note
---+----------+-------+-------
4  | cy       | 45    | ⟪none⟫
1  | ada      | 30.5  | rush
5  | bob      | 12    | repeat
2  | bob      | 12    | ⟪none⟫
3  | ada      | 8.25  | gift`,
  };

export const sortMultiExample: CodeExample = {
    id: 'sort-multi',
    title: 'Several Keys, Each with Its Own Direction',
    code: `from tf_sort::orders
sort { customer: asc, total: desc }
map { customer, total, id }`,
    expected: `customer | total | id
---------+-------+---
ada      | 30.5  | 1
ada      | 8.25  | 3
bob      | 12    | 5
bob      | 12    | 2
cy       | 45    | 4`,
  };

export const sortNoneAscExample: CodeExample = {
    id: 'sort-none-asc',
    title: 'none Sorts Last Ascending',
    code: `from tf_sort::orders
sort { note: asc }
map { id, note }`,
    expected: `id | note
---+-------
3  | gift
5  | repeat
1  | rush
4  | ⟪none⟫
2  | ⟪none⟫`,
  };

export const sortNoneDescExample: CodeExample = {
    id: 'sort-none-desc',
    title: 'none Sorts First Descending',
    code: `from tf_sort::orders
sort { note: desc }
map { id, note }`,
    expected: `id | note
---+-------
4  | ⟪none⟫
2  | ⟪none⟫
1  | rush
5  | repeat
3  | gift`,
  };

export const sortTakeExample: CodeExample = {
    id: 'sort-take',
    title: 'Top N with take',
    code: `from tf_sort::orders
sort { total: desc }
take 2`,
    expected: `id | customer | total | note
---+----------+-------+-------
4  | cy       | 45    | ⟪none⟫
1  | ada      | 30.5  | rush`,
  };

export const sortTextExample: CodeExample = {
    id: 'sort-text',
    title: 'Text Sorts by Byte Value',
    code: `from [{ name: "ada" }, { name: "Bob" }, { name: "cy" }, { name: "Al" }]
sort { name: asc }`,
    expected: `name
----
Al
Bob
ada
cy`,
  };

export const sortExpressionExample: CodeExample = {
    id: 'sort-expression',
    title: 'Keys Must Be Column Names',
    code: `from tf_sort::orders
sort { total * 2 }`,
    expectsError: true,
  };

export const sortDroppedColumnExample: CodeExample = {
    id: 'sort-dropped-column',
    title: 'A Column Dropped by map Cannot Be Sorted',
    code: `from tf_sort::orders
map { id }
sort { total: asc }`,
    expectsError: true,
  };

export const rqlTransformsSortExamples: CodeExample[] = [
  sortAscExample,
  sortDescExample,
  sortBareExample,
  sortMultiExample,
  sortNoneAscExample,
  sortNoneDescExample,
  sortTakeExample,
  sortTextExample,
  sortExpressionExample,
  sortDroppedColumnExample,
];
