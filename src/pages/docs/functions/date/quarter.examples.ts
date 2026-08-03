import type { CodeExample } from '@/lib/examples/types';

export const dateQuarterInlineExample: CodeExample = {
    id: 'date-quarter-inline',
    title: 'Get quarter from date',
    category: 'function',
    code: `map {date::quarter(cast('2024-01-15', date))}`,
  };

export const functionsDateQuarterExamples: CodeExample[] = [
  dateQuarterInlineExample,
];
