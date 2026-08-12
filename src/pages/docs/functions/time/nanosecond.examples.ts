import type { CodeExample } from '@/lib/examples/types';

export const timeNanosecondExample: CodeExample = {
  id: 'time-nanosecond',
  title: 'Extract nanoseconds',
  code: `map {time::nanosecond(cast('14:30:45.123456789', time))}`,
  expected: `time::nanosecond(cast("14:30:45.123456789", time))
--------------------------------------------------
123456789`,
};

export const timeNanosecondExamples: CodeExample[] = [timeNanosecondExample];
