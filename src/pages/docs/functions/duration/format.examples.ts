import type { CodeExample } from '@/lib/examples/types';

export const functionsDurationFormatExamples: CodeExample[] = [
{
    id: 'duration-format',
    title: 'Format a duration',
    category: 'function',
    code: `map {duration::format(duration::months(27), '%Y years %M months')}`,
  },
];
