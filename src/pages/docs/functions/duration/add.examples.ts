import type { CodeExample } from '@/lib/examples/types';

export const durationAddExample: CodeExample = {
    id: 'duration-add',
    title: 'Add two durations',
    code: `map {duration::add(duration::hours(1), duration::minutes(30))}`,
  };

export const functionsDurationAddExamples: CodeExample[] = [
  durationAddExample,
];
