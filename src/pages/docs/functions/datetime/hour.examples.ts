import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeHourExamples: CodeExample[] = [
{
    id: 'datetime-hour',
    title: 'Extract hour from datetime',
    category: 'function',
    code: `map {datetime::hour(cast('2024-03-15T14:30:00Z', datetime))}`,
  },
];
