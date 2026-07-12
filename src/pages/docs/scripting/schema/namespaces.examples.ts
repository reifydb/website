import type { CodeExample } from '@/lib/examples/types';

export const scriptingSchemaNamespacesExamples: CodeExample[] = [
{
    id: 'scripting-create-namespace',
    title: 'Create Namespace',
    category: 'scripting',
    code: `CREATE NAMESPACE sc`,
    expected: `id    | namespace | created
------+-----------+--------
16386 | sc        | true`,
  },
];
