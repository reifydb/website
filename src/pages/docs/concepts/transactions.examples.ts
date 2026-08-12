import type { CodeExample } from '@/lib/examples/types';

export const txnAtomicScriptExample: CodeExample = {
    id: 'txn-atomic-script',
    title: 'A Multi-Statement Command Commits Atomically',
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
  };

export const txnRollbackErrorExample: CodeExample = {
    id: 'txn-rollback-error',
    title: 'An Error Rolls Back the Whole Request',
    description: 'The update executes, then the cast fails. Because both run in one transaction, the update is rolled back too.',
    code: `update txn::accounts { balance: 0 } filter { owner == "ada" };
map { oops: cast("not a number", int4) }`,
    expectsError: true,
  };

export const txnRollbackVerifyExample: CodeExample = {
    id: 'txn-rollback-verify',
    title: 'Nothing Was Applied',
    code: `from txn::accounts sort { id: asc }`,
    expected: `id | owner | balance
---+-------+--------
1  | ada   | 75
2  | grace | 75`,
  };

export const txnViewSetupExample: CodeExample = {
    id: 'txn-view-setup',
    title: 'A Transactional View over a Table',
    code: `create table txn::orders { id: int4, total: int8 };
create transactional view txn::revenue { revenue: int8 } as {
  from txn::orders
  aggregate { revenue: math::sum(total) } by {}
}`,
  };

export const txnViewWriteExample: CodeExample = {
    id: 'txn-view-write',
    title: 'Write to the Source Table',
    code: `insert txn::orders [{ id: 1, total: 40 }, { id: 2, total: 25 }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
txn       | orders | 2`,
  };

export const txnViewReadExample: CodeExample = {
    id: 'txn-view-read',
    title: 'The View Committed with the Write',
    code: `from txn::revenue`,
    expected: `revenue
-------
65`,
  };

export const txnViewReadAfterWriteExample: CodeExample = {
    id: 'txn-view-read-after-write',
    title: 'Write Then Read the View in One Request',
    description: 'The insert dirties the view\'s source, so the read fails with TXN_015 and the whole request rolls back.',
    code: `insert txn::orders [{ id: 3, total: 10 }];
from txn::revenue`,
    expectsError: true,
  };

export const txnViewUnchangedExample: CodeExample = {
    id: 'txn-view-unchanged',
    title: 'The Failed Request Left Nothing Behind',
    code: `from txn::revenue`,
    expected: `revenue
-------
65`,
  };

export const txnDeferredSetupExample: CodeExample = {
    id: 'txn-deferred-setup',
    title: 'A Deferred View over the Same Table',
    code: `create deferred view txn::order_count { orders: int8 } as {
  from txn::orders
  aggregate { orders: math::count(id) } by {}
}`,
  };

export const txnDeferredReadAfterWriteExample: CodeExample = {
    id: 'txn-deferred-read-after-write',
    title: 'Deferred Views Are Protected Too',
    description: 'The deferred view only updates after commit, so a same-request read after writing its source also fails with TXN_015.',
    code: `insert txn::orders [{ id: 3, total: 10 }];
from txn::order_count`,
    expectsError: true,
  };

export const conceptsTransactionsExamples: CodeExample[] = [
  txnAtomicScriptExample,
  txnRollbackErrorExample,
  txnRollbackVerifyExample,
  txnViewSetupExample,
  txnViewWriteExample,
  txnViewReadExample,
  txnViewReadAfterWriteExample,
  txnViewUnchangedExample,
  txnDeferredSetupExample,
  txnDeferredReadAfterWriteExample,
];
