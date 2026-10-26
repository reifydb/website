import type { CodeExample } from '@/lib/examples/types';

export const resErrorsSetupExample: CodeExample = {
    id: 'res-errors-setup',
    title: 'A Table to Fail Against',
    code: `create namespace res_err;
create table res_err::items { id: int4, name: utf8 };
insert res_err::items [{ id: 1, name: "a" }];
from res_err::items`,
    expected: `id | name | #rownum
---+------+--------
1  | a    | 1`,
  };

export const resErrorsParseExample: CodeExample = {
    id: 'res-errors-parse',
    title: 'AST_006: A Token RQL Does Not Have',
    description: '?? is not an RQL operator; the parser rejects it with AST_006 and points at the character.',
    code: `from res_err::items map { name ?? "none" }`,
    expectsError: true,
  };

export const resErrorsUpdateNoFilterExample: CodeExample = {
    id: 'res-errors-update-no-filter',
    title: 'UPDATE_003: A Mutation Without a Filter',
    description: 'update and delete refuse to run without filter; filter { true } is the explicit all-rows form.',
    code: `update res_err::items { name: "b" }`,
    expectsError: true,
  };

export const resErrorsCatalogExample: CodeExample = {
    id: 'res-errors-catalog',
    title: 'CA_004: An Object That Does Not Exist',
    code: `from res_err::nosuch`,
    expectsError: true,
  };

export const resErrorsCastExample: CodeExample = {
    id: 'res-errors-cast',
    title: 'CAST_002 Wrapping NUMBER_001',
    description: 'The cast fails, and the nested cause says why: the text is not a number.',
    code: `map { cast("abc", int4) }`,
    expectsError: true,
  };

export const resErrorsFunctionArgExample: CodeExample = {
    id: 'res-errors-function-arg',
    title: 'FUNCTION_004: The Wrong Argument Type',
    code: `map { text::upper(1) }`,
    expectsError: true,
  };

export const resErrorsConstraintExample: CodeExample = {
    id: 'res-errors-constraint',
    title: 'CONSTRAINT_007: none Into a Required Column',
    code: `insert res_err::items [{ id: 2, name: none }]`,
    expectsError: true,
  };

export const resErrorsQueryColumnExample: CodeExample = {
    id: 'res-errors-query-column',
    title: 'QUERY_001: A Column That Is Not There',
    code: `from res_err::items sort { nosuch: asc }`,
    expectsError: true,
  };

export const resErrorsViewSetupExample: CodeExample = {
    id: 'res-errors-view-setup',
    title: 'A View Over a Table',
    code: `create table res_err::orders { id: int4, total: float8 };
create view res_err::revenue { total: float8 } as {
  from res_err::orders
  aggregate { total: math::sum(total) } by {}
}`,
    expected: `id    | namespace | view    | created
------+-----------+---------+--------
16418 | res_err   | revenue | true`,
  };

export const resErrorsTxnViewReadExample: CodeExample = {
    id: 'res-errors-txn-view-read',
    title: 'TXN_015: Reading a View After Writing Its Source',
    description: 'The same request wrote the source table, so the view would be stale; the request fails and rolls back.',
    code: `insert res_err::orders [{ id: 1, total: 10.0 }];
from res_err::revenue`,
    expectsError: true,
  };

export const resErrorsDropInUseExample: CodeExample = {
    id: 'res-errors-drop-in-use',
    title: 'CA_035: A Table a View Still Reads',
    code: `drop table res_err::orders`,
    expectsError: true,
  };

export const resErrorsExamples: CodeExample[] = [
  resErrorsSetupExample,
  resErrorsParseExample,
  resErrorsUpdateNoFilterExample,
  resErrorsCatalogExample,
  resErrorsCastExample,
  resErrorsFunctionArgExample,
  resErrorsConstraintExample,
  resErrorsQueryColumnExample,
  resErrorsViewSetupExample,
  resErrorsTxnViewReadExample,
  resErrorsDropInUseExample,
];
