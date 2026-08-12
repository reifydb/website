import type { CodeExample } from '@/lib/examples/types';

export const mathAsinInlineExample: CodeExample = {
    id: 'math-asin-inline',
    title: 'Calculate arcsine',
    code: `map {math::asin(cast(0.5, float8))}`,
  };

export const functionsMathAsinExamples: CodeExample[] = [
  mathAsinInlineExample,
];
