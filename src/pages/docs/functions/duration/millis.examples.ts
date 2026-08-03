import type { CodeExample } from '@/lib/examples/types';

export const durationMillisExample: CodeExample = {
    id: 'duration-millis',
    title: 'Create a duration of milliseconds',
    category: 'function',
    code: `map {duration::millis(500)}`,
  };

export const functionsDurationMillisExamples: CodeExample[] = [
  durationMillisExample,
];
