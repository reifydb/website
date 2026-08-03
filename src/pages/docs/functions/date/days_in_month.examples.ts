import type { CodeExample } from '@/lib/examples/types';

export const dateDays_in_monthInlineExample: CodeExample = {
    id: 'date-days_in_month-inline',
    title: 'Get days in month',
    category: 'function',
    code: `map {date::days_in_month(cast('2024-01-15', date))}`,
  };

export const functionsDateDaysInMonthExamples: CodeExample[] = [
  dateDays_in_monthInlineExample,
];
