import type { CodeExample } from '@/lib/examples/types';

export const dataModelEnumsExamples: CodeExample[] = [
{
    id: 'dm-enums-basic',
    title: 'A Plain Enum as a Column Type',
    category: 'concept',
    code: `create namespace dm_enum;
create enum dm_enum::status { Active, Inactive, Pending };
create table dm_enum::tasks { id: int4, status: dm_enum::status };
insert dm_enum::tasks [
  { id: 1, status: dm_enum::status::Active },
  { id: 2, status: dm_enum::status::Inactive }
];
from dm_enum::tasks`,
    expected: `id | status_tag
---+-----------
2  | 1
1  | 0`,
  },
{
    id: 'dm-enums-struct',
    title: 'Enum Variants Can Carry Payloads',
    category: 'concept',
    code: `create enum dm_enum::shape {
  Circle { radius: float8 },
  Rectangle { width: float8, height: float8 }
};
create table dm_enum::drawings { id: int4, s: dm_enum::shape };
insert dm_enum::drawings [
  { id: 1, s: dm_enum::shape::Circle { radius: 2.5 } }
];
from dm_enum::drawings`,
    expected: `id | s_tag | s_circle_radius | s_rectangle_width | s_rectangle_height
---+-------+-----------------+-------------------+-------------------
1  | 0     | 2.5             | ⟪none⟫            | ⟪none⟫`,
  },
];
