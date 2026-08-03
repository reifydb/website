import type { CodeExample } from '@/lib/examples/types';

export const datetimeQuarterExample: CodeExample = {
    id: 'datetime-quarter',
    title: 'Get quarter from datetime',
    category: 'function',
    code: `map {datetime::quarter(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeQuarterExamples: CodeExample[] = [
  datetimeQuarterExample,
];
