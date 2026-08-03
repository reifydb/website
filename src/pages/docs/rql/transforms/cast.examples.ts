import type { CodeExample } from '@/lib/examples/types';

export const castStringToIntExample: CodeExample = {
  id: 'cast-string-to-int',
  title: 'String to Integer',
  category: 'rql',
  code: `map { cast("42", int4) }`,
  expected: `cast("42", int4)
----------------
42`,
};

export const castFloatTruncatesExample: CodeExample = {
  id: 'cast-float-truncates',
  title: 'Float to Integer Truncates',
  category: 'rql',
  code: `map { cast(3.9, int4) }`,
  expected: `cast(3.9, int4)
---------------
3`,
};

export const castStringToDateExample: CodeExample = {
  id: 'cast-string-to-date',
  title: 'String to Date',
  category: 'rql',
  code: `map { cast("2024-03-15", date) }`,
  expected: `cast("2024-03-15", date)
------------------------
2024-03-15`,
};

export const castStringToBoolExample: CodeExample = {
  id: 'cast-string-to-bool',
  title: 'String to Boolean',
  category: 'rql',
  code: `map { cast("true", bool) }`,
  expected: `cast("true", bool)
------------------
true`,
};

export const castColumnToTextExample: CodeExample = {
  id: 'cast-column-to-text',
  title: 'A Typed Column to Text',
  category: 'rql',
  code: `from app::orders
sort { id: asc }
map { id_text: cast(id, utf8) }
take 1`,
  expected: `id_text
-------
1`,
};

export const castInvalidNumberExample: CodeExample = {
  id: 'cast-invalid-number',
  title: "A String That Isn't Numeric",
  category: 'rql',
  expectsError: true,
  code: `map { cast("abc", int4) }`,
};

export const castUnsupportedPairExample: CodeExample = {
  id: 'cast-unsupported-pair',
  title: 'An Unsupported Type Pair',
  category: 'rql',
  expectsError: true,
  code: `map { cast(true, date) }`,
};

export const castInFilterExample: CodeExample = {
  id: 'cast-in-filter',
  title: 'cast Inside a Filter Condition',
  category: 'rql',
  code: `from app::orders
filter { cast(total, int4) > 200 }`,
  expected: `id | total  | status    | region | created_at                     | order_date
---+--------+-----------+--------+--------------------------------+-----------
5  | 320.75 | pending   | North  | 2024-05-12T16:00:00.000000000Z | 2024-05-12
3  | 245    | completed | East   | 2024-03-10T09:15:00.000000000Z | 2024-03-10`,
};

export const castExamples: CodeExample[] = [
  castStringToIntExample,
  castFloatTruncatesExample,
  castStringToDateExample,
  castStringToBoolExample,
  castColumnToTextExample,
  castInvalidNumberExample,
  castUnsupportedPairExample,
  castInFilterExample,
];
