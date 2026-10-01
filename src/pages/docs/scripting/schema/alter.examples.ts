import type { CodeExample } from '@/lib/examples/types';

export const refAlterSetupExample: CodeExample = {
    id: 'ref-alter-setup',
    title: 'A Table to Alter',
    code: `create namespace ref_alter;
create table ref_alter::users { id: int4, name: utf8 }`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16416 | ref_alter | users | true`,
  };

export const refAlterAddColumnExample: CodeExample = {
    id: 'ref-alter-add-column',
    title: 'Add a Column',
    code: `alter table ref_alter::users add column email: Option(utf8)`,
    expected: `operation  | namespace | table | details
-----------+-----------+-------+--------
ADD COLUMN | ref_alter | users | email`,
  };

export const refAlterAddColumnPropertyExample: CodeExample = {
    id: 'ref-alter-add-column-property',
    title: 'An Added Column Takes the Same Properties as create table',
    code: `alter table ref_alter::users add column ticket: int8 with { auto_increment };
insert ref_alter::users [
  { id: 1, name: "ada", email: "ada@example.com" },
  { id: 2, name: "grace" }
];
from ref_alter::users sort { id: asc }`,
    expected: `id | name  | email           | ticket | #rownum
---+-------+-----------------+--------+--------
1  | ada   | ada@example.com | 1      | 1
2  | grace | ⟪none⟫          | 2      | 2`,
  };

export const refAlterAddDuplicateExample: CodeExample = {
    id: 'ref-alter-add-duplicate',
    title: 'A Column Name Must Be New',
    description: 'name already exists on the table, so the statement fails with CA_005.',
    code: `alter table ref_alter::users add column name: int4`,
    expectsError: true,
  };

export const refAlterRenameColumnExample: CodeExample = {
    id: 'ref-alter-rename-column',
    title: 'Rename a Column on a Populated Table',
    code: `alter table ref_alter::users rename column name to display_name;
from ref_alter::users sort { id: asc }`,
    expected: `id | display_name | email           | ticket | #rownum
---+--------------+-----------------+--------+--------
1  | ada          | ada@example.com | 1      | 1
2  | grace        | ⟪none⟫          | 2      | 2`,
  };

export const refAlterDropColumnExample: CodeExample = {
    id: 'ref-alter-drop-column',
    title: 'Drop a Column',
    code: `create table ref_alter::staging { id: int4, note: utf8, tmp: bool };
alter table ref_alter::staging drop column tmp`,
    expected: `operation   | namespace | table   | details
------------+-----------+---------+--------
DROP COLUMN | ref_alter | staging | tmp`,
  };

export const refAlterMissingColumnExample: CodeExample = {
    id: 'ref-alter-missing-column',
    title: 'The Column Must Exist',
    description: 'drop column and rename column both fail with CA_039 when the column is not on the table.',
    code: `alter table ref_alter::staging drop column nope`,
    expectsError: true,
  };

export const refAlterOneActionExample: CodeExample = {
    id: 'ref-alter-one-action',
    title: 'One Action per Statement',
    description: 'A second action after a comma is a parse error (AST_005); write two statements instead.',
    code: `alter table ref_alter::staging add column a: int4, add column b: int4`,
    expectsError: true,
  };

export const refAlterNotATableExample: CodeExample = {
    id: 'ref-alter-not-a-table',
    title: 'Only Tables Can Be Altered',
    description: 'alter table looks up tables only; a view of that name is reported as not found (CA_004).',
    code: `create deferred view ref_alter::recent { id: int4 } as { from ref_alter::users };
alter table ref_alter::recent add column x: int4`,
    expectsError: true,
  };

export const refAlterPartitionSetupExample: CodeExample = {
    id: 'ref-alter-partition-setup',
    title: 'A Partitioned Table',
    code: `create table ref_alter::events {
  id: int4,
  region: utf8
} with { partition: { by: { region } } };
insert ref_alter::events [
  { id: 1, region: "eu" },
  { id: 2, region: "us" },
  { id: 3, region: "eu" }
];
from ref_alter::events sort { id: asc }`,
    expected: `id | region | #rownum
---+--------+--------
1  | eu     | 1
2  | us     | 2
3  | eu     | 3`,
  };

export const refAlterTruncatePartitionExample: CodeExample = {
    id: 'ref-alter-truncate-partition',
    title: 'Truncate One Partition',
    code: `alter table ref_alter::events truncate partition { region: "eu" }`,
    expected: `operation          | namespace | table  | details
-------------------+-----------+--------+--------
TRUNCATE PARTITION | ref_alter | events | 2`,
  };

export const refAlterPartitionAfterTruncateExample: CodeExample = {
    id: 'ref-alter-partition-after-truncate',
    title: 'The Partition Keeps Accepting Rows',
    code: `insert ref_alter::events [{ id: 4, region: "eu" }];
from ref_alter::events sort { id: asc }`,
    expected: `id | region | #rownum
---+--------+--------
2  | us     | 2
4  | eu     | 4`,
  };

export const refAlterDropPartitionExample: CodeExample = {
    id: 'ref-alter-drop-partition',
    title: 'Drop a Partition',
    code: `alter table ref_alter::events drop partition { region: "us" }`,
    expected: `operation      | namespace | table  | details
---------------+-----------+--------+--------
DROP PARTITION | ref_alter | events | 1`,
  };

export const refAlterPartitionAfterDropExample: CodeExample = {
    id: 'ref-alter-partition-after-drop',
    title: 'A Dropped Partition Comes Back on the Next Insert',
    code: `insert ref_alter::events [{ id: 5, region: "us" }];
from ref_alter::events sort { id: asc }`,
    expected: `id | region | #rownum
---+--------+--------
4  | eu     | 4
5  | us     | 5`,
  };

export const refAlterPartitionValueStringExample: CodeExample = {
    id: 'ref-alter-partition-value-string',
    title: 'The Partition Value Must Be a String Literal',
    description: 'A number in the partition record is rejected with AST_009; only a string literal is accepted.',
    code: `alter table ref_alter::events truncate partition { region: 1 }`,
    expectsError: true,
  };

export const refAlterSequenceExample: CodeExample = {
    id: 'ref-alter-sequence',
    title: 'Reposition an Auto-Increment Sequence',
    code: `create table ref_alter::tickets { id: int8 with { auto_increment }, title: utf8 };
insert ref_alter::tickets [{ title: "first" }];
alter sequence ref_alter::tickets::id set value 1000`,
    expected: `namespace | table   | column | value
----------+---------+--------+------
ref_alter | tickets | id     | 1000`,
  };

export const refAlterSequenceNextExample: CodeExample = {
    id: 'ref-alter-sequence-next',
    title: 'The Next Insert Draws value + 1',
    code: `insert ref_alter::tickets [{ title: "second" }] returning { id, title }`,
    expected: `id   | title  | #rownum
-----+--------+--------
1001 | second | 2`,
  };

export const refAlterSequenceNotAutoExample: CodeExample = {
    id: 'ref-alter-sequence-not-auto',
    title: 'Only Auto-Increment Columns Have a Sequence',
    description: 'title was not declared with auto_increment, so the statement fails with SEQUENCE_002.',
    code: `alter sequence ref_alter::tickets::title set value 5`,
    expectsError: true,
  };

export const scriptingSchemaAlterExamples: CodeExample[] = [
  refAlterSetupExample,
  refAlterAddColumnExample,
  refAlterAddColumnPropertyExample,
  refAlterAddDuplicateExample,
  refAlterRenameColumnExample,
  refAlterDropColumnExample,
  refAlterMissingColumnExample,
  refAlterOneActionExample,
  refAlterNotATableExample,
  refAlterPartitionSetupExample,
  refAlterTruncatePartitionExample,
  refAlterPartitionAfterTruncateExample,
  refAlterDropPartitionExample,
  refAlterPartitionAfterDropExample,
  refAlterPartitionValueStringExample,
  refAlterSequenceExample,
  refAlterSequenceNextExample,
  refAlterSequenceNotAutoExample,
];
