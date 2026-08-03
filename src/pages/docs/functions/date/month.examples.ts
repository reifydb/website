import type { CodeExample } from '@/lib/examples/types';

export const dateMonthInlineExample: CodeExample = {
    id: 'date-month-inline',
    title: 'Extract month from date',
    category: 'function',
    code: `map {date::month(cast('2024-03-15', date))}`,
  };

export const functionsDateMonthExamples: CodeExample[] = [
  dateMonthInlineExample,
];
