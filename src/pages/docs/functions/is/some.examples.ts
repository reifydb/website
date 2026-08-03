import type { CodeExample } from '@/lib/examples/types';

export const isSomeExample: CodeExample = {
    id: 'is-some',
    title: 'Check if a value is some',
    category: 'function',
    code: `map {is::some(cast(42, int4))}`,
  };

export const functionsIsSomeExamples: CodeExample[] = [
  isSomeExample,
];
