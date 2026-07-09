import type { CodeExample } from '@/lib/examples/types';

export const dataModelPoliciesExamples: CodeExample[] = [
{
    id: 'dm-policies-read-filter',
    title: 'A Read Policy That Filters Rows',
    category: 'concept',
    code: `create namespace dm_pol;
create table dm_pol::documents { id: int4, title: utf8, public: bool };
insert dm_pol::documents [
  { id: 1, title: "Launch plan", public: true },
  { id: 2, title: "Salary bands", public: false }
];
create table policy public_only on dm_pol::documents {
  from: { filter { public == true } }
}`,
    expected: `policy      | created
------------+--------
public_only | true`,
  },
{
    id: 'dm-policies-read-mask',
    title: 'A Read Policy That Masks Columns',
    category: 'concept',
    code: `create table dm_pol::people { name: utf8, email: utf8 };
create table policy mask_email on dm_pol::people {
  from: { map { name, email: "REDACTED" } }
}`,
    expected: `policy     | created
-----------+--------
mask_email | true`,
  },
{
    id: 'dm-policies-write-require',
    title: 'A Write Policy That Rejects Invalid Mutations',
    category: 'concept',
    code: `create table policy no_private_inserts on dm_pol::documents {
  insert: { require { public == true } }
}`,
    expected: `policy             | created
-------------------+--------
no_private_inserts | true`,
  },
{
    id: 'dm-policies-inspect',
    title: 'Inspect Policies via the System Catalog',
    category: 'concept',
    code: `from system::policies
filter { target_namespace == "dm_pol" }
map { name, target_type, target_shape, enabled }`,
    expected: `name               | target_type | target_shape | enabled
-------------------+-------------+--------------+--------
no_private_inserts | table       | documents    | true
mask_email         | table       | people       | true
public_only        | table       | documents    | true`,
  },
{
    id: 'dm-policies-disable',
    title: 'Disable and Re-Enable a Policy',
    category: 'concept',
    code: `alter table policy public_only disable`,
    expected: `policy      | altered
------------+--------
public_only | true`,
  },
{
    id: 'dm-policies-enable',
    title: 'Re-Enable It',
    category: 'concept',
    code: `alter table policy public_only enable`,
    expected: `policy      | altered
------------+--------
public_only | true`,
  },
{
    id: 'dm-policies-drop',
    title: 'Drop a Policy',
    category: 'concept',
    code: `drop table policy no_private_inserts`,
    expected: `policy             | dropped
-------------------+--------
no_private_inserts | true`,
  },
];
