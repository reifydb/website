import type { CodeExample } from '@/lib/examples/types';

export const mathClampInlineExample: CodeExample = {
    id: 'math-clamp-inline',
    title: 'Clamp value to range',
    code: `map {math::clamp(cast(5, int4), cast(0, int4), cast(10, int4))}`,
  };

export const functionsMathClampExamples: CodeExample[] = [
  mathClampInlineExample,
];
