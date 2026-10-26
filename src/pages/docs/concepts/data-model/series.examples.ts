import type { CodeExample } from '@/lib/examples/types';

export const dmSeriesIntegerKeyExample: CodeExample = {
    id: 'dm-series-integer-key',
    title: 'A Series Ordered by an Integer Key',
    code: `create namespace dm_srs;
create series dm_srs::readings {
  seq: int8,
  celsius: float8
} with { key: seq };
insert dm_srs::readings [
  { seq: 1, celsius: 21.5 },
  { seq: 2, celsius: 22.0 },
  { seq: 3, celsius: 21.8 }
];
from dm_srs::readings`,
    expected: `seq | celsius | #rownum
----+---------+--------
3   | 21.8    | 3
2   | 22      | 2
1   | 21.5    | 1`,
  };

export const dmSeriesDatetimeKeyExample: CodeExample = {
    id: 'dm-series-datetime-key',
    title: 'A Series Keyed by Time',
    code: `create series dm_srs::temps {
  at: datetime,
  celsius: float8
} with { key: at, precision: millisecond };
insert dm_srs::temps [
  { at: datetime::from_epoch_millis(1704067200000), celsius: 5.5 },
  { at: datetime::from_epoch_millis(1704070800000), celsius: 6.0 }
];
from dm_srs::temps`,
    expected: `at                             | celsius | #rownum
-------------------------------+---------+--------
2024-01-01T01:00:00.000000000Z | 6       | 2
2024-01-01T00:00:00.000000000Z | 5.5     | 1`,
  };

export const dmSeriesAutoKeyExample: CodeExample = {
    id: 'dm-series-auto-key',
    title: 'Omit the Key and the Engine Timestamps the Row',
    code: `create series dm_srs::pings { at: datetime, note: utf8 } with { key: at };
insert dm_srs::pings [{ note: "deploy started" }];
from dm_srs::pings map { note }`,
    expected: `note           | #rownum
---------------+--------
deploy started | 1`,
  };

export const dmSeriesKeyRangeExample: CodeExample = {
    id: 'dm-series-key-range',
    title: 'Key Filters Use the Series Order',
    code: `from dm_srs::readings filter { seq >= 2 }`,
    expected: `seq | celsius | #rownum
----+---------+--------
3   | 21.8    | 3
2   | 22      | 2`,
  };

export const dmSeriesUpdateExample: CodeExample = {
    id: 'dm-series-update',
    title: 'Correct a Recorded Value',
    code: `update dm_srs::readings { celsius: 22.4 } filter { seq == 2 }`,
    expected: `namespace | series   | updated
----------+----------+--------
dm_srs    | readings | 1`,
  };

export const dmSeriesTagExample: CodeExample = {
    id: 'dm-series-tag',
    title: 'Attach a Tag Type for Classification',
    code: `create tag dm_srs::origin { Sensor { location: utf8 }, Manual };
create series dm_srs::tagged_readings {
  at: datetime,
  v: float8
} with { key: at, tag: dm_srs::origin, precision: microsecond }`,
  };

export const dmSeriesTagInsertExample: CodeExample = {
    id: 'dm-series-tag-insert',
    title: 'Tagged Entries Render the Tag as a Number',
    code: `insert dm_srs::tagged_readings [
  { at: datetime::from_epoch_millis(2000), tag: Manual, v: 22.0 }
];
from dm_srs::tagged_readings`,
    expected: `at                             | tag | v  | #rownum
-------------------------------+-----+----+--------
1970-01-01T00:00:02.000000000Z | 1   | 22 | 1`,
  };

export const dmSeriesPrecisionExample: CodeExample = {
    id: 'dm-series-precision',
    title: 'Precision Truncates Keys on Write',
    code: `create series dm_srs::coarse {
  at: datetime,
  hits: int4
} with { key: at, precision: second };
insert dm_srs::coarse [
  { at: datetime::from_epoch_millis(1704067201500), hits: 12 },
  { at: datetime::from_epoch_millis(1704067201900), hits: 7 }
];
from dm_srs::coarse`,
    expected: `at                             | hits | #rownum
-------------------------------+------+--------
2024-01-01T00:00:01.000000000Z | 7    | 2
2024-01-01T00:00:01.000000000Z | 12   | 1`,
  };

export const dmSeriesPartitionExample: CodeExample = {
    id: 'dm-series-partition',
    title: 'One Ordered Timeline per Partition',
    code: `create series dm_srs::per_sensor {
  at: datetime,
  sensor: int4,
  celsius: float8
} with { key: at, partition: { by: { sensor } } };
insert dm_srs::per_sensor [
  { at: datetime::from_epoch_millis(1000), sensor: 1, celsius: 10.5 },
  { at: datetime::from_epoch_millis(3000), sensor: 2, celsius: 20.5 },
  { at: datetime::from_epoch_millis(2000), sensor: 1, celsius: 11.5 }
];
from dm_srs::per_sensor sort { sensor: asc, at: desc }`,
    expected: `at                             | sensor | celsius | #rownum
-------------------------------+--------+---------+--------
1970-01-01T00:00:02.000000000Z | 1      | 11.5    | 2
1970-01-01T00:00:01.000000000Z | 1      | 10.5    | 1
1970-01-01T00:00:03.000000000Z | 2      | 20.5    | 1`,
  };

export const dataModelSeriesExamples: CodeExample[] = [
  dmSeriesIntegerKeyExample,
  dmSeriesDatetimeKeyExample,
  dmSeriesAutoKeyExample,
  dmSeriesKeyRangeExample,
  dmSeriesUpdateExample,
  dmSeriesTagExample,
  dmSeriesTagInsertExample,
  dmSeriesPrecisionExample,
  dmSeriesPartitionExample,
];
