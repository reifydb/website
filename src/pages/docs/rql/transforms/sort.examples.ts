import type { CodeExample } from '@/lib/examples/types';

export const sortBasicExample: CodeExample = {
    id: 'sort-basic',
    title: 'Sort Basic Syntax',
    code: `from app::users
sort {created_at}`,
  };

export const sortDescendingExample: CodeExample = {
    id: 'sort-descending',
    title: 'Sort Descending',
    code: `from app::users
sort {created_at: desc}`,
  };

export const sortMultipleExample: CodeExample = {
    id: 'sort-multiple',
    title: 'Sort Multiple Columns',
    code: `from app::orders
sort {region, total: desc}`,
  };

export const sortWithTakeExample: CodeExample = {
    id: 'sort-with-take',
    title: 'Sort Combined with Take',
    code: `from app::users
sort {created_at: desc}
take 10`,
  };

export const rqlTransformsSortExamples: CodeExample[] = [
  sortBasicExample,
  sortDescendingExample,
  sortMultipleExample,
  sortWithTakeExample,
];
