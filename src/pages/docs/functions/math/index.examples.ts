import type { CodeExample } from '@/lib/examples/types';

export const functionsMathExamples: CodeExample[] = [
{
    id: 'math-overview-quick',
    title: 'Math Module Quick Example',
    category: 'function',
    code: `from app::sales
aggregate {
  total_revenue: math::sum(amount),
  avg_sale: math::avg(amount)
} by {region}`,
    expected: `region | total_revenue | avg_sale
-------+---------------+---------
North  | 3450.75       | 1725.375
West   | 2100          | 2100
East   | 1800.25       | 1800.25
South  | 2300.5        | 2300.5`,
  },
];
