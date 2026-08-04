import type { CodeExample } from '@/lib/examples/types';

export const scriptingInsertBasicExample: CodeExample = {
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
FROM dm_i::users
sort { id: asc }`,
    expected: `id | name  | active
---+-------+-------
1  | Alice | true
2  | Bob   | false
3  | Carol | true`,
  };

export const scriptingInsertMultipleExample: CodeExample = {
    id: 'scripting-insert-multiple',
    title: 'Insert Multiple Batches',
    category: 'scripting',
    code: `CREATE NAMESPACE dm_im;
CREATE TABLE dm_im::logs { id: int4, msg: utf8 };
INSERT dm_im::logs [{ id: 1, msg: 'start' }];
INSERT dm_im::logs [{ id: 2, msg: 'running' }, { id: 3, msg: 'done' }];
FROM dm_im::logs
sort { id: asc }`,
    expected: `id | msg
---+--------
1  | start
2  | running
3  | done`,
  };

export const scriptingDmlInsertExamples: CodeExample[] = [
  scriptingInsertBasicExample,
  scriptingInsertMultipleExample,
];
