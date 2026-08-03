import type { CodeExample } from '@/lib/examples/types';

export const mathPiInlineExample: CodeExample = {
    id: 'math-pi-inline',
    title: 'Get Pi constant',
    category: 'function',
    code: `map {math::pi()}`,
  };

export const functionsMathPiExamples: CodeExample[] = [
  mathPiInlineExample,
];
