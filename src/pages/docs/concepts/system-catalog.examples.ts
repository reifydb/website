import type { CodeExample } from '@/lib/examples/types';

export const conceptsSystemCatalogVersionsExample: CodeExample = {
    id: 'concepts-system-catalog-versions',
    title: 'Which Engine Is Running',
    code: `from system::versions map { name, version, type }`,
    expected: `name                | version | type
--------------------+---------+----------
reifydb-webassembly | 0.8.0   | package
core                | 0.8.0   | module
engine              | 0.8.0   | module
catalog             | 0.8.0   | module
store-multi         | 0.8.0   | module
store-single        | 0.8.0   | module
transaction         | 0.8.0   | module
auth                | 0.8.0   | module
rql                 | 0.8.0   | module
cdc                 | 0.8.0   | module
sub-flow            | 0.8.0   | subsystem`,
  };

export const conceptsSystemCatalogCountExample: CodeExample = {
    id: 'concepts-system-catalog-count',
    title: 'Count the Catalog Tables',
    code: `from system::virtual_tables
filter { namespace_id == 1 }
aggregate { tables: math::count(id) } by {}`,
    expected: `tables
------
44`,
  };

export const conceptsSystemCatalogListExample: CodeExample = {
    id: 'concepts-system-catalog-list',
    title: 'List Catalog Tables by Name',
    code: `from system::virtual_tables
filter { namespace_id == 1 }
sort { name: asc }
take 8
map { id, name }`,
    expected: `id | name
---+------------------
46 | authentications
12 | cdc_consumers
6  | column_properties
5  | columns
47 | configs
17 | dictionaries
49 | enum_variants
34 | enums`,
  };

export const conceptsSystemCatalogCreateExample: CodeExample = {
    id: 'concepts-system-catalog-create',
    title: 'Create Objects, Then Find the Namespace',
    code: `create namespace cpt_syscat;
create table cpt_syscat::orders {
  id: int8 with { auto_increment },
  total: float8,
  status: utf8
};
create table cpt_syscat::customers { id: int4, name: utf8 };
from system::namespaces filter { name == "cpt_syscat" }`,
    expected: `id    | name       | local_name | parent_id
------+------------+------------+----------
16386 | cpt_syscat | cpt_syscat | 0`,
  };

export const conceptsSystemCatalogTablesExample: CodeExample = {
    id: 'concepts-system-catalog-tables-in-namespace',
    title: 'Tables in a Namespace',
    code: `from system::tables
filter { namespace_id == 16386 }
map { id, name, primary_key_id }`,
    expected: `id    | name      | primary_key_id
------+-----------+---------------
16417 | customers | ⟪none⟫
16416 | orders    | ⟪none⟫`,
  };

export const conceptsSystemCatalogColumnsExample: CodeExample = {
    id: 'concepts-system-catalog-columns',
    title: 'Columns of a Table',
    code: `from system::columns
filter { shape_id == 16416 }
sort { position: asc }
map { name, type, position, auto_increment }`,
    expected: `name   | type | position | auto_increment
-------+------+----------+---------------
id     | 7    | 0        | true
total  | 3    | 1        | false
status | 9    | 2        | false`,
  };

export const conceptsSystemCatalogTypesExample: CodeExample = {
    id: 'concepts-system-catalog-types',
    title: 'Resolve Type Ids',
    code: `from system::types filter { id == 3 or id == 7 or id == 9 }`,
    expected: `id | name
---+-------
3  | float8
7  | int8
9  | utf8`,
  };

export const conceptsSystemCatalogJoinExample: CodeExample = {
    id: 'concepts-system-catalog-join-types',
    title: 'Join Columns to Their Type Names',
    code: `from system::columns
filter { shape_id == 16416 }
inner join { from system::types } as t using (type, t.id)
sort { position: asc }
map { name, type: t_name, position }`,
    expected: `name   | type   | position
-------+--------+---------
id     | int8   | 0
total  | float8 | 1
status | utf8   | 2`,
  };

export const conceptsSystemCatalogSelfExample: CodeExample = {
    id: 'concepts-system-catalog-self-describing',
    title: 'The Catalog Describes Its Own Tables',
    code: `from system::virtual_table_columns
filter { vtable_id == 3 }
sort { position: asc }
map { name, type, position }`,
    expected: `name           | type | position
---------------+------+---------
id             | 13   | 0
namespace_id   | 13   | 1
name           | 9    | 2
primary_key_id | 13   | 3`,
  };

export const conceptsSystemCatalogViewFlowExample: CodeExample = {
    id: 'concepts-system-catalog-view-flow',
    title: 'A View Registers a Flow',
    code: `create deferred view cpt_syscat::order_totals {
  status: utf8,
  total: float8
} as {
  from cpt_syscat::orders
  aggregate { total: math::sum(total) } by { status }
};
from system::flows`,
    expected: `id | namespace_id | name         | status
---+--------------+--------------+-------
1  | 16386        | order_totals | Active`,
  };

export const conceptsSystemCatalogFlowNodesExample: CodeExample = {
    id: 'concepts-system-catalog-flow-nodes',
    title: 'The Nodes of a Flow',
    code: `from system::flow_nodes
sort { id: asc }
map { id, flow_id, node_type }`,
    expected: `id | flow_id | node_type
---+---------+----------
1  | 1       | 1
2  | 1       | 8
3  | 1       | 19`,
  };

export const conceptsSystemCatalogRolesExample: CodeExample = {
    id: 'concepts-system-catalog-roles',
    title: 'A Role Appears in system::roles',
    code: `create role cpt_syscat_auditor;
from system::roles`,
    expected: `id    | name
------+-------------------
16385 | cpt_syscat_auditor`,
  };

export const conceptsSystemCatalogReadOnlyExample: CodeExample = {
    id: 'concepts-system-catalog-read-only',
    title: 'Catalog Tables Cannot Be Written',
    description: 'Virtual tables have no stored rows; a write against one fails with CA_004, the same error an unknown table gives.',
    code: `insert system::tables [{ name: "mine" }]`,
    expectsError: true,
  };

export const conceptsSystemCatalogConfigsExample: CodeExample = {
    id: 'concepts-system-catalog-configs',
    title: 'One Runtime Setting',
    code: `from system::configs
filter { key == "ROW_TTL_SCAN_INTERVAL" }
map { key, value, default_value, requires_restart }`,
    expected: `key                   | value | default_value | requires_restart
----------------------+-------+---------------+-----------------
ROW_TTL_SCAN_INTERVAL | 1m    | 1m            | false`,
  };

export const conceptsSystemCatalogExamples: CodeExample[] = [
  conceptsSystemCatalogVersionsExample,
  conceptsSystemCatalogCountExample,
  conceptsSystemCatalogListExample,
  conceptsSystemCatalogCreateExample,
  conceptsSystemCatalogTablesExample,
  conceptsSystemCatalogColumnsExample,
  conceptsSystemCatalogTypesExample,
  conceptsSystemCatalogJoinExample,
  conceptsSystemCatalogSelfExample,
  conceptsSystemCatalogViewFlowExample,
  conceptsSystemCatalogFlowNodesExample,
  conceptsSystemCatalogRolesExample,
  conceptsSystemCatalogConfigsExample,
  conceptsSystemCatalogReadOnlyExample,
];
