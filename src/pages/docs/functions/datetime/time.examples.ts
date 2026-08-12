import type { CodeExample } from '@/lib/examples/types';

export const datetimeTimeExample: CodeExample = {
    id: 'datetime-time',
    title: 'Extract time from datetime',
    code: `map {datetime::time(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeTimeExamples: CodeExample[] = [
  datetimeTimeExample,
];
