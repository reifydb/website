import type { CodeExample } from '@/lib/examples/types';

export const mathExpInlineExample: CodeExample = {
    id: 'math-exp-inline',
    title: 'Calculate exponential',
    category: 'function',
    code: `map {math::exp(cast(1.0, float8))}`,
  };

export const functionsMathExpExamples: CodeExample[] = [
  mathExpInlineExample,
];
