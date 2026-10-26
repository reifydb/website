import type { CodeExample } from '@/lib/examples/types';

export const dtScalarExample: CodeExample = {
    id: 'dt-scalar',
    title: 'Numbers, Text, and Booleans',
    code: `create namespace cpt_dt;
create table cpt_dt::items {
  id: int4,
  qty: uint2,
  price: float8,
  exact: decimal,
  name: utf8,
  ok: bool
};
insert cpt_dt::items [
  { id: 1, qty: 3, price: 19.99, exact: 10.5, name: "Widget", ok: true }
];
from cpt_dt::items`,
    expected: `id | qty | price | exact         | name   | ok   | #rownum
---+-----+-------+---------------+--------+------+--------
1  | 3   | 19.99 | 10.5000000000 | Widget | true | 1`,
  };

export const dtTemporalExample: CodeExample = {
    id: 'dt-temporal',
    title: 'Temporal Columns and Literals',
    code: `create table cpt_dt::events {
  day: date,
  at: datetime,
  tod: time,
  span: duration
};
insert cpt_dt::events [
  { day: @2024-03-15, at: @2024-03-15T14:30:00Z, tod: @14:30:00, span: cast("P1DT2H30M", duration) }
];
from cpt_dt::events`,
    expected: `day        | at                             | tod                | span    | #rownum
-----------+--------------------------------+--------------------+---------+--------
2024-03-15 | 2024-03-15T14:30:00.000000000Z | 14:30:00.000000000 | 1d2h30m | 1`,
  };

export const dtIdsBlobExample: CodeExample = {
    id: 'dt-ids-blob',
    title: 'UUIDs and Binary Data',
    code: `create table cpt_dt::assets { ref: uuid4, raw: blob };
insert cpt_dt::assets [
  { ref: cast("550e8400-e29b-41d4-a716-446655440000", uuid4), raw: blob::hex("48656c6c6f") }
];
from cpt_dt::assets map { ref, raw, ref_type: meta::type(ref) }`,
    expected: `ref                                  | raw          | ref_type | #rownum
-------------------------------------+--------------+----------+--------
550e8400-e29b-41d4-a716-446655440000 | 0x48656c6c6f | Uuid4    | 1`,
  };

export const dtLiteralTypesExample: CodeExample = {
    id: 'dt-literal-types',
    title: 'What Type a Literal Gets',
    code: `map {
  small: meta::type(42),
  million: meta::type(1_000_000),
  big: meta::type(3_000_000_000),
  fraction: meta::type(4.2),
  text: meta::type("x"),
  flag: meta::type(true),
  day: meta::type(@2024-03-15),
  missing: meta::type(none)
}`,
    expected: `small | million | big  | fraction      | text | flag    | day  | missing
------+---------+------+---------------+------+---------+------+------------
Int1  | Int4    | Int8 | Decimal(2, 1) | Utf8 | Boolean | Date | Option(Any)`,
  };

export const dtRangeErrorExample: CodeExample = {
    id: 'dt-range-error',
    title: 'A Value Outside the Column Range Is Rejected',
    description: 'int1 holds -128 to 127. The insert fails with NUMBER_002 and the whole request rolls back, table included.',
    code: `create table cpt_dt::tiny { v: int1 };
insert cpt_dt::tiny [{ v: 128 }]`,
    expectsError: true,
  };

export const dtBigIntExample: CodeExample = {
    id: 'dt-big-int',
    title: 'The Widest Fixed Sizes',
    code: `create table cpt_dt::wide { v: int16, w: uint16 };
insert cpt_dt::wide [
  {
    v: -170_141_183_460_469_231_731_687_303_715_884_105_728,
    w: 340_282_366_920_938_463_463_374_607_431_768_211_455
  }
];
from cpt_dt::wide`,
    expected: `v                                        | w                                       | #rownum
-----------------------------------------+-----------------------------------------+--------
-170141183460469231731687303715884105728 | 340282366920938463463374607431768211455 | 1`,
  };

export const dtWideningExample: CodeExample = {
    id: 'dt-widening',
    title: 'Arithmetic Widens the Result Type',
    code: `map {
  sum: cast(127, int1) + cast(1, int1),
  sum_type: meta::type(cast(127, int1) + cast(1, int1)),
  int4_int4: meta::type(cast(1, int4) + cast(1, int4)),
  int4_int8: meta::type(cast(1, int4) + cast(1, int8)),
  uint4_int4: meta::type(cast(1, uint4) + cast(1, int4)),
  int4_float4: meta::type(cast(1, int4) + cast(1.5, float4)),
  int4_decimal: meta::type(cast(1, int4) + 1.5)
}`,
    expected: `sum | sum_type | int4_int4 | int4_int8 | uint4_int4 | int4_float4 | int4_decimal
----+----------+-----------+-----------+------------+-------------+---------------
128 | Int2     | Int8      | Int16     | Int8       | Float8      | Decimal(12, 1)`,
  };

export const dtFloatDecimalExample: CodeExample = {
    id: 'dt-float-decimal',
    title: 'Decimal Is Exact, float4 Is Not',
    code: `map {
  exact: 0.1 + 0.2,
  exact_type: meta::type(0.1 + 0.2),
  f4_doubled: cast(19.99, float4) * 2,
  f8_doubled: cast(19.99, float8) * 2
}`,
    expected: `exact | exact_type    | f4_doubled       | f8_doubled
------+---------------+------------------+-----------
0.3   | Decimal(2, 1) | 39.9799995422363 | 39.98`,
  };

export const dtInsertCoercionExample: CodeExample = {
    id: 'dt-insert-coercion',
    title: 'Inserts Convert Values to the Column Type',
    code: `create table cpt_dt::coerce { n: int4, s: utf8 };
insert cpt_dt::coerce [
  { n: "7", s: 42 },
  { n: 2.9, s: "x" }
];
from cpt_dt::coerce`,
    expected: `n | s  | #rownum
--+----+--------
2 | x  | 2
7 | 42 | 1`,
  };

export const dtCastExample: CodeExample = {
    id: 'dt-cast',
    title: 'Explicit Conversion with cast',
    code: `map {
  day: cast("2024-03-15", date),
  tod: cast("14:30:00", time),
  span: cast("P10D", duration),
  truncated: cast(3.7, int4),
  from_text: cast("true", bool),
  from_number: cast(1, bool)
}`,
    expected: `day        | tod                | span | truncated | from_text | from_number
-----------+--------------------+------+-----------+-----------+------------
2024-03-15 | 14:30:00.000000000 | 10d  | 3         | true      | true`,
  };

export const dtCastErrorExample: CodeExample = {
    id: 'dt-cast-error',
    title: 'A Cast That Cannot Parse Fails',
    description: 'Text that is not a number fails with CAST_002, wrapping the underlying NUMBER_001 diagnostic.',
    code: `map { x: cast("abc", int4) }`,
    expectsError: true,
  };

export const dtOptionExample: CodeExample = {
    id: 'dt-option',
    title: 'Option(T) Columns Hold none',
    code: `create table cpt_dt::notes { id: int4, note: Option(utf8) };
insert cpt_dt::notes [{ id: 1 }, { id: 2, note: "hi" }];
from cpt_dt::notes map { id, note, note_type: meta::type(note), id_type: meta::type(id) }`,
    expected: `id | note   | note_type    | id_type | #rownum
---+--------+--------------+---------+--------
2  | hi     | Option(Utf8) | Int4    | 2
1  | ⟪none⟫ | Option(Utf8) | Int4    | 1`,
  };

export const dtStringConcatExample: CodeExample = {
    id: 'dt-string-concat',
    title: 'Text Concatenation Converts the Other Side',
    code: `map { label: "id-" + 42, flag: "ok=" + true }`,
    expected: `label | flag
------+--------
id-42 | ok=true`,
  };

export const architectureTypesExamples: CodeExample[] = [
  dtScalarExample,
  dtTemporalExample,
  dtIdsBlobExample,
  dtLiteralTypesExample,
  dtRangeErrorExample,
  dtBigIntExample,
  dtWideningExample,
  dtFloatDecimalExample,
  dtInsertCoercionExample,
  dtCastExample,
  dtCastErrorExample,
  dtOptionExample,
  dtStringConcatExample,
];
