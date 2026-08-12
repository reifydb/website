import type { CodeExample } from '@/lib/examples/types';

export const dateStartOfYearInlineExample: CodeExample = {
    id: 'date-start_of_year-inline',
    title: 'Get start of year',
    code: `map {date::start_of_year(cast('2024-06-15', date))}`,
  };

export const functionsDateStartOfYearExamples: CodeExample[] = [
  dateStartOfYearInlineExample,
];
