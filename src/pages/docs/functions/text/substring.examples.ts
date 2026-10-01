import type { CodeExample } from '@/lib/examples/types';

export const textSubstringPrefixExample: CodeExample = {
    id: 'text-substring-prefix',
    title: 'Extract prefix',
    code: `from app::codes
extend { prefix: text::substring(code, 0, 3) }`,
    expected: `id | code   | prefix | #rownum
---+--------+--------+--------
4  | jkl012 | jkl    | 4
3  | GHI789 | GHI    | 3
2  | def456 | def    | 2
1  | ABC123 | ABC    | 1`,
  };

export const textSubstringFirstExample: CodeExample = {
    id: 'text-substring-first',
    title: 'Get first characters',
    code: `from app::products
extend { initial: text::substring(name, 0, 1) }`,
    expected: `id | name        | sku     | price | category    | initial | #rownum
---+-------------+---------+-------+-------------+---------+--------
5  | Thingamajig | TMJ-005 | 15.5  | Accessories | T       | 5
4  | Doohickey   | DHK-004 | 99.99 | Hardware    | D       | 4
3  | Gizmo       | GZM-003 | 19.99 | Accessories | G       | 3
2  | Gadget      | GDT-002 | 49.99 | Electronics | G       | 2
1  | Widget      | WGT-001 | 29.99 | Electronics | W       | 1`,
  };

export const textSubstringMiddleExample: CodeExample = {
    id: 'text-substring-middle',
    title: 'Extract middle portion',
    code: `from app::identifiers
extend { middle: text::substring(code, 3, 7) }`,
    expected: `id | code     | middle | #rownum
---+----------+--------+--------
4  | ID-004-D | 004-D  | 4
3  | ID-003-C | 003-C  | 3
2  | ID-002-B | 002-B  | 2
1  | ID-001-A | 001-A  | 1`,
  };

export const functionsTextSubstringExamples: CodeExample[] = [
  textSubstringPrefixExample,
  textSubstringFirstExample,
  textSubstringMiddleExample,
];
