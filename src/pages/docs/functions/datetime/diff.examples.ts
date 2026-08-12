import type { CodeExample } from '@/lib/examples/types';

export const datetimeDiffExample: CodeExample = {
    id: 'datetime-diff',
    title: 'Calculate difference between datetimes',
    code: `map {datetime::diff(cast('2024-03-15T14:30:00Z', datetime), cast('2024-03-10T14:30:00Z', datetime))}`,
  };

export const functionsDatetimeDiffExamples: CodeExample[] = [
  datetimeDiffExample,
];
