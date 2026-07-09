import type { CodeExample } from '@/lib/examples/types';

export const functionsMathClampExamples: CodeExample[] = [
{
    id: 'math-clamp-inline',
    title: 'Clamp value to range',
    category: 'function',
    code: `map {math::clamp(cast(5, int4), cast(0, int4), cast(10, int4))}`,
  },
];
