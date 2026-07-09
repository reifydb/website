import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeDayOfYearExamples: CodeExample[] = [
{
    id: 'datetime-day_of_year',
    title: 'Get day of year from datetime',
    category: 'function',
    code: `map {datetime::day_of_year(cast('2024-03-15T14:30:00Z', datetime))}`,
  },
];
