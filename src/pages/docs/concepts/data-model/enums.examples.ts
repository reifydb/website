import type { CodeExample } from '@/lib/examples/types';

export const dmEnumsCreateExample: CodeExample = {
    id: 'dm-enums-create',
    title: 'Declare an Enum',
    code: `create namespace dm_enum;
create enum dm_enum::status { Active, Inactive, Pending }`,
    expected: `id    | namespace | sumtype | created
------+-----------+---------+--------
16416 | dm_enum   | status  | true`,
  };

export const dmEnumsColumnExample: CodeExample = {
    id: 'dm-enums-column',
    title: 'Use the Enum as a Column Type',
    code: `create table dm_enum::tasks { id: int4, status: dm_enum::status };
insert dm_enum::tasks [
  { id: 1, status: dm_enum::status::Active },
  { id: 2, status: dm_enum::status::Pending },
  { id: 3, status: dm_enum::status::Inactive }
];
from dm_enum::tasks`,
    expected: `id | status_tag | #rownum
---+------------+--------
3  | 1          | 3
2  | 2          | 2
1  | 0          | 1`,
  };

export const dmEnumsFilterIsExample: CodeExample = {
    id: 'dm-enums-filter-is',
    title: 'Filter by Variant with is',
    code: `from dm_enum::tasks filter { status is dm_enum::status::Pending }`,
    expected: `id | status_tag | #rownum
---+------------+--------
2  | 2          | 2`,
  };

export const dmEnumsUpdateExample: CodeExample = {
    id: 'dm-enums-update',
    title: 'Move a Row to Another Variant',
    code: `update dm_enum::tasks { status: dm_enum::status::Inactive }
filter { id == 1 }
returning { id, status_tag }`,
    expected: `id | status_tag | #rownum
---+------------+--------
1  | 1          | 1`,
  };

export const dmEnumsAggregateExample: CodeExample = {
    id: 'dm-enums-aggregate',
    title: 'Group by the Stored Tag',
    code: `from dm_enum::tasks
aggregate { n: math::count(id) } by { status_tag }
sort { status_tag: asc }`,
    expected: `status_tag | n
-----------+--
1          | 2
2          | 1`,
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
  { id: 1, s: dm_enum::shape::Circle { radius: 2.5 } },
  { id: 2, s: dm_enum::shape::Rectangle { width: 3.0, height: 4.0 } }
];
from dm_enum::drawings`,
    expected: `id | s_tag | s_circle_radius | s_rectangle_width | s_rectangle_height | #rownum
---+-------+-----------------+-------------------+--------------------+--------
2  | 1     | ⟪none⟫          | 3                 | 4                  | 2
1  | 0     | 2.5             | ⟪none⟫            | ⟪none⟫             | 1`,
  };

export const dmEnumsPayloadMathExample: CodeExample = {
    id: 'dm-enums-payload-math',
    title: 'Compute on a Variant\'s Fields',
    code: `from dm_enum::drawings
filter { s is dm_enum::shape::Rectangle }
map { id, area: s_rectangle_width * s_rectangle_height }`,
    expected: `id | area | #rownum
---+------+--------
2  | 12   | 2`,
  };

export const dmEnumsViewExample: CodeExample = {
    id: 'dm-enums-view',
    title: 'A View That Keeps One Variant',
    code: `create transactional view dm_enum::active_tasks {
  id: int4,
  status_tag: uint1
} as {
  from dm_enum::tasks
  filter { status is dm_enum::status::Active }
}`,
    expected: `id    | namespace | view         | created
------+-----------+--------------+--------
16420 | dm_enum   | active_tasks | true`,
  };

export const dmEnumsViewInsertExample: CodeExample = {
    id: 'dm-enums-view-insert',
    title: 'Write Rows of Two Variants',
    code: `insert dm_enum::tasks [
  { id: 4, status: dm_enum::status::Active },
  { id: 5, status: dm_enum::status::Pending }
]`,
    expected: `namespace | table | inserted
----------+-------+---------
dm_enum   | tasks | 2`,
  };

export const dmEnumsViewReadExample: CodeExample = {
    id: 'dm-enums-view-read',
    title: 'Only the Active Rows Arrived',
    code: `from dm_enum::active_tasks`,
    expected: `id | status_tag | #rownum
---+------------+--------
4  | 0          | 4`,
  };

export const dmEnumsStringRejectedExample: CodeExample = {
    id: 'dm-enums-string-rejected',
    title: 'A String Is Not a Variant',
    description: 'Only a variant path is accepted; a string literal fails with CONSTRAINT_007.',
    code: `insert dm_enum::tasks [{ id: 6, status: "Active" }]`,
    expectsError: true,
  };

export const dmEnumsOptionExample: CodeExample = {
    id: 'dm-enums-option',
    title: 'Enum Columns Can Be Optional',
    description: 'Option(enum) holds none when no variant is set.',
    code: `create table dm_enum::maybe { id: int4, status: Option(dm_enum::status) }`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16421 | dm_enum   | maybe | true`,
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

export const dmEnumsProjectionNoneExample: CodeExample = {
    id: 'dm-enums-projection-none',
    title: 'The Declared Column Name Is Gone After Flattening',
    code: `from dm_enum::tasks filter { id == 1 } map { id, status, status_tag }`,
    expectsError: true,
  };

export const dataModelEnumsExamples: CodeExample[] = [
  dmEnumsCreateExample,
  dmEnumsColumnExample,
  dmEnumsFilterIsExample,
  dmEnumsUpdateExample,
  dmEnumsAggregateExample,
  dmEnumsStructExample,
  dmEnumsPayloadMathExample,
  dmEnumsViewExample,
  dmEnumsViewInsertExample,
  dmEnumsViewReadExample,
  dmEnumsStringRejectedExample,
  dmEnumsOptionExample,
  dmEnumsDropInUseExample,
  dmEnumsDropExample,
  dmEnumsProjectionNoneExample,
];
