import type { CodeExample } from '@/lib/examples/types';

export const datetimeAgeExample: CodeExample = {
    id: 'datetime-age',
    title: 'Calculate age between datetimes',
    code: `map {datetime::age(cast('2024-03-15T14:30:00Z', datetime), cast('2022-01-10T10:00:00Z', datetime))}`,
  };

export const functionsDatetimeAgeExamples: CodeExample[] = [
  datetimeAgeExample,
];
