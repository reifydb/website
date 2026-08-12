import type { CodeExample } from '@/lib/examples/types';

export const textIndexOfInlineExample: CodeExample = {
    id: 'text-index_of-inline',
    title: 'Find index of substring',
    code: `map {text::index_of('hello world', 'world')}`,
  };

export const functionsTextIndexOfExamples: CodeExample[] = [
  textIndexOfInlineExample,
];
