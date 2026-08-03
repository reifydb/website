import type { CodeExample } from '@/lib/examples/types';

export const dateDiffInlineExample: CodeExample = {
    id: 'date-diff-inline',
    title: 'Calculate difference between dates',
    category: 'function',
    code: `map {date::diff(cast('2024-01-15', date), cast('2024-01-05', date))}`,
  };

export const functionsDateDiffExamples: CodeExample[] = [
  dateDiffInlineExample,
];
