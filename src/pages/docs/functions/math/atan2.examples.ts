import type { CodeExample } from '@/lib/examples/types';

export const mathAtan2InlineExample: CodeExample = {
    id: 'math-atan2-inline',
    title: 'Calculate two-argument arctangent',
    category: 'function',
    code: `map {math::atan2(cast(1.0, float8), cast(1.0, float8))}`,
  };

export const functionsMathAtan2Examples: CodeExample[] = [
  mathAtan2InlineExample,
];
