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
    expected: `id    | namespace | enum   | created
------+-----------+--------+--------
16416 | sc_enum   | status | true`,
  };

export const scEnumsIfNotExistsExample: CodeExample = {
    id: 'sc-enums-if-not-exists',
    title: 'Idempotent Creation',
    description: 'The enum already exists, so nothing is created and the original catalog id is returned.',
    code: `create enum if not exists sc_enum::status { Active }`,
    expected: `id    | namespace | enum   | created
------+-----------+--------+--------
16416 | sc_enum   | status | false`,
  };

export const scEnumsColumnExample: CodeExample = {
    id: 'sc-enums-column',
    title: 'An Enum as a Column Type',
    code: `create table sc_enum::tasks { id: int4, status: sc_enum::status };
insert sc_enum::tasks [
  { id: 1, status: 'active' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'inactive' }
];
from sc_enum::tasks`,
    expected: `id | status   | #rownum
---+----------+--------
3  | inactive | 3
2  | pending  | 2
1  | active   | 1`,
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
  { id: 1, s: 'circle', s_circle_radius: 2.5 },
  { id: 2, s: 'rectangle', s_rectangle_width: 3.0, s_rectangle_height: 4.0 }
];
from sc_enum::drawings`,
    expected: `id | s         | s_circle_radius | s_rectangle_width | s_rectangle_height | #rownum
---+-----------+-----------------+-------------------+--------------------+--------
2  | rectangle | ⟪none⟫          | 3                 | 4                  | 2
1  | circle    | 2.5             | ⟪none⟫            | ⟪none⟫             | 1`,
  };

export const scEnumsInsertUnknownExample: CodeExample = {
    id: 'sc-enums-insert-unknown',
    title: 'An Unknown Name Is Rejected',
    description: 'The name is not declared by the enum, so the insert fails with CA_100.',
    code: `insert sc_enum::tasks [{ id: 4, status: 'archived' }]`,
    expectsError: true,
  };

export const scEnumsFilterExample: CodeExample = {
    id: 'sc-enums-filter',
    title: 'Filter by Variant Name',
    code: `from sc_enum::tasks filter { status == 'active' }`,
    expected: `id | status | #rownum
---+--------+--------
1  | active | 1`,
  };

export const scEnumsSortExample: CodeExample = {
    id: 'sc-enums-sort',
    title: 'Sort in Declaration Order',
    code: `from sc_enum::tasks sort { status: asc }`,
    expected: `id | status   | #rownum
---+----------+--------
1  | active   | 1
3  | inactive | 3
2  | pending  | 2`,
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
  scEnumsInsertUnknownExample,
  scEnumsFilterExample,
  scEnumsSortExample,
  scEnumsDropInUseExample,
  scEnumsDropExample,
];
