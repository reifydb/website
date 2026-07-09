import type { CodeExample } from '@/lib/examples/types';

export const dataModelSequencesExamples: CodeExample[] = [
{
    id: 'dm-sequences-auto-increment',
    title: 'Auto-Increment Assigns IDs at Insert',
    category: 'concept',
    code: `create namespace dm_seq;
create table dm_seq::tickets {
  id: int8 with { auto_increment },
  title: utf8
};
insert dm_seq::tickets [{ title: "First" }, { title: "Second" }];
from dm_seq::tickets`,
    expected: `id | title
---+-------
2  | Second
1  | First`,
  },
{
    id: 'dm-sequences-alter',
    title: 'Reposition a Sequence with ALTER SEQUENCE',
    category: 'concept',
    code: `alter sequence dm_seq::tickets::id set value 1000;
insert dm_seq::tickets [{ title: "After the jump" }];
from dm_seq::tickets`,
    expected: `id   | title
-----+---------------
1001 | After the jump
2    | Second
1    | First`,
  },
{
    id: 'dm-sequences-returning',
    title: 'Read Generated IDs Back with RETURNING',
    category: 'concept',
    code: `insert dm_seq::tickets [{ title: "Another" }] returning { id, title }`,
    expected: `id   | title
-----+--------
1002 | Another`,
  },
];
