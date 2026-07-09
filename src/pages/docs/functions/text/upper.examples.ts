import type { CodeExample } from '@/lib/examples/types';

export const functionsTextUpperExamples: CodeExample[] = [
{
    id: 'text-upper-names',
    title: 'Format display names',
    category: 'function',
    code: `from app::users
extend { upper_name: text::upper(name) }`,
  },
{
    id: 'text-upper-sku',
    title: 'Uppercase code identifiers',
    category: 'function',
    code: `from app::products
extend { sku_upper: text::upper(sku) }`,
    expected: `id | name        | sku     | price              | category    | sku_upper
---+-------------+---------+--------------------+-------------+----------
5  | Thingamajig | TMJ-005 | 15.5               | Accessories | TMJ-005
4  | Doohickey   | DHK-004 | 99.98999786376953  | Hardware    | DHK-004
3  | Gizmo       | GZM-003 | 19.989999771118164 | Accessories | GZM-003
2  | Gadget      | GDT-002 | 49.9900016784668   | Electronics | GDT-002
1  | Widget      | WGT-001 | 29.989999771118164 | Electronics | WGT-001`,
  },
];
