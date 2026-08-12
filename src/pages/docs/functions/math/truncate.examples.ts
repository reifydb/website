import type { CodeExample } from '@/lib/examples/types';

export const mathTruncateInlineExample: CodeExample = {
    id: 'math-truncate-inline',
    title: 'Truncate a float',
    code: `map {math::truncate(cast(3.5, float8))}`,
  };

export const functionsMathTruncateExamples: CodeExample[] = [
  mathTruncateInlineExample,
];
