import type { CodeExample } from '@/lib/examples/types';

export const rqlControlFlowConditionalsExamples: CodeExample[] = [
{
    id: 'cf-if-expression',
    title: 'if as an Expression',
    category: 'rql',
    code: `let $stock = 4;
let $status = if $stock == 0 { "out of stock" } else { "in stock" };
map { stock: $stock, status: $status }`,
    expected: `stock | status
------+---------
4     | in stock`,
  },
{
    id: 'cf-if-else-if',
    title: 'Chain Conditions with else if',
    category: 'rql',
    code: `let $latency = 250;
let $rating = if $latency < 100 { "fast" }
  else if $latency < 500 { "acceptable" }
  else { "slow" };
map { latency: $latency, rating: $rating }`,
    expected: `latency | rating
--------+-----------
250     | acceptable`,
  },
{
    id: 'cf-if-no-else',
    title: 'No else, No Match: the Result Is none',
    category: 'rql',
    code: `let $temp = 18;
let $warning = if $temp > 30 { "overheating" };
map { temp: $temp, warning: $warning }`,
    expected: `temp | warning
-----+--------
18   | ⟪none⟫`,
  },
{
    id: 'cf-if-guard-write',
    title: 'Guard a Write with if',
    category: 'rql',
    code: `create namespace cf_if;
create table cf_if::audit { event: utf8 };
let $dry_run = false;
if not $dry_run {
  insert cf_if::audit [{ event: "deploy" }]
};
from cf_if::audit`,
    expected: `event
------
deploy`,
  },
{
    id: 'cf-if-branch-shapes',
    // Note: branches here emit map projections directly. In the current WASM
    // build a `from ... map` pipeline inside an if branch drops the map's
    // computed columns (engine limitation), so avoid that shape.
    title: 'Branches Can Produce Different Results',
    category: 'rql',
    code: `let $verbose = true;
if $verbose {
  map { event: "deploy", detail: "full record" }
} else {
  map { event: "deploy" }
}`,
    expected: `event  | detail
-------+------------
deploy | full record`,
  },
{
    id: 'cf-if-reassign',
    title: 'Reassign an Outer Variable from a Branch',
    category: 'rql',
    code: `let $queue = 12;
let $action = "pending";
if $queue > 10 { $action = "scale up" } else { $action = "hold" };
map { queue: $queue, action: $action }`,
    expected: `queue | action
------+---------
12    | scale up`,
  },
];
