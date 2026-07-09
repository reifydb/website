import type { CodeExample } from '@/lib/examples/types';

export const scriptingDmlUpdateExamples: CodeExample[] = [
{
    id: 'scripting-update-basic',
    title: 'Update Rows',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_u;
CREATE TABLE dm_u::users { id: int4, name: utf8, active: bool };
INSERT dm_u::users [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: true }
];
UPDATE dm_u::users { id: id, name: name, active: false } FILTER { id == 2 };
FROM dm_u::users`,
    expected: `id | name  | active
---+-------+-------
1  | Alice | true
2  | Bob   | false`,
  },
{
    id: 'scripting-update-expression',
    title: 'Update with Expression',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_ue;
CREATE TABLE dm_ue::scores { id: int4, points: int4 };
INSERT dm_ue::scores [{ id: 1, points: 10 }, { id: 2, points: 20 }];
UPDATE dm_ue::scores { id: id, points: points + 5 } FILTER { true };
FROM dm_ue::scores`,
    expected: `id | points
---+-------
1  | 15
2  | 25`,
  },
];
