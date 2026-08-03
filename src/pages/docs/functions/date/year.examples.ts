import type { CodeExample } from '@/lib/examples/types';

export const dateYearInlineExample: CodeExample = {
    id: 'date-year-inline',
    title: 'Extract year from date',
    category: 'function',
    code: `map {date::year(cast('2024-03-15', date))}`,
  };

export const functionsDateYearExamples: CodeExample[] = [
  dateYearInlineExample,
];
