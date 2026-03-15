import type { CodeExample } from '../index';

export const scriptingDmlExamples: CodeExample[] = [
  {
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
FROM dm_i::users`,
    expected: `id | name  | active
---+-------+-------
1  | Alice | true
2  | Bob   | false
3  | Carol | true`,
  },
  {
    id: 'scripting-insert-multiple',
    title: 'Insert Multiple Batches',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_im;
CREATE TABLE dm_im::logs { id: int4, msg: utf8 };
INSERT dm_im::logs [{ id: 1, msg: 'start' }];
INSERT dm_im::logs [{ id: 2, msg: 'running' }, { id: 3, msg: 'done' }];
FROM dm_im::logs`,
    expected: `id | msg
---+--------
1  | start
2  | running
3  | done`,
  },
  {
    id: 'scripting-update-basic',
    title: 'Update Rows',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_u;
CREATE TABLE dm_u::users { id: int4, name: utf8, active: bool };
INSERT dm_u::users [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: true }
];
UPDATE dm_u::users { id: id, name: name, active: false } FILTER { id == 2 };
FROM dm_u::users`,
    expected: `id | name  | active
---+-------+-------
1  | Alice | true
2  | Bob   | false`,
  },
  {
    id: 'scripting-update-expression',
    title: 'Update with Expression',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_ue;
CREATE TABLE dm_ue::scores { id: int4, points: int4 };
INSERT dm_ue::scores [{ id: 1, points: 10 }, { id: 2, points: 20 }];
UPDATE dm_ue::scores { id: id, points: points + 5 } FILTER { true };
FROM dm_ue::scores`,
    expected: `id | points
---+-------
1  | 15
2  | 25`,
  },
  {
    id: 'scripting-delete-basic',
    title: 'Delete Rows',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_dl;
CREATE TABLE dm_dl::items { id: int4, label: utf8 };
INSERT dm_dl::items [
  { id: 1, label: 'keep' },
  { id: 2, label: 'remove' },
  { id: 3, label: 'keep' }
];
DELETE dm_dl::items FILTER { label == 'remove' };
FROM dm_dl::items`,
    expected: `id | label
---+------
1  | keep
3  | keep`,
  },
  {
    id: 'scripting-delete-all',
    title: 'Delete All Rows',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_da;
CREATE TABLE dm_da::temp { id: int4, val: utf8 };
INSERT dm_da::temp [{ id: 1, val: 'a' }, { id: 2, val: 'b' }];
DELETE dm_da::temp FILTER { true };
FROM dm_da::temp`,
  },
];
