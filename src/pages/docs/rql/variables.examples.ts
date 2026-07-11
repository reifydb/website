import type { CodeExample } from '@/lib/examples/types';

// Note: frame variables must be captured with a bare `from <source>` statement.
// The current WASM build panics when the let statement itself contains
// transforms (filter, sort, aggregate); apply transforms after `from $var`.
export const rqlVariablesExamples: CodeExample[] = [
{
    id: 'rql-variables-let',
    title: 'Bind a Value Once, Use It in the Pipeline',
    category: 'rql',
    code: `create namespace cf_var;
create table cf_var::items { id: int4, name: utf8, stock: int4 };
insert cf_var::items [
  { id: 1, name: "bolt", stock: 120 },
  { id: 2, name: "nut", stock: 8 },
  { id: 3, name: "washer", stock: 45 }
];
let $min_stock = 10;
from cf_var::items
filter { stock >= $min_stock }
map { name, stock }
sort { stock: desc }`,
    expected: `name   | stock
-------+------
bolt   | 120
washer | 45`,
  },
{
    id: 'rql-variables-reassign',
    title: 'Reassign After Declaring',
    category: 'rql',
    code: `let $restocked = 0;
$restocked = $restocked + 5;
$restocked = $restocked + 3;
map { restocked: $restocked }`,
    expected: `restocked
---------
8`,
  },
{
    id: 'rql-variables-undeclared',
    title: 'Assignment Without let Is an Error',
    description: 'A variable must be declared with let before it can be assigned to.',
    category: 'rql',
    code: `$tally = 1`,
    expectsError: true,
  },
{
    id: 'rql-variables-frame',
    title: 'Frame Variables Hold Whole Results',
    category: 'rql',
    code: `let $items = from cf_var::items;
from $items
filter { stock < 50 }
sort { stock: asc }
map { name, stock }`,
    expected: `name   | stock
-------+------
nut    | 8
washer | 45`,
  },
{
    id: 'rql-variables-frame-field',
    title: 'Read a Field from a Single-Row Frame',
    category: 'rql',
    code: `create table cf_var::settings { low_stock: int4, audit: bool };
insert cf_var::settings [{ low_stock: 50, audit: true }];
let $cfg = from cf_var::settings;
let $limit = $cfg.low_stock;
from cf_var::items
filter { stock < $limit }
sort { stock: asc }
map { name, stock }`,
    expected: `name   | stock
-------+------
nut    | 8
washer | 45`,
  },
{
    id: 'rql-variables-scope',
    title: 'Blocks Create Scopes',
    description: 'The inner let declares a new variable that shadows the outer one inside the block; the outer binding is unchanged afterwards.',
    category: 'rql',
    code: `let $label = "outer";
if true {
  let $label = "inner"
};
map { label: $label }`,
    expected: `label
-----
outer`,
  },
];
