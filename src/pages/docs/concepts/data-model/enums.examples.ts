import type { CodeExample } from '@/lib/examples/types';

export const dmEnumsCreateExample: CodeExample = {
    id: 'dm-enums-create',
    title: 'Declare an Enum',
    code: `create namespace dm_enum;
create enum dm_enum::status { Active, Inactive, Pending }`,
    expected: `id    | namespace | enum   | created
------+-----------+--------+--------
16416 | dm_enum   | status | true`,
  };

export const dmEnumsColumnExample: CodeExample = {
    id: 'dm-enums-column',
    title: 'Use the Enum as a Column Type',
    code: `create table dm_enum::tasks { id: int4, status: dm_enum::status };
insert dm_enum::tasks [
  { id: 1, status: 'active' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'inactive' }
];
from dm_enum::tasks`,
    expected: `id | status   | #rownum
---+----------+--------
3  | inactive | 3
2  | pending  | 2
1  | active   | 1`,
  };

export const dmEnumsFilterExample: CodeExample = {
    id: 'dm-enums-filter',
    title: 'Filter by Variant Name',
    code: `from dm_enum::tasks filter { status == 'pending' }`,
    expected: `id | status  | #rownum
---+---------+--------
2  | pending | 2`,
  };

export const dmEnumsUpdateExample: CodeExample = {
    id: 'dm-enums-update',
    title: 'Move a Row to Another Variant',
    code: `update dm_enum::tasks { status: 'inactive' }
filter { id == 1 }`,
    expected: `namespace | table | updated
----------+-------+--------
dm_enum   | tasks | 1`,
  };

export const dmEnumsAggregateExample: CodeExample = {
    id: 'dm-enums-aggregate',
    title: 'Group by Variant',
    code: `from dm_enum::tasks
aggregate { n: math::count(id) } by { status }
sort { status: asc }`,
    expected: `status   | n
---------+--
inactive | 2
pending  | 1`,
  };

export const dmEnumsStructExample: CodeExample = {
    id: 'dm-enums-struct',
    title: 'Variants with Payload Fields',
    code: `create enum dm_enum::shape {
  Circle { radius: float8 },
  Rectangle { width: float8, height: float8 }
};
create table dm_enum::drawings { id: int4, s: dm_enum::shape };
insert dm_enum::drawings [
  { id: 1, s: 'circle', s_circle_radius: 2.5 },
  { id: 2, s: 'rectangle', s_rectangle_width: 3.0, s_rectangle_height: 4.0 }
];
from dm_enum::drawings`,
    expected: `id | s         | s_circle_radius | s_rectangle_width | s_rectangle_height | #rownum
---+-----------+-----------------+-------------------+--------------------+--------
2  | rectangle | ⟪none⟫          | 3                 | 4                  | 2
1  | circle    | 2.5             | ⟪none⟫            | ⟪none⟫             | 1`,
  };

export const dmEnumsPayloadMathExample: CodeExample = {
    id: 'dm-enums-payload-math',
    title: 'Compute on a Variant\'s Fields',
    code: `from dm_enum::drawings
filter { s == 'rectangle' }
map { id, area: s_rectangle_width * s_rectangle_height }`,
    expected: `id | area | #rownum
---+------+--------
2  | 12   | 2`,
  };

export const dmEnumsUnknownRejectedExample: CodeExample = {
    id: 'dm-enums-unknown-rejected',
    title: 'An Unknown Name Is Not a Variant',
    description: 'A name the enum does not declare fails with CA_100.',
    code: `insert dm_enum::tasks [{ id: 6, status: 'archived' }]`,
    expectsError: true,
  };

export const dmEnumsOptionExample: CodeExample = {
    id: 'dm-enums-option',
    title: 'Enum Columns Can Be Optional',
    description: 'Option(enum) holds none when no variant is set.',
    code: `create table dm_enum::maybe { id: int4, status: Option(dm_enum::status) }`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16420 | dm_enum   | maybe | true`,
  };

export const dmEnumsDropInUseExample: CodeExample = {
    id: 'dm-enums-drop-in-use',
    title: 'An Enum in Use Cannot Be Dropped',
    description: 'The tasks table references the enum, so the drop fails with CA_033.',
    code: `drop enum dm_enum::status`,
    expectsError: true,
  };

export const dmEnumsDropExample: CodeExample = {
    id: 'dm-enums-drop',
    title: 'Drop an Unused Enum',
    code: `create enum dm_enum::draft { A, B };
drop enum dm_enum::draft`,
    expected: `namespace | enum  | dropped
----------+-------+--------
dm_enum   | draft | true`,
  };

export const dataModelEnumsExamples: CodeExample[] = [
  dmEnumsCreateExample,
  dmEnumsColumnExample,
  dmEnumsFilterExample,
  dmEnumsUpdateExample,
  dmEnumsAggregateExample,
  dmEnumsStructExample,
  dmEnumsPayloadMathExample,
  dmEnumsUnknownRejectedExample,
  dmEnumsOptionExample,
  dmEnumsDropInUseExample,
  dmEnumsDropExample,
];
