import type { CodeExample } from '@/lib/examples/types';

export const rqlControlFlowMatchExamples: CodeExample[] = [
{
    id: 'cf-match-value',
    title: 'Match a Value Against Literal Arms',
    category: 'rql',
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
  },
{
    id: 'cf-match-searched',
    title: 'Match on Conditions',
    category: 'rql',
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
  },
{
    id: 'cf-match-first-wins',
    title: 'The First True Arm Wins',
    description: 'Arms are checked top to bottom. 120 satisfies both conditions, but the broader one is listed first and shadows the other - order arms from most to least specific.',
    category: 'rql',
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
  },
{
    id: 'cf-match-rows',
    title: 'Classify Rows in a Pipeline',
    category: 'rql',
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
  },
{
    id: 'cf-match-none-arm',
    title: 'A none Arm Never Matches',
    description: 'Value-match arms compare by equality, and equality against none never produces true - the "missing" arm is dead code, and the none row falls through to else.',
    category: 'rql',
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
  },
{
    id: 'cf-match-none-guard',
    title: 'Test for none with a Searched Arm',
    category: 'rql',
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
  },
];
