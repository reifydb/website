import type { CodeExample } from '@/lib/examples/types';

export const mathAbsConvertExample: CodeExample = {
    id: 'math-abs-convert',
    title: 'Convert to absolute value',
    code: `from app::transactions
extend { abs_amount: math::abs(amount) }`,
    expected: `id | amount | abs_amount | #rownum
---+--------+------------+--------
5  | 500.75 | 500.75     | 5
4  | -30    | 30         | 4
3  | 200    | 200        | 3
2  | -75.25 | 75.25      | 2
1  | 150.5  | 150.5      | 1`,
  };

export const mathAbsFilterExample: CodeExample = {
    id: 'math-abs-filter',
    title: 'Filter by absolute magnitude',
    code: `from app::balances
filter { math::abs(balance) > 1000 }`,
    expected: `id | balance | #rownum
---+---------+--------
3  | 3200    | 3
1  | 1250.5  | 1`,
  };

export const functionsMathAbsExamples: CodeExample[] = [
  mathAbsConvertExample,
  mathAbsFilterExample,
];
