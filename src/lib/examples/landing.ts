import type { CodeExample } from './index';

export const landingExamples: CodeExample[] = [
  {
    id: 'landing-inline-data',
    title: 'Inline Data',
    description: 'Query inline data directly. Great for prototyping and testing.',
    category: 'landing',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"}
]`,
    expected: `id | name  | role
---+-------+------
1  | Alice | admin
2  | Bob   | user`,
  },
  {
    id: 'landing-filter-aggregate',
    title: 'Filter + Aggregate',
    description: 'Filter, group, and aggregate in a single readable pipeline.',
    category: 'landing',
    code: `from [
  {id: 1, region: "West", status: "completed", total: 250},
  {id: 2, region: "East", status: "pending", total: 180},
  {id: 3, region: "West", status: "completed", total: 320},
  {id: 4, region: "East", status: "completed", total: 410}
]
filter status == "completed"
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+-----------------
West   | 570
East   | 410`,
  },
  {
    id: 'landing-sorting-limiting',
    title: 'Sorting + Limiting',
    description: 'Sort by any column and limit results with simple pipeline syntax.',
    category: 'landing',
    code: `from [
  {id: 1, name: "Alice", score: 95},
  {id: 2, name: "Bob", score: 87},
  {id: 3, name: "Carol", score: 92},
  {id: 4, name: "Dave", score: 78}
]
sort {score desc}
take 3`,
    expected: `id | name  | score
---+-------+------
1  | Alice | 95
3  | Carol | 92
2  | Bob   | 87`,
  },
];
