import type { CodeExample } from '@/lib/examples/types';

export const datetimeEpochExample: CodeExample = {
    id: 'datetime-epoch',
    title: 'Get epoch seconds from datetime',
    category: 'function',
    code: `map {datetime::epoch(cast('2024-03-15T14:30:45Z', datetime))}`,
  };

export const functionsDatetimeEpochExamples: CodeExample[] = [
  datetimeEpochExample,
];
