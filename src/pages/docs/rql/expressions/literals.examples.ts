import type { CodeExample } from '@/lib/examples/types';

export const numericExample: CodeExample = {
  id: 'literals-numeric',
  title: 'Numeric Literals',
  code: `from [{ base: 10 }]
extend { doubled: base * 2, ratio: 3.14159 }`,
  expected: `base | doubled | ratio
-----+---------+--------
10   | 20      | 3.14159`,
};

export const textExample: CodeExample = {
  id: 'literals-text',
  title: 'Text Literals',
  code: `from [{ name: "Alice" }]
extend { greeting: "Hello, " + name + "!" }`,
  expected: `name  | greeting
------+--------------
Alice | Hello, Alice!`,
};

export const booleanExample: CodeExample = {
  id: 'literals-boolean',
  title: 'Boolean Literals',
  code: `from [{ id: 1 }]
extend { enabled: true, archived: false }`,
  expected: `id | enabled | archived
---+---------+---------
1  | true    | false`,
};

export const noneExample: CodeExample = {
  id: 'literals-none',
  title: 'The none Literal',
  code: `from [{ id: 1, note: none }]
extend { has_note: is::some(note) }`,
  expected: `id | note   | has_note
---+--------+---------
1  | ⟪none⟫ | false`,
};

export const listExample: CodeExample = {
  id: 'literals-list',
  title: 'List Literals',
  code: `from [{ region: "North" }]
extend { is_target: region in ["North", "East"] }`,
  expected: `region | is_target
-------+----------
North  | true`,
};

export const temporalExample: CodeExample = {
  id: 'literals-temporal',
  title: 'Temporal Literals',
  code: `from [{ id: 1 }]
extend { deadline: @2024-03-15, checkin: @14:30:00 }`,
  expected: `id | deadline   | checkin
---+------------+-------------------
1  | 2024-03-15 | 14:30:00.000000000`,
};

export const literalsExamples: CodeExample[] = [
  numericExample,
  textExample,
  booleanExample,
  noneExample,
  listExample,
  temporalExample,
];
