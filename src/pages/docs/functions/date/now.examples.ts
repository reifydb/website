import type { CodeExample } from '@/lib/examples/types';

export const dateNowInlineExample: CodeExample = {
    id: 'date-now-inline',
    title: 'Get current date',
    category: 'function',
    code: `map {date::now()}`,
  };

export const functionsDateNowExamples: CodeExample[] = [
  dateNowInlineExample,
];
