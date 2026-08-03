import type { CodeExample } from '@/lib/examples/types';

export const dateDayInlineExample: CodeExample = {
    id: 'date-day-inline',
    title: 'Extract day from date',
    category: 'function',
    code: `map {date::day(cast('2024-03-15', date))}`,
  };

export const functionsDateDayExamples: CodeExample[] = [
  dateDayInlineExample,
];
