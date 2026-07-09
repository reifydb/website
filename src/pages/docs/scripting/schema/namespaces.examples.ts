import type { CodeExample } from '@/lib/examples/types';

export const scriptingSchemaNamespacesExamples: CodeExample[] = [
{
    id: 'scripting-create-namespace',
    title: 'Create Namespace',
    category: 'scripting',
    code: `CREATE NAMESPACE sc`,
    expected: `namespace | created
----------+--------
sc        | true`,
  },
];
