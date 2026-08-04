import type { CodeExample } from '@/lib/examples/types';

export const scDictCreateExample: CodeExample = {
    id: 'sc-dict-create',
    title: 'Create a Dictionary',
    category: 'scripting',
    code: `create namespace sc_dict;
create dictionary sc_dict::currencies for utf8 as uint2`,
    expected: `id    | namespace | dictionary | created
------+-----------+------------+--------
16416 | sc_dict   | currencies | true`,
  };

export const scDictIfNotExistsExample: CodeExample = {
    id: 'sc-dict-if-not-exists',
    title: 'Idempotent Creation',
    category: 'scripting',
    code: `create dictionary if not exists sc_dict::currencies for utf8 as uint2`,
    expected: `id    | namespace | dictionary | created
------+-----------+------------+--------
16416 | sc_dict   | currencies | false`,
  };

export const scDictInsertExample: CodeExample = {
    id: 'sc-dict-insert',
    title: 'Intern Values',
    category: 'scripting',
    code: `insert sc_dict::currencies [
  { value: "USD" },
  { value: "EUR" },
  { value: "JPY" }
]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
sc_dict   | currencies | 1  | USD
sc_dict   | currencies | 2  | EUR
sc_dict   | currencies | 3  | JPY`,
  };

export const scDictDuplicateExample: CodeExample = {
    id: 'sc-dict-duplicate',
    title: 'Duplicates Return the Existing ID',
    category: 'scripting',
    code: `insert sc_dict::currencies [{ value: "USD" }, { value: "GBP" }]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
sc_dict   | currencies | 1  | USD
sc_dict   | currencies | 4  | GBP`,
  };

export const scDictExplicitIdExample: CodeExample = {
    id: 'sc-dict-explicit-id',
    title: 'IDs Are Always Engine-Assigned',
    description: 'The explicit id field is ignored; the entry gets the next sequential id.',
    category: 'scripting',
    code: `insert sc_dict::currencies [{ id: 42, value: "CHF" }]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
sc_dict   | currencies | 5  | CHF`,
  };

export const scDictScanExample: CodeExample = {
    id: 'sc-dict-scan',
    title: 'Read the Whole Mapping',
    category: 'scripting',
    code: `from sc_dict::currencies`,
    expected: `id | value
---+------
5  | CHF
4  | GBP
3  | JPY
2  | EUR
1  | USD`,
  };

export const scDictFilterExample: CodeExample = {
    id: 'sc-dict-filter',
    title: 'Look Up a Single Value',
    category: 'scripting',
    code: `from sc_dict::currencies filter { value == "EUR" }`,
    expected: `id | value
---+------
2  | EUR`,
  };

export const scDictJoinExample: CodeExample = {
    id: 'sc-dict-join',
    title: 'Join IDs Back to Values',
    category: 'scripting',
    code: `create table sc_dict::payments { currency: uint2, amount: int4 };
insert sc_dict::payments [
  { currency: 1, amount: 1200 },
  { currency: 2, amount: 800 }
];
from sc_dict::payments
left join { from sc_dict::currencies } as c using (currency, c.id)
map { currency: c_value, amount }`,
    expected: `currency | amount
---------+-------
EUR      | 800
USD      | 1200`,
  };

export const scDictUpdateErrorExample: CodeExample = {
    id: 'sc-dict-update-error',
    title: 'Update Is Not Supported',
    description: 'update only targets tables; pointing it at a dictionary fails with CA_004.',
    category: 'scripting',
    code: `update sc_dict::currencies { value: "XXX" } filter { id == 1 }`,
    expectsError: true,
  };

export const scDictDeleteErrorExample: CodeExample = {
    id: 'sc-dict-delete-error',
    title: 'Delete Is Not Supported',
    description: 'delete fails the same way; entries are never removed.',
    category: 'scripting',
    code: `delete sc_dict::currencies filter { id == 1 }`,
    expectsError: true,
  };

export const scDictEncodedExample: CodeExample = {
    id: 'sc-dict-encoded',
    title: 'Dictionary-Encode a Table Column',
    category: 'scripting',
    code: `create table sc_dict::invoices {
  currency: utf8 with { dictionary: sc_dict::currencies },
  total: int4
};
insert sc_dict::invoices [
  { currency: "USD", total: 100 },
  { currency: "NOK", total: 250 }
];
from sc_dict::invoices`,
    expected: `currency | total
---------+------
NOK      | 250
USD      | 100`,
  };

export const scDictInternedExample: CodeExample = {
    id: 'sc-dict-interned',
    title: 'Unknown Values Are Interned on Write',
    category: 'scripting',
    code: `from sc_dict::currencies filter { value == "NOK" }`,
    expected: `id | value
---+------
6  | NOK`,
  };

export const scDictDropInUseExample: CodeExample = {
    id: 'sc-dict-drop-in-use',
    title: 'Dropping a Dictionary in Use Fails',
    description: 'The invoices column still references the dictionary, so the drop is rejected with CA_032.',
    category: 'scripting',
    code: `drop dictionary sc_dict::currencies`,
    expectsError: true,
  };

export const scDictDropExample: CodeExample = {
    id: 'sc-dict-drop',
    title: 'Drop the Dependents First',
    category: 'scripting',
    code: `drop table sc_dict::invoices;
drop dictionary sc_dict::currencies`,
    expected: `namespace | dictionary | dropped
----------+------------+--------
sc_dict   | currencies | true`,
  };

export const scriptingSchemaDictionariesExamples: CodeExample[] = [
  scDictCreateExample,
  scDictIfNotExistsExample,
  scDictInsertExample,
  scDictDuplicateExample,
  scDictExplicitIdExample,
  scDictScanExample,
  scDictFilterExample,
  scDictJoinExample,
  scDictUpdateErrorExample,
  scDictDeleteErrorExample,
  scDictEncodedExample,
  scDictInternedExample,
  scDictDropInUseExample,
  scDictDropExample,
];
