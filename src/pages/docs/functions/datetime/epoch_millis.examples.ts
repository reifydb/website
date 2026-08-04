import type { CodeExample } from '@/lib/examples/types';

export const datetimeEpochMillisExample: CodeExample = {
    id: 'datetime-epoch_millis',
    title: 'Get epoch milliseconds from datetime',
    category: 'function',
    code: `map {datetime::epoch_millis(cast('2024-03-15T14:30:45Z', datetime))}`,
  };

export const functionsDatetimeEpochMillisExamples: CodeExample[] = [
  datetimeEpochMillisExample,
];
