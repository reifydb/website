import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateSeriesExample: CodeExample = {
    id: 'scripting-series-create',
    title: 'Create a Series',
    category: 'scripting',
    code: `create namespace st_sr;
create series st_sr::metrics {
  ts: datetime,
  value: float8
} with { key: ts }`,
    expected: `id    | namespace | series  | created
------+-----------+---------+--------
16416 | st_sr     | metrics | true`,
  };

export const scriptingSeriesKeyRequiredExample: CodeExample = {
    id: 'scripting-series-key-required',
    title: 'The Key Is Required',
    description: 'A series without a with block naming its key column is rejected at parse time.',
    category: 'scripting',
    code: `create series st_sr::nokey { ts: datetime, value: float8 }`,
    expectsError: true,
  };

export const scriptingSeriesInsertExample: CodeExample = {
    id: 'scripting-series-insert',
    title: 'Insert Time-Keyed Rows',
    category: 'scripting',
    code: `insert st_sr::metrics [
  { ts: datetime::from_epoch_millis(1704067200000), value: 21.5 },
  { ts: datetime::from_epoch_millis(1704067260000), value: 21.9 },
  { ts: datetime::from_epoch_millis(1704067320000), value: 22.4 }
];
from st_sr::metrics`,
    expected: `ts                             | value
-------------------------------+------
2024-01-01T00:02:00.000000000Z | 22.4
2024-01-01T00:01:00.000000000Z | 21.9
2024-01-01T00:00:00.000000000Z | 21.5`,
  };

export const scriptingSeriesRangeExample: CodeExample = {
    id: 'scripting-series-range',
    title: 'Range Queries Filter on the Key',
    category: 'scripting',
    code: `from st_sr::metrics filter { ts >= datetime::from_epoch_millis(1704067260000) }`,
    expected: `ts                             | value
-------------------------------+------
2024-01-01T00:02:00.000000000Z | 22.4
2024-01-01T00:01:00.000000000Z | 21.9`,
  };

export const scriptingSeriesAutoKeyExample: CodeExample = {
    id: 'scripting-series-auto-key',
    title: 'Omit the Key and the Engine Assigns the Current Time',
    category: 'scripting',
    code: `create series st_sr::deploys { ts: datetime, note: utf8 } with { key: ts };
insert st_sr::deploys [{ note: "rollout finished" }];
from st_sr::deploys map { note }`,
    expected: `note
----------------
rollout finished`,
  };

export const scriptingSeriesPrecisionExample: CodeExample = {
    id: 'scripting-series-precision',
    title: 'Precision Truncates the Stored Key',
    category: 'scripting',
    code: `create series st_sr::coarse {
  ts: datetime,
  hits: int4
} with { key: ts, precision: second };
insert st_sr::coarse [{ ts: datetime::from_epoch_millis(1704067201500), hits: 12 }];
from st_sr::coarse`,
    expected: `ts                             | hits
-------------------------------+-----
2024-01-01T00:00:01.000000000Z | 12`,
  };

export const scriptingSeriesTagExample: CodeExample = {
    id: 'scripting-series-tag',
    title: 'Attach a Tag Type',
    category: 'scripting',
    code: `create tag st_sr::origin { Sensor { location: utf8 }, Manual };
create series st_sr::readings {
  ts: datetime,
  value: float8
} with { key: ts, tag: st_sr::origin }`,
    expected: `id    | namespace | series   | created
------+-----------+----------+--------
16420 | st_sr     | readings | true`,
  };

export const scriptingSeriesPartitionExample: CodeExample = {
    id: 'scripting-series-partition',
    title: 'Partitioned Series: Independent Order per Partition',
    category: 'scripting',
    code: `create series st_sr::per_sensor {
  ts: datetime,
  sensor: int4,
  value: float8
} with { key: ts, partition: { by: { sensor } } };
insert st_sr::per_sensor [
  { ts: datetime::from_epoch_millis(1000), sensor: 1, value: 10.5 },
  { ts: datetime::from_epoch_millis(3000), sensor: 2, value: 20.5 },
  { ts: datetime::from_epoch_millis(2000), sensor: 1, value: 11.5 }
];
from st_sr::per_sensor`,
    expected: `ts                             | sensor | value
-------------------------------+--------+------
1970-01-01T00:00:02.000000000Z | 1      | 11.5
1970-01-01T00:00:01.000000000Z | 1      | 10.5
1970-01-01T00:00:03.000000000Z | 2      | 20.5`,
  };

export const scriptingSeriesUpdateExample: CodeExample = {
    id: 'scripting-series-update',
    title: 'Correct a Recorded Value by Key',
    category: 'scripting',
    code: `update st_sr::metrics { value: 21.7 } filter { ts == datetime::from_epoch_millis(1704067260000) }`,
    expected: `namespace | series  | updated
----------+---------+--------
st_sr     | metrics | 1`,
  };

export const scriptingSeriesDeleteExample: CodeExample = {
    id: 'scripting-series-delete',
    title: 'Delete a Key Range',
    category: 'scripting',
    code: `delete st_sr::metrics filter { ts < datetime::from_epoch_millis(1704067260000) };
from st_sr::metrics`,
    expected: `ts                             | value
-------------------------------+------
2024-01-01T00:02:00.000000000Z | 22.4
2024-01-01T00:01:00.000000000Z | 21.7`,
  };

export const scriptingStorageSeriesExamples: CodeExample[] = [
  scriptingCreateSeriesExample,
  scriptingSeriesKeyRequiredExample,
  scriptingSeriesInsertExample,
  scriptingSeriesRangeExample,
  scriptingSeriesAutoKeyExample,
  scriptingSeriesPrecisionExample,
  scriptingSeriesTagExample,
  scriptingSeriesPartitionExample,
  scriptingSeriesUpdateExample,
  scriptingSeriesDeleteExample,
];
