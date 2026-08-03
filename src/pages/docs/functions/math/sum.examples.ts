import type { CodeExample } from '@/lib/examples/types';

export const mathSumByRegionExample: CodeExample = {
    id: 'math-sum-by-region',
    title: 'Calculate total revenue',
    category: 'function',
    code: `from app::orders
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+-----------------
North  | 471.25
West   | 55.25
East   | 245
South  | 89.99`,
  };

export const mathSumMultipleExample: CodeExample = {
    id: 'math-sum-multiple',
    title: 'Multiple aggregations',
    category: 'function',
    code: `from app::sales
aggregate {
  total_revenue: math::sum(amount),
  avg_sale: math::avg(amount)
}`,
    expected: `total_revenue | avg_sale
--------------+---------
9651.5        | 1930.3`,
  };

export const functionsMathSumExamples: CodeExample[] = [
  mathSumByRegionExample,
  mathSumMultipleExample,
];
