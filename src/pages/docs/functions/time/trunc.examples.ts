import type { CodeExample } from '@/lib/examples/types';

export const timeTruncExample: CodeExample = {
  id: 'time-trunc',
  title: 'Truncate to hour precision',
  code: `map {time::trunc(cast('14:30:45', time), 'hour')}`,
  expected: `time::trunc(cast("14:30:45", time), "hour")
-------------------------------------------
14:00:00.000000000`,
};

export const timeTruncExamples: CodeExample[] = [timeTruncExample];
