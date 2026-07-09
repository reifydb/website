import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeSecondExamples: CodeExample[] = [
{
    id: 'datetime-second',
    title: 'Extract second from datetime',
    category: 'function',
    code: `map {datetime::second(cast('2024-03-15T14:30:45Z', datetime))}`,
  },
];
