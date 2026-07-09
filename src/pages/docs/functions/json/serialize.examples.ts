import type { CodeExample } from '@/lib/examples/types';

export const functionsJsonSerializeExamples: CodeExample[] = [
{
    id: 'json-serialize-basic',
    title: 'Serialize to JSON String',
    category: 'function',
    code: `from app::users
extend { json_str: json::serialize(json::object("name", name, "age", age)) }
map { name, json_str }`,
  },
];
