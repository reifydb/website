import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateDictionaryExample: CodeExample = {
    id: 'scripting-create-dictionary',
    title: 'Create Dictionary',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_d;
CREATE DICTIONARY sc_d::colors FOR utf8 AS uint2`,
  };

export const scriptingSchemaDictionariesExamples: CodeExample[] = [
  scriptingCreateDictionaryExample,
];
