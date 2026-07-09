import type { CodeExample } from '@/lib/examples/types';

export const functionsDurationTruncExamples: CodeExample[] = [
{
    id: 'duration-trunc',
    title: 'Truncate duration to year',
    category: 'function',
    code: `map {duration::trunc(cast('P1Y2M3DT4H5M6S', duration), 'year')}`,
  },
];
