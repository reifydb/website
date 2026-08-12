import type { CodeExample } from '@/lib/examples/types';

export const jsonOverviewQuickExample: CodeExample = {
    id: 'json-overview-quick',
    title: 'Quick Example',
    code: `from app::users
extend { payload: json::object("name", name, "age", age) }
map { name, payload }`,
  };

export const functionsJsonExamples: CodeExample[] = [
  jsonOverviewQuickExample,
];
