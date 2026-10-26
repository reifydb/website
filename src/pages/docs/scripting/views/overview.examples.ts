import type { CodeExample } from '@/lib/examples/types';

export const svoCreateExample: CodeExample = {
    id: 'svo-create',
    title: 'Create a View',
    code: `create namespace svo;
create table svo::orders { id: int4, customer: utf8, total: int8, status: utf8 };
create view svo::open_orders { id: int4, customer: utf8, total: int8 } as {
  from svo::orders
  filter { status == "open" }
  map { id, customer, total }
}`,
    expected: `id    | namespace | view        | created
------+-----------+-------------+--------
16417 | svo       | open_orders | true`,
  };

export const svoWriteExample: CodeExample = {
    id: 'svo-write',
    title: 'Write to the Source Table',
    code: `insert svo::orders [
  { id: 1, customer: "ada", total: 40, status: "open" },
  { id: 2, customer: "grace", total: 75, status: "open" },
  { id: 3, customer: "ada", total: 20, status: "closed" }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
svo       | orders | 3`,
  };

export const svoReadExample: CodeExample = {
    id: 'svo-read',
    title: 'Read the View',
    code: `from svo::open_orders`,
    expected: `id | customer | total | #rownum
---+----------+-------+--------
2  | grace    | 75    | 2
1  | ada      | 40    | 1`,
  };

export const svoDeferredExample: CodeExample = {
    id: 'svo-deferred',
    title: 'A Deferred View over Rows That Already Exist',
    code: `create deferred view svo::open_deferred { id: int4, total: int8 } as {
  from svo::orders
  filter { status == "open" }
  map { id, total }
}`,
    expected: `id    | namespace | view          | created
------+-----------+---------------+--------
16418 | svo       | open_deferred | true`,
  };

export const svoDeferredReadExample: CodeExample = {
    id: 'svo-deferred-read',
    title: 'Deferred Views Backfill',
    code: `from svo::open_deferred`,
    expected: `id | total | #rownum
---+-------+--------
2  | 75    | 2
1  | 40    | 1`,
  };

export const svoTransactionalExample: CodeExample = {
    id: 'svo-transactional',
    title: 'A Transactional View over the Same Rows',
    code: `create transactional view svo::open_tx { id: int4, total: int8 } as {
  from svo::orders
  filter { status == "open" }
  map { id, total }
}`,
    expected: `id    | namespace | view    | created
------+-----------+---------+--------
16419 | svo       | open_tx | true`,
  };

export const svoTransactionalReadExample: CodeExample = {
    id: 'svo-transactional-read',
    title: 'Transactional Views Start Empty',
    code: `from svo::open_tx`,
    expected: `(empty)`,
  };

export const svoReadOnlyExample: CodeExample = {
    id: 'svo-read-only',
    title: 'Views Are Not Write Targets',
    description: 'A view is derived state; writing to it fails with CA_004.',
    code: `insert svo::open_orders [{ id: 9, customer: "bob", total: 1 }]`,
    expectsError: true,
  };

export const svoSortLastExample: CodeExample = {
    id: 'svo-sort-last',
    title: 'sort Must Be the Last Operator',
    description: 'A sort followed by another operator is rejected with FLOW_012.',
    code: `create view svo::by_total { id: int4, total: int8 } as {
  from svo::orders
  sort { total: desc }
  map { id, total }
}`,
    expectsError: true,
  };

export const svoSameRequestExample: CodeExample = {
    id: 'svo-same-request',
    title: 'Write Then Read the View in One Request',
    description: 'The insert dirties the view\'s source, so the read fails with TXN_015 and the whole request rolls back.',
    code: `insert svo::orders [{ id: 4, customer: "linus", total: 90, status: "open" }];
from svo::open_orders`,
    expectsError: true,
  };

export const svoDropExample: CodeExample = {
    id: 'svo-drop',
    title: 'Drop a View',
    code: `drop view svo::open_deferred`,
    expected: `namespace | view          | dropped
----------+---------------+--------
svo       | open_deferred | true`,
  };

export const svoDropIfExistsExample: CodeExample = {
    id: 'svo-drop-if-exists',
    title: 'drop view if exists',
    code: `drop view if exists svo::open_deferred`,
    expected: `namespace | view          | dropped
----------+---------------+--------
svo       | open_deferred | false`,
  };

export const svoDropSourceExample: CodeExample = {
    id: 'svo-drop-source',
    title: 'A Source Table Cannot Be Dropped While Views Depend on It',
    description: 'CA_035 lists every flow that still reads the table.',
    code: `drop table svo::orders`,
    expectsError: true,
  };

export const scriptingViewsOverviewExamples: CodeExample[] = [
  svoCreateExample,
  svoWriteExample,
  svoReadExample,
  svoDeferredExample,
  svoDeferredReadExample,
  svoTransactionalExample,
  svoTransactionalReadExample,
  svoReadOnlyExample,
  svoSortLastExample,
  svoSameRequestExample,
  svoDropExample,
  svoDropIfExistsExample,
  svoDropSourceExample,
];
