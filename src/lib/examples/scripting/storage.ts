import type { CodeExample } from '../index';

export const scriptingStorageExamples: CodeExample[] = [
  {
    id: 'scripting-storage-table',
    title: 'Table Storage',
    category: 'scripting',
    code: `CREATE NAMESPACE st_tb;
CREATE TABLE st_tb::users {
  id: int4,
  name: utf8,
  active: bool
};
INSERT st_tb::users [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
];
FROM st_tb::users`,
    expected: `id | name  | active
---+-------+-------
1  | Alice | true
2  | Bob   | false`,
  },
  {
    id: 'scripting-create-ringbuffer',
    title: 'Create Ringbuffer',
    category: 'scripting',
    code: `CREATE NAMESPACE st_rb;
CREATE RINGBUFFER st_rb::events {
  id: int4,
  message: utf8,
  active: bool
} WITH { capacity: 5 };
INSERT st_rb::events [
  { id: 1, message: 'first', active: true },
  { id: 2, message: 'second', active: true }
];
FROM st_rb::events`,
    expected: `id | message | active
---+---------+-------
1  | first   | true
2  | second  | true`,
  },
  {
    id: 'scripting-create-series',
    title: 'Create Series',
    category: 'scripting',
    code: `CREATE NAMESPACE st_sr;
CREATE TAG st_sr::source {
  Sensor { location: utf8 }
};
CREATE SERIES st_sr::metrics {
  value: float8
} WITH { tag: st_sr::source, precision: microsecond }`,
  },
];
