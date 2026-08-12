import type { CodeExample } from '@/lib/examples/types';

export const timeDiffExample: CodeExample = {
  id: 'time-diff',
  title: 'Calculate difference between two times',
  code: `map {time::diff(cast('14:00:00', time), cast('10:00:00', time))}`,
  expected: `time::diff(cast("14:00:00", time), cast("10:00:00", time))
----------------------------------------------------------
4h`,
};

export const timeDiffExamples: CodeExample[] = [timeDiffExample];
