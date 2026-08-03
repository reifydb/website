import type { CodeExample } from '@/lib/examples/types';

export const mathEInlineExample: CodeExample = {
    id: 'math-e-inline',
    title: 'Get Euler number',
    category: 'function',
    code: `map {math::e()}`,
  };

export const functionsMathEExamples: CodeExample[] = [
  mathEInlineExample,
];
