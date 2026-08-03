import type { CodeExample } from '@/lib/examples/types';

export const mathFloorInlineExample: CodeExample = {
    id: 'math-floor-inline',
    title: 'Floor a float',
    category: 'function',
    code: `map {math::floor(cast(3.7, float8))}`,
  };

export const functionsMathFloorExamples: CodeExample[] = [
  mathFloorInlineExample,
];
