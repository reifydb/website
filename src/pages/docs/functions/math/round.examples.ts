import type { CodeExample } from '@/lib/examples/types';

export const functionsMathRoundExamples: CodeExample[] = [
{
    id: 'math-round-decimal',
    title: 'Round to 2 decimal places',
    category: 'function',
    code: `from app::prices
extend { rounded: math::round(price, 2) }`,
    expected: `id | price              | rounded
---+--------------------+-------------------
4  | 29.989999771118164 | 29.989999771118164
3  | 99.94999694824219  | 99.94999694824219
2  | 49.5               | 49.5
1  | 19.989999771118164 | 19.989999771118164`,
  },
{
    id: 'math-round-integer',
    title: 'Round to nearest integer',
    category: 'function',
    code: `from app::metrics
extend { rounded_value: math::round(value) }`,
    expected: `id | value  | rounded_value
---+--------+--------------
4  | 312    | 312
3  | 89.25  | 89
2  | 230.75 | 231
1  | 125.5  | 126`,
  },
];
