import type { CodeExample } from '@/lib/examples/types';

export const datetimeNowExample: CodeExample = {
    id: 'datetime-now',
    title: 'Get current datetime',
    code: `map {datetime::now()}`,
  };

export const functionsDatetimeNowExamples: CodeExample[] = [
  datetimeNowExample,
];
