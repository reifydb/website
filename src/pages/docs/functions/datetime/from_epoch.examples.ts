import type { CodeExample } from '@/lib/examples/types';

export const datetimeFrom_epochExample: CodeExample = {
    id: 'datetime-from_epoch',
    title: 'Create datetime from epoch seconds',
    category: 'function',
    code: `map {datetime::from_epoch(1710513045)}`,
  };

export const functionsDatetimeFromEpochExamples: CodeExample[] = [
  datetimeFrom_epochExample,
];
