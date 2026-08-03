import type { CodeExample } from '@/lib/examples/types';

export const durationMinutesExample: CodeExample = {
    id: 'duration-minutes',
    title: 'Create a duration of minutes',
    category: 'function',
    code: `map {duration::minutes(30)}`,
  };

export const functionsDurationMinutesExamples: CodeExample[] = [
  durationMinutesExample,
];
