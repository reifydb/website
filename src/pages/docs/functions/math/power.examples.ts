import type { CodeExample } from '@/lib/examples/types';

export const mathPowerInlineExample: CodeExample = {
    id: 'math-power-inline',
    title: 'Calculate power',
    category: 'function',
    code: `map {math::power(cast(2, int4), cast(3, int4))}`,
  };

export const functionsMathPowerExamples: CodeExample[] = [
  mathPowerInlineExample,
];
