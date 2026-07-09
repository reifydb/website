import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsDistinctExamples: CodeExample[] = [
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
];
