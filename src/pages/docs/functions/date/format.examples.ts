import type { CodeExample } from '@/lib/examples/types';

export const functionsDateFormatExamples: CodeExample[] = [
{
    id: 'date-format-inline',
    title: 'Format date as string',
    category: 'function',
    code: `map {date::format(cast('2024-03-15', date), '%Y-%m-%d')}`,
  },
];
