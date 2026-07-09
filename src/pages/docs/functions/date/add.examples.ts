import type { CodeExample } from '@/lib/examples/types';

export const functionsDateAddExamples: CodeExample[] = [
{
    id: 'date-add-inline',
    title: 'Add duration to date',
    category: 'function',
    code: `map {date::add(cast('2024-01-15', date), cast('P10D', duration))}`,
  },
];
