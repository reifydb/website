import type { CodeExample } from '@/lib/examples/types';

export const insCreateExample: CodeExample = {
    id: 'scripting-insert-single',
    title: 'Insert a Single Row',
    code: `create namespace ins;
create table ins::users { id: int4, name: utf8, active: bool };
insert ins::users [{ id: 1, name: "ada", active: true }]`,
    expected: `namespace | table | inserted
----------+-------+---------
ins       | users | 1`,
  };

export const insMultiRowExample: CodeExample = {
    id: 'scripting-insert-multi-row',
    title: 'Insert Many Rows in One Statement',
    code: `insert ins::users [
  { id: 2, name: "grace", active: true },
  { id: 3, name: "alan", active: false }
]`,
    expected: `namespace | table | inserted
----------+-------+---------
ins       | users | 2`,
  };

export const insScanExample: CodeExample = {
    id: 'scripting-insert-scan',
    title: 'All Rows Are There',
    code: `from ins::users sort { id: asc }`,
    expected: `id | name  | active
---+-------+-------
1  | ada   | true
2  | grace | true
3  | alan  | false`,
  };

export const insReturningExample: CodeExample = {
    id: 'scripting-insert-returning',
    title: 'Get the Inserted Rows Back',
    code: `insert ins::users [{ id: 4, name: "edsger", active: true }]
returning { id, name }`,
    expected: `id | name
---+-------
4  | edsger`,
  };

export const insAutoIncrementExample: CodeExample = {
    id: 'scripting-insert-auto-increment',
    title: 'Auto-Increment Assigns the ID',
    code: `create table ins::tickets { id: int8 with { auto_increment }, title: utf8 };
insert ins::tickets [{ title: "first" }, { title: "second" }]
returning { id, title }`,
    expected: `id | title
---+-------
1  | first
2  | second`,
  };

export const insOptionalExample: CodeExample = {
    id: 'scripting-insert-optional',
    title: 'Optional Columns Default to none',
    code: `create table ins::contacts { id: int4, name: utf8, email: Option(utf8) };
insert ins::contacts [
  { id: 1, name: "ada", email: "ada@example.com" },
  { id: 2, name: "grace", email: none },
  { id: 3, name: "alan" }
];
from ins::contacts sort { id: asc }`,
    expected: `id | name  | email
---+-------+----------------
1  | ada   | ada@example.com
2  | grace | ⟪none⟫
3  | alan  | ⟪none⟫`,
  };

export const insMissingRequiredExample: CodeExample = {
    id: 'scripting-insert-missing-required',
    title: 'A Required Column Cannot Be Omitted',
    description: 'name is not Option(utf8), so leaving it out fails with CONSTRAINT_007 and nothing is inserted.',
    code: `insert ins::contacts [{ id: 4 }]`,
    expectsError: true,
  };

export const insTypeMismatchExample: CodeExample = {
    id: 'scripting-insert-type-mismatch',
    title: 'Values Are Type-Checked on Insert',
    description: 'A string that is not a number cannot become an int4, so the insert fails with CAST_002.',
    code: `insert ins::users [{ id: "oops", name: "x", active: true }]`,
    expectsError: true,
  };

export const insRingbufferExample: CodeExample = {
    id: 'scripting-insert-ringbuffer',
    title: 'Insert into a Ring Buffer',
    code: `create ringbuffer ins::events { kind: utf8, detail: utf8 } with { capacity: 3 };
insert ins::events [
  { kind: "click", detail: "signup" },
  { kind: "view", detail: "pricing" }
]`,
    expected: `namespace | ringbuffer | inserted
----------+------------+---------
ins       | events     | 2`,
  };

export const insSeriesExample: CodeExample = {
    id: 'scripting-insert-series',
    title: 'Insert into a Series',
    code: `create series ins::readings { ts: datetime, value: float8 } with { key: ts };
insert ins::readings [{ ts: datetime::from_epoch_millis(1000), value: 21.5 }]`,
    expected: `namespace | series   | inserted
----------+----------+---------
ins       | readings | 1`,
  };

export const insDictionaryExample: CodeExample = {
    id: 'scripting-insert-dictionary',
    title: 'Insert into a Dictionary',
    code: `create dictionary ins::countries for utf8 as uint2;
insert ins::countries [{ value: "de" }, { value: "jp" }]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
ins       | countries  | 1  | de
ins       | countries  | 2  | jp`,
  };

export const insDictionaryDedupeExample: CodeExample = {
    id: 'scripting-insert-dictionary-dedupe',
    title: 'Dictionaries Deduplicate',
    description: 'Re-inserting an existing value returns its existing id instead of creating a new entry.',
    code: `insert ins::countries [{ value: "de" }]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
ins       | countries  | 1  | de`,
  };

export const scriptingDmlInsertExamples: CodeExample[] = [
  insCreateExample,
  insMultiRowExample,
  insScanExample,
  insReturningExample,
  insAutoIncrementExample,
  insOptionalExample,
  insMissingRequiredExample,
  insTypeMismatchExample,
  insRingbufferExample,
  insSeriesExample,
  insDictionaryExample,
  insDictionaryDedupeExample,
];
