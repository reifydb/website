import type { CodeExample } from '@/lib/examples/types';

export const durationScaleExample: CodeExample = {
    id: 'duration-scale',
    title: 'Scale a duration',
    category: 'function',
    code: `map {duration::scale(duration::hours(2), 3)}`,
  };

export const functionsDurationScaleExamples: CodeExample[] = [
  durationScaleExample,
];
