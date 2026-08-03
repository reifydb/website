import type { CodeExample } from '@/lib/examples/types';

export const dmNamespacesCreateExample: CodeExample = {
    id: 'dm-namespaces-create',
    title: 'Create a Namespace and Address Objects Inside It',
    category: 'concept',
    code: `create namespace dm_ns;
create table dm_ns::users { id: int4, name: utf8 };
insert dm_ns::users [{ id: 1, name: "Ada" }];
from dm_ns::users`,
    expected: `id | name
---+-----
1  | Ada`,
  };

export const dmNamespacesSameNameExample: CodeExample = {
    id: 'dm-namespaces-same-name',
    title: 'The Same Object Name in Two Namespaces',
    category: 'concept',
    code: `create namespace dm_ns_prod;
create namespace dm_ns_staging;
create table dm_ns_prod::orders { id: int4 };
create table dm_ns_staging::orders { id: int4 };
insert dm_ns_prod::orders [{ id: 1001 }];
insert dm_ns_staging::orders [{ id: 1 }];
from dm_ns_prod::orders`,
    expected: `id
----
1001`,
  };

export const dmNamespacesIfNotExistsExample: CodeExample = {
    id: 'dm-namespaces-if-not-exists',
    title: 'Idempotent Creation with IF NOT EXISTS',
    category: 'concept',
    code: `create namespace dm_ns if not exists`,
  };

export const dmNamespacesNestedExample: CodeExample = {
    id: 'dm-namespaces-nested',
    title: 'Nested Namespaces',
    category: 'concept',
    code: `create namespace dm_ns::internal;
create table dm_ns::internal::audit { id: int4, action: utf8 };
insert dm_ns::internal::audit [{ id: 1, action: "login" }];
from dm_ns::internal::audit`,
    expected: `id | action
---+-------
1  | login`,
  };

export const dmNamespacesSystemExample: CodeExample = {
    id: 'dm-namespaces-system',
    title: 'Inspect Namespaces via the System Catalog',
    category: 'concept',
    code: `from system::namespaces
filter { local_name == "internal" }`,
    expected: `id    | name            | local_name | parent_id
------+-----------------+------------+----------
16389 | dm_ns::internal | internal   | 16386`,
  };

export const dataModelNamespacesExamples: CodeExample[] = [
  dmNamespacesCreateExample,
  dmNamespacesSameNameExample,
  dmNamespacesIfNotExistsExample,
  dmNamespacesNestedExample,
  dmNamespacesSystemExample,
];
