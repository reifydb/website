import type { CodeExample } from '@/lib/examples/types';

export const scriptingSchemaDropExamples: CodeExample[] = [
{
    id: 'scripting-drop-table',
    title: 'Drop Table',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_dr;
CREATE TABLE sc_dr::temp { id: int4 };
DROP TABLE sc_dr::temp`,
  },
{
    id: 'scripting-drop-if-exists',
    title: 'Drop If Exists',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_die;
DROP TABLE IF EXISTS sc_die::nonexistent`,
  },
];
