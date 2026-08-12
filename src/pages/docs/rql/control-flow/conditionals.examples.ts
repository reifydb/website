import type { CodeExample } from '@/lib/examples/types';

export const cfIfExpressionExample: CodeExample = {
    id: 'cf-if-expression',
    title: 'if as an Expression',
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

export const cfIfBranchShapesExample: CodeExample = {
    id: 'cf-if-branch-shapes',
    title: 'Branches Can Produce Different Shapes',
    code: `let $currency = "USD";
if $currency == "USD" {
  map { amount: 100, currency: $currency }
} else {
  map { amount_local: 100, rate: 1.0 }
}`,
    expected: `amount | currency
-------+---------
100    | USD`,
  };

export const cfIfReassignExample: CodeExample = {
    id: 'cf-if-reassign',
    title: 'Reassign an Outer Variable in a Branch',
    code: `let $total = 0;
let $tier = "premium";
if $tier == "premium" {
  $total = 120;
} else {
  $total = 10;
};
map { tier: $tier, total: $total }`,
    expected: `tier    | total
--------+------
premium | 120`,
  };

export const rqlControlFlowConditionalsExamples: CodeExample[] = [
  cfIfExpressionExample,
  cfIfElseIfExample,
  cfIfNoElseExample,
  cfIfGuardWriteExample,
  cfIfBranchShapesExample,
  cfIfReassignExample,
];
