import type { CodeExample } from './index';

export const transformExamples: CodeExample[] = [
  // transforms.tsx - Pipeline example
  {
    id: 'transform-pipeline',
    title: 'Pipeline Processing',
    category: 'rql',
    code: `from app::orders
filter { status == "completed" }
aggregate {revenue: math::sum(total)} by {region}
sort {revenue}
take 5`,
    expected: `region | revenue
-------+--------
East   | 245
North  | 150.5
West   | 55.25`,
  },

  // transforms.tsx - Transform reference entries
  {
    id: 'transform-from',
    title: 'from',
    category: 'rql',
    code: `from app::users`,
  },
  {
    id: 'transform-filter',
    title: 'filter',
    category: 'rql',
    code: `from app::users
filter { age >= 18 }`,
  },
  {
    id: 'transform-extend',
    title: 'extend',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1 }`,
    expected: `id | dept_id | salary | bonus
---+---------+--------+------
5  | 3       | 90000  | 9000
4  | 2       | 71000  | 7100
3  | 2       | 65000  | 6500
2  | 1       | 82000  | 8200
1  | 1       | 75000  | 7500`,
  },
  {
    id: 'transform-sort',
    title: 'sort',
    category: 'rql',
    code: `from app::users
sort {created_at}`,
  },
  {
    id: 'transform-take',
    title: 'take',
    category: 'rql',
    code: `from app::users
sort {created_at}
take 10`,
  },
  {
    id: 'transform-distinct',
    title: 'distinct',
    category: 'rql',
    code: `from app::products
distinct { category }`,
    expected: `id | name        | sku     | price             | category
---+-------------+---------+-------------------+------------
5  | Thingamajig | TMJ-005 | 15.5              | Accessories
4  | Doohickey   | DHK-004 | 99.98999786376953 | Hardware
2  | Gadget      | GDT-002 | 49.9900016784668  | Electronics`,
  },
  {
    id: 'transform-aggregate',
    title: 'aggregate',
    category: 'rql',
    code: `from app::orders
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+------------------
North  | 471.25
West   | 55.25
East   | 245
South  | 89.98999786376953`,
  },

  // filter.tsx - Filter examples
  {
    id: 'filter-basic',
    title: 'Filter Basic Syntax',
    category: 'rql',
    code: `from app::users
filter { age >= 18 }`,
  },
  {
    id: 'filter-multiple-conditions',
    title: 'Filter Multiple Conditions',
    category: 'rql',
    code: `from app::users
filter { age >= 18 and status == "active" }`,
  },
  {
    id: 'filter-none',
    title: 'Filter None Handling',
    category: 'rql',
    code: `from app::users
filter { deleted_at == none }`,
  },

  // map.tsx - Map examples
  {
    id: 'map-basic',
    title: 'Map Basic',
    category: 'rql',
    code: `from app::employees
map { id, salary }`,
    expected: `id | salary
---+-------
5  | 90000
4  | 71000
3  | 65000
2  | 82000
1  | 75000`,
  },
  {
    id: 'map-alias',
    title: 'Map with Alias',
    category: 'rql',
    code: `from app::employees
map { employee_id: id, annual_salary: salary, double_salary: salary * 2 }`,
  },
  {
    id: 'map-constants',
    title: 'Map Constants',
    category: 'rql',
    code: `from [{ x: 1 }, { x: 2 }, { x: 3 }]
map { x, label: "row", active: true }`,
  },

  // extend.tsx - Extend examples
  {
    id: 'extend-basic',
    title: 'Extend Basic',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1 }`,
    expected: `id | dept_id | salary | bonus
---+---------+--------+------
5  | 3       | 90000  | 9000
4  | 2       | 71000  | 7100
3  | 2       | 65000  | 6500
2  | 1       | 82000  | 8200
1  | 1       | 75000  | 7500`,
  },
  {
    id: 'extend-multiple',
    title: 'Extend Multiple Columns',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1, tax: salary * 0.3, net: salary * 0.6 }`,
  },
  {
    id: 'extend-chained',
    title: 'Extend Chained',
    category: 'rql',
    code: `from app::employees
extend { bonus: salary * 0.1 }
extend { total_comp: salary + bonus }`,
  },

  // aggregate.tsx - Aggregate examples
  {
    id: 'aggregate-basic',
    title: 'Aggregate Basic',
    category: 'rql',
    code: `from app::orders
aggregate { total_revenue: math::sum(total) }`,
  },
  {
    id: 'aggregate-group-by',
    title: 'Aggregate Group By',
    category: 'rql',
    code: `from app::orders
aggregate { revenue: math::sum(total), orders: math::sum(1) } by { region }`,
  },
  {
    id: 'aggregate-multi-group',
    title: 'Aggregate Multiple Groups',
    category: 'rql',
    code: `from app::orders
aggregate { revenue: math::sum(total) } by { region, status }`,
  },
  {
    id: 'aggregate-multiple-fns',
    title: 'Aggregate Multiple Functions',
    category: 'rql',
    code: `from app::orders
aggregate {
  total: math::sum(total),
  average: math::avg(total),
  smallest: math::min(total),
  largest: math::max(total)
}`,
  },

  // distinct.tsx - Distinct examples
  {
    id: 'distinct-basic',
    title: 'Distinct Basic',
    category: 'rql',
    code: `from app::products
distinct { category }`,
    expected: `id | name        | sku     | price             | category
---+-------------+---------+-------------------+------------
5  | Thingamajig | TMJ-005 | 15.5              | Accessories
4  | Doohickey   | DHK-004 | 99.98999786376953 | Hardware
2  | Gadget      | GDT-002 | 49.9900016784668  | Electronics`,
  },
  {
    id: 'distinct-multi',
    title: 'Distinct Multiple Columns',
    category: 'rql',
    code: `from app::orders
distinct { region, status }`,
  },

  // take.tsx - Take examples
  {
    id: 'take-basic',
    title: 'Take Basic',
    category: 'rql',
    code: `from app::users
take 3`,
  },
  {
    id: 'take-with-sort',
    title: 'Take with Sort',
    category: 'rql',
    code: `from app::orders
sort {total: desc}
take 3`,
  },

  // join.tsx - Join examples
  {
    id: 'join-inner',
    title: 'Inner Join',
    category: 'rql',
    code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id)
map { id, salary, department: d.name }`,
  },
  {
    id: 'join-left',
    title: 'Left Join',
    category: 'rql',
    code: `from app::employees
left join { from app::departments } as d using (dept_id, d.id)
map { id, salary, department: d.name }`,
  },

  // match.tsx - Match examples
  {
    id: 'match-value',
    title: 'Value Match',
    category: 'rql',
    code: `from app::orders
extend { region_label: match region { "North" => "Northern", "South" => "Southern", else => "Other" } }
map { id, region, region_label }`,
  },
  {
    id: 'match-searched',
    title: 'Searched Match',
    category: 'rql',
    code: `from app::orders
extend { size: match { when total > 100 then "large", when total > 50 then "medium", else "small" } }
map { id, total, size }`,
  },

  // patch.tsx - Patch examples
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

  // sort.tsx - Sort examples
  {
    id: 'sort-basic',
    title: 'Sort Basic Syntax',
    category: 'rql',
    code: `from app::users
sort {created_at}`,
  },
  {
    id: 'sort-descending',
    title: 'Sort Descending',
    category: 'rql',
    code: `from app::users
sort {created_at: desc}`,
  },
  {
    id: 'sort-multiple',
    title: 'Sort Multiple Columns',
    category: 'rql',
    code: `from app::orders
sort {region, total: desc}`,
  },
  {
    id: 'sort-with-take',
    title: 'Sort Combined with Take',
    category: 'rql',
    code: `from app::users
sort {created_at: desc}
take 10`,
  },
];
