import type { CodeExample } from '@/lib/examples/types';

export const matchValueExample: CodeExample = {
    id: 'match-value',
    title: 'Match a Column Against Values',
    code: `create namespace tf_match;
create table tf_match::orders { id: int4, region: utf8, total: int4, status: utf8 };
insert tf_match::orders [
  { id: 1, region: "North", total: 150, status: "paid" },
  { id: 2, region: "South", total: 80, status: "pending" },
  { id: 3, region: "East", total: 245, status: "paid" },
  { id: 4, region: "West", total: 55, status: "cancelled" }
];
from tf_match::orders
map {
  id,
  region,
  zone: match region { "North" => "Northern", "South" => "Southern", else => "Other" }
}`,
    expected: `id | region | zone     | #rownum
---+--------+----------+--------
4  | West   | Other    | 4
3  | East   | Other    | 3
2  | South  | Southern | 2
1  | North  | Northern | 1`,
  };

export const matchSearchedExample: CodeExample = {
    id: 'match-searched',
    title: 'Searched Match: Conditions in Order',
    code: `from tf_match::orders
map {
  id,
  total,
  size: match { total > 200 => "large", total > 100 => "medium", else => "small" }
}`,
    expected: `id | total | size   | #rownum
---+-------+--------+--------
4  | 55    | small  | 4
3  | 245   | large  | 3
2  | 80    | small  | 2
1  | 150   | medium | 1`,
  };

export const matchNoElseExample: CodeExample = {
    id: 'match-no-else',
    title: 'Without else, No Match Means none',
    code: `from tf_match::orders
map { id, status, settled: match status { "paid" => "yes" } }`,
    expected: `id | status    | settled | #rownum
---+-----------+---------+--------
4  | cancelled | ⟪none⟫  | 4
3  | paid      | yes     | 3
2  | pending   | ⟪none⟫  | 2
1  | paid      | yes     | 1`,
  };

export const matchGuardExample: CodeExample = {
    id: 'match-guard',
    title: 'Guard an Arm with if',
    code: `from tf_match::orders
map {
  id,
  region,
  total,
  bucket: match region {
    "North" if total > 100 => "big northern",
    "North" => "northern",
    else => "elsewhere"
  }
}`,
    expected: `id | region | total | bucket       | #rownum
---+--------+-------+--------------+--------
4  | West   | 55    | elsewhere    | 4
3  | East   | 245   | elsewhere    | 3
2  | South  | 80    | elsewhere    | 2
1  | North  | 150   | big northern | 1`,
  };

export const matchInFilterExample: CodeExample = {
    id: 'match-in-filter',
    title: 'A Boolean Match Inside filter',
    code: `from tf_match::orders
filter { match status { "paid" => true, "pending" => true, else => false } }
map { id, status }`,
    expected: `id | status  | #rownum
---+---------+--------
3  | paid    | 3
2  | pending | 2
1  | paid    | 1`,
  };

export const matchExtendThenFilterExample: CodeExample = {
    id: 'match-extend-then-filter',
    title: 'Classify with extend, Then Filter on the Label',
    code: `from tf_match::orders
extend { size: match { total > 100 => "big", else => "small" } }
filter { size == "big" }
map { id, total, size }`,
    expected: `id | total | size | #rownum
---+-------+------+--------
3  | 245   | big  | 3
1  | 150   | big  | 1`,
  };

export const matchNoneSubjectExample: CodeExample = {
    id: 'match-none-subject',
    title: 'A none Subject Never Matches a Value Arm',
    code: `create table tf_match::signups { id: int4, referrer: Option(utf8) };
insert tf_match::signups [
  { id: 1, referrer: "ads" },
  { id: 2 }
];
from tf_match::signups
map { id, source: match referrer { none => "direct", "ads" => "campaign", else => "unknown" } }`,
    expected: `id | source   | #rownum
---+----------+--------
2  | unknown  | 2
1  | campaign | 1`,
  };

export const matchNoneSearchedExample: CodeExample = {
    id: 'match-none-searched',
    title: 'Test for none with a Searched Arm',
    code: `from tf_match::signups
map { id, source: match { is::none(referrer) => "direct", else => "campaign" } }`,
    expected: `id | source   | #rownum
---+----------+--------
2  | direct   | 2
1  | campaign | 1`,
  };

export const matchStandaloneExample: CodeExample = {
    id: 'match-standalone',
    title: 'match as a Statement',
    code: `match { 5 > 3 => "big", else => "small" }`,
    expected: `value
-----
big`,
  };

export const rqlTransformsMatchExamples: CodeExample[] = [
  matchValueExample,
  matchSearchedExample,
  matchNoElseExample,
  matchGuardExample,
  matchInFilterExample,
  matchExtendThenFilterExample,
  matchNoneSubjectExample,
  matchNoneSearchedExample,
  matchStandaloneExample,
];
