import type { CodeExample } from '@/lib/examples/types';

export const aggregateWholeTableExample: CodeExample = {
    id: 'aggregate-whole-table',
    title: 'Collapse a Table to One Row',
    code: `create namespace tf_agg;
create table tf_agg::orders { id: int4, customer: utf8, total: float8 };
insert tf_agg::orders [
  { id: 1, customer: "ada", total: 30.5 },
  { id: 2, customer: "bob", total: 12.0 },
  { id: 3, customer: "ada", total: 8.25 },
  { id: 4, customer: "cy", total: 45.0 },
  { id: 5, customer: "bob", total: 12.0 }
];
from tf_agg::orders
aggregate { orders: math::count(id), revenue: math::sum(total) }`,
    expected: `orders | revenue
-------+--------
5      | 107.75`,
  };

export const aggregateByExample: CodeExample = {
    id: 'aggregate-by',
    title: 'One Row per Group',
    code: `from tf_agg::orders
aggregate {
  orders: math::count(id),
  revenue: math::sum(total),
  largest: math::max(total)
} by { customer }
sort { customer: asc }`,
    expected: `customer | orders | revenue | largest
---------+--------+---------+--------
ada      | 2      | 38.75   | 30.5
bob      | 2      | 24      | 12
cy       | 1      | 45      | 45`,
  };

export const aggregateByTwoExample: CodeExample = {
    id: 'aggregate-by-two',
    title: 'Group by Several Columns',
    code: `create table tf_agg::sales { region: utf8, month: utf8, amount: float8 };
insert tf_agg::sales [
  { region: "north", month: "jan", amount: 100.0 },
  { region: "north", month: "jan", amount: 50.0 },
  { region: "north", month: "feb", amount: 75.0 },
  { region: "south", month: "jan", amount: 20.0 },
  { region: "south", month: "feb", amount: 30.0 },
  { region: "south", month: "feb", amount: 30.0 }
];
from tf_agg::sales
aggregate { total: math::sum(amount) } by { region, month }
sort { region: asc, month: asc }`,
    expected: `region | month | total
-------+-------+------
north  | feb   | 75
north  | jan   | 150
south  | feb   | 60
south  | jan   | 20`,
  };

export const aggregateHavingExample: CodeExample = {
    id: 'aggregate-having',
    title: 'Filter Groups After Aggregating',
    code: `from tf_agg::orders
aggregate { orders: math::count(id), revenue: math::sum(total) } by { customer }
filter { revenue > 30 }
sort { revenue: desc }`,
    expected: `customer | orders | revenue
---------+--------+--------
cy       | 1      | 45
ada      | 2      | 38.75`,
  };

export const aggregateNoneKeyExample: CodeExample = {
    id: 'aggregate-none-key',
    title: 'none Is a Group of Its Own',
    code: `create table tf_agg::tickets { id: int4, assignee: Option(utf8), points: int4 };
insert tf_agg::tickets [
  { id: 1, assignee: "ada", points: 3 },
  { id: 2, points: 5 },
  { id: 3, assignee: "ada", points: 1 },
  { id: 4, points: 2 },
  { id: 5, assignee: "bob", points: 8 }
];
from tf_agg::tickets
aggregate { tickets: math::count(id), points: math::sum(points) } by { assignee }
sort { assignee: asc }`,
    expected: `assignee | tickets | points
---------+---------+-------
ada      | 2       | 4
bob      | 1       | 8
⟪none⟫   | 2       | 7`,
  };

export const aggregateNoneValuesExample: CodeExample = {
    id: 'aggregate-none-values',
    title: 'Aggregates Skip none Inputs',
    code: `create table tf_agg::items { id: int4, price: float8, qty: Option(int4) };
insert tf_agg::items [
  { id: 1, price: 2.5, qty: 4 },
  { id: 2, price: 10.0 },
  { id: 3, price: 1.25, qty: 8 }
];
from tf_agg::items
aggregate {
  rows: math::count(id),
  with_qty: math::count(qty),
  units: math::sum(qty),
  avg_units: math::avg(qty)
}`,
    expected: `rows | with_qty | units | avg_units
-----+----------+-------+----------
3    | 2        | 12    | 6`,
  };

export const aggregateEmptyInputExample: CodeExample = {
    id: 'aggregate-empty-input',
    title: 'No Input Rows, No Output Row',
    code: `from tf_agg::orders
filter { total > 1000 }
aggregate { orders: math::count(id) }`,
    expected: `(empty)`,
  };

export const aggregateKeysOnlyExample: CodeExample = {
    id: 'aggregate-keys-only',
    title: 'Keys Without Aggregates',
    code: `from tf_agg::orders
aggregate {} by { customer }
sort { customer: asc }`,
    expected: `customer
--------
ada
bob
cy`,
  };

export const aggregateUnaliasedExample: CodeExample = {
    id: 'aggregate-unaliased',
    title: 'An Aggregate Without an Alias',
    code: `from tf_agg::orders
aggregate { math::avg(total) } by { customer }
sort { customer: asc }`,
    expected: `customer | math::avg(total)
---------+-----------------
ada      | 19.375
bob      | 12
cy       | 45`,
  };

export const aggregateTextMinExample: CodeExample = {
    id: 'aggregate-text-min',
    title: 'min and max Are Numeric Only',
    code: `from tf_agg::orders
aggregate { first: math::min(customer) }`,
    expectsError: true,
  };

export const rqlTransformsAggregateExamples: CodeExample[] = [
  aggregateWholeTableExample,
  aggregateByExample,
  aggregateByTwoExample,
  aggregateHavingExample,
  aggregateNoneKeyExample,
  aggregateNoneValuesExample,
  aggregateEmptyInputExample,
  aggregateKeysOnlyExample,
  aggregateUnaliasedExample,
  aggregateTextMinExample,
];
