import type { CodeExample } from '@/lib/examples/types';

export const mathAtanInlineExample: CodeExample = {
    id: 'math-atan-inline',
    title: 'Calculate arctangent',
    category: 'function',
    code: `map {math::atan(cast(1.0, float8))}`,
  };

export const functionsMathAtanExamples: CodeExample[] = [
  mathAtanInlineExample,
];
