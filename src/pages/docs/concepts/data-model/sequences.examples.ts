import type { CodeExample } from '@/lib/examples/types';

export const dmSequencesAutoIncrementExample: CodeExample = {
    id: 'dm-sequences-auto-increment',
    title: 'Auto-Increment Assigns IDs at Insert',
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
  };

export const dmSequencesReturningExample: CodeExample = {
    id: 'dm-sequences-returning',
    title: 'Read the Generated ID Back',
    code: `insert dm_seq::tickets [{ title: "Third" }] returning { id, title }`,
    expected: `id | title
---+------
3  | Third`,
  };

export const dmSequencesExplicitExample: CodeExample = {
    id: 'dm-sequences-explicit',
    title: 'An Explicit ID Does Not Move the Sequence',
    code: `insert dm_seq::tickets [{ id: 100, title: "Imported" }];
insert dm_seq::tickets [{ title: "Fourth" }] returning { id, title }`,
    expected: `id | title
---+-------
4  | Fourth`,
  };

export const dmSequencesAlterExample: CodeExample = {
    id: 'dm-sequences-alter',
    title: 'Reposition the Sequence',
    code: `alter sequence dm_seq::tickets::id set value 100`,
    expected: `namespace | table   | column | value
----------+---------+--------+------
dm_seq    | tickets | id     | 100`,
  };

export const dmSequencesAfterAlterExample: CodeExample = {
    id: 'dm-sequences-after-alter',
    title: 'The Next Insert Draws value + 1',
    code: `insert dm_seq::tickets [{ title: "Fifth" }] returning { id, title }`,
    expected: `id  | title
----+------
101 | Fifth`,
  };

export const dmSequencesGapFailExample: CodeExample = {
    id: 'dm-sequences-gap-fail',
    title: 'A Rolled-Back Insert Still Consumes a Value',
    description: 'The insert draws 102, then the cast fails and the whole request rolls back.',
    code: `insert dm_seq::tickets [{ title: "Lost" }];
map { oops: cast("x", int4) }`,
    expectsError: true,
  };

export const dmSequencesGapExample: CodeExample = {
    id: 'dm-sequences-gap',
    title: 'The Sequence Has a Gap',
    code: `insert dm_seq::tickets [{ title: "Sixth" }] returning { id, title }`,
    expected: `id  | title
----+------
103 | Sixth`,
  };

export const dmSequencesBackwardsExample: CodeExample = {
    id: 'dm-sequences-backwards',
    title: 'Moving a Sequence Backwards Reuses IDs',
    code: `alter sequence dm_seq::tickets::id set value 1;
insert dm_seq::tickets [{ title: "Clash" }] returning { id, title }`,
    expected: `id | title
---+------
2  | Clash`,
  };

export const dmSequencesDuplicateExample: CodeExample = {
    id: 'dm-sequences-duplicate',
    title: 'Two Rows Now Share an ID',
    code: `from dm_seq::tickets filter { id == 2 }`,
    expected: `id | title
---+-------
2  | Clash
2  | Second`,
  };

export const dmSequencesNonAutoExample: CodeExample = {
    id: 'dm-sequences-non-auto',
    title: 'Only Auto-Increment Columns Have a Sequence',
    description: 'title has no sequence to alter; the statement fails with SEQUENCE_002.',
    code: `alter sequence dm_seq::tickets::title set value 5`,
    expectsError: true,
  };

export const dmSequencesTypeRejectedExample: CodeExample = {
    id: 'dm-sequences-type-rejected',
    title: 'Auto-Increment Needs an Integer Column',
    description: 'utf8 (and Option(int)) columns are rejected with CA_006.',
    code: `create table dm_seq::bad { code: utf8 with { auto_increment } }`,
    expectsError: true,
  };

export const dmSequencesRingbufferExample: CodeExample = {
    id: 'dm-sequences-ringbuffer',
    title: 'Ring Buffers Do Not Draw from a Sequence',
    description: 'The declaration is accepted, but the first insert without an id fails with CONSTRAINT_007.',
    code: `create ringbuffer dm_seq::recent {
  id: int4 with { auto_increment },
  note: utf8
} with { capacity: 2 };
insert dm_seq::recent [{ note: "no id" }]`,
    expectsError: true,
  };

export const dmSequencesCatalogExample: CodeExample = {
    id: 'dm-sequences-catalog',
    title: 'Which Columns Auto-Increment',
    code: `from system::columns filter { auto_increment == true } map { name }`,
    expected: `name
----
id`,
  };

export const dataModelSequencesExamples: CodeExample[] = [
  dmSequencesAutoIncrementExample,
  dmSequencesReturningExample,
  dmSequencesExplicitExample,
  dmSequencesAlterExample,
  dmSequencesAfterAlterExample,
  dmSequencesGapFailExample,
  dmSequencesGapExample,
  dmSequencesBackwardsExample,
  dmSequencesDuplicateExample,
  dmSequencesNonAutoExample,
  dmSequencesTypeRejectedExample,
  dmSequencesRingbufferExample,
  dmSequencesCatalogExample,
];
