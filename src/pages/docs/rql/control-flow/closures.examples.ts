import type { CodeExample } from '@/lib/examples/types';

// Note: closures and udfs are request-scoped, so every example defines the
// functions it calls. In the current WASM build a closure variable cannot be
// called inline inside a pipeline expression (map, filter); bind its result
// with let first. Named udfs can be called inline.
export const rqlControlFlowClosuresExamples: CodeExample[] = [
{
    id: 'cf-closures-basic',
    title: 'Define a Closure, Call It',
    category: 'rql',
    code: `let $double = ($x) { $x * 2 };
$double(21)`,
    expected: `value
-----
42`,
  },
{
    id: 'cf-closures-capture',
    title: 'Closures Capture Their Scope',
    category: 'rql',
    code: `let $base = 10;
let $adder = ($x) { $x + $base };
$adder(5)`,
    expected: `value
-----
15`,
  },
{
    id: 'cf-closures-shadow',
    title: 'A Parameter Shadows a Captured Variable',
    category: 'rql',
    code: `let $x = 100;
let $f = ($x) { $x + 1 };
$f(5)`,
    expected: `value
-----
6`,
  },
{
    id: 'cf-closures-block-body',
    title: 'Bodies Are Blocks',
    category: 'rql',
    code: `let $f = ($x) {
  let $y = $x * 2;
  $y + 1
};
$f(3)`,
    expected: `value
-----
7`,
  },
{
    id: 'cf-closures-compose',
    title: 'Closures Call Closures',
    category: 'rql',
    code: `let $inc = ($n) { $n + 1 };
let $twice = ($n) { $inc($inc($n)) };
$twice(5)`,
    expected: `value
-----
7`,
  },
{
    id: 'cf-closures-into-query',
    title: 'Bind the Result, Use It in a Query',
    category: 'rql',
    code: `let $f = ($x) { $x * 2 };
let $r = $f(4);
map { doubled: $r }`,
    expected: `doubled
-------
8`,
  },
{
    id: 'cf-closures-inline-fails',
    title: 'Closure Variables Cannot Be Called Inline',
    description: 'Inside map and filter, $f(4) is not resolved as a callable in the current build; bind the result with let first.',
    category: 'rql',
    code: `let $f = ($x) { $x * 2 };
map { v: $f(4) }`,
    expectsError: true,
  },
{
    id: 'cf-closures-udf',
    title: 'Named Functions Work Inline',
    category: 'rql',
    code: `udf triple($x) { return $x * 3 };
map { v: triple(4) }`,
    expected: `v
--
12`,
  },
{
    id: 'cf-closures-udf-early-return',
    title: 'return Exits Early',
    category: 'rql',
    code: `udf check($v) {
  if $v > 100 { return "large" };
  return "small"
};
map { a: check(150), b: check(3) }`,
    expected: `a     | b
------+------
large | small`,
  },
{
    id: 'cf-closures-udf-filter',
    title: 'Use a udf as a Predicate',
    category: 'rql',
    code: `udf big($v) { return $v > 2 };
from [{ a: 1 }, { a: 3 }]
filter { big(a) }`,
    expected: `a
-
3`,
  },
{
    id: 'cf-closures-udf-dml',
    title: 'Wrap a Write in a udf',
    category: 'rql',
    code: `create namespace cf_clo;
create table cf_clo::counters { name: utf8, hits: int4 };
insert cf_clo::counters [{ name: "visits", hits: 0 }];
udf bump($n) { update cf_clo::counters { hits: hits + 1 } filter { name == $n } };
bump("visits");
bump("visits");
from cf_clo::counters`,
    expected: `name   | hits
-------+-----
visits | 2`,
  },
{
    id: 'cf-closures-request-scoped',
    title: 'Functions Live for One Request',
    description: 'bump was defined in the previous request, so calling it here fails - closures and udfs are not persisted.',
    category: 'rql',
    code: `bump("visits")`,
    expectsError: true,
  },
];
