import type { CodeExample } from '@/lib/examples/types';

export const mathSinInlineExample: CodeExample = {
    id: 'math-sin-inline',
    title: 'Calculate sine',
    code: `map {math::sin(cast(1.0, float8))}`,
  };

export const functionsMathSinExamples: CodeExample[] = [
  mathSinInlineExample,
];
