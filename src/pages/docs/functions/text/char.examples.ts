import type { CodeExample } from '@/lib/examples/types';

export const textCharInlineExample: CodeExample = {
    id: 'text-char-inline',
    title: 'Get character from code',
    category: 'function',
    code: `map {text::char(65)}`,
  };

export const functionsTextCharExamples: CodeExample[] = [
  textCharInlineExample,
];
