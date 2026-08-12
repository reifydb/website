import type { CodeExample } from '@/lib/examples/types';

export const durationTruncExample: CodeExample = {
    id: 'duration-trunc',
    title: 'Truncate duration to year',
    code: `map {duration::trunc(cast('P1Y2M3DT4H5M6S', duration), 'year')}`,
  };

export const functionsDurationTruncExamples: CodeExample[] = [
  durationTruncExample,
];
