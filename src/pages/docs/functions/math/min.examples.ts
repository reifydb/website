import type { CodeExample } from '@/lib/examples/types';

export const functionsMathMinExamples: CodeExample[] = [
{
    id: 'math-min-by-category',
    title: 'Find lowest price',
    category: 'function',
    code: `from app::products
aggregate {math::min(price)} by {category}`,
    expected: `category    | math::min(price)
------------+-------------------
Accessories | 15.5
Hardware    | 99.98999786376953
Electronics | 29.989999771118164`,
  },
{
    id: 'math-min-max-together',
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
