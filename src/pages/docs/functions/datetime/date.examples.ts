import type { CodeExample } from '@/lib/examples/types';

export const datetimeDateExample: CodeExample = {
    id: 'datetime-date',
    title: 'Extract date from datetime',
    code: `map {datetime::date(cast('2024-03-15T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeDateExamples: CodeExample[] = [
  datetimeDateExample,
];
