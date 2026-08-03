import type { CodeExample } from '@/lib/examples/types';

export const datetimeMinuteExample: CodeExample = {
    id: 'datetime-minute',
    title: 'Extract minute from datetime',
    category: 'function',
    code: `map {datetime::minute(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeMinuteExamples: CodeExample[] = [
  datetimeMinuteExample,
];
