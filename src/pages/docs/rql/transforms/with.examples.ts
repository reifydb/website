import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsWithExamples: CodeExample[] = [
{
    id: 'with-storage-options',
    title: 'Configure Storage at Creation',
    category: 'rql',
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
    expected: `id | message
---+--------
2  | refused
3  | reset`,
  },
{
    id: 'with-row-ttl',
    title: 'Row Settings on a Table',
    category: 'rql',
    code: `create table rql_with::sessions {
  token: utf8,
  user_id: int4
} with { row: { ttl: { duration: '30m', mode: drop } } };
insert rql_with::sessions [{ token: "a1", user_id: 1 }];
from rql_with::sessions`,
    expected: `token | user_id
------+--------
a1    | 1`,
  },
{
    id: 'with-column-options',
    title: 'Options on a Column',
    category: 'rql',
    code: `create table rql_with::tickets {
  id: int8 with { auto_increment },
  title: utf8
};
insert rql_with::tickets [{ title: "first" }, { title: "second" }];
from rql_with::tickets sort { id: asc }`,
    expected: `id | title
---+-------
1  | first
2  | second`,
  },
{
    id: 'with-join-options',
    title: 'Options on a Join',
    category: 'rql',
    code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id) with { snapshot: true }
map { id, department: d_name }
sort { id: asc }`,
    expected: `id | department
---+------------
1  | Engineering
2  | Engineering
3  | Marketing
4  | Marketing
5  | Sales`,
  },
{
    id: 'with-distinct-ttl',
    title: 'Options on Distinct',
    category: 'rql',
    code: `from app::employees
distinct { dept_id } with { ttl: { duration: '1h' } }
map { dept_id }
sort { dept_id: asc }`,
    expected: `dept_id
-------
1
2
3`,
  },
{
    id: 'with-unknown-key',
    title: 'Unknown Keys Are Rejected',
    description: 'Each construct validates its with block; a key it does not know is a parse error.',
    category: 'rql',
    code: `create table rql_with::broken {
  id: int4
} with { color: "red" }`,
    expectsError: true,
  },
];
