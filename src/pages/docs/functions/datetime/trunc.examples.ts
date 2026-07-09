import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeTruncExamples: CodeExample[] = [
{
    id: 'datetime-trunc',
    title: 'Truncate datetime to hour',
    category: 'function',
    code: `map {datetime::trunc(cast('2024-03-15T14:30:45Z', datetime), 'hour')}`,
  },
];
