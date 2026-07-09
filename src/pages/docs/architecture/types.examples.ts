import type { CodeExample } from '@/lib/examples/types';

export const architectureTypesExamples: CodeExample[] = [
{
    id: 'types-integer-widening',
    title: 'Integer Widening',
    category: 'rql',
    code: `from [{ a: cast(100, int2), b: cast(200, int4) }]
extend { sum: a + b }`,
  },
{
    id: 'types-float-promotion',
    title: 'Float Promotion',
    category: 'rql',
    code: `from [{ price: cast(19.99, float4), tax: cast(0.08, float8) }]
extend { total: price * (1 + tax) }`,
  },
{
    id: 'types-none-propagation',
    title: 'None Propagation',
    category: 'rql',
    code: `from [{ a: 10, b: none }]
extend { sum: a + b, check_a: is::some(a), check_b: is::none(b) }`,
  },
{
    id: 'types-string-concat',
    title: 'String Concatenation Across Types',
    category: 'rql',
    code: `from [{ name: "Widget", price: 29, active: true }]
extend { label: name + " costs $" + price + " (active: " + active + ")" }
map { label }`,
  },
{
    id: 'types-cast-example',
    title: 'Explicit Type Casting',
    category: 'rql',
    code: `from [{ val: 42 }]
extend { as_float: cast(val, float8), as_text: cast(val, utf8) }`,
  },
];
