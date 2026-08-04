import type { CodeExample } from '@/lib/examples/types';

export const scriptingInsertBasicExample: CodeExample = {
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
  };

export const scriptingCreateTableExample: CodeExample = {
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
  };

export const scriptingCreateTestExample: CodeExample = {
    id: 'scripting-create-test',
    title: 'Create and Run Tests',
    category: 'scripting',
    code: `CREATE NAMESPACE tg;
CREATE TABLE tg::items { id: int4, name: utf8 };

CREATE TEST PROCEDURE tg::seed AS {
  INSERT tg::items [{ id: 1, name: 'one' }, { id: 2, name: 'two' }]
};

CREATE TEST tg::query_all {
  CALL tg::seed();
  FROM tg::items | ASSERT { id > 0 }
};

CREATE TEST tg::filter_one {
  CALL tg::seed();
  FROM tg::items | FILTER name == 'one' | ASSERT { id == 1 }
};

RUN TESTS tg | MAP { name, namespace, outcome }`,
    expected: `name       | namespace | outcome
-----------+-----------+--------
filter_one | tg        | pass
query_all  | tg        | pass`,
  };

export const scriptingOverviewExamples: CodeExample[] = [
  scriptingInsertBasicExample,
  scriptingCreateTableExample,
  scriptingCreateTestExample,
];
