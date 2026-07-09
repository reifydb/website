import type { CodeExample } from '@/lib/examples/types';

export const functionsIsTypeExamples: CodeExample[] = [
{
    id: 'is-type',
    title: 'Check if a value is a specific type',
    category: 'function',
    code: `map {is::type(cast(42, int4), int4)}`,
  },
];
