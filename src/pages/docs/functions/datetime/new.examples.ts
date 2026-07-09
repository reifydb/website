import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeNewExamples: CodeExample[] = [
{
    id: 'datetime-new',
    title: 'Create new datetime from date and time',
    category: 'function',
    code: `map {datetime::new(cast('2024-03-15', date), cast('14:30:45', time))}`,
  },
];
