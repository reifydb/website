import type { CodeExample } from '@/lib/examples/types';

export const withStorageOptionsExample: CodeExample = {
    id: 'with-storage-options',
    title: 'Configure Storage at Creation',
    code: `create namespace rql_with;
create ringbuffer rql_with::recent_errors {
  id: int4,
  message: utf8
} with { capacity: 2 };
insert rql_with::recent_errors [
  { id: 1, message: "timeout" },
  { id: 2, message: "refused" },
  { id: 3, message: "reset" }
];
from rql_with::recent_errors sort { id: asc }`,
    expected: `id | message | #rownum
---+---------+--------
2  | refused | 2
3  | reset   | 3`,
  };

export const withRowTtlExample: CodeExample = {
    id: 'with-row-ttl',
    title: 'Row Settings on a Table',
    code: `create table rql_with::sessions {
  token: utf8,
  user_id: int4
} with { time: processing, row: { ttl: 30m } };
insert rql_with::sessions [{ token: "a1", user_id: 1 }];
from rql_with::sessions`,
    expected: `token | user_id | #rownum
------+---------+--------
a1    | 1       | 1`,
  };

export const withColumnOptionsExample: CodeExample = {
    id: 'with-column-options',
    title: 'Options on a Column',
    code: `create table rql_with::tickets {
  id: int8 with { auto_increment },
  title: utf8
};
insert rql_with::tickets [{ title: "first" }, { title: "second" }];
from rql_with::tickets sort { id: asc }`,
    expected: `id | title  | #rownum
---+--------+--------
1  | first  | 1
2  | second | 2`,
  };

export const withJoinOptionsExample: CodeExample = {
    id: 'with-join-options',
    title: 'Options on a Join',
    code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id) with { snapshot: true }
map { id, department: d_name }
sort { id: asc }`,
    expected: `id | department  | #rownum
---+-------------+--------
1  | Engineering | 5
2  | Engineering | 4
3  | Marketing   | 3
4  | Marketing   | 2
5  | Sales       | 1`,
  };

export const withUnknownKeyExample: CodeExample = {
    id: 'with-unknown-key',
    title: 'Unknown Keys Are Rejected',
    description: 'Each construct validates its with block; a key it does not know is a parse error.',
    code: `create table rql_with::broken {
  id: int4
} with { color: "red" }`,
    expectsError: true,
  };

export const rqlTransformsWithExamples: CodeExample[] = [
  withStorageOptionsExample,
  withRowTtlExample,
  withColumnOptionsExample,
  withJoinOptionsExample,
  withUnknownKeyExample,
];
