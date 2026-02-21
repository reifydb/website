import type { CodeExample } from './index';

export const rqlExamples: CodeExample[] = [
  {
    id: 'rql-query-structure',
    title: 'Query Structure',
    category: 'rql',
    code: `from app.users
filter age >= 18`,
  },
  {
    id: 'rql-tables',
    title: 'Tables',
    category: 'rql',
    code: `from app.users`,
  },
  {
    id: 'rql-inline-data',
    title: 'Inline Data',
    category: 'rql',
    code: `from [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob"}
]`,
    expected: `id | name
---+------
1  | Alice
2  | Bob`,
  },
];
