import type { CodeExample } from '@/lib/examples/types';

export const fromTableExample: CodeExample = {
  id: 'from-table',
  title: 'From a Table',
  category: 'rql',
  code: `from app::users`,
};

export const fromInlineSingleExample: CodeExample = {
  id: 'from-inline-single',
  title: 'From a Single Inline Record',
  category: 'rql',
  code: `from [{ name: "Alice", age: 30 }]`,
  expected: `age | name
----+------
30  | Alice`,
};

export const fromInlineMultiExample: CodeExample = {
  id: 'from-inline-multi',
  title: 'From Multiple Inline Records',
  category: 'rql',
  code: `from [
  { name: 'Bob', age: 25 },
  { name: 'Carol', age: 35 },
  { name: 'Dave', age: 28 }
]`,
  expected: `age | name
----+------
25  | Bob
35  | Carol
28  | Dave`,
};

export const fromInlineTypesExample: CodeExample = {
  id: 'from-inline-types',
  title: 'Inline Records with Mixed Types',
  category: 'rql',
  code: `from [{ id: 1, active: true, price: 19.99, description: "Product A" }]`,
  expected: `active | description | id | price
-------+-------------+----+------
true   | Product A   | 1  | 19.99`,
};

export const fromEmptyExample: CodeExample = {
  id: 'from-empty',
  title: 'Empty Source',
  category: 'rql',
  code: `from []`,
  expected: `(empty)`,
};

export const fromExamples: CodeExample[] = [
  fromTableExample,
  fromInlineSingleExample,
  fromInlineMultiExample,
  fromInlineTypesExample,
  fromEmptyExample,
];
