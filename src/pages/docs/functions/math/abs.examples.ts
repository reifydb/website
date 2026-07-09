import type { CodeExample } from '@/lib/examples/types';

export const functionsMathAbsExamples: CodeExample[] = [
{
    id: 'math-abs-convert',
    title: 'Convert to absolute value',
    category: 'function',
    code: `from app::transactions
extend { abs_amount: math::abs(amount) }`,
    expected: `id | amount | abs_amount
---+--------+-----------
5  | 500.75 | 500.75
4  | -30    | 30
3  | 200    | 200
2  | -75.25 | 75.25
1  | 150.5  | 150.5`,
  },
{
    id: 'math-abs-filter',
    title: 'Filter by absolute magnitude',
    category: 'function',
    code: `from app::balances
filter { math::abs(balance) > 1000 }`,
    expected: `id | balance
---+--------
3  | 3200
1  | 1250.5`,
  },
];
