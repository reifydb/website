import type { CodeExample } from '@/lib/examples/types';

export const durationSecondsExample: CodeExample = {
    id: 'duration-seconds',
    title: 'Create a duration of seconds',
    category: 'function',
    code: `map {duration::seconds(90)}`,
  };

export const functionsDurationSecondsExamples: CodeExample[] = [
  durationSecondsExample,
];
