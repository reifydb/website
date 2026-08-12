import type { CodeExample } from '@/lib/examples/types';

export const datetimeFromEpochMillisExample: CodeExample = {
    id: 'datetime-from_epoch_millis',
    title: 'Create datetime from epoch milliseconds',
    code: `map {datetime::from_epoch_millis(1710513045000)}`,
  };

export const functionsDatetimeFromEpochMillisExamples: CodeExample[] = [
  datetimeFromEpochMillisExample,
];
