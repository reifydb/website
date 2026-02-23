import type { CodeExample } from './index';

export const transformExamples: CodeExample[] = [
  // transforms.tsx - Pipeline example
  {
    id: 'transform-pipeline',
    title: 'Pipeline Processing',
    category: 'rql',
    code: `from app.orders
filter status == "completed"
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
    code: `from app.users`,
  },
  {
    id: 'transform-filter',
    title: 'filter',
    category: 'rql',
    code: `from app.users
filter age >= 18`,
  },
  {
    id: 'transform-extend',
    title: 'extend',
    category: 'rql',
    code: `from app.employees
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
    code: `from app.users
sort {created_at}`,
  },
  {
    id: 'transform-take',
    title: 'take',
    category: 'rql',
    code: `from app.users
sort {created_at}
take 10`,
  },
  {
    id: 'transform-distinct',
    title: 'distinct',
    category: 'rql',
    code: `from app.products
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
    code: `from app.orders
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
    code: `from app.users
filter age >= 18`,
  },
  {
    id: 'filter-multiple-conditions',
    title: 'Filter Multiple Conditions',
    category: 'rql',
    code: `from app.users
filter age >= 18 and status == "active"`,
  },
  {
    id: 'filter-none',
    title: 'Filter None Handling',
    category: 'rql',
    code: `from app.users
filter deleted_at == none`,
  },

  // sort.tsx - Sort examples
  {
    id: 'sort-basic',
    title: 'Sort Basic Syntax',
    category: 'rql',
    code: `from app.users
sort {created_at}`,
  },
  {
    id: 'sort-descending',
    title: 'Sort Descending',
    category: 'rql',
    code: `from app.users
sort {created_at: desc}`,
  },
  {
    id: 'sort-multiple',
    title: 'Sort Multiple Columns',
    category: 'rql',
    code: `from app.orders
sort {region, total: desc}`,
  },
  {
    id: 'sort-with-take',
    title: 'Sort Combined with Take',
    category: 'rql',
    code: `from app.users
sort {created_at: desc}
take 10`,
  },
];
