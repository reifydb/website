import type { CodeExample } from '@/lib/examples/types';

export const functionsMathAvgExamples: CodeExample[] = [
{
    id: 'math-avg-by-category',
    title: 'Calculate average price',
    category: 'function',
    code: `from app::products
aggregate {math::avg(price)} by {category}`,
    expected: `category    | math::avg(price)
------------+-------------------
Accessories | 17.744999885559082
Hardware    | 99.98999786376953
Electronics | 39.99000072479248`,
  },
{
    id: 'math-avg-with-total',
    title: 'Average with total',
    category: 'function',
    code: `from app::sales
aggregate {
  avg_sale: math::avg(amount),
  total_sales: math::sum(amount)
}`,
    expected: `avg_sale | total_sales
---------+------------
1930.3   | 9651.5`,
  },
];
