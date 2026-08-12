import type { CodeExample } from '@/lib/examples/types';

export const mathLog2InlineExample: CodeExample = {
    id: 'math-log2-inline',
    title: 'Calculate base-2 logarithm',
    code: `map {math::log2(cast(8.0, float8))}`,
  };

export const functionsMathLog2Examples: CodeExample[] = [
  mathLog2InlineExample,
];
