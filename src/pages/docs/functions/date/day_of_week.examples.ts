import type { CodeExample } from '@/lib/examples/types';

export const dateDayOfWeekInlineExample: CodeExample = {
    id: 'date-day_of_week-inline',
    title: 'Get day of week',
    code: `map {date::day_of_week(cast('2024-01-01', date))}`,
  };

export const functionsDateDayOfWeekExamples: CodeExample[] = [
  dateDayOfWeekInlineExample,
];
