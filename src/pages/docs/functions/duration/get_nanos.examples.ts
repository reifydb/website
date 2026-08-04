import type { CodeExample } from '@/lib/examples/types';

export const durationGetNanosExample: CodeExample = {
    id: 'duration-get_nanos',
    title: 'Get nanoseconds from duration',
    category: 'function',
    code: `map {duration::get_nanos(cast('PT1H', duration))}`,
  };

export const functionsDurationGetNanosExamples: CodeExample[] = [
  durationGetNanosExample,
];
