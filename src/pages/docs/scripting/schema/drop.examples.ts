import type { CodeExample } from '@/lib/examples/types';

export const sdSetupExample: CodeExample = {
    id: 'sd-setup',
    title: 'A Table to Drop',
    code: `create namespace sd;
create table sd::sessions { id: int4, user: utf8 };
insert sd::sessions [
  { id: 1, user: "ada" },
  { id: 2, user: "grace" }
]`,
    expected: `namespace | table    | inserted
----------+----------+---------
sd        | sessions | 2`,
  };

export const sdDropTableExample: CodeExample = {
    id: 'sd-drop-table',
    title: 'Drop the Table',
    code: `drop table sd::sessions`,
    expected: `namespace | table    | dropped
----------+----------+--------
sd        | sessions | true`,
  };

export const sdQueryDroppedExample: CodeExample = {
    id: 'sd-query-dropped',
    title: 'The Table Is Gone',
    description: 'Referencing a dropped table fails with CA_004, the same error as a table that never existed.',
    code: `from sd::sessions`,
    expectsError: true,
  };

export const sdRecreateExample: CodeExample = {
    id: 'sd-recreate',
    title: 'Recreating the Table Does Not Bring the Data Back',
    code: `create table sd::sessions { id: int4, user: utf8 };
from sd::sessions`,
    expected: `(empty)`,
  };

export const sdDropViewExample: CodeExample = {
    id: 'sd-drop-view',
    title: 'Drop a View',
    code: `create deferred view sd::recent { id: int4 } as { from sd::sessions };
drop view sd::recent`,
    expected: `namespace | view   | dropped
----------+--------+--------
sd        | recent | true`,
  };

export const sdDropDictionaryExample: CodeExample = {
    id: 'sd-drop-dictionary',
    title: 'Drop a Dictionary',
    code: `create dictionary sd::tags for utf8 as int4;
drop dictionary sd::tags`,
    expected: `namespace | dictionary | dropped
----------+------------+--------
sd        | tags       | true`,
  };

export const sdDropSeriesExample: CodeExample = {
    id: 'sd-drop-series',
    title: 'Drop a Series',
    code: `create series sd::metrics { ts: datetime, value: float8 } with { key: ts };
drop series sd::metrics`,
    expected: `namespace | series  | dropped
----------+---------+--------
sd        | metrics | true`,
  };

export const sdDropRingbufferExample: CodeExample = {
    id: 'sd-drop-ringbuffer',
    title: 'Drop a Ring Buffer',
    code: `create ringbuffer sd::events { id: int4 } with { capacity: 8 };
drop ringbuffer sd::events`,
    expected: `namespace | ringbuffer | dropped
----------+------------+--------
sd        | events     | true`,
  };

export const sdDropEnumExample: CodeExample = {
    id: 'sd-drop-enum',
    title: 'Drop an Enum',
    code: `create enum sd::status { Open, Closed };
drop enum sd::status`,
    expected: `namespace | enum   | dropped
----------+--------+--------
sd        | status | true`,
  };

export const sdDropIfExistsExample: CodeExample = {
    id: 'sd-drop-if-exists',
    title: 'if exists Makes a Drop Safe to Re-Run',
    code: `drop table if exists sd::archive`,
    expected: `namespace | table   | dropped
----------+---------+--------
sd        | archive | false`,
  };

export const sdDropMissingErrorExample: CodeExample = {
    id: 'sd-drop-missing-error',
    title: 'Without the Guard, a Missing Object Is an Error',
    description: 'Dropping a table that does not exist fails with CA_004.',
    code: `drop table sd::archive`,
    expectsError: true,
  };

export const sdIfExistsNamespaceCaveatExample: CodeExample = {
    id: 'sd-if-exists-namespace-caveat',
    title: 'if exists Does Not Guard the Namespace',
    description: 'The guard covers the object, not its namespace. A missing namespace still fails with CA_002.',
    code: `drop table if exists sd_ghost::sessions`,
    expectsError: true,
  };

export const sdDropNamespaceExample: CodeExample = {
    id: 'sd-drop-namespace',
    title: 'Dropping a Namespace Takes Everything Inside It',
    code: `create namespace sd_tmp;
create namespace sd_tmp::jobs;
create table sd_tmp::queue { id: int4 };
insert sd_tmp::queue [{ id: 1 }];
drop namespace sd_tmp`,
    expected: `namespace | dropped
----------+--------
sd_tmp    | true`,
  };

export const sdNamespaceGoneExample: CodeExample = {
    id: 'sd-namespace-gone',
    title: 'The Contents Went with It',
    description: 'The table inside the dropped namespace is gone; the reference fails with CA_002.',
    code: `from sd_tmp::queue`,
    expectsError: true,
  };

export const sdDropNamespaceIfExistsExample: CodeExample = {
    id: 'sd-drop-namespace-if-exists',
    title: 'drop namespace if exists',
    code: `drop namespace if exists sd_tmp`,
    expected: `namespace | dropped
----------+--------
sd_tmp    | false`,
  };

export const scriptingSchemaDropExamples: CodeExample[] = [
  sdSetupExample,
  sdDropTableExample,
  sdQueryDroppedExample,
  sdRecreateExample,
  sdDropViewExample,
  sdDropDictionaryExample,
  sdDropSeriesExample,
  sdDropRingbufferExample,
  sdDropEnumExample,
  sdDropIfExistsExample,
  sdDropMissingErrorExample,
  sdIfExistsNamespaceCaveatExample,
  sdDropNamespaceExample,
  sdNamespaceGoneExample,
  sdDropNamespaceIfExistsExample,
];
