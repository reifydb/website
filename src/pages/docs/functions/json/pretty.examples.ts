import type { CodeExample } from '@/lib/examples/types';

export const jsonPrettyBasicExample: CodeExample = {
    id: 'json-pretty-basic',
    title: 'Pretty-print JSON',
    code: `from app::users
extend { formatted: json::pretty(json::object("name", name, "age", age)) }
map { name, formatted }`,
  };

export const functionsJsonPrettyExamples: CodeExample[] = [
  jsonPrettyBasicExample,
];
