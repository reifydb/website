import type { CodeExample } from '@/lib/examples/types';

export const dateStartOfMonthInlineExample: CodeExample = {
    id: 'date-start_of_month-inline',
    title: 'Get start of month',
    code: `map {date::start_of_month(cast('2024-01-15', date))}`,
  };

export const functionsDateStartOfMonthExamples: CodeExample[] = [
  dateStartOfMonthInlineExample,
];
