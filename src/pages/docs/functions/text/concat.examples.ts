import type { CodeExample } from '@/lib/examples/types';

export const textConcatInlineExample: CodeExample = {
    id: 'text-concat-inline',
    title: 'Concatenate two strings',
    category: 'function',
    code: `map {text::concat('hello', ' world')}`,
  };

export const functionsTextConcatExamples: CodeExample[] = [
  textConcatInlineExample,
];
