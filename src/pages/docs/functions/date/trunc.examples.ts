import type { CodeExample } from '@/lib/examples/types';

export const dateTruncInlineExample: CodeExample = {
    id: 'date-trunc-inline',
    title: 'Truncate date to year',
    code: `map {date::trunc(cast('2024-03-15', date), 'year')}`,
  };

export const functionsDateTruncExamples: CodeExample[] = [
  dateTruncInlineExample,
];
