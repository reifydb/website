import type { CodeExample } from '@/lib/examples/types';

export const dataModelProceduresExamples: CodeExample[] = [
{
    id: 'dm-procedures-create',
    title: 'Create and Call a Procedure',
    category: 'concept',
    code: `create namespace dm_proc;
create procedure dm_proc::health as {
  map { status: "ok" }
};
call dm_proc::health()`,
    expected: `status
------
ok`,
  },
{
    id: 'dm-procedures-params',
    title: 'Typed Parameters',
    category: 'concept',
    code: `create table dm_proc::users { id: int4, name: utf8 };
create procedure dm_proc::add_user { id: int4, name: utf8 } as {
  insert dm_proc::users [{ id: $id, name: $name }]
};
call dm_proc::add_user(1, "Ada");
call dm_proc::add_user(2, "Grace");
from dm_proc::users`,
    expected: `id | name
---+------
2  | Grace
1  | Ada`,
  },
{
    id: 'dm-procedures-logic',
    title: 'The Body Is a Full Script',
    category: 'concept',
    code: `create procedure dm_proc::stats as {
  let $total = 10;
  let $active = 7;
  map { total: $total, active: $active, ratio: $active * 100 / $total }
};
call dm_proc::stats()`,
    expected: `total | active | ratio
------+--------+------
10    | 7      | 70`,
  },
{
    id: 'dm-procedures-compose',
    title: 'Procedures Call Procedures',
    category: 'concept',
    code: `create procedure dm_proc::wrapper as {
  call dm_proc::health()
};
call dm_proc::wrapper()`,
    expected: `status
------
ok`,
  },
{
    id: 'dm-procedures-test',
    title: 'Test Procedures and In-Database Tests',
    category: 'concept',
    code: `create test procedure dm_proc::seed as {
  insert dm_proc::users [{ id: 99, name: "Test" }]
};
create test dm_proc::user_exists {
  call dm_proc::seed();
  from dm_proc::users | filter id == 99 | assert { name == "Test" }
};
run tests dm_proc`,
    expected: `name        | namespace | outcome | duration | message
------------+-----------+---------+----------+--------
user_exists | dm_proc   | pass    | 0s       |`,
  },
{
    id: 'dm-procedures-test-isolation',
    title: 'Tests Roll Back - the Seed Row Is Gone',
    category: 'concept',
    code: `from dm_proc::users filter { id == 99 }`,
    expected: `(empty)`,
  },
];
