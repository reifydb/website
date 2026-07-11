import type { CodeExample } from '@/lib/examples/types';

// int16 is 128-bit; its maximum is the largest value arithmetic can produce,
// so adding to it is the simplest way to trigger a genuine overflow.
const INT16_MAX = '170141183460469231731687303715884105727';

export const functionsArithmeticPoliciesExamples: CodeExample[] = [
{
    id: 'fn-arith-operator-overflow',
    title: 'Overflow Is an Error by Default',
    description: 'Bare operators fail the statement with NUMBER_002 when the result does not fit the result type.',
    category: 'function',
    code: `map { total: cast(${INT16_MAX}, int16) + cast(1, int16) }`,
    expectsError: true,
  },
{
    id: 'fn-arith-function-divzero',
    title: 'Division by Zero Is an Error by Default',
    description: 'The bare functions behave like the operators: math::div by zero fails with FUNCTION_007 wrapping NUMBER_007.',
    category: 'function',
    code: `map { rate: math::div(cast(10, int4), cast(0, int4)) }`,
    expectsError: true,
  },
{
    id: 'fn-arith-saturate',
    title: 'saturate Clamps to the Type Range',
    category: 'function',
    code: `from [
  { label: "fits", a: 40, b: 2 },
  { label: "overflows", a: ${INT16_MAX}, b: 1 }
]
map { label, total: math::add_saturate(cast(a, int16), cast(b, int16)) }`,
    expected: `label     | total
----------+----------------------------------------
fits      | 42
overflows | ${INT16_MAX}`,
  },
{
    id: 'fn-arith-saturate-floor',
    title: 'saturate Stops Unsigned Subtraction at Zero',
    category: 'function',
    code: `map { remaining: math::sub_saturate(cast(3, uint4), cast(10, uint4)) }`,
    expected: `remaining
---------
0`,
  },
{
    id: 'fn-arith-wrap-zero',
    title: 'wrap and zero on the Same Overflow',
    category: 'function',
    code: `map {
  zero: math::add_zero(cast(${INT16_MAX}, int16), cast(1, int16)),
  wrap: math::add_wrap(cast(${INT16_MAX}, int16), cast(1, int16))
}`,
    expected: `zero | wrap
-----+-----------------------------------------
0    | -170141183460469231731687303715884105728`,
  },
{
    id: 'fn-arith-none',
    title: 'none Turns the Impossible Row Into a Missing Value',
    category: 'function',
    code: `from [
  { order: "A-1001", items: 12, boxes: 4 },
  { order: "A-1002", items: 5, boxes: 0 }
]
map { order, per_box: math::div_none(items, boxes) }`,
    expected: `order  | per_box
-------+--------
A-1001 | 3
A-1002 | ⟪none⟫`,
  },
{
    id: 'fn-arith-fallback',
    title: 'default Substitutes Your Fallback Value',
    category: 'function',
    code: `from [
  { order: "A-1001", items: 12, boxes: 4 },
  { order: "A-1002", items: 5, boxes: 0 }
]
map { order, per_box: math::div_default(items, boxes, 0) }`,
    expected: `order  | per_box
-------+--------
A-1001 | 3
A-1002 | 0`,
  },
{
    id: 'fn-arith-strict',
    title: 'strict Fails With Your Own Message',
    description: 'The statement fails with FUNCTION_007 carrying the message from the third argument.',
    category: 'function',
    code: `map {
  total: math::add_strict(cast(${INT16_MAX}, int16), cast(1, int16), 'inventory total overflowed')
}`,
    expectsError: true,
  },
{
    id: 'fn-arith-none-propagates',
    title: 'Missing Input Propagates in Every Variant',
    description: 'A none input produces a none result before any policy applies - even strict does not fail.',
    category: 'function',
    code: `map {
  strict: math::add_strict(none, cast(1, int4), 'unreachable'),
  zero: math::add_zero(none, cast(1, int4))
}`,
    expected: `strict | zero
-------+-------
⟪none⟫ | ⟪none⟫`,
  },
{
    id: 'fn-arith-promotion',
    title: 'Results Widen Before They Can Overflow',
    category: 'function',
    code: `map { result_type: meta::type(math::add(cast(1, int4), cast(1, int4))) }`,
    expected: `result_type
-----------
Int8`,
  },
];
