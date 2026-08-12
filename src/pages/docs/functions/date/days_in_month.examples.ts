import type { CodeExample } from '@/lib/examples/types';

export const dateDaysInMonthInlineExample: CodeExample = {
    id: 'date-days_in_month-inline',
    title: 'Get days in month',
    code: `map {date::days_in_month(cast('2024-01-15', date))}`,
  };

export const functionsDateDaysInMonthExamples: CodeExample[] = [
  dateDaysInMonthInlineExample,
];
