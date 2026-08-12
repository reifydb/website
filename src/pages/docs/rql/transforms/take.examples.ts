import type { CodeExample } from '@/lib/examples/types';

export const takeBasicExample: CodeExample = {
    id: 'take-basic',
    title: 'Take Basic',
    code: `from app::users
take 3`,
  };

export const takeWithSortExample: CodeExample = {
    id: 'take-with-sort',
    title: 'Take with Sort',
    code: `from app::orders
sort {total: desc}
take 3`,
  };

export const rqlTransformsTakeExamples: CodeExample[] = [
  takeBasicExample,
  takeWithSortExample,
];
