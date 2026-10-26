import type { CodeExample } from '@/lib/examples/types';

export const refConsOptionalExample: CodeExample = {
    id: 'ref-cons-optional',
    title: 'Required and Optional Columns',
    code: `create namespace ref_cons;
create table ref_cons::items { id: int4, name: utf8, qty: Option(int4) };
insert ref_cons::items [
  { id: 1, name: "bolt", qty: 40 },
  { id: 2, name: "nut", qty: none },
  { id: 3, name: "washer" }
];
from ref_cons::items sort { id: asc }`,
    expected: `id | name   | qty    | #rownum
---+--------+--------+--------
1  | bolt   | 40     | 1
2  | nut    | ⟪none⟫ | 2
3  | washer | ⟪none⟫ | 3`,
  };

export const refConsNoneRejectedExample: CodeExample = {
    id: 'ref-cons-none-rejected',
    title: 'none Cannot Enter a Required Column',
    description: 'name is utf8, not Option(utf8); an explicit none fails with CONSTRAINT_007, exactly like leaving the field out.',
    code: `insert ref_cons::items [{ id: 4, name: none }]`,
    expectsError: true,
  };

export const refConsUpdateNoneRejectedExample: CodeExample = {
    id: 'ref-cons-update-none-rejected',
    title: 'update Is Checked the Same Way',
    description: 'Setting a required column to none in an update fails with CONSTRAINT_007.',
    code: `update ref_cons::items { name: none } filter { id == 1 }`,
    expectsError: true,
  };

export const refConsTypeMismatchExample: CodeExample = {
    id: 'ref-cons-type-mismatch',
    title: 'A Value That Cannot Become the Column Type',
    description: '"four" has no int4 reading, so the insert fails with CAST_002.',
    code: `insert ref_cons::items [{ id: "four", name: "gear" }]`,
    expectsError: true,
  };

export const refConsCoercionExample: CodeExample = {
    id: 'ref-cons-coercion',
    title: 'A Value That Can Become the Column Type Is Converted',
    code: `insert ref_cons::items [
  { id: "4", name: "gear" },
  { id: 5.9, name: "cog" }
];
from ref_cons::items sort { id: asc }`,
    expected: `id | name   | qty    | #rownum
---+--------+--------+--------
1  | bolt   | 40     | 1
2  | nut    | ⟪none⟫ | 2
3  | washer | ⟪none⟫ | 3
4  | gear   | ⟪none⟫ | 4
5  | cog    | ⟪none⟫ | 5`,
  };

export const refConsRangeExample: CodeExample = {
    id: 'ref-cons-range',
    title: 'A Value Inside the Type Range',
    code: `create table ref_cons::readings { id: int4, level: int1 };
insert ref_cons::readings [{ id: 1, level: 127 }]`,
    expected: `namespace | table    | inserted
----------+----------+---------
ref_cons  | readings | 1`,
  };

export const refConsRangeExceededExample: CodeExample = {
    id: 'ref-cons-range-exceeded',
    title: 'A Value Outside the Type Range',
    description: 'int1 holds -128 to 127; 300 fails with NUMBER_002.',
    code: `insert ref_cons::readings [{ id: 2, level: 300 }]`,
    expectsError: true,
  };

export const refConsMaxLengthExample: CodeExample = {
    id: 'ref-cons-max-length',
    title: 'A Byte-Length Limit on utf8',
    code: `create table ref_cons::codes { code: utf8(3) };
insert ref_cons::codes [{ code: "abc" }];
from ref_cons::codes`,
    expected: `code | #rownum
-----+--------
abc  | 1`,
  };

export const refConsMaxLengthExceededExample: CodeExample = {
    id: 'ref-cons-max-length-exceeded',
    title: 'Over the Limit',
    description: 'Four bytes into a utf8(3) column fails with CONSTRAINT_001.',
    code: `insert ref_cons::codes [{ code: "abcd" }]`,
    expectsError: true,
  };

export const refConsKeyOptionalExample: CodeExample = {
    id: 'ref-cons-key-optional',
    title: 'A Key Column Cannot Be Optional',
    code: `create table ref_cons::slots { id: Option(int4), label: utf8 };
create primary key on ref_cons::slots { id };
insert ref_cons::slots [{ label: "unassigned" }]`,
    expectsError: true,
  };

export const refConsKeyFreedExample: CodeExample = {
    id: 'ref-cons-key-freed',
    title: 'A Deleted Row Frees Its Key',
    code: `create table ref_cons::seats { seat_no: int4, holder: utf8 };
create primary key on ref_cons::seats { seat_no };
insert ref_cons::seats [{ seat_no: 1, holder: "ada" }];
delete ref_cons::seats filter { seat_no == 1 };
insert ref_cons::seats [{ seat_no: 1, holder: "grace" }];
from ref_cons::seats`,
    expected: `seat_no | holder | #rownum
--------+--------+--------
1       | grace  | 2`,
  };

export const refConsKeyCatalogExample: CodeExample = {
    id: 'ref-cons-key-catalog',
    title: 'Keys in the System Catalog',
    code: `from system::primary_key_columns`,
    expected: `primary_key_id | column_id | position
---------------+-----------+---------
16385          | 16479     | 0`,
  };

export const refConsSaturationNoneExample: CodeExample = {
    id: 'ref-cons-saturation-none',
    title: 'saturation: none Turns Overflow into none',
    code: `create table ref_cons::sensors { id: int4, level: Option(int1) };
create column property on ref_cons::sensors::level { saturation: none };
insert ref_cons::sensors [{ id: 1, level: 300 }, { id: 2, level: 5 }];
from ref_cons::sensors sort { id: asc }`,
    expected: `id | level  | #rownum
---+--------+--------
1  | ⟪none⟫ | 1
2  | 5      | 2`,
  };

export const refConsSaturationRequiresOptionExample: CodeExample = {
    id: 'ref-cons-saturation-requires-option',
    title: 'The Column Must Be Able to Hold none',
    description: 'level is a plain int1, so the none produced by the policy is rejected with CONSTRAINT_007.',
    code: `create table ref_cons::gauges { id: int4, level: int1 };
create column property on ref_cons::gauges::level { saturation: none };
insert ref_cons::gauges [{ id: 1, level: 300 }]`,
    expectsError: true,
  };

export const refConsPropertyCatalogExample: CodeExample = {
    id: 'ref-cons-property-catalog',
    title: 'Column Properties in the System Catalog',
    code: `from system::column_properties`,
    expected: `id    | column_id | type | value
------+-----------+------+------
16385 | 16482     | 1    | 2`,
  };

export const refConsUnknownPropertyExample: CodeExample = {
    id: 'ref-cons-unknown-property',
    title: 'unique Is Not a Column Property',
    description: 'The parser lists the accepted names in the AST_011 error: auto_increment, dictionary, saturation, default.',
    code: `create table ref_cons::bad { id: int4 with { unique } }`,
    expectsError: true,
  };

export const refConsDefaultRejectedExample: CodeExample = {
    id: 'ref-cons-default-rejected',
    title: 'default Is Rejected at Creation',
    code: `create table ref_cons::orders { id: int4, qty: int4 with { default: 1 } }`,
    expectsError: true,
  };

export const scriptingSchemaConstraintsExamples: CodeExample[] = [
  refConsOptionalExample,
  refConsNoneRejectedExample,
  refConsUpdateNoneRejectedExample,
  refConsTypeMismatchExample,
  refConsCoercionExample,
  refConsRangeExample,
  refConsRangeExceededExample,
  refConsMaxLengthExample,
  refConsMaxLengthExceededExample,
  refConsKeyOptionalExample,
  refConsKeyFreedExample,
  refConsKeyCatalogExample,
  refConsSaturationNoneExample,
  refConsSaturationRequiresOptionExample,
  refConsPropertyCatalogExample,
  refConsUnknownPropertyExample,
  refConsDefaultRejectedExample,
];
