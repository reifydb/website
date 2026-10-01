import type { CodeExample } from '@/lib/examples/types';

export const spCfPositionalExample: CodeExample = {
    id: 'sp-cf-positional',
    title: 'Arguments Bind by Position',
    code: `create namespace sp_cf;
create procedure sp_cf::scale { n: int4, factor: int4 } as {
  map { scaled: $n * $factor }
};
call sp_cf::scale(4, 3)`,
    expected: `scaled
------
12`,
  };

export const spCfMissingArgExample: CodeExample = {
    id: 'sp-cf-missing-arg',
    title: 'A Missing Argument Is an Undefined Variable',
    description: 'The call itself is accepted; the body fails with RUNTIME_001 the moment it reads the unbound parameter.',
    code: `call sp_cf::scale(4)`,
    expectsError: true,
  };

export const scriptingProcedureLetIfExample: CodeExample = {
    id: 'scripting-procedure-let-if',
    title: 'Control Flow in Procedures',
    code: `CREATE NAMESPACE pr_cf;
CREATE TABLE pr_cf::results { id: int4, label: utf8 };
CREATE PROCEDURE pr_cf::classify { val: int4 } AS {
  LET $label = IF $val > 10 { 'high' } ELSE { 'low' };
  INSERT pr_cf::results [{ id: $val, label: $label }]
};
CALL pr_cf::classify(5);
CALL pr_cf::classify(15);
FROM pr_cf::results
sort { id: asc }`,
    expected: `id | label | #rownum
---+-------+--------
5  | low   | 1
15 | high  | 2`,
  };

export const spCfElseIfExample: CodeExample = {
    id: 'sp-cf-else-if',
    title: 'Chain Conditions with else if',
    code: `create procedure sp_cf::tier { total: int4 } as {
  let $tier = if $total > 1000 { "gold" } else if $total > 100 { "silver" } else { "bronze" };
  map { total: $total, tier: $tier }
};
call sp_cf::tier(500)`,
    expected: `total | tier
------+-------
500   | silver`,
  };

export const spCfGuardExample: CodeExample = {
    id: 'sp-cf-guard',
    title: 'An if Statement Guards a Write',
    code: `create table sp_cf::audit { n: int4 };
create procedure sp_cf::record_positive { n: int4 } as {
  if $n > 0 { insert sp_cf::audit [{ n: $n }] };
  from sp_cf::audit sort { n: asc }
};
call sp_cf::record_positive(-5);
call sp_cf::record_positive(7)`,
    expected: `n | #rownum
--+--------
7 | 1`,
  };

export const scriptingProcedureWhileExample: CodeExample = {
    id: 'scripting-procedure-while',
    title: 'While Loop in Procedure',
    code: `CREATE NAMESPACE pr_w;
CREATE TABLE pr_w::numbers { val: int4 };
CREATE PROCEDURE pr_w::fill AS {
  LET $i = 1;
  WHILE $i <= 3 {
    INSERT pr_w::numbers [{ val: $i }];
    $i = $i + 1;
  }
};
CALL pr_w::fill();
FROM pr_w::numbers
sort { val: asc }`,
    expected: `val | #rownum
----+--------
1   | 1
2   | 2
3   | 3`,
  };

export const spCfForSeriesExample: CodeExample = {
    id: 'sp-cf-for-series',
    title: 'A Parameter Bounds a for Loop',
    code: `create table sp_cf::slots { slot: int4 };
create procedure sp_cf::reserve { count: int4 } as {
  for $i in gen::series(1, $count) { insert sp_cf::slots [{ slot: $i }] };
  from sp_cf::slots sort { slot: asc }
};
call sp_cf::reserve(3)`,
    expected: `slot | #rownum
-----+--------
1    | 1
2    | 2
3    | 3`,
  };

export const spCfForFrameExample: CodeExample = {
    id: 'sp-cf-for-frame',
    title: 'Walk a Query Result Captured in the Body',
    code: `create table sp_cf::lines { qty: int4, price: int4 };
insert sp_cf::lines [{ qty: 2, price: 10 }, { qty: 1, price: 25 }];
create procedure sp_cf::order_total as {
  let $rows = from sp_cf::lines;
  let $total = 0;
  for $row in $rows { $total = $total + $row.qty * $row.price };
  map { total: $total }
};
call sp_cf::order_total()`,
    expected: `total
-----
45`,
  };

export const spCfContinueExample: CodeExample = {
    id: 'sp-cf-continue',
    title: 'continue Skips an Iteration',
    code: `create procedure sp_cf::odd_sum { upto: int4 } as {
  let $i = 0;
  let $sum = 0;
  while $i < $upto {
    $i = $i + 1;
    if $i % 2 == 0 { continue };
    $sum = $sum + $i
  };
  map { odd_sum: $sum }
};
call sp_cf::odd_sum(5)`,
    expected: `odd_sum
-------
9`,
  };

export const spCfReturnEarlyExample: CodeExample = {
    id: 'sp-cf-return-early',
    title: 'return Leaves the Body from Anywhere',
    code: `create procedure sp_cf::first_square_over { limit: int4 } as {
  let $i = 0;
  while $i < 100 {
    $i = $i + 1;
    if $i * $i > $limit { return $i }
  };
  map { none_found: true }
};
call sp_cf::first_square_over(50)`,
    expected: `i
-
8`,
  };

export const spCfReturnVoidExample: CodeExample = {
    id: 'sp-cf-return-void',
    title: 'A Bare return Yields value: none',
    code: `create procedure sp_cf::record_if_valid { n: int4 } as {
  if $n < 0 { return };
  insert sp_cf::audit [{ n: $n }]
};
call sp_cf::record_if_valid(-1)`,
    expected: `value
------
⟪none⟫`,
  };

export const spCfReturnFrameExample: CodeExample = {
    id: 'sp-cf-return-frame',
    title: 'return Carries a Scalar, Not a Frame',
    description: 'Returning a variable that holds a query result fails with RUNTIME_002; end the body with the query instead.',
    code: `create procedure sp_cf::all_lines as {
  let $rows = from sp_cf::lines;
  return $rows
};
call sp_cf::all_lines()`,
    expectsError: true,
  };

export const spCfAssertExample: CodeExample = {
    id: 'sp-cf-assert',
    title: 'assert Validates Before the Write',
    code: `create procedure sp_cf::reserve_checked { count: int4 } as {
  from sp_cf::slots assert { slot < $count } "count must exceed every reserved slot";
  insert sp_cf::slots [{ slot: $count }]
};
call sp_cf::reserve_checked(10)`,
    expected: `namespace | table | inserted
----------+-------+---------
sp_cf     | slots | 1`,
  };

export const spCfAssertFailsExample: CodeExample = {
    id: 'sp-cf-assert-fails',
    title: 'A Failed Assertion Fails the Call',
    description: 'Slot 2 is already reserved, so the assertion is false and the call fails with ASSERT before the insert runs.',
    code: `call sp_cf::reserve_checked(2)`,
    expectsError: true,
  };

export const spCfLoopCallExample: CodeExample = {
    id: 'sp-cf-loop-call',
    title: 'Call a Procedure per Row from a Script',
    code: `let $rows = from sp_cf::lines;
for $row in $rows { call sp_cf::record_positive($row.qty) };
from sp_cf::audit sort { n: asc }`,
    expected: `n | #rownum
--+--------
1 | 2
2 | 3
7 | 1`,
  };

export const scriptingProceduresControlFlowExamples: CodeExample[] = [
  spCfPositionalExample,
  spCfMissingArgExample,
  scriptingProcedureLetIfExample,
  spCfElseIfExample,
  spCfGuardExample,
  scriptingProcedureWhileExample,
  spCfForSeriesExample,
  spCfForFrameExample,
  spCfContinueExample,
  spCfReturnEarlyExample,
  spCfReturnVoidExample,
  spCfReturnFrameExample,
  spCfAssertExample,
  spCfAssertFailsExample,
  spCfLoopCallExample,
];
