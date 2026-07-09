import type { CodeExample } from '@/lib/examples/types';

export const functionsJsonExamples: CodeExample[] = [
{
    id: 'json-overview-quick',
    title: 'Quick Example',
    category: 'function',
    code: `from app::users
extend { payload: json::object("name", name, "age", age) }
map { name, payload }`,
  },
];
