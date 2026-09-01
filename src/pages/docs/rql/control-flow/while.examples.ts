import type { CodeExample } from '@/lib/examples/types';

export const cfWhileAccumulateExample: CodeExample = {
    id: 'cf-while-accumulate',
    title: 'Repeat Until a Condition Flips',
    code: `let $cells = 1;
let $days = 0;
while $cells < 100 {
  $cells = $cells * 2;
  $days = $days + 1
};
map { days: $days, cells: $cells }`,
    expected: `days | cells
-----+------
7    | 128`,
  };

export const cfWhileZeroIterationsExample: CodeExample = {
    id: 'cf-while-zero-iterations',
    title: 'The Condition Is Checked Before the First Run',
    code: `let $runs = 0;
while false { $runs = $runs + 1 };
map { runs: $runs }`,
    expected: `runs
----
0`,
  };

export const cfWhileWriteExample: CodeExample = {
    id: 'cf-while-write',
    title: 'A while Loop That Writes Rows',
    code: `create namespace cf_while;
create table cf_while::backups { week: int4, day: int4 };
let $week = 1;
while $week <= 4 {
  insert cf_while::backups [{ week: $week, day: $week * 7 }];
  $week = $week + 1
};
from cf_while::backups sort { week: asc }`,
    expected: `week | day
-----+----
1    | 7
2    | 14
3    | 21
4    | 28`,
  };

export const cfWhileCapExample: CodeExample = {
    id: 'cf-while-cap',
    title: 'Runaway Loops Are Stopped',
    description: 'A loop that never terminates fails once it exceeds the 10,000-iteration limit, and the whole request rolls back.',
    code: `let $spins = 0;
while true { $spins = $spins + 1 }`,
    expectsError: true,
  };

export const cfWhileFlagExample: CodeExample = {
    id: 'cf-while-flag',
    title: 'Loop Until a Flag Flips',
    code: `let $done = false;
let $attempts = 0;
while not $done {
  $attempts = $attempts + 1;
  $done = $attempts >= 4
};
map { attempts: $attempts, done: $done }`,
    expected: `attempts | done
---------+-----
4        | true`,
  };

export const cfWhileNoneConditionExample: CodeExample = {
    id: 'cf-while-none-condition',
    title: 'A none Condition Counts as false',
    code: `let $runs = 0;
let $go = if false { true };
while $go { $runs = $runs + 1 };
map { go: $go, runs: $runs }`,
    expected: `go     | runs
-------+-----
⟪none⟫ | 0`,
  };

export const cfWhileBodyScopeExample: CodeExample = {
    id: 'cf-while-body-scope',
    title: 'let Inside the Body Ends with the Loop',
    description: 'A variable declared inside the block does not exist after the loop; reading it fails with RUNTIME_001.',
    code: `let $i = 0;
while $i < 3 {
  let $square = $i * $i;
  $i = $i + 1
};
map { square: $square }`,
    expectsError: true,
  };

export const cfWhileNestedExample: CodeExample = {
    id: 'cf-while-nested',
    title: 'Nested Loops',
    code: `let $row = 0;
let $cells = 0;
while $row < 3 {
  $row = $row + 1;
  let $col = 0;
  while $col < 4 {
    $col = $col + 1;
    $cells = $cells + 1
  }
};
map { rows: $row, cells: $cells }`,
    expected: `rows | cells
-----+------
3    | 12`,
  };

export const cfWhileUpdateExample: CodeExample = {
    id: 'cf-while-update',
    title: 'Update the Same Row Each Iteration',
    code: `create table cf_while::savings { id: int4, balance: int4 };
insert cf_while::savings [{ id: 1, balance: 100 }];
let $year = 0;
while $year < 3 {
  update cf_while::savings { balance: balance * 2 } filter { id == 1 };
  $year = $year + 1
};
from cf_while::savings`,
    expected: `id | balance
---+--------
1  | 800`,
  };

export const cfWhileRollbackSetupExample: CodeExample = {
    id: 'cf-while-rollback-setup',
    title: 'A Table for the Loop to Write',
    code: `create table cf_while::log { step: int4 };
from cf_while::log`,
    expected: `(empty)`,
  };

export const cfWhileRollbackErrorExample: CodeExample = {
    id: 'cf-while-rollback-error',
    title: 'One Failing Iteration Fails the Request',
    description: 'Passes 1 and 2 insert their rows; pass 3 inserts its row, then fails on the cast (CAST_002). The request fails as a whole.',
    code: `let $step = 0;
while $step < 5 {
  $step = $step + 1;
  insert cf_while::log [{ step: $step }];
  if $step == 3 { insert cf_while::log [{ step: cast("three", int4) }] }
};
from cf_while::log`,
    expectsError: true,
  };

export const cfWhileRollbackVerifyExample: CodeExample = {
    id: 'cf-while-rollback-verify',
    title: 'Nothing the Loop Wrote Survived',
    code: `from cf_while::log`,
    expected: `(empty)`,
  };

export const cfWhileCapExactExample: CodeExample = {
    id: 'cf-while-cap-exact',
    title: 'Exactly 10,000 Iterations Is Allowed',
    code: `let $i = 0;
while $i < 10000 { $i = $i + 1 };
map { iterations: $i }`,
    expected: `iterations
----------
10000`,
  };

export const cfWhileCapNestedExample: CodeExample = {
    id: 'cf-while-cap-nested',
    title: 'Nested Loops Share One Budget',
    description: 'The inner loop never runs more than 100 iterations at a time, but the 200 x 100 inner iterations count against the outer loop and exceed 10,000: RUNTIME_006.',
    code: `let $outer = 0;
while $outer < 200 {
  $outer = $outer + 1;
  let $inner = 0;
  while $inner < 100 { $inner = $inner + 1 }
};
map { outer: $outer }`,
    expectsError: true,
  };

export const cfWhileCapSequentialExample: CodeExample = {
    id: 'cf-while-cap-sequential',
    title: 'Loops in Sequence Each Get Their Own',
    code: `let $a = 0;
while $a < 6000 { $a = $a + 1 };
let $b = 0;
while $b < 6000 { $b = $b + 1 };
map { a: $a, b: $b }`,
    expected: `a    | b
-----+-----
6000 | 6000`,
  };

export const rqlControlFlowWhileExamples: CodeExample[] = [
  cfWhileAccumulateExample,
  cfWhileZeroIterationsExample,
  cfWhileFlagExample,
  cfWhileNoneConditionExample,
  cfWhileBodyScopeExample,
  cfWhileNestedExample,
  cfWhileWriteExample,
  cfWhileUpdateExample,
  cfWhileRollbackSetupExample,
  cfWhileRollbackErrorExample,
  cfWhileRollbackVerifyExample,
  cfWhileCapExample,
  cfWhileCapExactExample,
  cfWhileCapNestedExample,
  cfWhileCapSequentialExample,
];
