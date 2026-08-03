import type { CodeExample } from '@/lib/examples/types';

export const cfIfExpressionExample: CodeExample = {
    id: 'cf-if-expression',
    title: 'if as an Expression',
    category: 'rql',
    code: `let $stock = 4;
let $status = if $stock == 0 { "out of stock" } else { "in stock" };
map { stock: $stock, status: $status }`,
    expected: `stock | status
------+---------
4     | in stock`,
  };

export const cfIfElseIfExample: CodeExample = {
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
  };

export const cfIfNoElseExample: CodeExample = {
    id: 'cf-if-no-else',
    title: 'No else, No Match: the Result Is none',
    category: 'rql',
    code: `let $temp = 18;
let $warning = if $temp > 30 { "overheating" };
map { temp: $temp, warning: $warning }`,
    expected: `temp | warning
-----+--------
18   | ⟪none⟫`,
  };

export const cfIfGuardWriteExample: CodeExample = {
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
  };

export const rqlControlFlowConditionalsExamples: CodeExample[] = [
  cfIfExpressionExample,
  cfIfElseIfExample,
  cfIfNoElseExample,
  cfIfGuardWriteExample,
];
