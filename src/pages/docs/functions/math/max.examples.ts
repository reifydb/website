import type { CodeExample } from '@/lib/examples/types';

export const functionsMathMaxExamples: CodeExample[] = [
{
    id: 'math-max-by-category',
    title: 'Find highest price',
    category: 'function',
    code: `from app::products
aggregate {math::max(price)} by {category}`,
    expected: `category    | math::max(price)
------------+-------------------
Accessories | 19.989999771118164
Hardware    | 99.98999786376953
Electronics | 49.9900016784668`,
  },
{
    id: 'math-max-min-together',
    title: 'Min and max together',
    category: 'function',
    code: `from app::sales
aggregate {
  lowest: math::min(amount),
  highest: math::max(amount)
} by {month}`,
    expected: `month    | lowest  | highest
---------+---------+--------
March    | 1950.75 | 1950.75
February | 1800.25 | 2100
January  | 1500    | 2300.5`,
  },
];
