import type { CodeExample } from '@/lib/examples/types';

export const filterBasicExample: CodeExample = {
    id: 'filter-basic',
    title: 'Keep Rows That Match',
    code: `create namespace tf_filter;
create table tf_filter::orders { id: int4, customer: utf8, total: float8, note: Option(utf8) };
insert tf_filter::orders [
  { id: 1, customer: "ada", total: 30.5, note: "rush" },
  { id: 2, customer: "bob", total: 12.0 },
  { id: 3, customer: "ada", total: 8.25, note: "gift" },
  { id: 4, customer: "cy", total: 45.0 },
  { id: 5, customer: "bob", total: 12.0, note: "repeat" }
];
from tf_filter::orders
filter { total > 20 }`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
4  | cy       | 45    | ⟪none⟫ | 4
1  | ada      | 30.5  | rush   | 1`,
  };

export const filterOrExample: CodeExample = {
    id: 'filter-or',
    title: 'Combine Conditions with and, or, not',
    code: `from tf_filter::orders
filter { customer == "ada" or total > 40 }`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
4  | cy       | 45    | ⟪none⟫ | 4
3  | ada      | 8.25  | gift   | 3
1  | ada      | 30.5  | rush   | 1`,
  };

export const filterInExample: CodeExample = {
    id: 'filter-in',
    title: 'Match Any of a List',
    code: `from tf_filter::orders
filter { customer in ["ada", "cy"] }`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
4  | cy       | 45    | ⟪none⟫ | 4
3  | ada      | 8.25  | gift   | 3
1  | ada      | 30.5  | rush   | 1`,
  };

export const filterBetweenExample: CodeExample = {
    id: 'filter-between',
    title: 'Match a Closed Range',
    code: `from tf_filter::orders
filter { total between 10 and 31 }`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
5  | bob      | 12    | repeat | 5
2  | bob      | 12    | ⟪none⟫ | 2
1  | ada      | 30.5  | rush   | 1`,
  };

export const filterChainedExample: CodeExample = {
    id: 'filter-chained',
    title: 'Chained Filters Narrow Further',
    code: `from tf_filter::orders
filter { total > 10 }
filter { customer == "ada" }`,
    expected: `id | customer | total | note | #rownum
---+----------+-------+------+--------
1  | ada      | 30.5  | rush | 1`,
  };

export const filterNoneIsExample: CodeExample = {
    id: 'filter-none-is',
    title: 'Test for none with is::none',
    code: `from tf_filter::orders
filter { is::none(note) }`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
4  | cy       | 45    | ⟪none⟫ | 4
2  | bob      | 12    | ⟪none⟫ | 2`,
  };

export const filterNoneEqExample: CodeExample = {
    id: 'filter-none-eq',
    title: 'Comparing Against none Never Matches',
    code: `from tf_filter::orders
filter { note == none }`,
    expected: `(empty)`,
  };

export const filterThreeValuedExample: CodeExample = {
    id: 'filter-three-valued',
    title: 'none Rows Are Dropped, Even Under not',
    code: `from tf_filter::orders
filter { not (note == "rush") }`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
5  | bob      | 12    | repeat | 5
3  | ada      | 8.25  | gift   | 3`,
  };

export const filterHavingExample: CodeExample = {
    id: 'filter-having',
    title: 'Filter After aggregate',
    code: `from tf_filter::orders
aggregate { orders: math::count(id), revenue: math::sum(total) } by { customer }
filter { revenue > 30 }
sort { revenue: desc }`,
    expected: `customer | orders | revenue
---------+--------+--------
cy       | 1      | 45
ada      | 2      | 38.75`,
  };

export const filterSymbolicOpsExample: CodeExample = {
    id: 'filter-symbolic-ops',
    title: 'Symbolic && and || Do Not Parse',
    code: `from tf_filter::orders
filter { total > 10 && customer == "ada" }`,
    expectsError: true,
  };

export const filterUnknownColumnExample: CodeExample = {
    id: 'filter-unknown-column',
    title: 'An Unknown Column Is an Error',
    code: `from tf_filter::orders
filter { custmer == "ada" }`,
    expectsError: true,
  };

export const rqlTransformsFilterExamples: CodeExample[] = [
  filterBasicExample,
  filterOrExample,
  filterInExample,
  filterBetweenExample,
  filterChainedExample,
  filterNoneIsExample,
  filterNoneEqExample,
  filterThreeValuedExample,
  filterHavingExample,
  filterSymbolicOpsExample,
  filterUnknownColumnExample,
];
