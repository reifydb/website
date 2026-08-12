import type { CodeExample } from '@/lib/examples/types';

export const mathAvgByCategoryExample: CodeExample = {
    id: 'math-avg-by-category',
    title: 'Calculate average price',
    code: `from app::products
aggregate {math::avg(price)} by {category}`,
    expected: `category    | math::avg(price)
------------+-----------------
Accessories | 17.745
Hardware    | 99.99
Electronics | 39.99`,
  };

export const mathAvgWithTotalExample: CodeExample = {
    id: 'math-avg-with-total',
    title: 'Average with total',
    code: `from app::sales
aggregate {
  avg_sale: math::avg(amount),
  total_sales: math::sum(amount)
}`,
    expected: `avg_sale | total_sales
---------+------------
1930.3   | 9651.5`,
  };

export const functionsMathAvgExamples: CodeExample[] = [
  mathAvgByCategoryExample,
  mathAvgWithTotalExample,
];
