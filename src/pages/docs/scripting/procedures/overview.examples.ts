import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateProcedureExample: CodeExample = {
    id: 'scripting-create-procedure',
    title: 'Create Procedure',
    code: `CREATE NAMESPACE pr;
CREATE PROCEDURE pr::hello AS {
  MAP { greeting: 'hello world' }
};
CALL pr::hello()`,
    expected: `greeting
-----------
hello world`,
  };

export const scriptingProcedureParamsExample: CodeExample = {
    id: 'scripting-procedure-params',
    title: 'Procedure Parameters',
    code: `CREATE NAMESPACE pr_p;
CREATE TABLE pr_p::users { id: int4, name: utf8 };
CREATE PROCEDURE pr_p::add_user { id: int4, name: utf8 } AS {
  INSERT pr_p::users [{ id: $id, name: $name }]
};
CALL pr_p::add_user(1, 'Alice');
CALL pr_p::add_user(2, 'Bob');
FROM pr_p::users
sort { id: asc }`,
    expected: `id | name
---+------
1  | Alice
2  | Bob`,
  };

export const spOvArgumentsExample: CodeExample = {
    id: 'sp-ov-arguments',
    title: 'Arguments Are Expressions',
    code: `create namespace sp_ov;
create table sp_ov::log { note: utf8, level: int4 };
create procedure sp_ov::log_at { note: utf8, level: int4 } as {
  insert sp_ov::log [{ note: $note, level: $level }]
};
let $base = 10;
call sp_ov::log_at("boot", $base);
call sp_ov::log_at("ready", $base + 5);
from sp_ov::log sort { level: asc }`,
    expected: `note  | level
------+------
boot  | 10
ready | 15`,
  };

export const spOvOptionParamExample: CodeExample = {
    id: 'sp-ov-option-param',
    title: 'Optional Parameters Accept none',
    code: `create procedure sp_ov::greet { name: Option(utf8) } as {
  map { name: $name }
};
call sp_ov::greet(none)`,
    expected: `name
------
⟪none⟫`,
  };

export const spOvLastStatementExample: CodeExample = {
    id: 'sp-ov-last-statement',
    title: 'A Call Returns the Last Statement\'s Result',
    code: `create procedure sp_ov::recent { min_level: int4 } as {
  from sp_ov::log filter { level >= $min_level } sort { level: desc }
};
call sp_ov::recent(12)`,
    expected: `note  | level
------+------
ready | 15`,
  };

export const spOvWriteResultExample: CodeExample = {
    id: 'sp-ov-write-result',
    title: 'A Write as the Last Statement Returns Its Confirmation',
    code: `call sp_ov::log_at("shutdown", 20)`,
    expected: `namespace | table | inserted
----------+-------+---------
sp_ov     | log   | 1`,
  };

export const spOvReturningExample: CodeExample = {
    id: 'sp-ov-returning',
    title: 'Hand Rows Back with returning',
    code: `create procedure sp_ov::relabel { old: utf8, new: utf8 } as {
  update sp_ov::log { note: $new } filter { note == $old } returning { note, level }
};
call sp_ov::relabel("boot", "start")`,
    expected: `note  | level
------+------
start | 10`,
  };

export const spOvNoResultExample: CodeExample = {
    id: 'sp-ov-no-result',
    title: 'No Result Means value: none',
    code: `create procedure sp_ov::noop as {
  let $unused = 1
};
call sp_ov::noop()`,
    expected: `value
------
⟪none⟫`,
  };

export const spOvPipelineExample: CodeExample = {
    id: 'sp-ov-pipeline',
    title: 'Pipelines Inside a Body Chain Stages with Whitespace',
    code: `create procedure sp_ov::summary as {
  from sp_ov::log aggregate { entries: math::count(level) } by {}
};
call sp_ov::summary()`,
    expected: `entries
-------
3`,
  };

export const spOvPipeRejectedExample: CodeExample = {
    id: 'sp-ov-pipe-rejected',
    title: 'The | Form Is Rejected Inside a Body',
    description: 'A procedure body does not accept the pipe separator; the create fails to parse with AST_006.',
    code: `create procedure sp_ov::broken as {
  from sp_ov::log | filter { level > 0 }
}`,
    expectsError: true,
  };

export const spOvBadBatchCreateExample: CodeExample = {
    id: 'sp-ov-bad-batch-create',
    title: 'The Body Is Compiled When Called, Not When Created',
    code: `create procedure sp_ov::bad_batch as {
  insert sp_ov::log [{ note: "first", level: 1 }];
  insert sp_ov::log [{ note: "second", level: "high" }]
}`,
    expected: `procedure | created
----------+--------
bad_batch | true`,
  };

export const spOvBadBatchCallExample: CodeExample = {
    id: 'sp-ov-bad-batch-call',
    title: 'A Failure Anywhere in the Body Fails the Call',
    description: 'The second insert cannot cast "high" to int4 (CAST_002); the call fails and rolls back.',
    code: `call sp_ov::bad_batch()`,
    expectsError: true,
  };

export const spOvBadBatchVerifyExample: CodeExample = {
    id: 'sp-ov-bad-batch-verify',
    title: 'The First Insert Was Rolled Back Too',
    code: `from sp_ov::log filter { note == "first" }`,
    expected: `(empty)`,
  };

export const spOvDuplicateExample: CodeExample = {
    id: 'sp-ov-duplicate',
    title: 'A Name Can Only Be Defined Once',
    description: 'Re-creating an existing procedure fails with CA_080; there is no if not exists form.',
    code: `create procedure sp_ov::recent as {
  map { replaced: true }
}`,
    expectsError: true,
  };

export const spOvRedefineExample: CodeExample = {
    id: 'sp-ov-redefine',
    title: 'Redefine by Dropping and Re-creating in One Request',
    code: `drop procedure sp_ov::noop;
create procedure sp_ov::noop as {
  map { status: "noop v2" }
};
call sp_ov::noop()`,
    expected: `status
-------
noop v2`,
  };

export const spOvDropExample: CodeExample = {
    id: 'sp-ov-drop',
    title: 'Drop a Procedure',
    code: `drop procedure sp_ov::bad_batch`,
    expected: `namespace | procedure | dropped
----------+-----------+--------
sp_ov     | bad_batch | true`,
  };

export const spOvDropIfExistsExample: CodeExample = {
    id: 'sp-ov-drop-if-exists',
    title: 'drop if exists Reports What It Found',
    code: `drop procedure if exists sp_ov::bad_batch`,
    expected: `namespace | procedure | dropped
----------+-----------+--------
sp_ov     | bad_batch | false`,
  };

export const spOvCallDroppedExample: CodeExample = {
    id: 'sp-ov-call-dropped',
    title: 'Calling an Unknown Procedure',
    description: 'A call to a name that does not exist, or was dropped, fails with PROCEDURE_001.',
    code: `call sp_ov::bad_batch()`,
    expectsError: true,
  };

export const spOvNotAFunctionExample: CodeExample = {
    id: 'sp-ov-not-a-function',
    title: 'A Procedure Is Not a Function',
    description: 'Procedures cannot be used inside expressions; the engine looks for a function and fails with FUNCTION_001.',
    code: `map { latest: sp_ov::recent(1) }`,
    expectsError: true,
  };

export const spOvTestProcedureExample: CodeExample = {
    id: 'sp-ov-test-procedure',
    title: 'Test Procedures Only Run Inside Tests',
    description: 'A test procedure called from an ordinary request fails with PROCEDURE_001.',
    code: `create test procedure sp_ov::seed as {
  insert sp_ov::log [{ note: "seed", level: 0 }]
};
call sp_ov::seed()`,
    expectsError: true,
  };

export const scriptingProceduresOverviewExamples: CodeExample[] = [
  scriptingCreateProcedureExample,
  scriptingProcedureParamsExample,
  spOvArgumentsExample,
  spOvOptionParamExample,
  spOvLastStatementExample,
  spOvWriteResultExample,
  spOvReturningExample,
  spOvNoResultExample,
  spOvPipelineExample,
  spOvPipeRejectedExample,
  spOvBadBatchCreateExample,
  spOvBadBatchCallExample,
  spOvBadBatchVerifyExample,
  spOvDuplicateExample,
  spOvRedefineExample,
  spOvDropExample,
  spOvDropIfExistsExample,
  spOvCallDroppedExample,
  spOvNotAFunctionExample,
  spOvTestProcedureExample,
];
