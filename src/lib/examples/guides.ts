import type { CodeExample } from './index';

export const guideExamples: CodeExample[] = [
  {
    id: 'guide-first-query',
    title: 'Your First Query',
    category: 'guide',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]`,
  },
  {
    id: 'guide-filtering-data',
    title: 'Filtering Data',
    category: 'guide',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]
filter role == "user"`,
  },
  {
    id: 'guide-selecting-columns',
    title: 'Selecting Columns',
    category: 'guide',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]
filter role == "user"
select {name}`,
  },
  {
    id: 'guide-creating-table',
    title: 'Creating a Table',
    category: 'guide',
    expectsError: true, // table already exists in seed data
    code: `create table app.users {
  id: int4,
  name: utf8,
  email: utf8,
  role: utf8
}`,
  },
  {
    id: 'guide-inserting-data',
    title: 'Inserting Data',
    category: 'guide',
    expectsError: true, // "insert into" syntax not supported
    code: `insert into app.users [
  {id: 1, name: "Alice", email: "alice@example.com", role: "admin"},
  {id: 2, name: "Bob", email: "bob@example.com", role: "user"}
]`,
  },
  {
    id: 'guide-querying-tables',
    title: 'Querying Tables',
    category: 'guide',
    expectsError: true, // multiple select columns require curly braces
    code: `from app.users
filter role == "admin"
select name, email`,
  },
];
