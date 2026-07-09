import type { CodeExample } from '@/lib/examples/types';

export const functionsTextSubstringExamples: CodeExample[] = [
{
    id: 'text-substring-prefix',
    title: 'Extract prefix',
    category: 'function',
    code: `from app::codes
extend { prefix: text::substring(code, 0, 3) }`,
    expected: `id | code   | prefix
---+--------+-------
4  | jkl012 | jkl
3  | GHI789 | GHI
2  | def456 | def
1  | ABC123 | ABC`,
  },
{
    id: 'text-substring-first',
    title: 'Get first characters',
    category: 'function',
    code: `from app::products
extend { initial: text::substring(name, 0, 1) }`,
    expected: `id | name        | sku     | price              | category    | initial
---+-------------+---------+--------------------+-------------+--------
5  | Thingamajig | TMJ-005 | 15.5               | Accessories | T
4  | Doohickey   | DHK-004 | 99.98999786376953  | Hardware    | D
3  | Gizmo       | GZM-003 | 19.989999771118164 | Accessories | G
2  | Gadget      | GDT-002 | 49.9900016784668   | Electronics | G
1  | Widget      | WGT-001 | 29.989999771118164 | Electronics | W`,
  },
{
    id: 'text-substring-middle',
    title: 'Extract middle portion',
    category: 'function',
    code: `from app::identifiers
extend { middle: text::substring(code, 3, 7) }`,
    expected: `id | code     | middle
---+----------+-------
4  | ID-004-D | 004-D
3  | ID-003-C | 003-C
2  | ID-002-B | 002-B
1  | ID-001-A | 001-A`,
  },
];
