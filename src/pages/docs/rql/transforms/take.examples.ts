import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsTakeExamples: CodeExample[] = [
{
    id: 'take-basic',
    title: 'Take Basic',
    category: 'rql',
    code: `from app::users
take 3`,
  },
{
    id: 'take-with-sort',
    title: 'Take with Sort',
    category: 'rql',
    code: `from app::orders
sort {total: desc}
take 3`,
  },
];
