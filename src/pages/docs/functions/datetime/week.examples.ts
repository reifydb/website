import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeWeekExamples: CodeExample[] = [
{
    id: 'datetime-week',
    title: 'Get week number from datetime',
    category: 'function',
    code: `map {datetime::week(cast('2024-03-15T14:30:00Z', datetime))}`,
  },
];
