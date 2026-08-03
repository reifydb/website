import type { CodeExample } from '@/lib/examples/types';

export const mathCeilInlineExample: CodeExample = {
    id: 'math-ceil-inline',
    title: 'Ceil a float',
    category: 'function',
    code: `map {math::ceil(cast(3.2, float8))}`,
  };

export const functionsMathCeilExamples: CodeExample[] = [
  mathCeilInlineExample,
];
