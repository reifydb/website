import type { CodeExample } from '@/lib/examples/types';

export const jsonArrayBasicExample: CodeExample = {
    id: 'json-array-basic',
    title: 'Build JSON Array',
    code: `from app::users
extend { tags: json::array("user", name, age) }
map { name, tags }`,
  };

export const jsonArrayInlineExample: CodeExample = {
    id: 'json-array-inline',
    title: 'Inline JSON Array',
    code: `from [{ label: "test" }]
extend { items: json::array(1, "two", true, none) }`,
  };

export const functionsJsonArrayExamples: CodeExample[] = [
  jsonArrayBasicExample,
  jsonArrayInlineExample,
];
