import type { CodeExample } from '@/lib/examples/types';

export const dateIsLeapYearInlineExample: CodeExample = {
    id: 'date-is_leap_year-inline',
    title: 'Check if leap year',
    code: `map {date::is_leap_year(cast('2024-01-15', date))}`,
  };

export const functionsDateIsLeapYearExamples: CodeExample[] = [
  dateIsLeapYearInlineExample,
];
