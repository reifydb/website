import type { CodeExample } from '@/lib/examples/types';

export const functionsDateTruncExamples: CodeExample[] = [
{
    id: 'date-trunc-inline',
    title: 'Truncate date to year',
    category: 'function',
    code: `map {date::trunc(cast('2024-03-15', date), 'year')}`,
  },
];
