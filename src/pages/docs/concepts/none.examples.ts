import type { CodeExample } from '@/lib/examples/types';

export const conceptsNoneExamples: CodeExample[] = [
{
    id: 'concepts-none-optional-columns',
    title: 'Optional Columns Hold none',
    category: 'concept',
    code: `create namespace cpt_none;
create table cpt_none::people {
  id: int4,
  name: utf8,
  nickname: Option(utf8)
};
insert cpt_none::people [
  { id: 1, name: "Ada", nickname: "Al" },
  { id: 2, name: "Grace" },
  { id: 3, name: "Alan", nickname: none }
];
from cpt_none::people sort { id: asc }`,
    expected: `id | name  | nickname
---+-------+---------
1  | Ada   | Al
2  | Grace | ⟪none⟫
3  | Alan  | ⟪none⟫`,
  },
{
    id: 'concepts-none-required-rejects',
    title: 'Non-Optional Columns Reject none',
    description: 'name is utf8, not Option(utf8), so writing none to it fails with CONSTRAINT_007 and the request rolls back.',
    category: 'concept',
    code: `insert cpt_none::people [{ id: 4, name: none }]`,
    expectsError: true,
  },
{
    id: 'concepts-none-propagates',
    title: 'none Propagates Through Expressions',
    category: 'concept',
    code: `from [
  { id: 1, price: 10, note: "sale" },
  { id: 2, price: none, note: none }
]
map { id, doubled: price * 2, cheap: price < 20, upper: text::upper(note) }
sort { id: asc }`,
    expected: `id | doubled | cheap  | upper
---+---------+--------+-------
1  | 20      | true   | SALE
2  | ⟪none⟫  | ⟪none⟫ | ⟪none⟫`,
  },
{
    id: 'concepts-none-logic',
    title: 'Logical Operators Recover When the Answer Is Certain',
    category: 'concept',
    code: `from [{ flag: none }]
map { and_false: flag and false, or_true: flag or true, negated: not flag }`,
    expected: `and_false | or_true | negated
----------+---------+--------
false     | true    | ⟪none⟫`,
  },
{
    id: 'concepts-none-eq-never-matches',
    title: 'Equality Against none Never Matches',
    category: 'concept',
    code: `from cpt_none::people filter { nickname == none }`,
    expected: `(empty)`,
  },
{
    id: 'concepts-none-is-none',
    title: 'Test for none with is::none',
    category: 'concept',
    code: `from cpt_none::people
filter { is::none(nickname) }
map { name }
sort { name: asc }`,
    expected: `name
-----
Alan
Grace`,
  },
{
    id: 'concepts-none-filter-drops',
    title: 'A none Predicate Drops the Row',
    category: 'concept',
    code: `from [
  { id: 1, score: 80 },
  { id: 2, score: none }
]
filter { score > 50 }`,
    expected: `id | score
---+------
1  | 80`,
  },
{
    id: 'concepts-none-filter-complement',
    title: 'The Complement Drops It Too',
    description: 'not (none > 50) is still none, so the row with the missing score matches neither predicate.',
    category: 'concept',
    code: `from [
  { id: 1, score: 80 },
  { id: 2, score: none }
]
filter { not (score > 50) }`,
    expected: `(empty)`,
  },
{
    id: 'concepts-none-replace',
    title: 'Replace none with a Default',
    category: 'concept',
    code: `from cpt_none::people
map { name, nickname: match { is::none(nickname) => "(no nickname)", else => nickname } }
sort { name: asc }`,
    expected: `name  | nickname
------+--------------
Ada   | Al
Alan  | (no nickname)
Grace | (no nickname)`,
  },
{
    id: 'concepts-none-clear',
    title: 'Clear a Value by Writing none',
    category: 'concept',
    code: `update cpt_none::people { nickname: none } filter { name == "Ada" };
from cpt_none::people map { name, nickname } sort { name: asc }`,
    expected: `name  | nickname
------+---------
Ada   | ⟪none⟫
Alan  | ⟪none⟫
Grace | ⟪none⟫`,
  },
{
    id: 'concepts-none-left-join',
    title: 'Left Joins Introduce none',
    category: 'concept',
    code: `create table cpt_none::phones { person_id: int4, phone: utf8 };
insert cpt_none::phones [{ person_id: 1, phone: "555-0100" }];
from cpt_none::people
left join { from cpt_none::phones } as p using (id, p.person_id)
map { name, phone: p_phone }
sort { name: asc }`,
    expected: `name  | phone
------+---------
Ada   | 555-0100
Alan  | ⟪none⟫
Grace | ⟪none⟫`,
  },
{
    id: 'concepts-none-join-missing',
    title: 'Find the Unmatched Rows',
    category: 'concept',
    code: `from cpt_none::people
left join { from cpt_none::phones } as p using (id, p.person_id)
filter { is::none(p_phone) }
map { name }
sort { name: asc }`,
    expected: `name
-----
Alan
Grace`,
  },
{
    id: 'concepts-none-aggregates',
    title: 'Aggregates Skip none Inputs',
    description: 'south has no defined readings at all, so its sum is none - there was nothing to add up.',
    category: 'concept',
    code: `create table cpt_none::readings { sensor: utf8, value: Option(int4) };
insert cpt_none::readings [
  { sensor: "north", value: 10 },
  { sensor: "north", value: none },
  { sensor: "north", value: 20 },
  { sensor: "south", value: none }
];
from cpt_none::readings
aggregate {
  total: math::sum(value),
  readings: math::count(value),
  rows: math::count(sensor)
} by { sensor }`,
    expected: `sensor | total  | readings | rows
-------+--------+----------+-----
south  | ⟪none⟫ | 0        | 1
north  | 30     | 2        | 3`,
  },
{
    id: 'concepts-none-group-key',
    title: 'As a Group Key, none Is Its Own Group',
    category: 'concept',
    code: `from [
  { region: none, sales: 5 },
  { region: "east", sales: 2 },
  { region: none, sales: 3 }
]
aggregate { total: math::sum(sales) } by { region }`,
    expected: `region | total
-------+------
⟪none⟫ | 8
east   | 2`,
  },
{
    id: 'concepts-none-sort-asc',
    title: 'Ascending Sorts Put none Last',
    category: 'concept',
    code: `from [{ id: 1, v: 5 }, { id: 2, v: none }, { id: 3, v: 1 }]
sort { v: asc }`,
    expected: `id | v
---+-------
3  | 1
1  | 5
2  | ⟪none⟫`,
  },
{
    id: 'concepts-none-sort-desc',
    title: 'Descending Sorts Put none First',
    category: 'concept',
    code: `from [{ id: 1, v: 5 }, { id: 2, v: none }, { id: 3, v: 1 }]
sort { v: desc }`,
    expected: `id | v
---+-------
2  | ⟪none⟫
1  | 5
3  | 1`,
  },
];
