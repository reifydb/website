import type { CodeExample } from '@/lib/examples/types';

export const scriptingDmlInsertExamples: CodeExample[] = [
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
];
