import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateTableExample: CodeExample = {
    id: 'scripting-create-table',
    title: 'Create Table',
    code: `CREATE NAMESPACE sc_t;
CREATE TABLE sc_t::users {
  id: int4,
  name: utf8,
  age: int2,
  active: bool
}`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16416 | sc_t      | users | true`,
  };

export const scriptingCreateTableAutoIncrementExample: CodeExample = {
    id: 'scripting-create-table-auto-increment',
    title: 'Auto Increment',
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
  };

export const scriptingSchemaTablesExamples: CodeExample[] = [
  scriptingCreateTableExample,
  scriptingCreateTableAutoIncrementExample,
];
