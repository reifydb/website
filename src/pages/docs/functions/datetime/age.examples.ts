import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeAgeExamples: CodeExample[] = [
{
    id: 'datetime-age',
    title: 'Calculate age between datetimes',
    category: 'function',
    code: `map {datetime::age(cast('2024-03-15T14:30:00Z', datetime), cast('2022-01-10T10:00:00Z', datetime))}`,
  },
];
