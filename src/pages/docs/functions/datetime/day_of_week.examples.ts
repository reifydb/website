import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeDayOfWeekExamples: CodeExample[] = [
{
    id: 'datetime-day_of_week',
    title: 'Get day of week from datetime',
    category: 'function',
    code: `map {datetime::day_of_week(cast('2024-03-15T14:30:00Z', datetime))}`,
  },
];
