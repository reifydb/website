import type { CodeExample } from '@/lib/examples/types';

export const functionsMetaTypeExamples: CodeExample[] = [
{
    id: 'meta-type',
    title: 'Get the type of a value',
    category: 'function',
    code: `map {meta::type(cast(42, int4))}`,
  },
];
