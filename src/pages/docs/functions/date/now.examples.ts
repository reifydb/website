import type { CodeExample } from '@/lib/examples/types';

export const dateNowInlineExample: CodeExample = {
    id: 'date-now-inline',
    title: 'Get current date',
    code: `map {date::now()}`,
  };

export const functionsDateNowExamples: CodeExample[] = [
  dateNowInlineExample,
];
