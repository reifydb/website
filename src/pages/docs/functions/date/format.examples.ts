import type { CodeExample } from '@/lib/examples/types';

export const dateFormatInlineExample: CodeExample = {
    id: 'date-format-inline',
    title: 'Format date as string',
    code: `map {date::format(cast('2024-03-15', date), '%Y-%m-%d')}`,
  };

export const functionsDateFormatExamples: CodeExample[] = [
  dateFormatInlineExample,
];
