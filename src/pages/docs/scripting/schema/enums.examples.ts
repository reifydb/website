import type { CodeExample } from '@/lib/examples/types';

export const scEnumsCreateExample: CodeExample = {
    id: 'sc-enums-create',
    title: 'Create an Enum',
    code: `create namespace sc_enum;
create enum sc_enum::status {
  Active,
  Inactive,
  Pending
}`,
    expected: `id    | namespace | sumtype | created
------+-----------+---------+--------
16416 | sc_enum   | status  | true`,
  };

export const scEnumsIfNotExistsExample: CodeExample = {
    id: 'sc-enums-if-not-exists',
    title: 'Idempotent Creation',
    description: 'The enum already exists, so nothing is created and the original catalog id is returned.',
    code: `create enum if not exists sc_enum::status { Active }`,
    expected: `id    | namespace | sumtype | created
------+-----------+---------+--------
16416 | sc_enum   | status  | false`,
  };

export const scEnumsColumnExample: CodeExample = {
    id: 'sc-enums-column',
    title: 'An Enum as a Column Type',
    code: `create table sc_enum::tasks { id: int4, status: sc_enum::status };
insert sc_enum::tasks [
  { id: 1, status: sc_enum::status::Active },
  { id: 2, status: sc_enum::status::Pending },
  { id: 3, status: sc_enum::status::Inactive }
];
from sc_enum::tasks`,
    expected: `id | status_tag
---+-----------
3  | 1
2  | 2
1  | 0`,
  };

export const scEnumsPayloadExample: CodeExample = {
    id: 'sc-enums-payload',
    title: 'Variants That Carry Data',
    code: `create enum sc_enum::shape {
  Circle { radius: float8 },
  Rectangle { width: float8, height: float8 }
};
create table sc_enum::drawings { id: int4, s: sc_enum::shape };
insert sc_enum::drawings [
  { id: 1, s: sc_enum::shape::Circle { radius: 2.5 } },
  { id: 2, s: sc_enum::shape::Rectangle { width: 3.0, height: 4.0 } }
];
from sc_enum::drawings`,
    expected: `id | s_tag | s_circle_radius | s_rectangle_width | s_rectangle_height
---+-------+-----------------+-------------------+-------------------
2  | 1     | ⟪none⟫          | 3                 | 4
1  | 0     | 2.5             | ⟪none⟫            | ⟪none⟫`,
  };

export const scEnumsInsertStringExample: CodeExample = {
    id: 'sc-enums-insert-string',
    title: 'A Plain String Is Not a Variant',
    description: 'The string does not resolve to a variant, so the insert is rejected. The error speaks in terms of the underlying tag column.',
    code: `insert sc_enum::tasks [{ id: 4, status: "Active" }]`,
    expectsError: true,
  };

export const scEnumsFilterExample: CodeExample = {
    id: 'sc-enums-filter',
    title: 'Filter on the Tag Column',
    code: `from sc_enum::tasks filter { status_tag == 0 }`,
    expected: `id | status_tag
---+-----------
1  | 0`,
  };

export const scEnumsSortExample: CodeExample = {
    id: 'sc-enums-sort',
    title: 'Sort in Declaration Order',
    code: `from sc_enum::tasks sort { status_tag: asc }`,
    expected: `id | status_tag
---+-----------
1  | 0
3  | 1
2  | 2`,
  };

export const scEnumsCastExample: CodeExample = {
    id: 'sc-enums-cast',
    title: 'The Tag Casts Like Any Integer',
    code: `from sc_enum::tasks map { id, tag_text: cast(status_tag, utf8) }`,
    expected: `id | tag_text
---+---------
3  | 1
2  | 2
1  | 0`,
  };

export const scEnumsDropInUseExample: CodeExample = {
    id: 'sc-enums-drop-in-use',
    title: 'Dropping an Enum in Use Fails',
    description: 'The tasks table still has a column typed by the enum, so the drop is rejected with CA_033.',
    code: `drop enum sc_enum::status`,
    expectsError: true,
  };

export const scEnumsDropExample: CodeExample = {
    id: 'sc-enums-drop',
    title: 'Drop the Dependents First',
    code: `drop table sc_enum::tasks;
drop enum sc_enum::status`,
    expected: `namespace | enum   | dropped
----------+--------+--------
sc_enum   | status | true`,
  };

export const scriptingSchemaEnumsExamples: CodeExample[] = [
  scEnumsCreateExample,
  scEnumsIfNotExistsExample,
  scEnumsColumnExample,
  scEnumsPayloadExample,
  scEnumsInsertStringExample,
  scEnumsFilterExample,
  scEnumsSortExample,
  scEnumsCastExample,
  scEnumsDropInUseExample,
  scEnumsDropExample,
];
