import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsFilterExamples: CodeExample[] = [
{
    id: 'filter-basic',
    title: 'Filter Basic Syntax',
    category: 'rql',
    code: `from app::users
filter { age >= 18 }`,
  },
{
    id: 'filter-multiple-conditions',
    title: 'Filter Multiple Conditions',
    category: 'rql',
    code: `from app::users
filter { age >= 18 and status == "active" }`,
  },
{
    id: 'filter-none',
    title: 'Filter None Handling',
    category: 'rql',
    code: `from app::users
filter { deleted_at == none }`,
  },
];
