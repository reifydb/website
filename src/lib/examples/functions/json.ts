import type { CodeExample } from '../index';

export const jsonExamples: CodeExample[] = [
  // json module overview
  {
    id: 'json-overview-quick',
    title: 'Quick Example',
    category: 'function',
    code: `from app::users
extend { payload: json::object("name", name, "age", age) }
map { name, payload }`,
  },

  // json::array
  {
    id: 'json-array-basic',
    title: 'Build JSON Array',
    category: 'function',
    code: `from app::users
extend { tags: json::array("user", name, age) }
map { name, tags }`,
  },
  {
    id: 'json-array-inline',
    title: 'Inline JSON Array',
    category: 'function',
    code: `from [{ label: "test" }]
extend { items: json::array(1, "two", true, none) }`,
  },

  // json::object
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

  // json::serialize
  {
    id: 'json-serialize-basic',
    title: 'Serialize to JSON String',
    category: 'function',
    code: `from app::users
extend { json_str: json::serialize(json::object("name", name, "age", age)) }
map { name, json_str }`,
  },

  // json::pretty
  {
    id: 'json-pretty-basic',
    title: 'Pretty-print JSON',
    category: 'function',
    code: `from app::users
extend { formatted: json::pretty(json::object("name", name, "age", age)) }
map { name, formatted }`,
  },
];
