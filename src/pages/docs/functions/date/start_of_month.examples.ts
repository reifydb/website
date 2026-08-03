import type { CodeExample } from '@/lib/examples/types';

export const dateStart_of_monthInlineExample: CodeExample = {
    id: 'date-start_of_month-inline',
    title: 'Get start of month',
    category: 'function',
    code: `map {date::start_of_month(cast('2024-01-15', date))}`,
  };

export const functionsDateStartOfMonthExamples: CodeExample[] = [
  dateStart_of_monthInlineExample,
];
