import type { CodeExample } from '@/lib/examples/types';

export const cfLoopBreakExample: CodeExample = {
    id: 'cf-loop-break',
    title: 'loop Runs Until break',
    code: `let $p = 1;
loop {
  $p = $p * 2;
  if $p > 1000 { break }
};
map { first_power: $p }`,
    expected: `first_power
-----------
1024`,
  };

export const cfLoopContinueExample: CodeExample = {
    id: 'cf-loop-continue',
    title: 'continue Skips to the Next Iteration',
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
    expected: `n | #rownum
--+--------
1 | 1
3 | 2
5 | 3`,
  };

export const cfLoopResultExample: CodeExample = {
    id: 'cf-loop-result',
    title: 'Carry a Result Out of the Loop',
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
  };

export const cfLoopInWhileExample: CodeExample = {
    id: 'cf-loop-in-while',
    title: 'break Exits a while Loop Early',
    code: `let $i = 0;
while $i < 100 {
  $i = $i + 1;
  if $i == 7 { break }
};
map { stopped_at: $i }`,
    expected: `stopped_at
----------
7`,
  };

export const cfLoopInForExample: CodeExample = {
    id: 'cf-loop-in-for',
    title: 'continue Filters a for Loop',
    code: `let $sum = 0;
for $i in gen::series(1, 5) {
  if $i == 2 { continue };
  $sum = $sum + $i
};
map { kept_sum: $sum }`,
    expected: `kept_sum
--------
13`,
  };

export const cfLoopCapExample: CodeExample = {
    id: 'cf-loop-cap',
    title: 'A Loop That Never Breaks Is an Error',
    description: 'Iteration is capped at 10,000; exceeding it fails the request with RUNTIME_006 instead of hanging the engine.',
    code: `let $x = 0;
loop { $x = $x + 1 }`,
    expectsError: true,
  };

export const cfLoopNestedExample: CodeExample = {
    id: 'cf-loop-nested',
    title: 'break Leaves the Innermost Loop Only',
    code: `let $outer = 0;
let $inner = 0;
loop {
  $outer = $outer + 1;
  loop {
    $inner = $inner + 1;
    if $inner % 3 == 0 { break }
  };
  if $outer == 2 { break }
};
map { outer: $outer, inner: $inner }`,
    expected: `outer | inner
------+------
2     | 6`,
  };

export const cfLoopContinueInWhileExample: CodeExample = {
    id: 'cf-loop-continue-in-while',
    title: 'continue Skips a while Iteration',
    code: `let $i = 0;
let $sum = 0;
while $i < 5 {
  $i = $i + 1;
  if $i == 3 { continue };
  $sum = $sum + $i
};
map { sum: $sum }`,
    expected: `sum
---
12`,
  };

export const cfLoopBreakInForExample: CodeExample = {
    id: 'cf-loop-break-in-for',
    title: 'break Stops a for Loop Early',
    code: `let $sum = 0;
for $i in gen::series(1, 100) {
  if $i == 4 { break };
  $sum = $sum + $i
};
map { sum: $sum }`,
    expected: `sum
---
6`,
  };

export const cfLoopBreakOutsideExample: CodeExample = {
    id: 'cf-loop-break-outside',
    title: 'break Outside a Loop Is an Error',
    description: 'There is no loop to leave, so the request fails with RUNTIME_004. continue outside a loop fails the same way with RUNTIME_005.',
    code: `let $ready = true;
if $ready { break };
map { ready: $ready }`,
    expectsError: true,
  };

export const cfLoopCapExactExample: CodeExample = {
    id: 'cf-loop-cap-exact',
    title: 'Ten Thousand Trips Around Is Fine',
    code: `let $i = 0;
loop {
  $i = $i + 1;
  if $i == 10000 { break }
};
map { iterations: $i }`,
    expected: `iterations
----------
10000`,
  };

export const rqlControlFlowLoopExamples: CodeExample[] = [
  cfLoopBreakExample,
  cfLoopContinueExample,
  cfLoopResultExample,
  cfLoopNestedExample,
  cfLoopInWhileExample,
  cfLoopContinueInWhileExample,
  cfLoopInForExample,
  cfLoopBreakInForExample,
  cfLoopBreakOutsideExample,
  cfLoopCapExample,
  cfLoopCapExactExample,
];
