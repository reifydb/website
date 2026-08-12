import type { CodeExample } from '@/lib/examples/types';

export const durationGetMonthsExample: CodeExample = {
    id: 'duration-get_months',
    title: 'Get months from duration',
    code: `map {duration::get_months(cast('P1Y2M', duration))}`,
  };

export const functionsDurationGetMonthsExamples: CodeExample[] = [
  durationGetMonthsExample,
];
