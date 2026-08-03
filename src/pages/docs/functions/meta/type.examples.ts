import type { CodeExample } from '@/lib/examples/types';

export const metaTypeExample: CodeExample = {
    id: 'meta-type',
    title: 'Get the type of a value',
    category: 'function',
    code: `map {meta::type(cast(42, int4))}`,
  };

export const functionsMetaTypeExamples: CodeExample[] = [
  metaTypeExample,
];
