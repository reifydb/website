import type { CodeExample } from '@/lib/examples/types';

export const functionsDurationGetDaysExamples: CodeExample[] = [
{
    id: 'duration-get_days',
    title: 'Get days from duration',
    category: 'function',
    code: `map {duration::get_days(cast('P10D', duration))}`,
  },
];
