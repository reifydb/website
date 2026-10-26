import type { CodeExample } from '@/lib/examples/types';

export const opArithmeticExample: CodeExample = {
    id: 'operators-arithmetic',
    title: 'Arithmetic Operators',
    code: `from [{ total: 47, count: 5 }]
map {
  sum: total + count,
  diff: total - count,
  product: total * count,
  quotient: total / count,
  remainder: total % count,
  negated: -total
}`,
    expected: `sum | diff | product | quotient | remainder | negated
----+------+---------+----------+-----------+--------
52  | 42   | 235     | 9        | 2         | -47`,
  };

export const opDivisionExample: CodeExample = {
    id: 'operators-division',
    title: 'Integer Division Truncates, Decimal Division Does Not',
    code: `map {
  int_div: 7 / 2,
  neg_div: -7 / 2,
  dec_div: 7 / 2.0,
  int_rem: -10 % 3,
  dec_rem: 10.5 % 3
}`,
    expected: `int_div | neg_div | dec_div  | int_rem | dec_rem
--------+---------+----------+---------+--------
3       | -3      | 3.500000 | -1      | 1.5`,
  };

export const opDivideByZeroExample: CodeExample = {
    id: 'operators-divide-by-zero',
    title: 'Division by Zero Is an Error',
    description: 'Both / and % fail with NUMBER_007 when the divisor is zero, for integers and decimals alike.',
    code: `map { ratio: 7 / 0 }`,
    expectsError: true,
  };

export const opConcatExample: CodeExample = {
    id: 'operators-concat',
    title: 'Plus Concatenates When Either Side Is Text',
    code: `from [{ name: "Ada", items: 3 }]
map {
  greeting: "Hello, " + name,
  count: items + " items",
  chained: "abc" + 1 + 2,
  numeric: 1 + 2 + "abc",
  digits: "5" + 5
}`,
    expected: `greeting   | count   | chained | numeric | digits
-----------+---------+---------+---------+-------
Hello, Ada | 3 items | abc12   | 3abc    | 55`,
  };

export const opPromotionExample: CodeExample = {
    id: 'operators-promotion',
    title: 'Arithmetic Widens the Result Type',
    code: `map {
  sum: cast(127, int1) + cast(1, int1),
  sum_type: meta::type(cast(127, int1) + cast(1, int1)),
  big: 2147483647 + 1,
  big_type: meta::type(2147483647 + 1),
  dec_type: meta::type(7 / 2.0)
}`,
    expected: `sum | sum_type | big        | big_type | dec_type
----+----------+------------+----------+---------------
128 | Int2     | 2147483648 | Int8     | Decimal(10, 6)`,
  };

export const opComparisonExample: CodeExample = {
    id: 'operators-comparison',
    title: 'Comparison Operators',
    code: `from [{ price: 45, stock: 3, name: "Widget" }]
map {
  cheap: price < 50,
  low_stock: stock <= 5,
  not_free: price != 0,
  exact: price == 45.0,
  named: name == "widget",
  in_range: price between 40 and 50
}`,
    expected: `cheap | low_stock | not_free | exact | named | in_range
------+-----------+----------+-------+-------+---------
true  | true      | true     | true  | false | true`,
  };

export const opCompareTypesExample: CodeExample = {
    id: 'operators-compare-types',
    title: 'Comparing Across Types',
    code: `map {
  int_dec: 2 == 2.0,
  int_dec2: 1 == 1.5,
  sizes: cast(1, int4) == cast(1, int8),
  text: "abc" < "abd",
  dates: @2024-01-01 < @2024-06-01,
  times: @14:30:00 < @15:00:00,
  bools: true > false
}`,
    expected: `int_dec | int_dec2 | sizes | text | dates | times | bools
--------+----------+-------+------+-------+-------+------
true    | false    | true  | true | true  | true  | true`,
  };

export const opCompareMismatchExample: CodeExample = {
    id: 'operators-compare-mismatch',
    title: 'Text and Numbers Do Not Compare',
    description: 'Comparing text with a number is a typed error (OPERATOR_022 for ==, OPERATOR_024 for <), not false.',
    code: `map { same: "5" == 5 }`,
    expectsError: true,
  };

export const opMembershipExample: CodeExample = {
    id: 'operators-membership',
    title: 'in, not in, and contains',
    code: `from [{ region: "North" }]
map {
  target: region in ["North", "East"],
  other: region not in ["North", "East"],
  has_two: [1, 2, 3] contains [2],
  has_both: [1, 2, 3] contains [2, 3],
  has_four: [1, 2, 3] contains [2, 4]
}`,
    expected: `target | other | has_two | has_both | has_four
-------+-------+---------+----------+---------
true   | false | true    | true     | false`,
  };

export const opLogicalExample: CodeExample = {
    id: 'operators-logical',
    title: 'Logical Operators',
    code: `from [{ active: true, verified: false }]
map {
  both: active and verified,
  either: active or verified,
  one_of: active xor verified,
  inactive: not active,
  bang: !active
}`,
    expected: `both  | either | one_of | inactive | bang
------+--------+--------+----------+------
false | true   | true   | false    | false`,
  };

export const opLogicalPrecedenceExample: CodeExample = {
    id: 'operators-logical-precedence',
    title: 'and Binds Tighter Than or and xor',
    code: `map {
  a: true and false or true,
  b: false or true and false,
  c: true xor true and false,
  d: (true or false) and false
}`,
    expected: `a    | b     | c    | d
-----+-------+------+------
true | false | true | false`,
  };

export const opNotScopeExample: CodeExample = {
    id: 'operators-not-scope',
    title: 'not Applies to Everything After It',
    code: `from [{ paid: false, shipped: false }]
map {
  unparenthesized: not paid and shipped,
  parenthesized: (not paid) and shipped
}`,
    expected: `unparenthesized | parenthesized
----------------+--------------
true            | false`,
  };

export const opNoneLogicExample: CodeExample = {
    id: 'operators-none-logic',
    title: 'Three-Valued Logic with none',
    code: `map {
  none_and_false: none and false,
  none_and_true: none and true,
  none_or_true: none or true,
  none_or_false: none or false,
  not_none: not none,
  none_xor_true: none xor true
}`,
    expected: `none_and_false | none_and_true | none_or_true | none_or_false | not_none | none_xor_true
---------------+---------------+--------------+---------------+----------+--------------
false          | ⟪none⟫        | true         | ⟪none⟫        | ⟪none⟫   | ⟪none⟫`,
  };

export const opNoneArithExample: CodeExample = {
    id: 'operators-none-arith',
    title: 'none Propagates Through Arithmetic and Comparison',
    code: `from [{ id: 1, qty: 4 }, { id: 2, qty: none }]
map {
  id,
  doubled: qty * 2,
  big: qty > 2,
  same: qty == none,
  missing: is::none(qty)
}`,
    expected: `id | doubled | big    | same   | missing
---+---------+--------+--------+--------
1  | 8       | true   | ⟪none⟫ | false
2  | ⟪none⟫  | ⟪none⟫ | ⟪none⟫ | true`,
  };

export const opPrecedenceExample: CodeExample = {
    id: 'operators-precedence',
    title: 'Precedence and Parentheses',
    code: `map {
  a: 2 + 3 * 4,
  b: (2 + 3) * 4,
  c: 10 - 4 - 3,
  d: 1 + 2 == 3 and 4 > 3 or false,
  e: -2 * 3
}`,
    expected: `a  | b  | c | d    | e
---+----+---+------+---
14 | 20 | 3 | true | -6`,
  };

export const opSymbolicAndExample: CodeExample = {
    id: 'operators-symbolic-and',
    title: 'Symbolic Logical Operators Do Not Exist',
    description: '&& is not RQL; the parser rejects it with AST_006. Use the and keyword.',
    code: `map { both: true && false }`,
    expectsError: true,
  };

export const operatorsExamples: CodeExample[] = [
  opArithmeticExample,
  opDivisionExample,
  opDivideByZeroExample,
  opConcatExample,
  opPromotionExample,
  opComparisonExample,
  opCompareTypesExample,
  opCompareMismatchExample,
  opMembershipExample,
  opLogicalExample,
  opLogicalPrecedenceExample,
  opNotScopeExample,
  opNoneLogicExample,
  opNoneArithExample,
  opPrecedenceExample,
  opSymbolicAndExample,
];
