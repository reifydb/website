import type { CodeExample } from '@/lib/examples/types';

export const snsCreateNamespaceExample: CodeExample = {
    id: 'sns-create-namespace',
    title: 'Create a Namespace',
    code: `create namespace sns`,
    expected: `id    | namespace | created
------+-----------+--------
16386 | sns       | true`,
  };

export const snsCreateTableExample: CodeExample = {
    id: 'sns-create-table',
    title: 'Create a Table Inside the Namespace',
    code: `create table sns::users {
  id: int4,
  name: utf8,
  active: bool
}`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16416 | sns       | users | true`,
  };

export const snsUseTableExample: CodeExample = {
    id: 'sns-use-table',
    title: 'Every Reference Uses the Qualified Name',
    code: `insert sns::users [{ id: 1, name: "Ada", active: true }];
from sns::users`,
    expected: `id | name | active
---+------+-------
1  | Ada  | true`,
  };

export const snsEnumExample: CodeExample = {
    id: 'sns-enum',
    title: 'Other Object Kinds Live in Namespaces Too',
    code: `create enum sns::priority { Low, Medium, High }`,
    expected: `id    | namespace | sumtype  | created
------+-----------+----------+--------
16417 | sns       | priority | true`,
  };

export const snsNestedExample: CodeExample = {
    id: 'sns-nested',
    title: 'Namespaces Nest',
    code: `create namespace sns::internal`,
    expected: `id    | namespace     | created
------+---------------+--------
16387 | sns::internal | true`,
  };

export const snsNestedTableExample: CodeExample = {
    id: 'sns-nested-table',
    title: 'Objects in a Nested Namespace Use the Full Path',
    code: `create table sns::internal::audit { id: int4, action: utf8 };
insert sns::internal::audit [{ id: 1, action: "login" }];
from sns::internal::audit`,
    expected: `id | action
---+-------
1  | login`,
  };

export const snsIfNotExistsExample: CodeExample = {
    id: 'sns-if-not-exists',
    title: 'Idempotent Creation with if not exists',
    description: 'The namespace already exists, so the confirmation reports created: false and returns the existing catalog id.',
    code: `create namespace sns if not exists`,
    expected: `id    | namespace | created
------+-----------+--------
16386 | sns       | false`,
  };

export const snsMissingNamespaceExample: CodeExample = {
    id: 'sns-missing-namespace',
    title: 'The Namespace Must Exist First',
    description: 'Creating an object in a namespace that does not exist fails with CA_002.',
    code: `create table sns_ghost::events { id: int4 }`,
    expectsError: true,
  };

export const snsSystemCatalogExample: CodeExample = {
    id: 'sns-system-catalog',
    title: 'Namespaces in the System Catalog',
    code: `from system::namespaces
filter { name == "sns::internal" }`,
    expected: `id    | name          | local_name | parent_id
------+---------------+------------+----------
16387 | sns::internal | internal   | 16386`,
  };

export const scriptingSchemaNamespacesExamples: CodeExample[] = [
  snsCreateNamespaceExample,
  snsCreateTableExample,
  snsUseTableExample,
  snsEnumExample,
  snsNestedExample,
  snsNestedTableExample,
  snsIfNotExistsExample,
  snsMissingNamespaceExample,
  snsSystemCatalogExample,
];
