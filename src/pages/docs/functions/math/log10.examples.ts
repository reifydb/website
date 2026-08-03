import type { CodeExample } from '@/lib/examples/types';

export const mathLog10InlineExample: CodeExample = {
    id: 'math-log10-inline',
    title: 'Calculate base-10 logarithm',
    category: 'function',
    code: `map {math::log10(cast(100.0, float8))}`,
  };

export const functionsMathLog10Examples: CodeExample[] = [
  mathLog10InlineExample,
];
