import type { CodeExample } from '@/lib/examples/types';

export const mathLcmInlineExample: CodeExample = {
    id: 'math-lcm-inline',
    title: 'Least common multiple',
    code: `map {math::lcm(cast(4, int4), cast(6, int4))}`,
  };

export const functionsMathLcmExamples: CodeExample[] = [
  mathLcmInlineExample,
];
