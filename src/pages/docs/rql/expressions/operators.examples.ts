import type { CodeExample } from '@/lib/examples/types';

export const arithmeticExample: CodeExample = {
  id: 'operators-arithmetic',
  title: 'Arithmetic Operators',
  category: 'rql',
  code: `from [{ total: 47, count: 5 }]
extend { sum: total + count, diff: total - count, product: total * count, quotient: total / count, remainder: total % count }`,
  expected: `count | total | sum | diff | product | quotient | remainder
------+-------+-----+------+---------+----------+----------
5     | 47    | 52  | 42   | 235     | 9        | 2`,
};

export const comparisonExample: CodeExample = {
  id: 'operators-comparison',
  title: 'Comparison Operators',
  category: 'rql',
  code: `from [{ price: 45, stock: 3 }]
extend { affordable: price < 50, low_stock: stock <= 5, not_free: price != 0 }`,
  expected: `price | stock | affordable | low_stock | not_free
------+-------+------------+-----------+---------
45    | 3     | true       | true      | true`,
};

export const logicalExample: CodeExample = {
  id: 'operators-logical',
  title: 'Logical Operators',
  category: 'rql',
  code: `from [{ active: true, verified: false }]
extend { both: active and verified, either: active or verified, inactive: not active }`,
  expected: `active | verified | both  | either | inactive
-------+----------+-------+--------+---------
true   | false    | false | true   | false`,
};

export const textMatchExample: CodeExample = {
  id: 'operators-text-match',
  title: 'Text Matching',
  category: 'rql',
  code: `from [{ email: "alice@gmail.com" }]
extend { is_gmail: text::contains(email, "@gmail.com") }`,
  expected: `email           | is_gmail
----------------+---------
alice@gmail.com | true`,
};

export const operatorsExamples: CodeExample[] = [
  arithmeticExample,
  comparisonExample,
  logicalExample,
  textMatchExample,
];
