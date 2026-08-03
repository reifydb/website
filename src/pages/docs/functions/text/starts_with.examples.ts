import type { CodeExample } from '@/lib/examples/types';

export const textStarts_withInlineExample: CodeExample = {
    id: 'text-starts_with-inline',
    title: 'Check if string starts with prefix',
    category: 'function',
    code: `map {text::starts_with('hello world', 'hello')}`,
  };

export const functionsTextStartsWithExamples: CodeExample[] = [
  textStarts_withInlineExample,
];
