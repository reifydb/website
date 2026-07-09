import type { CodeExample } from '@/lib/examples/types';

export const functionsDateAgeExamples: CodeExample[] = [
{
    id: 'date-age-inline',
    title: 'Calculate age between dates',
    category: 'function',
    code: `map {date::age(cast('2024-03-20', date), cast('2022-01-15', date))}`,
  },
];
