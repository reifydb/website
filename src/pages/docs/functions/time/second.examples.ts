import type { CodeExample } from '@/lib/examples/types';

export const timeSecondExample: CodeExample = {
  id: 'time-second',
  title: 'Extract the second',
  code: `map {time::second(cast('14:30:45', time))}`,
  expected: `time::second(cast("14:30:45", time))
------------------------------------
45`,
};

export const timeSecondExamples: CodeExample[] = [timeSecondExample];
