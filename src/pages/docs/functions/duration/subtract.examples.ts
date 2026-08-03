import type { CodeExample } from '@/lib/examples/types';

export const durationSubtractExample: CodeExample = {
    id: 'duration-subtract',
    title: 'Subtract two durations',
    category: 'function',
    code: `map {duration::subtract(duration::hours(2), duration::minutes(30))}`,
  };

export const functionsDurationSubtractExamples: CodeExample[] = [
  durationSubtractExample,
];
