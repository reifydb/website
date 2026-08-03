import type { CodeExample } from '@/lib/examples/types';

export const ieCreateTableExample: CodeExample = {
  id: 'ie-create-table',
  title: 'A Table to Load Into',
  category: 'guide',
  code: `create namespace ie;
create table ie::readings { id: int4, sensor: utf8, value: float8 }`,
  expected: `id    | namespace | table    | created
------+-----------+----------+--------
16416 | ie        | readings | true`,
};

export const ieBulkInsertExample: CodeExample = {
  id: 'ie-bulk-insert',
  title: 'Load Many Rows in One Statement',
  category: 'guide',
  code: `insert ie::readings [
  { id: 1, sensor: "temp-1", value: 21.5 },
  { id: 2, sensor: "temp-2", value: 19.8 },
  { id: 3, sensor: "temp-1", value: 21.7 },
  { id: 4, sensor: "temp-2", value: 20.1 },
  { id: 5, sensor: "temp-1", value: 21.9 },
  { id: 6, sensor: "temp-2", value: 20.4 }
]`,
  expected: `namespace | table    | inserted
----------+----------+---------
ie        | readings | 6`,
};

export const ieVerifyCountExample: CodeExample = {
  id: 'ie-verify-count',
  title: 'Confirm It Landed',
  category: 'guide',
  code: `from ie::readings
aggregate { total: math::count(id) } by { sensor }
sort { sensor: asc }`,
  expected: `sensor | total
-------+------
temp-1 | 3
temp-2 | 3`,
};

export const importExportExamples: CodeExample[] = [
  ieCreateTableExample,
  ieBulkInsertExample,
  ieVerifyCountExample,
];
