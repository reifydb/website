import type { CodeExample } from '@/lib/examples/types';

export const mathSqrtInlineExample: CodeExample = {
    id: 'math-sqrt-inline',
    title: 'Calculate square root',
    code: `map {math::sqrt(cast(16.0, float8))}`,
  };

export const functionsMathSqrtExamples: CodeExample[] = [
  mathSqrtInlineExample,
];
