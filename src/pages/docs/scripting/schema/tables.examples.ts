import type { CodeExample } from '@/lib/examples/types';

export const sstCreateExample: CodeExample = {
    id: 'sst-create',
    title: 'Create a Table',
    code: `create namespace sst;
create table sst::users {
  id: int4,
  email: utf8,
  age: int2,
  active: bool
}`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16416 | sst       | users | true`,
  };

export const sstAllTypesExample: CodeExample = {
    id: 'sst-all-types',
    title: 'Every Column Type',
    code: `create table sst::samples {
  i1: int1, i2: int2, i4: int4, i8: int8, i16: int16,
  u1: uint1, u2: uint2, u4: uint4, u8: uint8, u16: uint16,
  f4: float4, f8: float8,
  flag: bool,
  name: utf8, note: text,
  raw: blob,
  day: date, moment: datetime, clock: time, span: duration,
  u4id: uuid4, u7id: uuid7, who: identity_id
}`,
    expected: `id    | namespace | table   | created
------+-----------+---------+--------
16417 | sst       | samples | true`,
  };

export const sstOptionExample: CodeExample = {
    id: 'sst-option',
    title: 'Optional Columns',
    code: `create table sst::profiles { id: int4, name: utf8, bio: Option(utf8) };
insert sst::profiles [
  { id: 1, name: "ada", bio: "mathematician" },
  { id: 2, name: "grace" }
];
from sst::profiles`,
    expected: `id | name  | bio
---+-------+--------------
2  | grace | ⟪none⟫
1  | ada   | mathematician`,
  };

export const sstRequiredExample: CodeExample = {
    id: 'sst-required',
    title: 'A Non-Optional Column Cannot Be Left Out',
    description: 'name is utf8, not Option(utf8), so an insert without it fails with CONSTRAINT_007.',
    code: `insert sst::profiles [{ id: 3, bio: "no name given" }]`,
    expectsError: true,
  };

export const sstAutoIncrementExample: CodeExample = {
    id: 'sst-auto-increment',
    title: 'Auto-Increment',
    code: `create table sst::tickets { id: int8 with { auto_increment }, title: utf8 };
insert sst::tickets [{ title: "first" }, { title: "second" }];
from sst::tickets sort { id: asc }`,
    expected: `id | title
---+-------
1  | first
2  | second`,
  };

export const sstAutoIncrementExplicitExample: CodeExample = {
    id: 'sst-auto-increment-explicit',
    title: 'Explicit Values Alongside Generated Ones',
    code: `insert sst::tickets [{ id: 10, title: "pinned" }, { title: "third" }];
from sst::tickets sort { id: asc }`,
    expected: `id | title
---+-------
1  | first
2  | second
3  | third
10 | pinned`,
  };

export const sstPrimaryKeyExample: CodeExample = {
    id: 'sst-primary-key',
    title: 'Declare a Primary Key',
    code: `create table sst::seats { row_no: int4, seat_no: int4, holder: utf8 };
create primary key on sst::seats { row_no, seat_no };
insert sst::seats [
  { row_no: 1, seat_no: 1, holder: "ada" },
  { row_no: 1, seat_no: 2, holder: "grace" }
]`,
    expected: `namespace | table | inserted
----------+-------+---------
sst       | seats | 2`,
  };

export const sstPrimaryKeyDuplicateExample: CodeExample = {
    id: 'sst-primary-key-duplicate',
    title: 'Duplicate Keys Are Rejected on Insert',
    description: 'Seat (1, 1) is taken, so the insert fails with INDEX_001.',
    code: `insert sst::seats [{ row_no: 1, seat_no: 1, holder: "bob" }]`,
    expectsError: true,
  };

export const sstRowSettingsExample: CodeExample = {
    id: 'sst-row-settings',
    title: 'Row Settings',
    code: `create table sst::sessions {
  token: utf8,
  user_id: int4
} with { row: { ttl: { duration: '30m' } } }`,
    expected: `id    | namespace | table    | created
------+-----------+----------+--------
16421 | sst       | sessions | true`,
  };

export const sstIfNotExistsExample: CodeExample = {
    id: 'sst-if-not-exists',
    title: 'Idempotent Creation',
    code: `create table if not exists sst::users { id: int4 }`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16416 | sst       | users | false`,
  };

export const sstDuplicateExample: CodeExample = {
    id: 'sst-duplicate',
    title: 'Creating an Existing Table Fails',
    description: 'Without the guard, a second create table on the same name fails with CA_003.',
    code: `create table sst::users { id: int4 }`,
    expectsError: true,
  };

export const sstAddColumnExample: CodeExample = {
    id: 'sst-add-column',
    title: 'Add a Column to an Empty Table',
    code: `create table sst::staging { id: int4, name: utf8 };
alter table sst::staging add column email: Option(utf8);
insert sst::staging [
  { id: 1, name: "ada", email: "ada@example.com" },
  { id: 2, name: "grace" }
];
from sst::staging`,
    expected: `id | name  | email
---+-------+----------------
2  | grace | ⟪none⟫
1  | ada   | ada@example.com`,
  };

export const sstDropColumnExample: CodeExample = {
    id: 'sst-drop-column',
    title: 'Drop a Column from an Empty Table',
    code: `alter table sst::samples drop column raw`,
    expected: `operation   | namespace | table   | details
------------+-----------+---------+--------
DROP COLUMN | sst       | samples | raw`,
  };

export const sstRenameColumnExample: CodeExample = {
    id: 'sst-rename-column',
    title: 'Rename a Column',
    code: `alter table sst::profiles rename column bio to about;
from sst::profiles`,
    expected: `id | name  | about
---+-------+--------------
2  | grace | ⟪none⟫
1  | ada   | mathematician`,
  };

export const sstDropMissingColumnExample: CodeExample = {
    id: 'sst-drop-missing-column',
    title: 'Altering a Column That Does Not Exist',
    description: 'Naming an unknown column fails with CA_039.',
    code: `alter table sst::samples drop column nope`,
    expectsError: true,
  };

export const sstDropExample: CodeExample = {
    id: 'sst-drop',
    title: 'Drop a Table',
    code: `drop table sst::sessions`,
    expected: `namespace | table    | dropped
----------+----------+--------
sst       | sessions | true`,
  };

export const scriptingSchemaTablesExamples: CodeExample[] = [
  sstCreateExample,
  sstAllTypesExample,
  sstOptionExample,
  sstRequiredExample,
  sstAutoIncrementExample,
  sstAutoIncrementExplicitExample,
  sstPrimaryKeyExample,
  sstPrimaryKeyDuplicateExample,
  sstRowSettingsExample,
  sstIfNotExistsExample,
  sstDuplicateExample,
  sstAddColumnExample,
  sstDropColumnExample,
  sstRenameColumnExample,
  sstDropMissingColumnExample,
  sstDropExample,
];
