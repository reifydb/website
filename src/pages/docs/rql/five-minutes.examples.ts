import type { CodeExample } from '@/lib/examples/types';

export const rql5PipelineExample: CodeExample = {
    id: 'rql5-pipeline',
    title: 'A Complete Pipeline',
    code: `from app::users
filter { active == true }
map { name, email }
sort { name: asc }`,
    expected: `name  | email
------+------------------
Alice | alice@example.com
Bob   | bob@example.com
David | david@example.com
Eve   | eve@example.com`,
  };

export const rql5InlineExample: CodeExample = {
    id: 'rql5-inline',
    title: 'Query Inline Data',
    code: `from [
  { name: "Ada", born: 1815 },
  { name: "Grace", born: 1906 },
  { name: "Edsger", born: 1930 }
]
sort { born: asc }`,
    expected: `born | name
-----+-------
1815 | Ada
1906 | Grace
1930 | Edsger`,
  };

export const rql5MapComputedExample: CodeExample = {
    id: 'rql5-map-computed',
    title: 'Shape Rows with map',
    code: `from [
  { item: "keyboard", amount: 89.0 },
  { item: "monitor", amount: 349.5 },
  { item: "desk", amount: 420.0 }
]
map { item, amount, with_shipping: amount + 4.5 }
sort { amount: desc }
take 2`,
    expected: `item    | amount | with_shipping
--------+--------+--------------
desk    | 420.0  | 424.5
monitor | 349.5  | 354.0`,
  };

export const rql5AggregateExample: CodeExample = {
    id: 'rql5-aggregate',
    title: 'Aggregate by Group',
    code: `from [
  { region: "north", amount: 120.0 },
  { region: "north", amount: 80.0 },
  { region: "south", amount: 200.5 }
]
aggregate { total: math::sum(amount), sales: math::count(amount) } by { region }
sort { region: asc }`,
    expected: `region | total | sales
-------+-------+------
north  | 200.0 | 2
south  | 200.5 | 1`,
  };

export const rql5NonePropagatesExample: CodeExample = {
    id: 'rql5-none-propagates',
    title: 'none Propagates Through Arithmetic',
    code: `from [
  { id: 1, score: 10 },
  { id: 2, score: none }
]
map { id, doubled: score * 2 }
sort { id: asc }`,
    expected: `id | doubled
---+--------
1  | 20
2  | ⟪none⟫`,
  };

export const rql5NoneFilterExample: CodeExample = {
    id: 'rql5-none-filter',
    title: 'Filter Out Missing Values',
    code: `from [
  { id: 1, score: 10 },
  { id: 2, score: none }
]
filter { is::some(score) }`,
    expected: `id | score
---+------
1  | 10`,
  };

export const rql5LetExample: CodeExample = {
    id: 'rql5-let',
    title: 'Variables with let',
    code: `let $threshold = 30;
from app::users
filter { age >= $threshold }
map { name, age }
sort { age: desc }`,
    expected: `name  | age
------+----
Carol | 35
Eve   | 32
Alice | 30`,
  };

export const rqlFiveMinutesExamples: CodeExample[] = [
  rql5PipelineExample,
  rql5InlineExample,
  rql5MapComputedExample,
  rql5AggregateExample,
  rql5NonePropagatesExample,
  rql5NoneFilterExample,
  rql5LetExample,
];
