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

export const scriptingSchemaNamespacesExamples: CodeExample[] = [
  scriptingCreateNamespaceExample,
];
