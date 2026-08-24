import type { CodeExample } from '@/lib/examples/types';

export const scriptingBindExample: CodeExample = {
    id: 'scripting-bind',
    title: 'Bind Values and Compute with Them',
    code: `let $rate = 0.2;
let $price = 50;
let $total = $price * (1 + $rate);
map { price: $price, total: $total }`,
    expected: `price | total
------+------
50    | 60.0`,
  };

export const scriptingLoopWriteExample: CodeExample = {
    id: 'scripting-loop-write',
    title: 'Read, Decide, Write - in One Request',
    code: `create namespace scr;
create table scr::orders { id: int4, total: int4 };
create table scr::flagged { id: int4, total: int4 };
insert scr::orders [
  { id: 1, total: 40 },
  { id: 2, total: 250 },
  { id: 3, total: 120 }
];
let $rows = from scr::orders;
for $row in $rows {
  if $row.total > 100 {
    insert scr::flagged [{ id: $row.id, total: $row.total }]
  }
};
from scr::flagged sort { id: asc }`,
    expected: `id | total
---+------
2  | 250
3  | 120`,
  };

export const scriptingAssertExample: CodeExample = {
    id: 'scripting-assert',
    title: 'Assert an Invariant',
    code: `from scr::flagged
| assert { total > 100 } "only large orders are flagged"
| map { id, total }`,
    expected: `id | total
---+------
2  | 250
3  | 120`,
  };

export const scriptingTestExample: CodeExample = {
    id: 'scripting-test',
    title: 'Keep the Check as a Test',
    code: `create test scr::flags_only_large {
  from scr::flagged | assert { total > 100 }
};
run tests scr | map { name, outcome }`,
    expected: `name             | outcome
-----------------+--------
flags_only_large | pass`,
  };

export const scriptingMigrationExample: CodeExample = {
    id: 'scripting-migration',
    title: 'Ship Schema Changes as a Migration',
    code: `create migration '001_scr_archive' {
  create table scr::archive { id: int4, total: int4 }
};
migrate`,
    expected: `migrations_applied
------------------
1`,
  };

export const scriptingOverviewExamples: CodeExample[] = [
  scriptingBindExample,
  scriptingLoopWriteExample,
  scriptingAssertExample,
  scriptingTestExample,
  scriptingMigrationExample,
];
