import type { CodeExample } from '@/lib/examples/types';

export const timeAddExample: CodeExample = {
  id: 'time-add',
  title: 'Add a duration to a time',
  category: 'function',
  code: `map {time::add(cast('14:30:00', time), cast('PT1H', duration))}`,
  expected: `time::add(cast("14:30:00", time), cast("PT1H", duration))
---------------------------------------------------------
15:30:00.000000000`,
};

export const timeAddExamples: CodeExample[] = [timeAddExample];
