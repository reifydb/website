import type { CodeExample } from '@/lib/examples/types';

export const dateEndOfMonthInlineExample: CodeExample = {
    id: 'date-end_of_month-inline',
    title: 'Get end of month',
    code: `map {date::end_of_month(cast('2024-01-15', date))}`,
  };

export const functionsDateEndOfMonthExamples: CodeExample[] = [
  dateEndOfMonthInlineExample,
];
