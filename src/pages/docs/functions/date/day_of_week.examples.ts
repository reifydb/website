import type { CodeExample } from '@/lib/examples/types';

export const dateDay_of_weekInlineExample: CodeExample = {
    id: 'date-day_of_week-inline',
    title: 'Get day of week',
    category: 'function',
    code: `map {date::day_of_week(cast('2024-01-01', date))}`,
  };

export const functionsDateDayOfWeekExamples: CodeExample[] = [
  dateDay_of_weekInlineExample,
];
