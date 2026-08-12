import type { CodeExample } from '@/lib/examples/types';

export const datetimeSecondExample: CodeExample = {
    id: 'datetime-second',
    title: 'Extract second from datetime',
    code: `map {datetime::second(cast('2024-03-15T14:30:45Z', datetime))}`,
  };

export const functionsDatetimeSecondExamples: CodeExample[] = [
  datetimeSecondExample,
];
