import type { CodeExample } from '@/lib/examples/types';

export const functionsJsonPrettyExamples: CodeExample[] = [
{
    id: 'json-pretty-basic',
    title: 'Pretty-print JSON',
    category: 'function',
    code: `from app::users
extend { formatted: json::pretty(json::object("name", name, "age", age)) }
map { name, formatted }`,
  },
];
