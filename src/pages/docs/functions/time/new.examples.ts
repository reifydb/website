import type { CodeExample } from '@/lib/examples/types';

export const timeNewExample: CodeExample = {
  id: 'time-new',
  title: 'Create a new time',
  code: `map {time::new(14, 30, 0)}`,
  expected: `time::new(14, 30, 0)
--------------------
14:30:00.000000000`,
};

export const timeNewExamples: CodeExample[] = [timeNewExample];
