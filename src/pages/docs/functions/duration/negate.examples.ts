import type { CodeExample } from '@/lib/examples/types';

export const durationNegateExample: CodeExample = {
    id: 'duration-negate',
    title: 'Negate a duration',
    code: `map {duration::negate(duration::hours(2))}`,
  };

export const functionsDurationNegateExamples: CodeExample[] = [
  durationNegateExample,
];
