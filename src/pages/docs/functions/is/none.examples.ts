import type { CodeExample } from '@/lib/examples/types';

export const isNoneExample: CodeExample = {
    id: 'is-none',
    title: 'Check if a value is none',
    code: `map {is::none(cast(42, int4))}`,
  };

export const functionsIsNoneExamples: CodeExample[] = [
  isNoneExample,
];
