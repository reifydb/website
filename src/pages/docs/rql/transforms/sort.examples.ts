import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsSortExamples: CodeExample[] = [
{
    id: 'sort-basic',
    title: 'Sort Basic Syntax',
    category: 'rql',
    code: `from app::users
sort {created_at}`,
  },
{
    id: 'sort-descending',
    title: 'Sort Descending',
    category: 'rql',
    code: `from app::users
sort {created_at: desc}`,
  },
{
    id: 'sort-multiple',
    title: 'Sort Multiple Columns',
    category: 'rql',
    code: `from app::orders
sort {region, total: desc}`,
  },
{
    id: 'sort-with-take',
    title: 'Sort Combined with Take',
    category: 'rql',
    code: `from app::users
sort {created_at: desc}
take 10`,
  },
];
