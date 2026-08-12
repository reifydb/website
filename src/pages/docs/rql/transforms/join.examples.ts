import type { CodeExample } from '@/lib/examples/types';

export const joinInnerExample: CodeExample = {
    id: 'join-inner',
    title: 'Inner Join',
    code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id)
map { id, salary, department: d_name }`,
  };

export const joinLeftExample: CodeExample = {
    id: 'join-left',
    title: 'Left Join',
    code: `from app::employees
left join { from app::departments } as d using (dept_id, d.id)
map { id, salary, department: d_name }`,
  };

export const rqlTransformsJoinExamples: CodeExample[] = [
  joinInnerExample,
  joinLeftExample,
];
