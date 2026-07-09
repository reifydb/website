import type { CodeExample } from '@/lib/examples/types';

export const scriptingProceduresControlFlowExamples: CodeExample[] = [
{
    id: 'scripting-procedure-let-if',
    title: 'Control Flow in Procedures',
    category: 'scripting',
    code: `CREATE NAMESPACE pr_cf;
CREATE TABLE pr_cf::results { id: int4, label: utf8 };
CREATE PROCEDURE pr_cf::classify { val: int4 } AS {
  LET label = IF $val > 10 { 'high' } ELSE { 'low' };
  INSERT pr_cf::results [{ id: $val, label: $label }]
};
CALL pr_cf::classify(5);
CALL pr_cf::classify(15);
FROM pr_cf::results`,
    expected: `id | label
---+------
5  | low
15 | high`,
  },
{
    id: 'scripting-procedure-while',
    title: 'While Loop in Procedure',
    category: 'scripting',
    code: `CREATE NAMESPACE pr_w;
CREATE TABLE pr_w::numbers { val: int4 };
CREATE PROCEDURE pr_w::fill AS {
  LET MUT i = 1;
  WHILE $i <= 3 {
    INSERT pr_w::numbers [{ val: $i }];
    LET i = $i + 1;
  }
};
CALL pr_w::fill();
FROM pr_w::numbers`,
    expected: `val
---
1
2
3`,
  },
];
