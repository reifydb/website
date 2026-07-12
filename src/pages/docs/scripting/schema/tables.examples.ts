import type { CodeExample } from '@/lib/examples/types';

export const scriptingSchemaTablesExamples: CodeExample[] = [
{
    id: 'scripting-create-table-auto-increment',
    title: 'Auto Increment',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_ai;
CREATE TABLE sc_ai::users {
  id: int4 WITH { auto_increment },
  name: utf8
};
INSERT sc_ai::users [{ name: 'Alice' }, { name: 'Bob' }];
FROM sc_ai::users
sort { id: asc }`,
    expected: `id | name
---+------
1  | Alice
2  | Bob`,
  },
];
