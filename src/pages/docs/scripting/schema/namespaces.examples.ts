import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateNamespaceExample: CodeExample = {
    id: 'scripting-create-namespace',
    title: 'Create Namespace',
    category: 'scripting',
    code: `CREATE NAMESPACE sc`,
    expected: `id    | namespace | created
------+-----------+--------
16386 | sc        | true`,
  };

export const scriptingCreateTableExample: CodeExample = {
    id: 'scripting-create-table',
    title: 'Create Table',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_t;
CREATE TABLE sc_t::users {
  id: int4,
  name: utf8,
  age: int2,
  active: bool
}`,
    expected: `id    | namespace | table | created
------+-----------+-------+--------
16416 | sc_t      | users | true`,
  };

export const scriptingSchemaNamespacesExamples: CodeExample[] = [
  scriptingCreateNamespaceExample,
  scriptingCreateTableExample,
];
