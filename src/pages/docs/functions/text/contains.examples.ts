import type { CodeExample } from '@/lib/examples/types';

export const textContainsInlineExample: CodeExample = {
    id: 'text-contains-inline',
    title: 'Check if string contains substring',
    code: `map {text::contains('hello world', 'lo wo')}`,
  };

export const functionsTextContainsExamples: CodeExample[] = [
  textContainsInlineExample,
];
