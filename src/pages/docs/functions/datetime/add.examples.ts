import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeAddExamples: CodeExample[] = [
{
    id: 'datetime-add',
    title: 'Add duration to datetime',
    category: 'function',
    code: `map {datetime::add(cast('2024-03-15T14:30:00Z', datetime), cast('P10D', duration))}`,
  },
];
