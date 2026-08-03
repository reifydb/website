import type { CodeExample } from '@/lib/examples/types';

export const textReverseInlineExample: CodeExample = {
    id: 'text-reverse-inline',
    title: 'Reverse a string',
    category: 'function',
    code: `map {text::reverse('hello')}`,
  };

export const functionsTextReverseExamples: CodeExample[] = [
  textReverseInlineExample,
];
