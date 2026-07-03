import type { CodeExample } from './index';

export const rqlFiveMinutesExamples: CodeExample[] = [
  {
    id: 'rql5-pipeline',
    title: 'A Complete Pipeline',
    category: 'rql',
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
  },
  {
    id: 'rql5-inline',
    title: 'Query Inline Data',
    category: 'rql',
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
  },
  {
    id: 'rql5-map-computed',
    title: 'Shape Rows with map',
    category: 'rql',
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
  },
  {
    id: 'rql5-aggregate',
    title: 'Aggregate by Group',
    category: 'rql',
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
  },
  {
    id: 'rql5-none-propagates',
    title: 'none Propagates Through Arithmetic',
    category: 'rql',
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
  },
  {
    id: 'rql5-none-filter',
    title: 'Filter Out Missing Values',
    category: 'rql',
    code: `from [
  { id: 1, score: 10 },
  { id: 2, score: none }
]
filter { is::some(score) }`,
    expected: `id | score
---+------
1  | 10`,
  },
  {
    id: 'rql5-let',
    title: 'Variables with let',
    category: 'rql',
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
  },
];

export const rqlForSqlUsersExamples: CodeExample[] = [
  {
    id: 'rqlsql-select',
    title: 'SELECT Becomes a Pipeline',
    category: 'rql',
    code: `from app::users
filter { role == "admin" }
map { name, email }
sort { name: asc }`,
    expected: `name  | email
------+------------------
Alice | alice@example.com
David | david@example.com`,
  },
  {
    id: 'rqlsql-groupby',
    title: 'GROUP BY Becomes aggregate ... by',
    category: 'rql',
    code: `from [
  { category: "book", price: 12.0 },
  { category: "book", price: 8.0 },
  { category: "game", price: 60.0 }
]
aggregate { avg_price: math::avg(price) } by { category }
sort { category: asc }`,
    expected: `category | avg_price
---------+----------
book     | 10.0
game     | 60.0`,
  },
  {
    id: 'rqlsql-eq-none',
    title: 'Comparing to none Never Matches',
    category: 'rql',
    code: `from [
  { id: 1, nickname: "Al" },
  { id: 2, nickname: none }
]
filter { nickname == none }`,
    expected: `(empty)`,
  },
  {
    id: 'rqlsql-is-none',
    title: 'Test for none with is::none',
    category: 'rql',
    code: `from [
  { id: 1, nickname: "Al" },
  { id: 2, nickname: none }
]
filter { is::none(nickname) }`,
    expected: `id | nickname
---+---------
2  | ⟪none⟫`,
  },
];
