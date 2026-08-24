import type { CodeExample } from '@/lib/examples/types';

export const tstAssertPipelineExample: CodeExample = {
    id: 'tst-assert-pipeline',
    title: 'assert Inside a Pipeline',
    code: `from [{ id: 1, qty: 4 }, { id: 2, qty: 7 }]
| assert { qty > 0 }
| map { id, doubled: qty * 2 }`,
    expected: `id | doubled
---+--------
1  | 8
2  | 14`,
  };

export const tstAssertStandaloneExample: CodeExample = {
    id: 'tst-assert-standalone',
    title: 'assert as a Statement',
    code: `assert { 1 + 1 == 2 } "arithmetic still works"`,
    expected: `(empty)`,
  };

export const tstAssertFailsExample: CodeExample = {
    id: 'tst-assert-fails',
    title: 'A Failing Assertion Is an Error',
    description: 'The row has qty 0, so the assertion fails with the message you supplied; the whole request rolls back.',
    code: `from [{ id: 1, qty: 0 }]
| assert { qty > 0 } "every line needs a quantity"`,
    expectsError: true,
  };

export const tstCreateExample: CodeExample = {
    id: 'tst-create',
    title: 'Define a Test',
    code: `create namespace tst;
create table tst::items { id: int4, name: utf8 };
insert tst::items [{ id: 1, name: "Widget" }, { id: 2, name: "Gadget" }];
create test tst::items_have_ids {
  from tst::items | assert { id > 0 }
}`,
    expected: `test           | created
---------------+--------
items_have_ids | true`,
  };

export const tstCreateSecondExample: CodeExample = {
    id: 'tst-create-second',
    title: 'Define Another',
    code: `create test tst::widget_is_first {
  from tst::items | filter { name == "Widget" } | assert { id == 1 }
}`,
    expected: `test            | created
----------------+--------
widget_is_first | true`,
  };

export const tstRunExample: CodeExample = {
    id: 'tst-run',
    title: 'Run Every Test in a Namespace',
    code: `run tests tst | map { name, namespace, outcome, message }`,
    expected: `name            | namespace | outcome | message
----------------+-----------+---------+--------
items_have_ids  | tst       | pass    |
widget_is_first | tst       | pass    |`,
  };

export const tstRunSingleExample: CodeExample = {
    id: 'tst-run-single',
    title: 'Run One Test',
    code: `run test tst::widget_is_first | map { name, outcome }`,
    expected: `name            | outcome
----------------+--------
widget_is_first | pass`,
  };

export const tstOutcomesExample: CodeExample = {
    id: 'tst-outcomes',
    title: 'pass, fail, and error',
    code: `create test tst::wrong_count {
  from tst::items
  | aggregate { n: math::count(id) } by {}
  | assert { n == 3 } "expected three items"
};
create test tst::missing_table {
  from tst::nope
};
run tests tst | map { name, outcome }`,
    expected: `name            | outcome
----------------+--------
items_have_ids  | pass
missing_table   | error
widget_is_first | pass
wrong_count     | fail`,
  };

export const tstFailMessageExample: CodeExample = {
    id: 'tst-fail-message',
    title: 'A Failure Carries Its Message',
    code: `run test tst::wrong_count | map { name, outcome, message }`,
    expected: `name        | outcome | message
------------+---------+---------------------
wrong_count | fail    | expected three items`,
  };

export const tstIsolationTestExample: CodeExample = {
    id: 'tst-isolation-test',
    title: 'Writes Are Visible Inside the Test',
    code: `create test tst::writes_are_visible {
  insert tst::items [{ id: 3, name: "Gizmo" }];
  from tst::items | aggregate { n: math::count(id) } by {} | assert { n == 3 }
};
run test tst::writes_are_visible | map { name, outcome, message }`,
    expected: `name               | outcome | message
-------------------+---------+--------
writes_are_visible | pass    |`,
  };

export const tstIsolationCheckExample: CodeExample = {
    id: 'tst-isolation-check',
    title: 'And Gone Once It Finishes',
    code: `from tst::items`,
    expected: `id | name
---+-------
2  | Gadget
1  | Widget`,
  };

export const tstProcedureExample: CodeExample = {
    id: 'tst-procedure',
    title: 'A Test Procedure for Shared Setup',
    code: `create test procedure tst::seed_gizmo as {
  insert tst::items [{ id: 3, name: "Gizmo" }]
}`,
    expected: `procedure  | created
-----------+--------
seed_gizmo | true`,
  };

export const tstProcedureUseExample: CodeExample = {
    id: 'tst-procedure-use',
    title: 'Call It from a Test',
    code: `create test tst::seeded_count {
  call tst::seed_gizmo();
  from tst::items | aggregate { n: math::count(id) } by {} | assert { n == 3 }
};
run test tst::seeded_count | map { name, outcome, message }`,
    expected: `name         | outcome | message
-------------+---------+--------
seeded_count | pass    |`,
  };

export const tstProcedureOutsideExample: CodeExample = {
    id: 'tst-procedure-outside',
    title: 'Test Procedures Only Run Inside Tests',
    description: 'Calling a test procedure from an ordinary request fails with PROCEDURE_001.',
    code: `call tst::seed_gizmo()`,
    expectsError: true,
  };

export const tstParameterizedExample: CodeExample = {
    id: 'tst-parameterized',
    title: 'One Body, Many Cases',
    code: `create test tst::square [
  { x: 1, expected: 1 },
  { x: 2, expected: 4 },
  { x: 3, expected: 9 }
] {
  assert { $x * $x == $expected }
};
run test tst::square | map { name, outcome }`,
    expected: `name                     | outcome
-------------------------+--------
square [expected=1, x=1] | pass
square [expected=4, x=2] | pass
square [expected=9, x=3] | pass`,
  };

export const tstAssertErrorExample: CodeExample = {
    id: 'tst-assert-error',
    title: 'Expect a Block to Fail',
    code: `assert error {
  insert tst::nonexistent [{ id: 1 }]
} "inserting into a missing table must fail"`,
    expected: `(empty)`,
  };

export const tstAssertErrorCaptureExample: CodeExample = {
    id: 'tst-assert-error-capture',
    title: 'Capture the Error and Inspect It',
    code: `let $err = assert error { insert tst::nonexistent [{ id: 1 }] };
map { code: $err.code, message: $err.message }`,
    expected: `code   | message
-------+-----------------------------------
CA_004 | table \`tst::nonexistent\` not found`,
  };

export const tstAssertErrorNoErrorExample: CodeExample = {
    id: 'tst-assert-error-no-error',
    title: 'A Block That Succeeds Fails the Assertion',
    description: 'assert error is itself an assertion: if the block runs cleanly, it fails with "expected error but block succeeded".',
    code: `assert error { let $x = 1 }`,
    expectsError: true,
  };

export const tstChangedExample: CodeExample = {
    id: 'tst-changed',
    title: 'Inspect What the Test Wrote',
    code: `create test tst::tracks_insert {
  insert tst::items [{ id: 9, name: "Probe" }];
  testing::tables::changed("tst::items")
  | assert { op == "insert" }
  | assert { new_name == "Probe" }
};
run test tst::tracks_insert | map { name, outcome, message }`,
    expected: `name          | outcome | message
--------------+---------+--------
tracks_insert | pass    |`,
  };

export const tstDropExample: CodeExample = {
    id: 'tst-drop',
    title: 'Drop a Test',
    code: `drop test tst::missing_table`,
    expected: `namespace | test          | dropped
----------+---------------+--------
tst       | missing_table | true`,
  };

export const tstReplaceExample: CodeExample = {
    id: 'tst-replace',
    title: 'Re-Creating a Test Replaces Its Body',
    code: `create test tst::wrong_count { assert { true } };
run test tst::wrong_count | map { name, outcome }`,
    expected: `name        | outcome
------------+--------
wrong_count | pass`,
  };

export const scriptingTestingOverviewExamples: CodeExample[] = [
  tstAssertPipelineExample,
  tstAssertStandaloneExample,
  tstAssertFailsExample,
  tstCreateExample,
  tstCreateSecondExample,
  tstRunExample,
  tstRunSingleExample,
  tstOutcomesExample,
  tstFailMessageExample,
  tstIsolationTestExample,
  tstIsolationCheckExample,
  tstProcedureExample,
  tstProcedureUseExample,
  tstProcedureOutsideExample,
  tstParameterizedExample,
  tstAssertErrorExample,
  tstAssertErrorCaptureExample,
  tstAssertErrorNoErrorExample,
  tstChangedExample,
  tstDropExample,
  tstReplaceExample,
];
