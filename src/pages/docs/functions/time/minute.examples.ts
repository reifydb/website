import type { CodeExample } from '@/lib/examples/types';

export const timeMinuteExample: CodeExample = {
  id: 'time-minute',
  title: 'Extract the minute',
  code: `map {time::minute(cast('14:30:00', time))}`,
  expected: `time::minute(cast("14:30:00", time))
------------------------------------
30`,
};

export const timeMinuteExamples: CodeExample[] = [timeMinuteExample];
