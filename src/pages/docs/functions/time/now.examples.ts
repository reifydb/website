import type { CodeExample } from '@/lib/examples/types';

export const timeNowExample: CodeExample = {
  id: 'time-now',
  title: 'Get the current time',
  category: 'function',
  code: `map {time::now()}`,
};

export const timeNowExamples: CodeExample[] = [timeNowExample];
