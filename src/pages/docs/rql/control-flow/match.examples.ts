import type { CodeExample } from '@/lib/examples/types';

export const cfMatchValueExample: CodeExample = {
    id: 'cf-match-value',
    title: 'Match a Value Against Literal Arms',
    code: `let $plan = "pro";
let $seats = match $plan {
  "free" => 1,
  "pro" => 10,
  else => 100
};
map { plan: $plan, seats: $seats }`,
    expected: `plan | seats
-----+------
pro  | 10`,
  };

export const cfMatchSearchedExample: CodeExample = {
    id: 'cf-match-searched',
    title: 'Match on Conditions',
    code: `let $temp = 78;
let $status = match {
  $temp > 90 => "critical",
  $temp > 70 => "warning",
  else => "normal"
};
map { temp: $temp, status: $status }`,
    expected: `temp | status
-----+--------
78   | warning`,
  };

export const cfMatchFirstWinsExample: CodeExample = {
    id: 'cf-match-first-wins',
    title: 'The First True Arm Wins',
    description: 'Arms are checked top to bottom. 120 satisfies both conditions, but the broader one is listed first and shadows the other - order arms from most to least specific.',
    code: `let $v = 120;
let $bucket = match {
  $v > 50 => "over 50",
  $v > 100 => "over 100",
  else => "small"
};
map { bucket: $bucket }`,
    expected: `bucket
-------
over 50`,
  };

export const cfMatchRowsExample: CodeExample = {
    id: 'cf-match-rows',
    title: 'Classify Rows in a Pipeline',
    code: `from [
  { id: 1, amount: 1200 },
  { id: 2, amount: 300 },
  { id: 3, amount: 40 }
]
map { id, tier: match {
  amount >= 1000 => "gold",
  amount >= 100 => "silver",
  else => "bronze"
} }
sort { id: asc }`,
    expected: `id | tier
---+-------
1  | gold
2  | silver
3  | bronze`,
  };

export const cfMatchNoneArmExample: CodeExample = {
    id: 'cf-match-none-arm',
    title: 'A none Arm Never Matches',
    description: 'Value-match arms compare by equality, and equality against none never produces true - the "missing" arm is dead code, and the none row falls through to else.',
    code: `from [
  { id: 1, score: 90 },
  { id: 2, score: none }
]
map { id, grade: match score { none => "missing", else => "graded" } }
sort { id: asc }`,
    expected: `id | grade
---+-------
1  | graded
2  | graded`,
  };

export const cfMatchNoneGuardExample: CodeExample = {
    id: 'cf-match-none-guard',
    title: 'Test for none with a Searched Arm',
    code: `from [
  { id: 1, score: 90 },
  { id: 2, score: none }
]
map { id, grade: match {
  is::none(score) => "missing",
  else => "graded"
} }
sort { id: asc }`,
    expected: `id | grade
---+--------
1  | graded
2  | missing`,
  };

export const cfMatchGuardExample: CodeExample = {
    id: 'cf-match-guard',
    title: 'Guard an Arm with if',
    description: 'The guarded 500 arm is skipped because no retries are left, and the plain 500 arm below it wins.',
    code: `let $code = 500;
let $retries = 0;
let $action = match $code {
  404 => "give up",
  500 if $retries > 0 => "retry",
  500 => "fail",
  else => "ok"
};
map { code: $code, action: $action }`,
    expected: `code | action
-----+-------
500  | fail`,
  };

export const cfMatchExpressionsExample: CodeExample = {
    id: 'cf-match-expressions',
    title: 'Subjects and Patterns Are Expressions',
    code: `let $total = 120;
let $paid = 90;
let $credit = 30;
let $state = match $total - $paid {
  0 => "settled",
  $credit => "covered by credit",
  else => "open"
};
map { due: $total - $paid, state: $state }`,
    expected: `due | state
----+------------------
30  | covered by credit`,
  };

export const cfMatchNoElseExample: CodeExample = {
    id: 'cf-match-no-else',
    title: 'No else, No Match: the Result Is none',
    code: `let $day = 6;
let $name = match $day { 1 => "mon", 2 => "tue" };
map { day: $day, name: $name }`,
    expected: `day | name
----+-------
6   | ⟪none⟫`,
  };

export const cfMatchLazyArmsExample: CodeExample = {
    id: 'cf-match-lazy-arms',
    title: 'Only the Chosen Arm Is Evaluated',
    description: 'The else arm would fail with CAST_002 if it ran. It never runs, because the first arm matched.',
    code: `let $v = 1;
let $r = match $v { 1 => "one", else => cast("x", int4) };
map { r: $r }`,
    expected: `r
---
one`,
  };

export const cfMatchAssignArmExample: CodeExample = {
    id: 'cf-match-assign-arm',
    title: 'An Arm Cannot Assign',
    description: 'Arm results are expressions; an assignment in an arm fails with AST_006. Bind the match with let and assign the result instead.',
    code: `let $label = "";
let $v = 2;
match $v { 1 => $label = "one", else => $label = "other" };
map { label: $label }`,
    expectsError: true,
  };

export const cfMatchTypeMismatchExample: CodeExample = {
    id: 'cf-match-type-mismatch',
    title: 'Arms Must Be Comparable with the Subject',
    description: 'A text pattern against an integer subject fails with OPERATOR_022: arms are compared with ==, which is only defined between compatible types.',
    code: `let $v = 2;
let $r = match $v { "a" => 1, 2 => 2, else => 0 };
map { r: $r }`,
    expectsError: true,
  };

export const cfMatchResultExample: CodeExample = {
    id: 'cf-match-result',
    title: 'A match as the Request Result',
    code: `let $plan = "team";
match $plan { "free" => 1, "pro" => 10, else => 100 }`,
    expected: `value
-----
100`,
  };

export const rqlControlFlowMatchExamples: CodeExample[] = [
  cfMatchValueExample,
  cfMatchSearchedExample,
  cfMatchFirstWinsExample,
  cfMatchGuardExample,
  cfMatchExpressionsExample,
  cfMatchRowsExample,
  cfMatchNoElseExample,
  cfMatchLazyArmsExample,
  cfMatchAssignArmExample,
  cfMatchTypeMismatchExample,
  cfMatchNoneArmExample,
  cfMatchNoneGuardExample,
  cfMatchResultExample,
];
