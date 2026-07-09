import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsExtendExamples: CodeExample[] = [
{
    id: 'extend-basic',
    title: 'Extend Basic',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1 }`,
    expected: `id | dept_id | salary | bonus
---+---------+--------+------
5  | 3       | 90000  | 9000
4  | 2       | 71000  | 7100
3  | 2       | 65000  | 6500
2  | 1       | 82000  | 8200
1  | 1       | 75000  | 7500`,
  },
{
    id: 'extend-multiple',
    title: 'Extend Multiple Columns',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1, tax: salary * 0.3, net: salary * 0.6 }`,
  },
{
    id: 'extend-chained',
    title: 'Extend Chained',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1 }
extend { total_comp: salary + bonus }`,
  },
];
