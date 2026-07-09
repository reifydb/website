import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeNanosecondExamples: CodeExample[] = [
{
    id: 'datetime-nanosecond',
    title: 'Extract nanosecond from datetime',
    category: 'function',
    code: `map {datetime::nanosecond(cast('2024-03-15T14:30:45.123456789Z', datetime))}`,
  },
];
