import type { CodeExample } from '@/lib/examples/types';

export const joinInnerExample: CodeExample = {
    id: 'join-inner',
    title: 'Inner Join on a Key Pair',
    code: `create namespace tf_join;
create table tf_join::employees { id: int4, name: utf8, dept_id: int4 };
create table tf_join::departments { id: int4, name: utf8 };
insert tf_join::employees [
  { id: 1, name: "Ada", dept_id: 1 },
  { id: 2, name: "Grace", dept_id: 2 },
  { id: 3, name: "Linus", dept_id: 1 },
  { id: 4, name: "Ken", dept_id: 9 }
];
insert tf_join::departments [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" }
];
from tf_join::employees
inner join { from tf_join::departments } as d using (dept_id, d.id)
map { id, name, department: d_name }`,
    expected: `id | name  | department  | #rownum
---+-------+-------------+--------
3  | Linus | Engineering | 1
2  | Grace | Marketing   | 2
1  | Ada   | Engineering | 3`,
  };

export const joinLeftExample: CodeExample = {
    id: 'join-left',
    title: 'Left Join Keeps Every Left Row',
    code: `from tf_join::employees
left join { from tf_join::departments } as d using (dept_id, d.id)
map { id, name, department: d_name }`,
    expected: `id | name  | department  | #rownum
---+-------+-------------+--------
4  | Ken   | ⟪none⟫      | 1
3  | Linus | Engineering | 2
2  | Grace | Marketing   | 3
1  | Ada   | Engineering | 4`,
  };

export const joinFlattenedColumnsExample: CodeExample = {
    id: 'join-flattened-columns',
    title: 'What the Joined Row Looks Like',
    code: `from tf_join::employees
left join { from tf_join::departments } as d using (dept_id, d.id)`,
    expected: `id | name  | dept_id | d_id   | d_name      | #rownum
---+-------+---------+--------+-------------+--------
4  | Ken   | 9       | ⟪none⟫ | ⟪none⟫      | 1
3  | Linus | 1       | 1      | Engineering | 2
2  | Grace | 2       | 2      | Marketing   | 3
1  | Ada   | 1       | 1      | Engineering | 4`,
  };

export const joinDotAccessExample: CodeExample = {
    id: 'join-dot-access',
    title: 'Dot Access Does Not Survive the Join',
    code: `from tf_join::employees
inner join { from tf_join::departments } as d using (dept_id, d.id)
map { id, department: d.name }`,
    expectsError: true,
  };

export const joinDefaultIsInnerExample: CodeExample = {
    id: 'join-default-is-inner',
    title: 'Bare join Is an Inner Join',
    code: `from tf_join::employees
join { from tf_join::departments } as d using (dept_id, d.id)
map { id, name, department: d_name }`,
    expected: `id | name  | department  | #rownum
---+-------+-------------+--------
3  | Linus | Engineering | 1
2  | Grace | Marketing   | 2
1  | Ada   | Engineering | 3`,
  };

export const joinAggregateExample: CodeExample = {
    id: 'join-aggregate',
    title: 'Join, Then Aggregate',
    code: `from tf_join::employees
inner join { from tf_join::departments } as d using (dept_id, d.id)
aggregate { headcount: math::count(id) } by { d_name }
sort { d_name: asc }`,
    expected: `d_name      | headcount
------------+----------
Engineering | 2
Marketing   | 1`,
  };

export const joinMultiKeyExample: CodeExample = {
    id: 'join-multi-key',
    title: 'Join on More Than One Column',
    code: `create table tf_join::stock { sku: utf8, warehouse: utf8, qty: int4 };
create table tf_join::prices { sku: utf8, warehouse: utf8, price: float8 };
insert tf_join::stock [
  { sku: "A1", warehouse: "east", qty: 10 },
  { sku: "A1", warehouse: "west", qty: 4 },
  { sku: "B2", warehouse: "east", qty: 7 }
];
insert tf_join::prices [
  { sku: "A1", warehouse: "east", price: 5.0 },
  { sku: "A1", warehouse: "west", price: 5.5 },
  { sku: "B2", warehouse: "west", price: 9.0 }
];
from tf_join::stock
inner join { from tf_join::prices } as p using (sku, p.sku) and (warehouse, p.warehouse)
map { sku, warehouse, value: qty * p_price }`,
    expected: `sku | warehouse | value | #rownum
----+-----------+-------+--------
A1  | west      | 22    | 1
A1  | east      | 50    | 2`,
  };

export const joinOrKeysExample: CodeExample = {
    id: 'join-or-keys',
    title: 'Match on Either Key Pair',
    code: `from tf_join::stock
inner join { from tf_join::prices } as p using (sku, p.sku) or (warehouse, p.warehouse)
map { sku, warehouse, p_sku, p_warehouse }`,
    expected: `sku | warehouse | p_sku | p_warehouse | #rownum
----+-----------+-------+-------------+--------
B2  | east      | B2    | west        | 1
B2  | east      | A1    | east        | 2
A1  | west      | B2    | west        | 3
A1  | west      | A1    | west        | 4
A1  | west      | A1    | east        | 5
A1  | east      | A1    | west        | 6
A1  | east      | A1    | east        | 7`,
  };

export const joinNaturalExample: CodeExample = {
    id: 'join-natural',
    title: 'Natural Join on Shared Column Names',
    code: `create table tf_join::salaries { id: int4, amount: int4 };
insert tf_join::salaries [
  { id: 1, amount: 120 },
  { id: 2, amount: 95 },
  { id: 3, amount: 110 }
];
from tf_join::employees
natural join { from tf_join::salaries } as s`,
    expected: `id | name  | dept_id | s_amount | #rownum
---+-------+---------+----------+--------
3  | Linus | 1       | 110      | 1
2  | Grace | 2       | 95       | 2
1  | Ada   | 1       | 120      | 3`,
  };

export const joinNaturalLeftExample: CodeExample = {
    id: 'join-natural-left',
    title: 'Natural Left Join',
    code: `from tf_join::employees
natural left join { from tf_join::salaries } as s
map { id, name, amount: s_amount }`,
    expected: `id | name  | amount | #rownum
---+-------+--------+--------
4  | Ken   | ⟪none⟫ | 1
3  | Linus | 110    | 2
2  | Grace | 95     | 3
1  | Ada   | 120    | 4`,
  };

export const rqlTransformsJoinExamples: CodeExample[] = [
  joinInnerExample,
  joinLeftExample,
  joinFlattenedColumnsExample,
  joinDotAccessExample,
  joinDefaultIsInnerExample,
  joinAggregateExample,
  joinMultiKeyExample,
  joinOrKeysExample,
  joinNaturalExample,
  joinNaturalLeftExample,
];
