import type { CodeExample } from '@/lib/examples/types';

export const mathAcosInlineExample: CodeExample = {
    id: 'math-acos-inline',
    title: 'Calculate arccosine',
    code: `map {math::acos(cast(0.5, float8))}`,
  };

export const functionsMathAcosExamples: CodeExample[] = [
  mathAcosInlineExample,
];
