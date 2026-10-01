import type { CodeExample } from '@/lib/examples/types';

export const castStringToIntExample: CodeExample = {
  id: 'cast-string-to-int',
  title: 'Text to a Number',
  code: `map { cast("42", int4) }`,
  expected: `cast("42", int4)
----------------
42`,
};

export const castFloatTruncatesExample: CodeExample = {
  id: 'cast-float-truncates',
  title: 'Float to Integer Truncates Toward Zero',
  code: `map { up: cast(3.9, int4), down: cast(-3.9, int4) }`,
  expected: `up | down
---+-----
3  | -3`,
};

export const castStringToTemporalExample: CodeExample = {
  id: 'cast-string-to-temporal',
  title: 'Text to date and datetime',
  code: `map { day: cast("2024-03-15", date), at: cast("2024-03-15T10:30:00", datetime) }`,
  expected: `day        | at
-----------+-------------------------------
2024-03-15 | 2024-03-15T10:30:00.000000000Z`,
};

export const castToBoolExample: CodeExample = {
  id: 'cast-to-bool',
  title: 'Text and 0/1 to bool',
  code: `map { a: cast("true", bool), b: cast(0, bool) }`,
  expected: `a    | b
-----+------
true | false`,
};

export const castColumnExample: CodeExample = {
  id: 'cast-column',
  title: 'Cast a Column',
  code: `create namespace tf_cast;
create table tf_cast::imports { id: int4, qty: utf8, price: float8 };
insert tf_cast::imports [
  { id: 1, qty: "12", price: 2.5 },
  { id: 2, qty: " 7 ", price: 4.0 },
  { id: 3, qty: "3.9", price: 1.25 }
];
from tf_cast::imports
map { id, qty: cast(qty, int4), id_text: cast(id, utf8) }`,
  expected: `id | qty | id_text | #rownum
---+-----+---------+--------
3  | 3   | 3       | 3
2  | 7   | 2       | 2
1  | 12  | 1       | 1`,
};

export const castInFilterExample: CodeExample = {
  id: 'cast-in-filter',
  title: 'cast Inside a Filter Condition',
  code: `from tf_cast::imports
filter { cast(qty, int4) >= 7 }
map { id, qty: cast(qty, int4) }`,
  expected: `id | qty | #rownum
---+-----+--------
2  | 7   | 2
1  | 12  | 1`,
};

export const castInArithmeticExample: CodeExample = {
  id: 'cast-in-arithmetic',
  title: 'Cast Before You Multiply',
  code: `from tf_cast::imports
map { id, total: cast(qty, float8) * price }`,
  expected: `id | total | #rownum
---+-------+--------
3  | 4.875 | 3
2  | 28    | 2
1  | 30    | 1`,
};

export const castInInsertExample: CodeExample = {
  id: 'cast-in-insert',
  title: 'cast in an Insert Payload',
  code: `create table tf_cast::shipments { id: int4, shipped: date };
insert tf_cast::shipments [
  { id: 1, shipped: cast("2024-05-01", date) },
  { id: 2, shipped: cast("2024-05-03", date) }
];
from tf_cast::shipments`,
  expected: `id | shipped    | #rownum
---+------------+--------
2  | 2024-05-03 | 2
1  | 2024-05-01 | 1`,
};

export const castNoneExample: CodeExample = {
  id: 'cast-none',
  title: 'none Passes Through',
  code: `create table tf_cast::readings { id: int4, raw: Option(utf8) };
insert tf_cast::readings [
  { id: 1, raw: "21.5" },
  { id: 2 }
];
from tf_cast::readings
map { id, temp: cast(raw, float8) }`,
  expected: `id | temp   | #rownum
---+--------+--------
2  | ⟪none⟫ | 2
1  | 21.5   | 1`,
};

export const castInvalidNumberExample: CodeExample = {
  id: 'cast-invalid-number',
  title: 'A Value That Does Not Parse',
  code: `map { cast("abc", int4) }`,
  expectsError: true,
};

export const castOutOfRangeExample: CodeExample = {
  id: 'cast-out-of-range',
  title: 'A Value That Does Not Fit',
  code: `map { cast(300, int1) }`,
  expectsError: true,
};

export const castWholeStatementFailsExample: CodeExample = {
  id: 'cast-whole-statement-fails',
  title: 'One Bad Row Fails the Statement',
  code: `insert tf_cast::readings [{ id: 3, raw: "n/a" }];
from tf_cast::readings
map { id, temp: cast(raw, float8) }`,
  expectsError: true,
};

export const castUnsupportedPairExample: CodeExample = {
  id: 'cast-unsupported-pair',
  title: 'An Unsupported Type Pair',
  code: `map { cast(true, date) }`,
  expectsError: true,
};

export const castFloat4NoiseExample: CodeExample = {
  id: 'cast-float4-noise',
  title: 'Widening a float4 Exposes Its Precision',
  code: `from app::orders
filter { id == 2 }
map { total, widened: cast(total, float8) }`,
  expected: `total | widened          | #rownum
------+------------------+--------
89.99 | 89.9899978637695 | 2`,
};

export const castExamples: CodeExample[] = [
  castStringToIntExample,
  castFloatTruncatesExample,
  castStringToTemporalExample,
  castToBoolExample,
  castColumnExample,
  castInFilterExample,
  castInArithmeticExample,
  castInInsertExample,
  castNoneExample,
  castInvalidNumberExample,
  castOutOfRangeExample,
  castWholeStatementFailsExample,
  castUnsupportedPairExample,
  castFloat4NoiseExample,
];
