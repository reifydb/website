import type { CodeExample } from './index';

export const rqlExamples: CodeExample[] = [
  {
    id: 'rql-query-structure',
    title: 'Query Structure',
    category: 'rql',
    expectsError: true, // '#' comments not supported
    code: `from app.users          # Start with a table
filter age >= 18         # Filter rows
select name, email       # Choose columns`,
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
  },
  {
    id: 'rql-single-line-comments',
    title: 'Single-line Comments',
    category: 'rql',
    expectsError: true, // '#' comments not supported
    code: `# This is a comment
from app.users
filter active == true  # Inline comment`,
  },
  {
    id: 'rql-block-comments',
    title: 'Block Comments',
    category: 'rql',
    expectsError: true, // '/* */' block comments not supported
    code: `/*
  Multi-line comment
  describing the query
*/
from app.users`,
  },
];
