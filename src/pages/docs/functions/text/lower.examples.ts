import type { CodeExample } from '@/lib/examples/types';

export const textLowerInlineExample: CodeExample = {
    id: 'text-lower-inline',
    title: 'Convert to lowercase',
    category: 'function',
    code: `map {text::lower('HELLO')}`,
  };

export const functionsTextLowerExamples: CodeExample[] = [
  textLowerInlineExample,
];
