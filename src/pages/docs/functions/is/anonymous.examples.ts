import type { CodeExample } from '@/lib/examples/types';

export const isAnonymousExample: CodeExample = {
    id: 'is-anonymous',
    title: 'Check if the current user is anonymous',
    code: `map {is::anonymous()}`,
  };

export const functionsIsAnonymousExamples: CodeExample[] = [
  isAnonymousExample,
];
