import type { CodeExample } from '@/lib/examples/types';

export const functionsDurationAddExamples: CodeExample[] = [
{
    id: 'duration-add',
    title: 'Add two durations',
    category: 'function',
    code: `map {duration::add(duration::hours(1), duration::minutes(30))}`,
  },
];
