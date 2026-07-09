import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsPatchExamples: CodeExample[] = [
{
    id: 'patch-basic',
    title: 'Patch Replace Column',
    category: 'rql',
    code: `from [
  {id: 1, name: "Alice", status: "pending"},
  {id: 2, name: "Bob", status: "inactive"},
  {id: 3, name: "Carol", status: "pending"}
]
patch {status: "active"}`,
  },
{
    id: 'patch-add-column',
    title: 'Patch Add New Column',
    category: 'rql',
    code: `from [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob"}
]
patch {active: true, score: 0}`,
  },
{
    id: 'patch-expression',
    title: 'Patch with Expression',
    category: 'rql',
    code: `from [{id: 1, x: 10}, {id: 2, x: 20}]
patch {x: x * 2, label: "done"}`,
  },
{
    id: 'patch-chained',
    title: 'Chained Patches',
    category: 'rql',
    code: `from [{id: 1, x: 10}, {id: 2, x: 20}, {id: 3, x: 30}]
patch {y: x + 5}
patch {z: y * 2}`,
  },
];
