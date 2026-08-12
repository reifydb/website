import type { CodeExample } from '@/lib/examples/types';

export const datetimeSubtractExample: CodeExample = {
    id: 'datetime-subtract',
    title: 'Subtract duration from datetime',
    code: `map {datetime::subtract(cast('2024-03-15T14:30:00Z', datetime), cast('P10D', duration))}`,
  };

export const functionsDatetimeSubtractExamples: CodeExample[] = [
  datetimeSubtractExample,
];
