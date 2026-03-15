import type { CodeExample } from './index';

export const architectureExamples: CodeExample[] = [
  // Volcano execution model
  {
    id: 'volcano-pipeline',
    title: 'Query Pipeline',
    category: 'rql',
    code: `from app::orders
filter { status == "completed" }
extend { discount: total * 0.1 }
sort {total: desc}
take 5`,
  },
  {
    id: 'volcano-scan-filter',
    title: 'Scan and Filter',
    category: 'rql',
    code: `from app::users
filter { age >= 18 and status == "active" }`,
  },
  {
    id: 'volcano-aggregate',
    title: 'Aggregate Pipeline',
    category: 'rql',
    code: `from app::orders
filter { status == "completed" }
aggregate { revenue: math::sum(total), orders: math::sum(1) } by { region }
sort {revenue: desc}`,
  },

  // Types & Expressions
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
