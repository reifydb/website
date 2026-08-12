import type { CodeExample } from '@/lib/examples/types';

export const dateSubtractInlineExample: CodeExample = {
    id: 'date-subtract-inline',
    title: 'Subtract duration from date',
    code: `map {date::subtract(cast('2024-01-15', date), cast('P10D', duration))}`,
  };

export const functionsDateSubtractExamples: CodeExample[] = [
  dateSubtractInlineExample,
];
