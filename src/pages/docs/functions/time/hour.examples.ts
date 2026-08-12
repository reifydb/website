import type { CodeExample } from '@/lib/examples/types';

export const timeHourExample: CodeExample = {
  id: 'time-hour',
  title: 'Extract the hour',
  code: `map {time::hour(cast('14:30:00', time))}`,
  expected: `time::hour(cast("14:30:00", time))
----------------------------------
14`,
};

export const timeHourExamples: CodeExample[] = [timeHourExample];
