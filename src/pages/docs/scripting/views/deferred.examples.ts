import type { CodeExample } from '@/lib/examples/types';

export const svdCreateExample: CodeExample = {
    id: 'svd-create',
    title: 'Create a Deferred View over Existing Rows',
    code: `create namespace svd;
create table svd::orders { id: int4, customer: utf8, total: int8, status: utf8 };
insert svd::orders [
  { id: 1, customer: "ada", total: 40, status: "open" },
  { id: 2, customer: "grace", total: 75, status: "open" },
  { id: 3, customer: "ada", total: 20, status: "closed" }
];
create deferred view svd::open_orders { id: int4, customer: utf8, total: int8 } as {
  from svd::orders
  filter { status == "open" }
  map { id, customer, total }
}`,
    expected: `id    | namespace | view        | created
------+-----------+-------------+--------
16418 | svd       | open_orders | true`,
  };

export const svdBackfillReadExample: CodeExample = {
    id: 'svd-backfill-read',
    title: 'Backfilled from the Existing Rows',
    code: `from svd::open_orders`,
    expected: `id | customer | total | #rownum
---+----------+-------+--------
2  | grace    | 75    | 2
1  | ada      | 40    | 1`,
  };

export const svdInsertExample: CodeExample = {
    id: 'svd-insert',
    title: 'Insert into the Source',
    code: `insert svd::orders [{ id: 4, customer: "linus", total: 90, status: "open" }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
svd       | orders | 1`,
  };

export const svdInsertReadExample: CodeExample = {
    id: 'svd-insert-read',
    title: 'The New Row Has Propagated',
    code: `from svd::open_orders`,
    expected: `id | customer | total
---+----------+------
4  | linus    | 90
2  | grace    | 75
1  | ada      | 40`,
  };

export const svdLeaveExample: CodeExample = {
    id: 'svd-leave',
    title: 'Rows Leave When They Stop Matching',
    code: `update svd::orders { status: "closed" } filter { id == 1 }`,
    expected: `namespace | table  | updated
----------+--------+--------
svd       | orders | 1`,
  };

export const svdLeaveReadExample: CodeExample = {
    id: 'svd-leave-read',
    title: 'Order 1 Is Gone',
    code: `from svd::open_orders`,
    expected: `id | customer | total
---+----------+------
4  | linus    | 90
2  | grace    | 75`,
  };

export const svdAggregateExample: CodeExample = {
    id: 'svd-aggregate',
    title: 'Aggregate in a Deferred View',
    code: `create deferred view svd::spend { customer: utf8, total: int8 } as {
  from svd::orders
  aggregate { total: math::sum(total) } by { customer }
}`,
    expected: `id    | namespace | view  | created
------+-----------+-------+--------
16420 | svd       | spend | true`,
  };

export const svdAggregateReadExample: CodeExample = {
    id: 'svd-aggregate-read',
    title: 'Totals per Customer',
    code: `from svd::spend sort { customer: asc }`,
    expected: `customer | total | #rownum
---------+-------+--------
ada      | 60    | 1
grace    | 75    | 2
linus    | 90    | 3`,
  };

export const svdJoinExample: CodeExample = {
    id: 'svd-join',
    title: 'Join in a Deferred View',
    code: `create table svd::departments { id: int4, name: utf8 };
create table svd::employees { id: int4, name: utf8, dept_id: int4 };
insert svd::departments [{ id: 1, name: "Engineering" }, { id: 2, name: "Sales" }];
insert svd::employees [
  { id: 101, name: "Alice", dept_id: 1 },
  { id: 102, name: "Bob", dept_id: 2 },
  { id: 103, name: "Carol", dept_id: 3 }
];
create deferred view svd::directory { emp_id: int4, emp_name: utf8, department: Option(utf8) } as {
  from svd::employees
  left join { from svd::departments } as d using (dept_id, d.id)
  map { emp_id: id, emp_name: name, department: d_name }
}`,
    expected: `id    | namespace | view      | created
------+-----------+-----------+--------
16424 | svd       | directory | true`,
  };

export const svdJoinReadExample: CodeExample = {
    id: 'svd-join-read',
    title: 'Unmatched Rows Carry none',
    code: `from svd::directory sort { emp_id: asc }`,
    expected: `emp_id | emp_name | department  | #rownum
-------+----------+-------------+--------
101    | Alice    | Engineering | 1
102    | Bob      | Sales       | 2
103    | Carol    | ⟪none⟫      | 3`,
  };

export const svdJoinRightInsertExample: CodeExample = {
    id: 'svd-join-right-insert',
    title: 'A Write on Either Side Propagates',
    code: `insert svd::departments [{ id: 3, name: "Support" }]`,
    expected: `namespace | table       | inserted
----------+-------------+---------
svd       | departments | 1`,
  };

export const svdJoinRightReadExample: CodeExample = {
    id: 'svd-join-right-read',
    title: 'Carol Now Has a Department',
    code: `from svd::directory sort { emp_id: asc }`,
    expected: `emp_id | emp_name | department  | #rownum
-------+----------+-------------+--------
101    | Alice    | Engineering | 1
102    | Bob      | Sales       | 2
103    | Carol    | Support     | 4`,
  };

export const svdChainExample: CodeExample = {
    id: 'svd-chain',
    title: 'A Deferred View over a Deferred View',
    code: `create deferred view svd::big_spenders { customer: utf8 } as {
  from svd::spend
  filter { total > 70 }
  map { customer }
}`,
    expected: `id    | namespace | view         | created
------+-----------+--------------+--------
16426 | svd       | big_spenders | true`,
  };

export const svdChainReadExample: CodeExample = {
    id: 'svd-chain-read',
    title: 'The Chain Backfills Too',
    code: `from svd::big_spenders sort { customer: asc }`,
    expected: `customer
--------
grace
linus`,
  };

export const svdSameRequestExample: CodeExample = {
    id: 'svd-same-request',
    title: 'Write Then Read the View in One Request',
    description: 'A deferred view updates after commit, so reading it in the request that wrote its source fails with TXN_015.',
    code: `insert svd::orders [{ id: 5, customer: "grace", total: 15, status: "open" }];
from svd::open_orders`,
    expectsError: true,
  };

export const scriptingViewsDeferredExamples: CodeExample[] = [
  svdCreateExample,
  svdBackfillReadExample,
  svdInsertExample,
  svdInsertReadExample,
  svdLeaveExample,
  svdLeaveReadExample,
  svdAggregateExample,
  svdAggregateReadExample,
  svdJoinExample,
  svdJoinReadExample,
  svdJoinRightInsertExample,
  svdJoinRightReadExample,
  svdChainExample,
  svdChainReadExample,
  svdSameRequestExample,
];
