import type { CodeExample } from '@/lib/examples/types';

export const datetimeDayExample: CodeExample = {
    id: 'datetime-day',
    title: 'Extract day from datetime',
    code: `map {datetime::day(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeDayExamples: CodeExample[] = [
  datetimeDayExample,
];
