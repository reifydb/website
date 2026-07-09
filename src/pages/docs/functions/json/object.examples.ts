import type { CodeExample } from '@/lib/examples/types';

export const functionsJsonObjectExamples: CodeExample[] = [
{
    id: 'json-object-basic',
    title: 'Build JSON Object',
    category: 'function',
    code: `from app::users
extend { profile: json::object("name", name, "status", status) }
map { name, profile }`,
  },
{
    id: 'json-object-nested',
    title: 'Nested JSON Structure',
    category: 'function',
    code: `from app::users
extend { data: json::object("user", json::object("name", name, "age", age)) }
map { name, data }`,
  },
];
