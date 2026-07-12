import type { CodeExample } from '@/lib/examples/types';

export const scriptingOverviewExamples: CodeExample[] = [
{
    id: 'scripting-insert-basic',
    title: 'Insert Rows',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_i;
CREATE TABLE dm_i::users { id: int4, name: utf8, active: bool };
INSERT dm_i::users [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Carol', active: true }
];
FROM dm_i::users
sort { id: asc }`,
    expected: `id | name  | active
---+-------+-------
1  | Alice | true
2  | Bob   | false
3  | Carol | true`,
  },
{
    id: 'scripting-create-table',
    title: 'Create Table',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_t;
CREATE TABLE sc_t::users {
  id: int4,
  name: utf8,
  age: int2,
  active: bool
}`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16417 | sc_t      | users | true`,
  },
];
