import type { CodeExample } from '@/lib/examples/types';

export const dateNewInlineExample: CodeExample = {
    id: 'date-new-inline',
    title: 'Create a new date',
    category: 'function',
    code: `map {date::new(2024, 3, 15)}`,
  };

export const functionsDateNewExamples: CodeExample[] = [
  dateNewInlineExample,
];
