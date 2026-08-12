import type { CodeExample } from '@/lib/examples/types';

export const textAsciiInlineExample: CodeExample = {
    id: 'text-ascii-inline',
    title: 'Get ASCII code',
    code: `map {text::ascii('A')}`,
  };

export const functionsTextAsciiExamples: CodeExample[] = [
  textAsciiInlineExample,
];
