import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsJoinExamples: CodeExample[] = [
{
    id: 'join-inner',
    title: 'Inner Join',
    category: 'rql',
    code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id)
map { id, salary, department: d.name }`,
  },
{
    id: 'join-left',
    title: 'Left Join',
    category: 'rql',
    code: `from app::employees
left join { from app::departments } as d using (dept_id, d.id)
map { id, salary, department: d.name }`,
  },
];
