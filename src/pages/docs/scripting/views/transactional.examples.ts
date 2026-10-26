import type { CodeExample } from '@/lib/examples/types';

export const svtCreateExample: CodeExample = {
    id: 'svt-create',
    title: 'Create the Table and Its Views Together',
    code: `create namespace svt;
create table svt::accounts { id: int4, owner: utf8, balance: int8 };
create transactional view svt::overdrawn { id: int4, owner: utf8, balance: int8 } as {
  from svt::accounts
  filter { balance < 0 }
  map { id, owner, balance }
};
create view svt::total_balance { total: int8 } as {
  from svt::accounts
  aggregate { total: math::sum(balance) } by {}
}`,
    expected: `id    | namespace | view          | created
------+-----------+---------------+--------
16420 | svt       | total_balance | true`,
  };

export const svtWriteExample: CodeExample = {
    id: 'svt-write',
    title: 'Write to the Source Table',
    code: `insert svt::accounts [
  { id: 1, owner: "ada", balance: 100 },
  { id: 2, owner: "grace", balance: -20 },
  { id: 3, owner: "linus", balance: 0 }
]`,
    expected: `namespace | table    | inserted
----------+----------+---------
svt       | accounts | 3`,
  };

export const svtReadExample: CodeExample = {
    id: 'svt-read',
    title: 'The View Is Current on the Next Request',
    code: `from svt::overdrawn`,
    expected: `id | owner | balance
---+-------+--------
2  | grace | -20`,
  };

export const svtAggregateReadExample: CodeExample = {
    id: 'svt-aggregate-read',
    title: 'So Is the Aggregate',
    code: `from svt::total_balance`,
    expected: `total
-----
80`,
  };

export const svtEnterExample: CodeExample = {
    id: 'svt-enter',
    title: 'A Row Enters When It Starts Matching',
    code: `update svt::accounts { balance: -5 } filter { owner == "linus" }`,
    expected: `namespace | table    | updated
----------+----------+--------
svt       | accounts | 1`,
  };

export const svtEnterReadExample: CodeExample = {
    id: 'svt-enter-read',
    title: 'Linus Is Now Overdrawn',
    code: `from svt::overdrawn`,
    expected: `id | owner | balance
---+-------+--------
3  | linus | -5
2  | grace | -20`,
  };

export const svtLeaveExample: CodeExample = {
    id: 'svt-leave',
    title: 'And Leaves When It Stops',
    code: `update svt::accounts { balance: 30 } filter { owner == "grace" }`,
    expected: `namespace | table    | updated
----------+----------+--------
svt       | accounts | 1`,
  };

export const svtLeaveReadExample: CodeExample = {
    id: 'svt-leave-read',
    title: 'Grace Is Gone',
    code: `from svt::overdrawn`,
    expected: `id | owner | balance
---+-------+--------
3  | linus | -5`,
  };

export const svtAggregateAfterExample: CodeExample = {
    id: 'svt-aggregate-after',
    title: 'The Total Tracked Every Update',
    code: `from svt::total_balance`,
    expected: `total
-----
125`,
  };

export const svtSameRequestExample: CodeExample = {
    id: 'svt-same-request',
    title: 'Write Then Read the View in One Request',
    description: 'The read sees the update: linus is no longer overdrawn.',
    code: `update svt::accounts { balance: 0 } filter { owner == "linus" };
from svt::overdrawn`,
    expected: `(empty)`,
  };

export const svtSameRequestVerifyExample: CodeExample = {
    id: 'svt-same-request-verify',
    title: 'The Write Was Committed',
    code: `from svt::overdrawn`,
    expected: `(empty)`,
  };

export const svtNoBackfillExample: CodeExample = {
    id: 'svt-no-backfill',
    title: 'A View Created after the Data',
    code: `create transactional view svt::rich { id: int4, owner: utf8 } as {
  from svt::accounts
  filter { balance >= 100 }
  map { id, owner }
}`,
    expected: `id    | namespace | view | created
------+-----------+------+--------
16422 | svt       | rich | true`,
  };

export const svtNoBackfillReadExample: CodeExample = {
    id: 'svt-no-backfill-read',
    title: 'Existing Rows Are Not Picked Up',
    code: `from svt::rich`,
    expected: `(empty)`,
  };

export const svtTouchExample: CodeExample = {
    id: 'svt-touch',
    title: 'A Later Write to the Row Brings It In',
    code: `update svt::accounts { balance: 150 } filter { owner == "ada" }`,
    expected: `namespace | table    | updated
----------+----------+--------
svt       | accounts | 1`,
  };

export const svtTouchReadExample: CodeExample = {
    id: 'svt-touch-read',
    title: 'Ada Appears',
    code: `from svt::rich`,
    expected: `id | owner
---+------
1  | ada`,
  };

export const svtChainExample: CodeExample = {
    id: 'svt-chain',
    title: 'A Transactional View over a Transactional View',
    code: `create transactional view svt::overdrawn_owners { owner: utf8 } as {
  from svt::overdrawn
  map { owner }
}`,
    expected: `id    | namespace | view             | created
------+-----------+------------------+--------
16424 | svt       | overdrawn_owners | true`,
  };

export const svtChainWriteExample: CodeExample = {
    id: 'svt-chain-write',
    title: 'One Write Moves Through the Chain',
    code: `insert svt::accounts [{ id: 4, owner: "bob", balance: -1 }]`,
    expected: `namespace | table    | inserted
----------+----------+---------
svt       | accounts | 1`,
  };

export const svtChainReadExample: CodeExample = {
    id: 'svt-chain-read',
    title: 'Both Levels Committed with the Insert',
    code: `from svt::overdrawn_owners`,
    expected: `owner
-----
bob`,
  };

export const scriptingViewsTransactionalExamples: CodeExample[] = [
  svtCreateExample,
  svtWriteExample,
  svtReadExample,
  svtAggregateReadExample,
  svtEnterExample,
  svtEnterReadExample,
  svtLeaveExample,
  svtLeaveReadExample,
  svtAggregateAfterExample,
  svtSameRequestExample,
  svtSameRequestVerifyExample,
  svtNoBackfillExample,
  svtNoBackfillReadExample,
  svtTouchExample,
  svtTouchReadExample,
  svtChainExample,
  svtChainWriteExample,
  svtChainReadExample,
];
