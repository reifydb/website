import type { CodeExample } from '@/lib/examples/types';

export const timeSubtractExample: CodeExample = {
  id: 'time-subtract',
  title: 'Subtract a duration from a time',
  code: `map {time::subtract(cast('14:30:00', time), cast('PT1H', duration))}`,
  expected: `time::subtract(cast("14:30:00", time), cast("PT1H", duration))
--------------------------------------------------------------
13:30:00.000000000`,
};

export const timeSubtractExamples: CodeExample[] = [timeSubtractExample];
