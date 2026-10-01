import type { CodeExample } from '@/lib/examples/types';

export const takeBasicExample: CodeExample = {
    id: 'take-basic',
    title: 'The First N Rows',
    code: `create namespace tf_take;
create table tf_take::events { id: int4, kind: utf8, size: int4 };
insert tf_take::events [
  { id: 1, kind: "click", size: 10 },
  { id: 2, kind: "view", size: 25 },
  { id: 3, kind: "click", size: 5 },
  { id: 4, kind: "purchase", size: 120 },
  { id: 5, kind: "view", size: 40 }
];
from tf_take::events
take 2`,
    expected: `id | kind     | size | #rownum
---+----------+------+--------
5  | view     | 40   | 5
4  | purchase | 120  | 4`,
  };

export const takeTopNExample: CodeExample = {
    id: 'take-top-n',
    title: 'Top N: Sort, Then Take',
    code: `from tf_take::events
sort { size: desc }
take 3`,
    expected: `id | kind     | size | #rownum
---+----------+------+--------
4  | purchase | 120  | 4
5  | view     | 40   | 5
2  | view     | 25   | 2`,
  };

export const takeAfterFilterExample: CodeExample = {
    id: 'take-after-filter',
    title: 'Take Applies to Whatever Reaches It',
    code: `from tf_take::events
filter { kind == "click" }
sort { id: asc }
take 1`,
    expected: `id | kind  | size | #rownum
---+-------+------+--------
1  | click | 10   | 1`,
  };

export const takeZeroExample: CodeExample = {
    id: 'take-zero',
    title: 'take 0 Yields No Rows',
    code: `from tf_take::events
take 0`,
    expected: `(empty)`,
  };

export const takeMoreThanAvailableExample: CodeExample = {
    id: 'take-more-than-available',
    title: 'Asking for More Than Exists',
    code: `from tf_take::events
take 100`,
    expected: `id | kind     | size | #rownum
---+----------+------+--------
5  | view     | 40   | 5
4  | purchase | 120  | 4
3  | click    | 5    | 3
2  | view     | 25   | 2
1  | click    | 10   | 1`,
  };

export const takeVariableExample: CodeExample = {
    id: 'take-variable',
    title: 'A Variable as the Count',
    code: `let $n = 2;
from tf_take::events
take $n`,
    expected: `id | kind     | size | #rownum
---+----------+------+--------
5  | view     | 40   | 5
4  | purchase | 120  | 4`,
  };

export const takeInUpdateExample: CodeExample = {
    id: 'take-in-update',
    title: 'Bound a Mutation',
    code: `update tf_take::events { size: 0 }
filter { kind == "view" }
take 1
returning { id, kind, size }`,
    expected: `id | kind | size | #rownum
---+------+------+--------
5  | view | 0    | 5`,
  };

export const rqlTransformsTakeExamples: CodeExample[] = [
  takeBasicExample,
  takeTopNExample,
  takeAfterFilterExample,
  takeZeroExample,
  takeMoreThanAvailableExample,
  takeVariableExample,
  takeInUpdateExample,
];
