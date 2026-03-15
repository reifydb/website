import type { CodeExample } from '../index';

export const scriptingSchemaExamples: CodeExample[] = [
  {
    id: 'scripting-create-namespace',
    title: 'Create Namespace',
    category: 'scripting',
    code: `CREATE NAMESPACE sc`,
    expected: `namespace | created
----------+--------
sc        | true`,
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
    expected: `namespace | table | created
----------+-------+--------
sc_t      | users | true`,
  },
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
FROM sc_ai::users`,
    expected: `id | name
---+------
1  | Alice
2  | Bob`,
  },
  {
    id: 'scripting-create-enum-unit',
    title: 'Unit Enum',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_eu;
CREATE ENUM sc_eu::color {
  Red,
  Green,
  Blue
}`,
  },
  {
    id: 'scripting-create-enum-struct',
    title: 'Struct Enum',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_es;
CREATE ENUM sc_es::shape {
  Circle { radius: float8 },
  Rectangle { width: float8, height: float8 }
}`,
  },
  {
    id: 'scripting-create-dictionary',
    title: 'Create Dictionary',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_d;
CREATE DICTIONARY sc_d::colors FOR utf8 AS uint2`,
  },
  {
    id: 'scripting-drop-table',
    title: 'Drop Table',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_dr;
CREATE TABLE sc_dr::temp { id: int4 };
DROP TABLE sc_dr::temp`,
  },
  {
    id: 'scripting-drop-if-exists',
    title: 'Drop If Exists',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_die;
DROP TABLE IF EXISTS sc_die::nonexistent`,
  },
];
