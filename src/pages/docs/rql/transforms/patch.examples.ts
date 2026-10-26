import type { CodeExample } from '@/lib/examples/types';

export const patchReplaceExample: CodeExample = {
    id: 'patch-replace',
    title: 'Overwrite a Column in Place',
    code: `create namespace tf_patch;
create table tf_patch::items { id: int4, price: float8, qty: Option(int4), status: utf8 };
insert tf_patch::items [
  { id: 1, price: 2.5, qty: 4, status: "new" },
  { id: 2, price: 10.0, status: "new" },
  { id: 3, price: 1.25, qty: 8, status: "new" }
];
from tf_patch::items
patch { price: price * 2 }`,
    expected: `id | price | qty    | status | #rownum
---+-------+--------+--------+--------
3  | 2.5   | 8      | new    | 3
2  | 20    | ⟪none⟫ | new    | 2
1  | 5     | 4      | new    | 1`,
  };

export const patchAddExample: CodeExample = {
    id: 'patch-add',
    title: 'A New Name Is Added on the Right',
    code: `from tf_patch::items
patch { line: price * qty }`,
    expected: `id | price | qty    | status | line   | #rownum
---+-------+--------+--------+--------+--------
3  | 1.25  | 8      | new    | 10     | 3
2  | 10    | ⟪none⟫ | new    | ⟪none⟫ | 2
1  | 2.5   | 4      | new    | 10     | 1`,
  };

export const patchMixedExample: CodeExample = {
    id: 'patch-mixed',
    title: 'Replace and Add in One Block',
    code: `from tf_patch::items
patch { status: "checked", line: price * qty }`,
    expected: `id | price | qty    | status  | line   | #rownum
---+-------+--------+---------+--------+--------
3  | 1.25  | 8      | checked | 10     | 3
2  | 10    | ⟪none⟫ | checked | ⟪none⟫ | 2
1  | 2.5   | 4      | checked | 10     | 1`,
  };

export const patchExtendCollisionExample: CodeExample = {
    id: 'patch-extend-collision',
    title: 'The Same Assignment Through extend Fails',
    description: 'extend refuses a name that already exists (EXTEND_002); patch overwrites it.',
    code: `from tf_patch::items
extend { price: price * 2 }`,
    expectsError: true,
  };

export const patchReadsInputExample: CodeExample = {
    id: 'patch-reads-input',
    title: 'Every Entry Reads the Incoming Row',
    code: `from tf_patch::items
patch { price: price * 2, was: price }`,
    expected: `id | price | qty    | status | was  | #rownum
---+-------+--------+--------+------+--------
3  | 2.5   | 8      | new    | 1.25 | 3
2  | 20    | ⟪none⟫ | new    | 10   | 2
1  | 5     | 4      | new    | 2.5  | 1`,
  };

export const patchSameBlockReferenceExample: CodeExample = {
    id: 'patch-same-block-reference',
    title: 'Entries in One Block Do Not See Each Other',
    code: `from tf_patch::items
patch { doubled: price * 2, quadrupled: doubled * 2 }`,
    expectsError: true,
  };

export const patchChainedExample: CodeExample = {
    id: 'patch-chained',
    title: 'Chain Patches to Build on a Result',
    code: `from tf_patch::items
patch { price: price * 2 }
patch { price: price + 1 }`,
    expected: `id | price | qty    | status | #rownum
---+-------+--------+--------+--------
3  | 3.5   | 8      | new    | 3
2  | 21    | ⟪none⟫ | new    | 2
1  | 6     | 4      | new    | 1`,
  };

export const patchTypeExample: CodeExample = {
    id: 'patch-type',
    title: 'The Column Takes the Expression\'s Type',
    code: `from tf_patch::items
patch { was: meta::type(qty), qty: "5" }
map { id, was, qty, now: meta::type(qty) }`,
    expected: `id | was          | qty | now  | #rownum
---+--------------+-----+------+--------
3  | Option(Int4) | 5   | Utf8 | 3
2  | Option(Int4) | 5   | Utf8 | 2
1  | Option(Int4) | 5   | Utf8 | 1`,
  };

export const patchNoneExample: CodeExample = {
    id: 'patch-none',
    title: 'Set a Column to none',
    code: `from tf_patch::items
patch { qty: none }`,
    expected: `id | price | qty    | status | #rownum
---+-------+--------+--------+--------
3  | 1.25  | ⟪none⟫ | new    | 3
2  | 10    | ⟪none⟫ | new    | 2
1  | 2.5   | ⟪none⟫ | new    | 1`,
  };

export const patchDownstreamFilterExample: CodeExample = {
    id: 'patch-downstream-filter',
    title: 'Filter on a Patched Column',
    code: `from tf_patch::items
patch { cheap: price < 3 }
filter { cheap }`,
    expected: `id | price | qty | status | cheap | #rownum
---+-------+-----+--------+-------+--------
3  | 1.25  | 8   | new    | true  | 3
1  | 2.5   | 4   | new    | true  | 1`,
  };

export const patchAfterMapExample: CodeExample = {
    id: 'patch-after-map',
    title: 'Patch a Narrowed Frame',
    code: `from tf_patch::items
map { id, price }
patch { price: price + 1 }`,
    expected: `id | price | #rownum
---+-------+--------
3  | 2.25  | 3
2  | 11    | 2
1  | 3.5   | 1`,
  };

export const patchUnaliasedExample: CodeExample = {
    id: 'patch-unaliased',
    title: 'An Expression Without an Alias',
    code: `from tf_patch::items
patch { price * 2 }`,
    expected: `id | price | qty    | status | price * 2 | #rownum
---+-------+--------+--------+-----------+--------
3  | 1.25  | 8      | new    | 2.5       | 3
2  | 10    | ⟪none⟫ | new    | 20        | 2
1  | 2.5   | 4      | new    | 5         | 1`,
  };

export const patchEmptyInputExample: CodeExample = {
    id: 'patch-empty-input',
    title: 'Over an Empty Input',
    code: `from tf_patch::items
filter { id > 100 }
patch { flag: true }`,
    expected: `(empty)`,
  };

export const patchDuplicateNameExample: CodeExample = {
    id: 'patch-duplicate-name',
    title: 'The Same Name Twice in One Block',
    code: `from tf_patch::items
patch { price: 1, price: 2 }`,
    expected: `id | price | qty    | status | #rownum
---+-------+--------+--------+--------
3  | 1     | 8      | new    | 3
2  | 1     | ⟪none⟫ | new    | 2
1  | 1     | 4      | new    | 1`,
  };

export const patchNoBracesExample: CodeExample = {
    id: 'patch-no-braces',
    title: 'Braces Are Required',
    description: 'patch without curly braces is a parse error (PATCH_001).',
    code: `from tf_patch::items
patch price: 1`,
    expectsError: true,
  };

export const patchInlineExample: CodeExample = {
    id: 'patch-inline',
    title: 'Patch Inline Rows',
    code: `from [{ a: 1, b: 2 }, { a: 3, b: 4 }]
patch { b: a + b, c: "x" }`,
    expected: `a | b | c
--+---+--
1 | 3 | x
3 | 7 | x`,
  };

export const rqlTransformsPatchExamples: CodeExample[] = [
  patchReplaceExample,
  patchAddExample,
  patchMixedExample,
  patchExtendCollisionExample,
  patchReadsInputExample,
  patchSameBlockReferenceExample,
  patchChainedExample,
  patchTypeExample,
  patchNoneExample,
  patchDownstreamFilterExample,
  patchAfterMapExample,
  patchInlineExample,
  patchUnaliasedExample,
  patchEmptyInputExample,
  patchDuplicateNameExample,
  patchNoBracesExample,
];
