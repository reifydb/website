import type { CodeExample } from '@/lib/examples/types';

export const datetimeMonthExample: CodeExample = {
    id: 'datetime-month',
    title: 'Extract month from datetime',
    category: 'function',
    code: `map {datetime::month(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeMonthExamples: CodeExample[] = [
  datetimeMonthExample,
];
