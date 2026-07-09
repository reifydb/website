import type { CodeExample } from '@/lib/examples/types';

export const dataModelDictionariesExamples: CodeExample[] = [
{
    id: 'dm-dictionaries-create',
    title: 'Create a Dictionary and Intern Values',
    category: 'concept',
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
  },
{
    id: 'dm-dictionaries-duplicate',
    title: 'Inserting an Existing Value Returns Its ID',
    category: 'concept',
    code: `insert dm_dict::symbols [{ value: "AAPL" }]`,
    expected: `namespace | dictionary | id | value
----------+------------+----+------
dm_dict   | symbols    | 1  | AAPL`,
  },
{
    id: 'dm-dictionaries-from',
    title: 'Read the Mapping Back',
    category: 'concept',
    code: `from dm_dict::symbols`,
    expected: `id | value
---+------
3  | TSLA
2  | MSFT
1  | AAPL`,
  },
{
    id: 'dm-dictionaries-column',
    title: 'Dictionary-Encode a Table Column',
    category: 'concept',
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
  },
{
    id: 'dm-dictionaries-new-entry',
    title: 'Unknown Values Are Interned on Write',
    category: 'concept',
    code: `from dm_dict::symbols filter { value == "NVDA" }`,
    expected: `id | value
---+------
4  | NVDA`,
  },
];
