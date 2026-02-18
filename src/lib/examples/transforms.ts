import type { CodeExample } from './index';

export const transformExamples: CodeExample[] = [
  // transforms.tsx — Pipeline example
  {
    id: 'transform-pipeline',
    title: 'Pipeline Processing',
    category: 'rql',
    expectsError: true, // '#' comments not supported
    code: `from app.orders              # Start with orders table
filter status == "completed" # Keep only completed orders
aggregate math::sum(total) by region  # Sum totals per region
sort total                   # Order by total
take 5                       # Top 5 regions`,
  },

  // transforms.tsx — Transform reference entries
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
    id: 'transform-select',
    title: 'select',
    category: 'rql',
    code: `from app.users
select {name, email}`,
  },
  {
    id: 'transform-extend',
    title: 'extend',
    category: 'rql',
    code: `from app.employees
extend { bonus: salary * 0.1 }`,
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
  },
  {
    id: 'transform-join',
    title: 'join',
    category: 'rql',
    expectsError: true, // join not fully implemented
    code: `from app.employees
join { from app.departments } dept on dept_id == dept.id`,
  },
  {
    id: 'transform-group',
    title: 'group',
    category: 'rql',
    expectsError: true, // group by not implemented
    code: `from app.orders
group by {region}`,
  },
  {
    id: 'transform-aggregate',
    title: 'aggregate',
    category: 'rql',
    code: `from app.orders
aggregate {math::sum(total)} by {region}`,
  },

  // filter.tsx — Filter examples
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
    id: 'filter-pattern-match',
    title: 'Filter Pattern Matching',
    category: 'rql',
    expectsError: true, // ~= pattern match operator not implemented
    code: `from app.users
filter email ~= "%@gmail.com"`,
  },
  {
    id: 'filter-null',
    title: 'Filter Null Handling',
    category: 'rql',
    code: `from app.users
filter deleted_at == null`,
  },

  // sort.tsx — Sort examples
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
sort {created_at desc}`,
  },
  {
    id: 'sort-multiple',
    title: 'Sort Multiple Columns',
    category: 'rql',
    expectsError: true, // comma-separated sort columns not implemented
    code: `from app.orders
sort { -total, created_at }`,
  },
  {
    id: 'sort-with-take',
    title: 'Sort Combined with Take',
    category: 'rql',
    code: `from app.users
sort {created_at desc}
take 10`,
  },
];
