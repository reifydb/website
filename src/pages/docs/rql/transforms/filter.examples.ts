import type { CodeExample } from '@/lib/examples/types';

export const filterBasicExample: CodeExample = {
    id: 'filter-basic',
    title: 'Filter Basic Syntax',
    category: 'rql',
    code: `from app::users
filter { age >= 18 }`,
  };

export const filterMultipleConditionsExample: CodeExample = {
    id: 'filter-multiple-conditions',
    title: 'Filter Multiple Conditions',
    category: 'rql',
    code: `from app::users
filter { age >= 18 and status == "active" }`,
  };

export const filterNoneExample: CodeExample = {
    id: 'filter-none',
    title: 'Filter None Handling',
    category: 'rql',
    code: `from app::users
filter { deleted_at == none }`,
  };

export const rqlTransformsFilterExamples: CodeExample[] = [
  filterBasicExample,
  filterMultipleConditionsExample,
  filterNoneExample,
];
