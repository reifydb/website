import type { CodeExample } from '@/lib/examples/types';

export const dmDictionariesCreateExample: CodeExample = {
    id: 'dm-dictionaries-create',
    title: 'Create a Dictionary and Intern Values',
    code: `create namespace dm_dict;
create dictionary dm_dict::symbols for utf8 as uint2;
insert dm_dict::symbols [
  { value: "AAPL" },
  { value: "MSFT" },
  { value: "TSLA" }
]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
dm_dict   | symbols    | 1  | AAPL
dm_dict   | symbols    | 2  | MSFT
dm_dict   | symbols    | 3  | TSLA`,
  };

export const dmDictionariesDuplicateExample: CodeExample = {
    id: 'dm-dictionaries-duplicate',
    title: 'Inserting an Existing Value Returns Its ID',
    code: `insert dm_dict::symbols [{ value: "AAPL" }]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
dm_dict   | symbols    | 1  | AAPL`,
  };

export const dmDictionariesFromExample: CodeExample = {
    id: 'dm-dictionaries-from',
    title: 'Read the Mapping Back',
    code: `from dm_dict::symbols`,
    expected: `id | value
---+------
3  | TSLA
2  | MSFT
1  | AAPL`,
  };

export const dmDictionariesColumnExample: CodeExample = {
    id: 'dm-dictionaries-column',
    title: 'Dictionary-Encode a Table Column',
    code: `create table dm_dict::trades {
  symbol: utf8 with { dictionary: dm_dict::symbols },
  qty: int4
};
insert dm_dict::trades [
  { symbol: "AAPL", qty: 100 },
  { symbol: "NVDA", qty: 50 }
];
from dm_dict::trades`,
    expected: `symbol | qty
-------+----
NVDA   | 50
AAPL   | 100`,
  };

export const dmDictionariesNewEntryExample: CodeExample = {
    id: 'dm-dictionaries-new-entry',
    title: 'Unknown Values Are Interned on Write',
    code: `from dm_dict::symbols filter { value == "NVDA" }`,
    expected: `id | value
---+------
4  | NVDA`,
  };

export const dataModelDictionariesExamples: CodeExample[] = [
  dmDictionariesCreateExample,
  dmDictionariesDuplicateExample,
  dmDictionariesFromExample,
  dmDictionariesColumnExample,
  dmDictionariesNewEntryExample,
];
