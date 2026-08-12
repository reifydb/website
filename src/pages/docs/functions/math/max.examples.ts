import type { CodeExample } from '@/lib/examples/types';

export const mathMaxByCategoryExample: CodeExample = {
    id: 'math-max-by-category',
    title: 'Find highest price',
    code: `from app::products
aggregate {math::max(price)} by {category}`,
    expected: `category    | math::max(price)
------------+-----------------
Accessories | 19.99
Hardware    | 99.99
Electronics | 49.99`,
  };

export const mathMaxMinTogetherExample: CodeExample = {
    id: 'math-max-min-together',
    title: 'Min and max together',
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
  };

export const functionsMathMaxExamples: CodeExample[] = [
  mathMaxByCategoryExample,
  mathMaxMinTogetherExample,
];
