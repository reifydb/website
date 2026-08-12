import type { CodeExample } from '@/lib/examples/types';

export const mathTanInlineExample: CodeExample = {
    id: 'math-tan-inline',
    title: 'Calculate tangent',
    code: `map {math::tan(cast(1.0, float8))}`,
  };

export const functionsMathTanExamples: CodeExample[] = [
  mathTanInlineExample,
];
