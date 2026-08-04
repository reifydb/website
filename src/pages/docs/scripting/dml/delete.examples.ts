import type { CodeExample } from '@/lib/examples/types';

export const delBasicExample: CodeExample = {
    id: 'scripting-delete-basic',
    title: 'Delete Matching Rows',
    category: 'scripting',
    code: `create namespace del;
create table del::sessions { id: int4, account: utf8, expired: bool };
insert del::sessions [
  { id: 1, account: "ada", expired: false },
  { id: 2, account: "grace", expired: true },
  { id: 3, account: "alan", expired: true }
];
delete del::sessions filter { expired == true }`,
    expected: `namespace | table    | deleted
----------+----------+--------
del       | sessions | 2`,
  };

export const delScanExample: CodeExample = {
    id: 'scripting-delete-scan',
    title: 'Only the Match Survived',
    category: 'scripting',
    code: `from del::sessions`,
    expected: `id | account | expired
---+---------+--------
1  | ada     | false`,
  };

export const delReturningExample: CodeExample = {
    id: 'scripting-delete-returning',
    title: 'See What Was Removed',
    category: 'scripting',
    code: `insert del::sessions [{ id: 4, account: "kurt", expired: true }];
delete del::sessions filter { id == 4 } returning { id, account }`,
    expected: `id | account
---+--------
4  | kurt`,
  };

export const delNoFilterExample: CodeExample = {
    id: 'scripting-delete-no-filter',
    title: 'The Filter Is Mandatory',
    description: 'A delete without a filter fails with DELETE_002 instead of silently emptying the table.',
    category: 'scripting',
    code: `delete del::sessions`,
    expectsError: true,
  };

export const delAllExample: CodeExample = {
    id: 'scripting-delete-all',
    title: 'Emptying a Table Is an Explicit Choice',
    category: 'scripting',
    code: `create table del::drafts { id: int4, body: utf8 };
insert del::drafts [{ id: 1, body: "a" }, { id: 2, body: "b" }];
delete del::drafts filter { true }`,
    expected: `namespace | table  | deleted
----------+--------+--------
del       | drafts | 2`,
  };

export const delEmptyExample: CodeExample = {
    id: 'scripting-delete-empty',
    title: 'The Table Remains, Empty',
    category: 'scripting',
    code: `from del::drafts`,
    expected: `(empty)`,
  };

export const delRingbufferExample: CodeExample = {
    id: 'scripting-delete-ringbuffer',
    title: 'Delete from a Ring Buffer',
    category: 'scripting',
    code: `create ringbuffer del::recent { action: utf8 } with { capacity: 5 };
insert del::recent [{ action: "login" }, { action: "logout" }, { action: "login" }];
delete del::recent filter { action == "login" }`,
    expected: `namespace | ringbuffer | deleted
----------+------------+--------
del       | recent     | 2`,
  };

export const delRingbufferScanExample: CodeExample = {
    id: 'scripting-delete-ringbuffer-scan',
    title: 'The Buffer Keeps the Rest',
    category: 'scripting',
    code: `from del::recent`,
    expected: `action
------
logout`,
  };

export const delSeriesExample: CodeExample = {
    id: 'scripting-delete-series',
    title: 'Delete from a Series',
    category: 'scripting',
    code: `create series del::temps { ts: datetime, celsius: float8 } with { key: ts };
insert del::temps [
  { ts: datetime::from_epoch_millis(1000), celsius: 18.5 },
  { ts: datetime::from_epoch_millis(2000), celsius: 19.5 }
];
delete del::temps filter { celsius < 19.0 }`,
    expected: `namespace | series | deleted
----------+--------+--------
del       | temps  | 1`,
  };

export const delViewSetupExample: CodeExample = {
    id: 'scripting-delete-view-setup',
    title: 'A Transactional View over a Table',
    category: 'scripting',
    code: `create table del::orders { id: int4, amount: int8 };
create transactional view del::revenue { revenue: int8 } as {
  from del::orders
  aggregate { revenue: math::sum(amount) } by {}
}`,
  };

export const delViewInsertExample: CodeExample = {
    id: 'scripting-delete-view-insert',
    title: 'Seed the Source Table',
    category: 'scripting',
    code: `insert del::orders [
  { id: 1, amount: 40 },
  { id: 2, amount: 25 },
  { id: 3, amount: 35 }
]`,
    expected: `namespace | table  | inserted
----------+--------+---------
del       | orders | 3`,
  };

export const delViewReadExample: CodeExample = {
    id: 'scripting-delete-view-read',
    title: 'The View Before the Delete',
    category: 'scripting',
    code: `from del::revenue`,
    expected: `revenue
-------
100`,
  };

export const delViewDeleteExample: CodeExample = {
    id: 'scripting-delete-view-delete',
    title: 'Delete a Source Row',
    category: 'scripting',
    code: `delete del::orders filter { id == 3 }`,
    expected: `namespace | table  | deleted
----------+--------+--------
del       | orders | 1`,
  };

export const delViewAfterExample: CodeExample = {
    id: 'scripting-delete-view-after',
    title: 'The View Reflects the Delete',
    category: 'scripting',
    code: `from del::revenue`,
    expected: `revenue
-------
65`,
  };

export const scriptingDmlDeleteExamples: CodeExample[] = [
  delBasicExample,
  delScanExample,
  delReturningExample,
  delNoFilterExample,
  delAllExample,
  delEmptyExample,
  delRingbufferExample,
  delRingbufferScanExample,
  delSeriesExample,
  delViewSetupExample,
  delViewInsertExample,
  delViewReadExample,
  delViewDeleteExample,
  delViewAfterExample,
];
