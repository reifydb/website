import type { CodeExample } from '@/lib/examples/types';

export const scriptingProceduresOverviewExamples: CodeExample[] = [
{
    id: 'scripting-create-procedure',
    title: 'Create Procedure',
    category: 'scripting',
    code: `CREATE NAMESPACE pr;
CREATE PROCEDURE pr::hello AS {
  MAP { greeting: 'hello world' }
};
CALL pr::hello()`,
    expected: `greeting
-----------
hello world`,
  },
{
    id: 'scripting-procedure-params',
    title: 'Procedure Parameters',
    category: 'scripting',
    code: `CREATE NAMESPACE pr_p;
CREATE TABLE pr_p::users { id: int4, name: utf8 };
CREATE PROCEDURE pr_p::add_user { id: int4, name: utf8 } AS {
  INSERT pr_p::users [{ id: $id, name: $name }]
};
CALL pr_p::add_user(1, 'Alice');
CALL pr_p::add_user(2, 'Bob');
FROM pr_p::users`,
    expected: `id | name
---+------
1  | Alice
2  | Bob`,
  },
];
