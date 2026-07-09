import type { CodeExample } from '@/lib/examples/types';

export const functionsDurationGetNanosExamples: CodeExample[] = [
{
    id: 'duration-get_nanos',
    title: 'Get nanoseconds from duration',
    category: 'function',
    code: `map {duration::get_nanos(cast('PT1H', duration))}`,
  },
];
