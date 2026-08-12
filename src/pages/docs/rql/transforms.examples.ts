import type { CodeExample } from '@/lib/examples/types';

export const transformPipelineExample: CodeExample = {
    id: 'transform-pipeline',
    title: 'Pipeline Processing',
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
  };

export const transformFromExample: CodeExample = {
    id: 'transform-from',
    title: 'from',
    code: `from app::users`,
  };

export const transformFilterExample: CodeExample = {
    id: 'transform-filter',
    title: 'filter',
    code: `from app::users
filter { age >= 18 }`,
  };

export const transformExtendExample: CodeExample = {
    id: 'transform-extend',
    title: 'extend',
    code: `from app::employees
extend { bonus: salary * 0.1 }`,
    expected: `id | dept_id | salary | bonus
---+---------+--------+-------
5  | 3       | 90000  | 9000.0
4  | 2       | 71000  | 7100.0
3  | 2       | 65000  | 6500.0
2  | 1       | 82000  | 8200.0
1  | 1       | 75000  | 7500.0`,
  };

export const transformSortExample: CodeExample = {
    id: 'transform-sort',
    title: 'sort',
    code: `from app::users
sort {created_at}`,
  };

export const transformTakeExample: CodeExample = {
    id: 'transform-take',
    title: 'take',
    code: `from app::users
sort {created_at}
take 10`,
  };

export const transformDistinctExample: CodeExample = {
    id: 'transform-distinct',
    title: 'distinct',
    code: `from app::products
distinct { category }`,
    expected: `id | name        | sku     | price | category
---+-------------+---------+-------+------------
5  | Thingamajig | TMJ-005 | 15.5  | Accessories
4  | Doohickey   | DHK-004 | 99.99 | Hardware
2  | Gadget      | GDT-002 | 49.99 | Electronics`,
  };

export const transformAggregateExample: CodeExample = {
    id: 'transform-aggregate',
    title: 'aggregate',
    code: `from app::orders
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+-----------------
North  | 471.25
West   | 55.25
East   | 245
South  | 89.99`,
  };

export const rqlTransformsExamples: CodeExample[] = [
  transformPipelineExample,
  transformFromExample,
  transformFilterExample,
  transformExtendExample,
  transformSortExample,
  transformTakeExample,
  transformDistinctExample,
  transformAggregateExample,
];
