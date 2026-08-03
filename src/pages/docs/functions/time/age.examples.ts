import type { CodeExample } from '@/lib/examples/types';

export const timeAgeExample: CodeExample = {
  id: 'time-age',
  title: 'Calculate duration between two times',
  category: 'function',
  code: `map {time::age(cast('14:00:00', time), cast('10:00:00', time))}`,
  expected: `time::age(cast("14:00:00", time), cast("10:00:00", time))
---------------------------------------------------------
4h`,
};

export const timeAgeExamples: CodeExample[] = [timeAgeExample];
