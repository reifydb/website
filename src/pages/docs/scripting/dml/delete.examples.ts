import type { CodeExample } from '@/lib/examples/types';

export const scriptingDmlDeleteExamples: CodeExample[] = [
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
