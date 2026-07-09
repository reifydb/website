import type { CodeExample } from '@/lib/examples/types';

export const dataModelSeriesExamples: CodeExample[] = [
{
    id: 'dm-series-integer-key',
    title: 'A Series Ordered by an Integer Key',
    category: 'concept',
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
    expected: `seq | celsius
----+--------
3   | 21.8
2   | 22
1   | 21.5`,
  },
{
    id: 'dm-series-datetime-key',
    title: 'A Series Keyed by Time',
    category: 'concept',
    code: `create series dm_srs::temps {
  at: datetime,
  celsius: float8
} with { key: at, precision: millisecond };
insert dm_srs::temps [
  { at: datetime::from_epoch_millis(1704067200000), celsius: 5.5 },
  { at: datetime::from_epoch_millis(1704070800000), celsius: 6.0 }
];
from dm_srs::temps`,
    expected: `at                             | celsius
-------------------------------+--------
2024-01-01T01:00:00.000000000Z | 6
2024-01-01T00:00:00.000000000Z | 5.5`,
  },
{
    id: 'dm-series-auto-key',
    title: 'Omit the Key and the Engine Timestamps the Row',
    category: 'concept',
    code: `create series dm_srs::pings { at: datetime, note: utf8 } with { key: at };
insert dm_srs::pings [{ note: "deploy started" }];
from dm_srs::pings map { note }`,
    expected: `note
--------------
deploy started`,
  },
{
    id: 'dm-series-key-range',
    title: 'Key Filters Use the Series Order',
    category: 'concept',
    code: `from dm_srs::readings filter { seq >= 2 }`,
    expected: `seq | celsius
----+--------
3   | 21.8
2   | 22`,
  },
{
    id: 'dm-series-update',
    title: 'Correct a Recorded Value',
    category: 'concept',
    code: `update dm_srs::readings { celsius: 22.4 } filter { seq == 2 }`,
    expected: `namespace | series   | updated
----------+----------+--------
dm_srs    | readings | 1`,
  },
{
    id: 'dm-series-tag',
    title: 'Attach a Tag Type for Classification',
    category: 'concept',
    code: `create tag dm_srs::origin { Sensor { location: utf8 }, Manual };
create series dm_srs::tagged_readings {
  at: datetime,
  v: float8
} with { key: at, tag: dm_srs::origin, precision: microsecond }`,
  },
];
