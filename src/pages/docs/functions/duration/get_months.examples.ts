import type { CodeExample } from '@/lib/examples/types';

export const functionsDurationGetMonthsExamples: CodeExample[] = [
{
    id: 'duration-get_months',
    title: 'Get months from duration',
    category: 'function',
    code: `map {duration::get_months(cast('P1Y2M', duration))}`,
  },
];
