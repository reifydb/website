import type { CodeExample } from '@/lib/examples/types';

export const textReplaceInlineExample: CodeExample = {
    id: 'text-replace-inline',
    title: 'Replace substring',
    code: `map {text::replace('hello world', 'world', 'there')}`,
  };

export const functionsTextReplaceExamples: CodeExample[] = [
  textReplaceInlineExample,
];
