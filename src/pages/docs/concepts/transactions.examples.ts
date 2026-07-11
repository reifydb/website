import type { CodeExample } from '@/lib/examples/types';

export const conceptsTransactionsExamples: CodeExample[] = [
{
    id: 'txn-atomic-script',
    title: 'A Multi-Statement Command Commits Atomically',
    category: 'concept',
    code: `create namespace txn;
create table txn::accounts { id: int4, owner: utf8, balance: int8 };
insert txn::accounts [
  { id: 1, owner: "ada", balance: 100 },
  { id: 2, owner: "grace", balance: 50 }
];
update txn::accounts { balance: 75 } filter { owner == "ada" };
update txn::accounts { balance: 75 } filter { owner == "grace" };
from txn::accounts sort { id: asc }`,
    expected: `id | owner | balance
---+-------+--------
1  | ada   | 75
2  | grace | 75`,
  },
{
    id: 'txn-rollback-error',
    title: 'An Error Rolls Back the Whole Request',
    description: 'The update executes, then the cast fails. Because both run in one transaction, the update is rolled back too.',
    category: 'concept',
    code: `update txn::accounts { balance: 0 } filter { owner == "ada" };
map { oops: cast("not a number", int4) }`,
    expectsError: true,
  },
{
    id: 'txn-rollback-verify',
    title: 'Nothing Was Applied',
    category: 'concept',
    code: `from txn::accounts sort { id: asc }`,
    expected: `id | owner | balance
---+-------+--------
1  | ada   | 75
2  | grace | 75`,
  },
{
    id: 'txn-view-setup',
    title: 'A Transactional View over a Table',
    category: 'concept',
    code: `create table txn::orders { id: int4, total: int8 };
create transactional view txn::revenue { revenue: int8 } as {
  from txn::orders
  aggregate { revenue: math::sum(total) } by {}
}`,
  },
{
    id: 'txn-view-write',
    title: 'Write to the Source Table',
    category: 'concept',
    code: `insert txn::orders [{ id: 1, total: 40 }, { id: 2, total: 25 }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
txn       | orders | 2`,
  },
{
    id: 'txn-view-read',
    title: 'The View Committed with the Write',
    category: 'concept',
    code: `from txn::revenue`,
    expected: `revenue
-------
65`,
  },
{
    id: 'txn-view-read-after-write',
    title: 'Write Then Read the View in One Request',
    description: 'The insert dirties the view\'s source, so the read fails with TXN_015 and the whole request rolls back.',
    category: 'concept',
    code: `insert txn::orders [{ id: 3, total: 10 }];
from txn::revenue`,
    expectsError: true,
  },
{
    id: 'txn-view-unchanged',
    title: 'The Failed Request Left Nothing Behind',
    category: 'concept',
    code: `from txn::revenue`,
    expected: `revenue
-------
65`,
  },
{
    id: 'txn-deferred-setup',
    title: 'A Deferred View over the Same Table',
    category: 'concept',
    code: `create deferred view txn::order_count { orders: int8 } as {
  from txn::orders
  aggregate { orders: math::count(id) } by {}
}`,
  },
{
    id: 'txn-deferred-read-after-write',
    title: 'Deferred Views Are Protected Too',
    description: 'The deferred view only updates after commit, so a same-request read after writing its source also fails with TXN_015.',
    category: 'concept',
    code: `insert txn::orders [{ id: 3, total: 10 }];
from txn::order_count`,
    expectsError: true,
  },
];
