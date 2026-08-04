import type { CodeExample } from '@/lib/examples/types';

export const updBasicExample: CodeExample = {
    id: 'scripting-update-basic',
    title: 'Update One Field on Matching Rows',
    category: 'scripting',
    code: `create namespace upd;
create table upd::products { id: int4, name: utf8, price: int8, stocked: bool };
insert upd::products [
  { id: 1, name: "widget", price: 25, stocked: true },
  { id: 2, name: "gadget", price: 40, stocked: true },
  { id: 3, name: "gizmo", price: 60, stocked: false }
];
update upd::products { price: 45 } filter { name == "gadget" }`,
    expected: `namespace | table    | updated
----------+----------+--------
upd       | products | 1`,
  };

export const updScanExample: CodeExample = {
    id: 'scripting-update-scan',
    title: 'Unlisted Columns Are Untouched',
    category: 'scripting',
    code: `from upd::products sort { id: asc }`,
    expected: `id | name   | price | stocked
---+--------+-------+--------
1  | widget | 25    | true
2  | gadget | 45    | true
3  | gizmo  | 60    | false`,
  };

export const updMultiFieldExample: CodeExample = {
    id: 'scripting-update-multi-field',
    title: 'Multiple Fields, Computed from Existing Values',
    category: 'scripting',
    code: `update upd::products { price: price + 5, stocked: true }
filter { id == 3 }
returning { id, name, price, stocked }`,
    expected: `id | name  | price | stocked
---+-------+-------+--------
3  | gizmo | 65    | true`,
  };

export const updNoFilterExample: CodeExample = {
    id: 'scripting-update-no-filter',
    title: 'The Filter Is Mandatory',
    description: 'An update without a filter fails with UPDATE_003 instead of silently rewriting the whole table.',
    category: 'scripting',
    code: `update upd::products { price: 0 }`,
    expectsError: true,
  };

export const updAllRowsExample: CodeExample = {
    id: 'scripting-update-all-rows',
    title: 'Updating Every Row Is an Explicit Choice',
    category: 'scripting',
    code: `update upd::products { price: price + 1 } filter { true }`,
    expected: `namespace | table    | updated
----------+----------+--------
upd       | products | 3`,
  };

export const updViewSetupExample: CodeExample = {
    id: 'scripting-update-view-setup',
    title: 'A Transactional View over a Table',
    category: 'scripting',
    code: `create table upd::orders { id: int4, total: int8 };
create transactional view upd::revenue { revenue: int8 } as {
  from upd::orders
  aggregate { revenue: math::sum(total) } by {}
}`,
  };

export const updViewInsertExample: CodeExample = {
    id: 'scripting-update-view-insert',
    title: 'Seed the Source Table',
    category: 'scripting',
    code: `insert upd::orders [{ id: 1, total: 40 }, { id: 2, total: 25 }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
upd       | orders | 2`,
  };

export const updViewMaintainExample: CodeExample = {
    id: 'scripting-update-view-maintain',
    title: 'Update a Source Row',
    category: 'scripting',
    code: `update upd::orders { total: 100 } filter { id == 1 }`,
    expected: `namespace | table  | updated
----------+--------+--------
upd       | orders | 1`,
  };

export const updViewReadExample: CodeExample = {
    id: 'scripting-update-view-read',
    title: 'The View Reflects the Update',
    category: 'scripting',
    code: `from upd::revenue`,
    expected: `revenue
-------
125`,
  };

export const updViewErrorExample: CodeExample = {
    id: 'scripting-update-view-error',
    title: 'Views Cannot Be Updated Directly',
    description: 'A view is derived state, not a table - update refuses it with CA_004.',
    category: 'scripting',
    code: `update upd::revenue { revenue: 0 } filter { true }`,
    expectsError: true,
  };

export const scriptingDmlUpdateExamples: CodeExample[] = [
  updBasicExample,
  updScanExample,
  updMultiFieldExample,
  updNoFilterExample,
  updAllRowsExample,
  updViewSetupExample,
  updViewInsertExample,
  updViewMaintainExample,
  updViewReadExample,
  updViewErrorExample,
];
