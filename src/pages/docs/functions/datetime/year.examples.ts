import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeYearExamples: CodeExample[] = [
{
    id: 'datetime-year',
    title: 'Extract year from datetime',
    category: 'function',
    code: `map {datetime::year(cast('2024-03-15T14:30:00Z', datetime))}`,
  },
];
