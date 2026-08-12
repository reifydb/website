import type { CodeExample } from '@/lib/examples/types';

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
    expected: `id | label
---+------
5  | low
15 | high`,
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
    expected: `val
---
1
2
3`,
  };

export const scriptingProceduresControlFlowExamples: CodeExample[] = [
  scriptingProcedureLetIfExample,
  scriptingProcedureWhileExample,
];
