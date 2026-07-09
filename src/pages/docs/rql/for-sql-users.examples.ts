import type { CodeExample } from '@/lib/examples/types';

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
