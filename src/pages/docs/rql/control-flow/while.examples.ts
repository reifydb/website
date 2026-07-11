import type { CodeExample } from '@/lib/examples/types';

export const rqlControlFlowWhileExamples: CodeExample[] = [
{
    id: 'cf-while-accumulate',
    title: 'Repeat Until a Condition Flips',
    category: 'rql',
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
  },
{
    id: 'cf-while-zero-iterations',
    title: 'The Condition Is Checked Before the First Run',
    category: 'rql',
    code: `let $runs = 0;
while false { $runs = $runs + 1 };
map { runs: $runs }`,
    expected: `runs
----
0`,
  },
{
    id: 'cf-while-write',
    title: 'A while Loop That Writes Rows',
    category: 'rql',
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
  },
{
    id: 'cf-while-cap',
    title: 'Runaway Loops Are Stopped',
    description: 'A loop that never terminates fails once it exceeds the 10,000-iteration limit, and the whole request rolls back.',
    category: 'rql',
    code: `let $spins = 0;
while true { $spins = $spins + 1 }`,
    expectsError: true,
  },
];
