import type { CodeExample } from '@/lib/examples/types';

export const identityIdExample: CodeExample = {
    id: 'identity-id',
    title: 'Get the record identifier',
    code: `map {identity::id()}`,
  };

export const functionsIdentityIdExamples: CodeExample[] = [
  identityIdExample,
];
