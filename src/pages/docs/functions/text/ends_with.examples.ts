import type { CodeExample } from '@/lib/examples/types';

export const textEndsWithInlineExample: CodeExample = {
    id: 'text-ends_with-inline',
    title: 'Check if string ends with suffix',
    code: `map {text::ends_with('hello world', 'world')}`,
  };

export const functionsTextEndsWithExamples: CodeExample[] = [
  textEndsWithInlineExample,
];
