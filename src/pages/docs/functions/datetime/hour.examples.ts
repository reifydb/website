import type { CodeExample } from '@/lib/examples/types';

export const datetimeHourExample: CodeExample = {
    id: 'datetime-hour',
    title: 'Extract hour from datetime',
    category: 'function',
    code: `map {datetime::hour(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeHourExamples: CodeExample[] = [
  datetimeHourExample,
];
