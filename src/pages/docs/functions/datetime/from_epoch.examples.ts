import type { CodeExample } from '@/lib/examples/types';

export const datetimeFromEpochExample: CodeExample = {
    id: 'datetime-from_epoch',
    title: 'Create datetime from epoch seconds',
    code: `map {datetime::from_epoch(1710513045)}`,
  };

export const functionsDatetimeFromEpochExamples: CodeExample[] = [
  datetimeFromEpochExample,
];
