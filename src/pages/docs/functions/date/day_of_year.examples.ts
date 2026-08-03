import type { CodeExample } from '@/lib/examples/types';

export const dateDay_of_yearInlineExample: CodeExample = {
    id: 'date-day_of_year-inline',
    title: 'Get day of year',
    category: 'function',
    code: `map {date::day_of_year(cast('2023-01-15', date))}`,
  };

export const functionsDateDayOfYearExamples: CodeExample[] = [
  dateDay_of_yearInlineExample,
];
