import type { CodeExample } from '@/lib/examples/types';

export const mathModInlineExample: CodeExample = {
    id: 'math-mod-inline',
    title: 'Modulo operation',
    code: `map {math::mod(cast(7, int4), cast(3, int4))}`,
  };

export const functionsMathModExamples: CodeExample[] = [
  mathModInlineExample,
];
