import type { CodeExample } from '@/lib/examples/types';

export const dataModelTablesExamples: CodeExample[] = [
{
    id: 'dm-tables-create',
    title: 'Create a Table and Insert Rows',
    category: 'concept',
    code: `create namespace dm_tbl;
create table dm_tbl::products {
  id: int4,
  name: utf8,
  price: float8,
  discontinued: bool
};
insert dm_tbl::products [
  { id: 1, name: "Widget", price: 9.99, discontinued: false },
  { id: 2, name: "Gadget", price: 24.5, discontinued: false }
];
from dm_tbl::products`,
    expected: `id | name   | price | discontinued
---+--------+-------+-------------
2  | Gadget | 24.5  | false
1  | Widget | 9.99  | false`,
  },
{
    id: 'dm-tables-option',
    title: 'Optional Columns Hold none',
    category: 'concept',
    code: `create table dm_tbl::customers {
  id: int4,
  name: utf8,
  referral: Option(utf8)
};
insert dm_tbl::customers [
  { id: 1, name: "Ada", referral: "friend" },
  { id: 2, name: "Grace" }
];
from dm_tbl::customers`,
    expected: `id | name  | referral
---+-------+---------
2  | Grace | ⟪none⟫
1  | Ada   | friend`,
  },
{
    id: 'dm-tables-auto-increment',
    title: 'Auto-Increment Columns',
    category: 'concept',
    code: `create table dm_tbl::tickets {
  id: int8 with { auto_increment },
  title: utf8
};
insert dm_tbl::tickets [{ title: "First" }, { title: "Second" }];
from dm_tbl::tickets`,
    expected: `id | title
---+-------
2  | Second
1  | First`,
  },
{
    id: 'dm-tables-primary-key',
    title: 'Define a Primary Key',
    category: 'concept',
    code: `create table dm_tbl::accounts { id: int4, owner: utf8 };
create primary key on dm_tbl::accounts { id }`,
    expected: `operation          | namespace | table
-------------------+-----------+---------
CREATE PRIMARY KEY | dm_tbl    | accounts`,
  },
{
    id: 'dm-tables-update-returning',
    title: 'Update Rows and Return the Result',
    category: 'concept',
    code: `update dm_tbl::products { price: 19.99 }
filter { name == "Gadget" }
returning { id, name, price }`,
    expected: `id | name   | price
---+--------+------
2  | Gadget | 19.99`,
  },
{
    id: 'dm-tables-delete',
    title: 'Delete Rows by Predicate',
    category: 'concept',
    code: `update dm_tbl::products { discontinued: true } filter { id == 1 };
delete dm_tbl::products filter { discontinued == true }`,
    expected: `namespace | table    | deleted
----------+----------+--------
dm_tbl    | products | 1`,
  },
{
    id: 'dm-tables-rownum',
    title: 'System Columns',
    category: 'concept',
    code: `from dm_tbl::customers map { row: #rownum, name }`,
    expected: `row | name
----+------
2   | Grace
1   | Ada`,
  },
{
    id: 'dm-tables-alter',
    title: 'Evolve the Schema with ALTER TABLE',
    category: 'concept',
    code: `alter table dm_tbl::customers add column email: Option(utf8)`,
    expected: `operation  | namespace | table     | details
-----------+-----------+-----------+--------
ADD COLUMN | dm_tbl    | customers | email`,
  },
];
