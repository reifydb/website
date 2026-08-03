import type { CodeExample } from '@/lib/examples/types';

export const textRepeatInlineExample: CodeExample = {
    id: 'text-repeat-inline',
    title: 'Repeat a string',
    category: 'function',
    code: `map {text::repeat('ab', 3)}`,
  };

export const functionsTextRepeatExamples: CodeExample[] = [
  textRepeatInlineExample,
];
