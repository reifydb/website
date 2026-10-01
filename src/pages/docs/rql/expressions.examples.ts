import type { CodeExample } from '@/lib/examples/types';

export const exprPipelineExample: CodeExample = {
    id: 'expr-pipeline',
    title: 'Expressions in filter, extend, and map',
    code: `from [
  { item: "widget", price: 10.0, qty: 3 },
  { item: "gadget", price: 25.0, qty: 1 },
  { item: "gizmo", price: 4.0, qty: 10 }
]
extend { total: price * qty }
filter { total > 25 }
map { item, total, label: item + ": " + total }`,
    expected: `item   | total | label
-------+-------+-------------
widget | 30.0  | widget: 30.0
gizmo  | 40.0  | gizmo: 40.0`,
  };

export const exprColumnChainExample: CodeExample = {
    id: 'expr-column-chain',
    title: 'Later Stages See Earlier Computed Columns',
    code: `from [{ a: 1 }]
extend { b: a + 1 }
extend { c: b * 2 }
filter { c > 3 }`,
    expected: `a | b | c
--+---+--
1 | 2 | 4`,
  };

export const exprUnknownColumnExample: CodeExample = {
    id: 'expr-unknown-column',
    title: 'An Unknown Name Evaluates to none',
    code: `from [{ a: 1 }]
map { b: a + 1, c: b * 2, d: nosuch }`,
    expected: `b | c      | d
--+--------+-------
2 | ⟪none⟫ | ⟪none⟫`,
  };

export const exprFunctionsExample: CodeExample = {
    id: 'expr-functions',
    title: 'Function Calls',
    code: `from [{ name: "  Ada Lovelace " }]
map {
  clean: text::trim(name),
  length: text::length(name),
  nested: text::upper(text::trim(name))
}`,
    expected: `clean        | length | nested
-------------+--------+-------------
Ada Lovelace | 15     | ADA LOVELACE`,
  };

export const exprFunctionsTableExample: CodeExample = {
    id: 'expr-functions-table',
    title: 'Functions over Table Columns',
    code: `create namespace expr;
create table expr::events { id: int4, name: utf8, at: date };
insert expr::events [
  { id: 1, name: "launch", at: @2024-03-15 },
  { id: 2, name: "review", at: @2024-11-02 }
];
from expr::events
map { name, year: date::year(at), quarter: date::quarter(at) }`,
    expected: `name   | year | quarter | #rownum
-------+------+---------+--------
review | 2024 | 4       | 2
launch | 2024 | 1       | 1`,
  };

export const exprFunctionTypeErrorExample: CodeExample = {
    id: 'expr-function-type-error',
    title: 'Argument Types Are Checked',
    description: 'text::upper takes utf8; passing a number fails with FUNCTION_004. A wrong argument count is FUNCTION_002 and an unknown name is FUNCTION_001.',
    code: `map { shout: text::upper(42) }`,
    expectsError: true,
  };

export const exprNonePropagatesExample: CodeExample = {
    id: 'expr-none-propagates',
    title: 'none In, none Out',
    code: `from [{ id: 1, name: "ada" }, { id: 2, name: none }]
map { id, upper: text::upper(name), doubled: id * 2, is_ada: name == "ada" }`,
    expected: `id | upper  | doubled | is_ada
---+--------+---------+-------
1  | ADA    | 2       | true
2  | ⟪none⟫ | 4       | ⟪none⟫`,
  };

export const exprMatchExample: CodeExample = {
    id: 'expr-match',
    title: 'Conditional Values with match',
    code: `from [{ total: 150 }, { total: 50 }, { total: 5 }]
map {
  total,
  size: match {
    total > 100 => "large",
    total > 10 => "medium",
    else => "small"
  }
}`,
    expected: `total | size
------+-------
150   | large
50    | medium
5     | small`,
  };

export const exprAggregateExample: CodeExample = {
    id: 'expr-aggregate',
    title: 'Aggregate Calls, Then Compute on Top',
    code: `from [
  { region: "north", amount: 10.0 },
  { region: "north", amount: 20.0 },
  { region: "south", amount: 5.0 }
]
aggregate { total: math::sum(amount), orders: math::count(amount) } by { region }
map { region, total, average: total / orders }
sort { region: asc }`,
    expected: `region | total | average
-------+-------+--------
north  | 30.0  | 15.0
south  | 5.0   | 5.0`,
  };

export const exprVariableExample: CodeExample = {
    id: 'expr-variable',
    title: 'Variables Inside Expressions',
    code: `let $limit = 100;
let $rate = 0.2;
from [{ id: 1, amount: 150 }, { id: 2, amount: 20 }]
filter { amount > $limit }
map { id, amount, tax: amount * $rate }`,
    expected: `id | amount | tax
---+--------+-----
1  | 150    | 30.0`,
  };

export const exprResultTypesExample: CodeExample = {
    id: 'expr-result-types',
    title: 'Inspecting Result Types',
    code: `map {
  int_sum: meta::type(cast(1, int4) + cast(2, int4)),
  int_div: meta::type(7 / 2),
  dec_div: meta::type(7 / 2.0),
  compare: meta::type(1 == 1),
  concat: meta::type("a" + 1)
}`,
    expected: `int_sum | int_div | dec_div | compare | concat
--------+---------+---------+---------+-------
Int8    | Int1    | Decimal | Boolean | Utf8`,
  };

export const rqlExpressionsExamples: CodeExample[] = [
  exprPipelineExample,
  exprColumnChainExample,
  exprUnknownColumnExample,
  exprFunctionsExample,
  exprFunctionsTableExample,
  exprFunctionTypeErrorExample,
  exprNonePropagatesExample,
  exprMatchExample,
  exprAggregateExample,
  exprVariableExample,
  exprResultTypesExample,
];
