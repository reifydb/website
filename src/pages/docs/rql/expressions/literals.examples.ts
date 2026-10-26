import type { CodeExample } from '@/lib/examples/types';

export const litNumericExample: CodeExample = {
    id: 'literals-numeric',
    title: 'Numeric Literals',
    code: `map {
  int: 42,
  negative: -7,
  grouped: 1_000_000,
  decimal: 3.5,
  exponent: 2.5e3,
  fraction: .5
}`,
    expected: `int | negative | grouped | decimal | exponent | fraction
----+----------+---------+---------+----------+---------
42  | -7       | 1000000 | 3.5     | 2500     | 0.5`,
  };

export const litNumericTypesExample: CodeExample = {
    id: 'literals-numeric-types',
    title: 'A Literal Takes the Smallest Type That Fits',
    code: `map {
  small: meta::type(42),
  medium: meta::type(1_000),
  large: meta::type(100_000),
  huge: meta::type(9_223_372_036_854_775_807),
  decimal: meta::type(3.5),
  exponent: meta::type(1e3)
}`,
    expected: `small | medium | large | huge | decimal       | exponent
------+--------+-------+------+---------------+--------------
Int1  | Int2   | Int4  | Int8 | Decimal(2, 1) | Decimal(4, 0)`,
  };

export const litDecimalExactExample: CodeExample = {
    id: 'literals-decimal-exact',
    title: 'Decimal Literals Are Exact',
    code: `map {
  sum: 0.1 + 0.2,
  equal: 0.1 + 0.2 == 0.3,
  scaled: 1.10 * 3,
  price: 2.50 + 2.50
}`,
    expected: `sum | equal | scaled | price
----+-------+--------+------
0.3 | true  | 3.30   | 5.00`,
  };

export const litRangeExample: CodeExample = {
    id: 'literals-range',
    title: 'A Literal Must Fit Its Column',
    description: 'int1 holds -128..127, so inserting 300 fails with NUMBER_002 and the whole request rolls back.',
    code: `create namespace lit;
create table lit::readings { id: int1, value: float8 };
insert lit::readings [{ id: 300, value: 1.5 }]`,
    expectsError: true,
  };

export const litTextExample: CodeExample = {
    id: 'literals-text',
    title: 'Text Literals',
    code: `map {
  double: "double quotes",
  single: 'single quotes',
  apostrophe: "it's",
  quoted: 'say "hi"',
  backslash: "C:\\temp\\new"
}`,
    expected: `double        | single        | apostrophe | quoted   | backslash
--------------+---------------+------------+----------+------------
double quotes | single quotes | it's       | say "hi" | C:\\temp\\new`,
  };

export const litTextConcatExample: CodeExample = {
    id: 'literals-text-concat',
    title: 'Concatenation with +',
    code: `from [{ name: "Alice", n: 3 }]
map {
  greeting: "Hello, " + name + "!",
  count: n + " items",
  digits: "5" + 5,
  length: text::length(name)
}`,
    expected: `greeting      | count   | digits | length
--------------+---------+--------+-------
Hello, Alice! | 3 items | 55     | 5`,
  };

export const litBooleanExample: CodeExample = {
    id: 'literals-boolean',
    title: 'Boolean Literals',
    code: `from [{ id: 1, age: 20 }]
map { id, enabled: true, archived: false, adult: age >= 18 }`,
    expected: `id | enabled | archived | adult
---+---------+----------+------
1  | true    | false    | true`,
  };

export const litNoneExample: CodeExample = {
    id: 'literals-none',
    title: 'The none Literal',
    code: `from [{ id: 1, note: none }, { id: 2, note: "call back" }]
map {
  id,
  note,
  has_note: is::some(note),
  compared: note == none
}`,
    expected: `id | note      | has_note | compared
---+-----------+----------+---------
1  | ⟪none⟫    | false    | ⟪none⟫
2  | call back | true     | ⟪none⟫`,
  };

export const litListExample: CodeExample = {
    id: 'literals-list',
    title: 'List Literals',
    code: `from [{ region: "North" }, { region: "West" }]
map {
  region,
  target: region in ["North", "East"],
  other: region not in ["North", "East"],
  values: [1, 2, 3]
}`,
    expected: `region | target | other | values
-------+--------+-------+----------
North  | true   | false | [1, 2, 3]
West   | false  | true  | [1, 2, 3]`,
  };

export const litTemporalExample: CodeExample = {
    id: 'literals-temporal',
    title: 'Temporal Literals',
    code: `map {
  day: @2024-03-15,
  clock: @14:30:00,
  instant: @2024-03-15T14:30:00Z,
  span: @P1Y2M,
  short_span: @PT2H30M
}`,
    expected: `day        | clock              | instant                        | span  | short_span
-----------+--------------------+--------------------------------+-------+-----------
2024-03-15 | 14:30:00.000000000 | 2024-03-15T14:30:00.000000000Z | 1y2mo | 2h30m`,
  };

export const litTemporalTypesExample: CodeExample = {
    id: 'literals-temporal-types',
    title: 'Each Form Has Its Own Type',
    code: `map {
  day: meta::type(@2024-03-15),
  clock: meta::type(@14:30:00),
  instant: meta::type(@2024-03-15T14:30:00Z),
  span: meta::type(@PT2H30M)
}`,
    expected: `day  | clock | instant  | span
-----+-------+----------+---------
Date | Time  | DateTime | Duration`,
  };

export const litDurationFormsExample: CodeExample = {
    id: 'literals-duration-forms',
    title: 'Duration Forms',
    code: `map {
  weeks: @P2W,
  day_hours: @P1DT2H,
  minutes: @PT90M,
  fraction: @PT0.5S,
  months: @P1M
}`,
    expected: `weeks | day_hours | minutes | fraction | months
------+-----------+---------+----------+-------
14d   | 1d2h      | 1h30m   | 500ms    | 1mo`,
  };

export const litTemporalCompareExample: CodeExample = {
    id: 'literals-temporal-compare',
    title: 'Temporal Values Compare',
    code: `map {
  earlier: @2024-01-01 < @2024-06-01,
  in_q1: @2024-03-15 between @2024-01-01 and @2024-03-31,
  longer: @PT2H > @PT1H
}`,
    expected: `earlier | in_q1 | longer
--------+-------+-------
true    | true  | true`,
  };

export const litDateAddExample: CodeExample = {
    id: 'literals-date-add',
    title: 'Shift a Date with date::add',
    code: `map { later: date::add(@2024-03-15, @P10D) }`,
    expected: `later
----------
2024-03-25`,
  };

export const litDatePlusDurationExample: CodeExample = {
    id: 'literals-date-plus-duration',
    title: 'No Operator Adds a Duration to a Date',
    description: 'Date + Duration is a typed error (OPERATOR_017); use date::add instead.',
    code: `map { later: @2024-03-15 + @P1D }`,
    expectsError: true,
  };

export const litInvalidDateExample: CodeExample = {
    id: 'literals-invalid-date',
    title: 'Invalid Dates Are Rejected Before the Query Runs',
    description: 'February 30 does not exist; the literal fails with TEMPORAL_012.',
    code: `map { day: @2024-02-30 }`,
    expectsError: true,
  };

export const litCastExample: CodeExample = {
    id: 'literals-cast',
    title: 'Pin a Literal to a Type with cast',
    code: `map {
  as_int4: meta::type(cast(42, int4)),
  as_float4: meta::type(cast(3.5, float4)),
  as_text: cast(42, utf8),
  from_text: cast("42", int4) + 1,
  as_bool: cast("true", bool)
}`,
    expected: `as_int4 | as_float4 | as_text | from_text | as_bool
--------+-----------+---------+-----------+--------
Int4    | Float4    | 42      | 43        | true`,
  };

export const literalsExamples: CodeExample[] = [
  litNumericExample,
  litNumericTypesExample,
  litDecimalExactExample,
  litRangeExample,
  litTextExample,
  litTextConcatExample,
  litBooleanExample,
  litNoneExample,
  litListExample,
  litTemporalExample,
  litTemporalTypesExample,
  litDurationFormsExample,
  litTemporalCompareExample,
  litDateAddExample,
  litDatePlusDurationExample,
  litInvalidDateExample,
  litCastExample,
];
