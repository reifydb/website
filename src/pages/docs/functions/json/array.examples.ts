import type { CodeExample } from '@/lib/examples/types';

export const functionsJsonArrayExamples: CodeExample[] = [
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
];
