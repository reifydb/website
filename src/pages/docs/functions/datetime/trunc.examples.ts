import type { CodeExample } from '@/lib/examples/types';

export const datetimeTruncExample: CodeExample = {
    id: 'datetime-trunc',
    title: 'Truncate datetime to hour',
    category: 'function',
    code: `map {datetime::trunc(cast('2024-03-15T14:30:45Z', datetime), 'hour')}`,
  };

export const functionsDatetimeTruncExamples: CodeExample[] = [
  datetimeTruncExample,
];
