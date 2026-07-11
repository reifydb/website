import type { CodeExample } from '@/lib/examples/types';

export const rqlControlFlowLoopExamples: CodeExample[] = [
{
    id: 'cf-loop-break',
    title: 'loop Runs Until break',
    category: 'rql',
    code: `let $p = 1;
loop {
  $p = $p * 2;
  if $p > 1000 { break }
};
map { first_power: $p }`,
    expected: `first_power
-----------
1024`,
  },
{
    id: 'cf-loop-continue',
    title: 'continue Skips to the Next Iteration',
    category: 'rql',
    code: `create namespace cf_loop;
create table cf_loop::odds { n: int4 };
let $n = 0;
loop {
  $n = $n + 1;
  if $n > 6 { break };
  if $n % 2 == 0 { continue };
  insert cf_loop::odds [{ n: $n }]
};
from cf_loop::odds sort { n: asc }`,
    expected: `n
-
1
3
5`,
  },
{
    id: 'cf-loop-result',
    title: 'Carry a Result Out of the Loop',
    category: 'rql',
    code: `let $a = 1;
let $b = 1;
let $steps = 0;
loop {
  let $next = $a + $b;
  $a = $b;
  $b = $next;
  $steps = $steps + 1;
  if $b > 50 { break }
};
map { fib: $b, steps: $steps }`,
    expected: `fib | steps
----+------
55  | 8`,
  },
{
    id: 'cf-loop-in-while',
    title: 'break Exits a while Loop Early',
    category: 'rql',
    code: `let $i = 0;
while $i < 100 {
  $i = $i + 1;
  if $i == 7 { break }
};
map { stopped_at: $i }`,
    expected: `stopped_at
----------
7`,
  },
{
    id: 'cf-loop-in-for',
    title: 'continue Filters a for Loop',
    category: 'rql',
    code: `let $sum = 0;
for $i in gen::series(1, 5) {
  if $i == 2 { continue };
  $sum = $sum + $i
};
map { kept_sum: $sum }`,
    expected: `kept_sum
--------
13`,
  },
{
    id: 'cf-loop-cap',
    title: 'A Loop That Never Breaks Is an Error',
    description: 'Iteration is capped at 10,000; exceeding it fails the request with RUNTIME_006 instead of hanging the engine.',
    category: 'rql',
    code: `let $x = 0;
loop { $x = $x + 1 }`,
    expectsError: true,
  },
];
