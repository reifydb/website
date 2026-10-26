import type { CodeExample } from '@/lib/examples/types';

export const fromTableExample: CodeExample = {
    id: 'from-table',
    title: 'Read a Table',
    code: `create namespace tf_from;
create table tf_from::orders { id: int4, customer: utf8, total: float8, note: Option(utf8) };
insert tf_from::orders [
  { id: 1, customer: "ada", total: 30.5, note: "rush" },
  { id: 2, customer: "bob", total: 12.0 },
  { id: 3, customer: "ada", total: 8.25, note: "gift" },
  { id: 4, customer: "cy", total: 45.0 }
];
from tf_from::orders`,
    expected: `id | customer | total | note   | #rownum
---+----------+-------+--------+--------
4  | cy       | 45    | ⟪none⟫ | 4
3  | ada      | 8.25  | gift   | 3
2  | bob      | 12    | ⟪none⟫ | 2
1  | ada      | 30.5  | rush   | 1`,
  };

export const fromPipelineExample: CodeExample = {
    id: 'from-pipeline',
    title: 'from Feeds the Rest of the Pipeline',
    code: `from tf_from::orders
filter { total > 20 }
map { id, total }`,
    expected: `id | total | #rownum
---+-------+--------
4  | 45    | 4
1  | 30.5  | 1`,
  };

export const fromInlineExample: CodeExample = {
    id: 'from-inline',
    title: 'Inline Records',
    code: `from [
  { name: "ada", n: 1 },
  { name: "bob", n: 2 }
]`,
    expected: `n | name
--+-----
1 | ada
2 | bob`,
  };

export const fromInlineRaggedExample: CodeExample = {
    id: 'from-inline-ragged',
    title: 'Missing Fields Become none',
    code: `from [{ id: 1, name: "ada" }, { id: 2 }, { name: "cy" }]`,
    expected: `id     | name
-------+-------
1      | ada
2      | ⟪none⟫
⟪none⟫ | cy`,
  };

export const fromInlineExpressionsExample: CodeExample = {
    id: 'from-inline-expressions',
    title: 'Inline Values Are Expressions',
    code: `from [{ n: 1 + 1, half: 7 / 2, who: text::upper("ada") }]`,
    expected: `half | n | who
-----+---+----
3    | 2 | ADA`,
  };

export const fromEmptyExample: CodeExample = {
    id: 'from-empty',
    title: 'An Empty Source',
    code: `from []
extend { label: "never evaluated" }`,
    expected: `(empty)`,
  };

export const fromViewCreateExample: CodeExample = {
    id: 'from-view-create',
    title: 'Create a View over the Table',
    code: `create deferred view tf_from::big_orders { id: int4, customer: utf8, total: float8 } as {
  from tf_from::orders
  filter { total > 20 }
  map { id, customer, total }
}`,
    expected: `id    | namespace | view       | created
------+-----------+------------+--------
16417 | tf_from   | big_orders | true`,
  };

export const fromViewReadExample: CodeExample = {
    id: 'from-view-read',
    title: 'Read a View',
    code: `from tf_from::big_orders`,
    expected: `id | customer | total | #rownum
---+----------+-------+--------
4  | cy       | 45    | 4
1  | ada      | 30.5  | 1`,
  };

export const fromVariableExample: CodeExample = {
    id: 'from-variable',
    title: 'Read a Frame Variable',
    code: `let $orders = from tf_from::orders;
from $orders filter { customer == "ada" }`,
    expected: `id | customer | total | note | #rownum
---+----------+-------+------+--------
3  | ada      | 8.25  | gift | 3
1  | ada      | 30.5  | rush | 1`,
  };

export const fromMissingExample: CodeExample = {
    id: 'from-missing',
    title: 'An Unknown Source Is an Error',
    code: `from tf_from::nosuch`,
    expectsError: true,
  };

export const fromExamples: CodeExample[] = [
  fromTableExample,
  fromPipelineExample,
  fromInlineExample,
  fromInlineRaggedExample,
  fromInlineExpressionsExample,
  fromEmptyExample,
  fromViewCreateExample,
  fromViewReadExample,
  fromVariableExample,
  fromMissingExample,
];
