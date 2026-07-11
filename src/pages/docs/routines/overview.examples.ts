import type { CodeExample } from '@/lib/examples/types';

export const routinesOverviewExamples: CodeExample[] = [
{
    id: 'routines-overview-function-call',
    title: 'Functions Compute Values in Expressions',
    category: 'concept',
    code: `MAP {
  distance: math::abs(-42),
  label: text::upper('reify')
}`,
    expected: `distance | label
---------+------
42       | REIFY`,
  },
{
    id: 'routines-overview-procedure-roundtrip',
    title: 'Procedures Run Statements with CALL',
    category: 'concept',
    code: `CREATE NAMESPACE rt_ov;
CREATE TABLE rt_ov::audit { note: utf8 };
CREATE PROCEDURE rt_ov::log { note: utf8 } AS {
  INSERT rt_ov::audit [{ note: $note }]
};
CALL rt_ov::log('first entry');
CALL rt_ov::log('second entry');
FROM rt_ov::audit
SORT { note: asc }`,
    expected: `note
------------
first entry
second entry`,
  },
];
