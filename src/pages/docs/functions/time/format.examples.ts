import type { CodeExample } from '@/lib/examples/types';

export const timeFormatExample: CodeExample = {
  id: 'time-format',
  title: 'Format a time as a string',
  category: 'function',
  code: `map {time::format(cast('14:30:45', time), '%H:%M:%S')}`,
  expected: `time::format(cast("14:30:45", time), "%H:%M:%S")
------------------------------------------------
14:30:45`,
};

export const timeFormatExamples: CodeExample[] = [timeFormatExample];
