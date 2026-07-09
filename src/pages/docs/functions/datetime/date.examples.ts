import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeDateExamples: CodeExample[] = [
{
    id: 'datetime-date',
    title: 'Extract date from datetime',
    category: 'function',
    code: `map {datetime::date(cast('2024-03-15T14:30:00Z', datetime))}`,
  },
];
