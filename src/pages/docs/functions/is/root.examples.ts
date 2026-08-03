import type { CodeExample } from '@/lib/examples/types';

export const isRootExample: CodeExample = {
    id: 'is-root',
    title: 'Check if the current user is root',
    category: 'function',
    code: `map {is::root()}`,
  };

export const functionsIsRootExamples: CodeExample[] = [
  isRootExample,
];
