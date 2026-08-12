import type { CodeExample } from '@/lib/examples/types';

export const isTypeExample: CodeExample = {
    id: 'is-type',
    title: 'Check if a value is a specific type',
    code: `map {is::type(cast(42, int4), int4)}`,
  };

export const functionsIsTypeExamples: CodeExample[] = [
  isTypeExample,
];
