import type { CodeExample } from '@/lib/examples/types';

export const dmTablesCreateExample: CodeExample = {
    id: 'dm-tables-create',
    title: 'Create a Table and Insert Rows',
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
  };

export const dmTablesOptionExample: CodeExample = {
    id: 'dm-tables-option',
    title: 'Optional Columns Hold none',
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
  };

export const dmTablesAutoIncrementExample: CodeExample = {
    id: 'dm-tables-auto-increment',
    title: 'Auto-Increment Columns',
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
  };

export const dmTablesPrimaryKeyExample: CodeExample = {
    id: 'dm-tables-primary-key',
    title: 'Define a Primary Key',
    code: `create table dm_tbl::accounts { id: int4, owner: utf8 };
create primary key on dm_tbl::accounts { id }`,
    expected: `operation          | namespace | table
-------------------+-----------+---------
CREATE PRIMARY KEY | dm_tbl    | accounts`,
  };

export const dmTablesUpdateReturningExample: CodeExample = {
    id: 'dm-tables-update-returning',
    title: 'Update Rows and Return the Result',
    code: `update dm_tbl::products { price: 19.99 }
filter { name == "Gadget" }
returning { id, name, price }`,
    expected: `id | name   | price
---+--------+------
2  | Gadget | 19.99`,
  };

export const dmTablesDeleteExample: CodeExample = {
    id: 'dm-tables-delete',
    title: 'Delete Rows by Predicate',
    code: `update dm_tbl::products { discontinued: true } filter { id == 1 };
delete dm_tbl::products filter { discontinued == true }`,
    expected: `namespace | table    | deleted
----------+----------+--------
dm_tbl    | products | 1`,
  };

export const dmTablesRownumExample: CodeExample = {
    id: 'dm-tables-rownum',
    title: 'System Columns',
    code: `from dm_tbl::customers map { row: #rownum, name }`,
    expected: `row | name
----+------
2   | Grace
1   | Ada`,
  };

export const dmTablesAlterExample: CodeExample = {
    id: 'dm-tables-alter',
    title: 'Evolve the Schema with ALTER TABLE',
    code: `alter table dm_tbl::customers add column email: Option(utf8)`,
    expected: `operation  | namespace | table     | details
-----------+-----------+-----------+--------
ADD COLUMN | dm_tbl    | customers | email`,
  };

export const dataModelTablesExamples: CodeExample[] = [
  dmTablesCreateExample,
  dmTablesOptionExample,
  dmTablesAutoIncrementExample,
  dmTablesPrimaryKeyExample,
  dmTablesUpdateReturningExample,
  dmTablesDeleteExample,
  dmTablesRownumExample,
  dmTablesAlterExample,
];
