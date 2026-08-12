import type { CodeExample } from '@/lib/examples/types';

export const mathSignInlineExample: CodeExample = {
    id: 'math-sign-inline',
    title: 'Get sign of number',
    code: `map {math::sign(cast(-50000, int4))}`,
  };

export const functionsMathSignExamples: CodeExample[] = [
  mathSignInlineExample,
];
