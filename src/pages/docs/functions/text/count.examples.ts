import type { CodeExample } from '@/lib/examples/types';

export const textCountInlineExample: CodeExample = {
    id: 'text-count-inline',
    title: 'Count characters in string',
    category: 'function',
    code: `map {text::count('hello')}`,
  };

export const functionsTextCountExamples: CodeExample[] = [
  textCountInlineExample,
];
