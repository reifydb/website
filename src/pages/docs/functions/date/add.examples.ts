import type { CodeExample } from '@/lib/examples/types';

export const dateAddInlineExample: CodeExample = {
    id: 'date-add-inline',
    title: 'Add duration to date',
    category: 'function',
    code: `map {date::add(cast('2024-01-15', date), cast('P10D', duration))}`,
  };

export const functionsDateAddExamples: CodeExample[] = [
  dateAddInlineExample,
];
