import type { CodeExample } from '@/lib/examples/types';

export const dmTagsCreateExample: CodeExample = {
    id: 'dm-tags-create',
    title: 'A Tag Type with Payload and Unit Variants',
    code: `create namespace dm_tag;
create tag dm_tag::origin { Sensor { location: utf8 }, Manual }`,
    expected: `namespace | tag    | created
----------+--------+--------
dm_tag    | origin | true`,
  };

export const dmTagsSeriesExample: CodeExample = {
    id: 'dm-tags-series',
    title: 'Attach the Tag to a Series',
    code: `create series dm_tag::readings {
  at: datetime,
  v: float8
} with { key: at, tag: dm_tag::origin }`,
    expected: `id    | namespace | series   | created
------+-----------+----------+--------
16417 | dm_tag    | readings | true`,
  };

export const dmTagsInsertExample: CodeExample = {
    id: 'dm-tags-insert',
    title: 'Label Entries as You Insert Them',
    code: `insert dm_tag::readings [
  { at: datetime::from_epoch_millis(2000), tag: Manual, v: 22.0 },
  { at: datetime::from_epoch_millis(3000), v: 22.5 }
];
from dm_tag::readings`,
    expected: `at                             | tag | v    | #rownum
-------------------------------+-----+------+--------
1970-01-01T00:00:02.000000000Z | 1   | 22   | 1
1970-01-01T00:00:03.000000000Z | 0   | 22.5 | 2`,
  };

export const dmTagsMissingExample: CodeExample = {
    id: 'dm-tags-missing',
    title: 'The Tag Type Must Exist First',
    description: 'A series that names an unknown tag type fails with CA_002.',
    code: `create series dm_tag::more {
  at: datetime,
  v: float8
} with { key: at, tag: dm_tag::phantom }`,
    expectsError: true,
  };

export const dmTagsDuplicateExample: CodeExample = {
    id: 'dm-tags-duplicate',
    title: 'Tag Names Are Unique per Namespace',
    description: 'Declaring the same tag twice fails with CA_003.',
    code: `create tag dm_tag::origin { Sensor { location: utf8 } }`,
    expectsError: true,
  };

export const dmTagsCatalogExample: CodeExample = {
    id: 'dm-tags-catalog',
    title: 'Tags in the System Catalog',
    code: `from system::tags map { name }`,
    expected: `name
------
origin`,
  };

export const dmTagsNoDropExample: CodeExample = {
    id: 'dm-tags-no-drop',
    title: 'There Is No drop tag',
    description: 'The grammar has no drop form for tags; the statement fails with AST_005.',
    code: `drop tag dm_tag::origin`,
    expectsError: true,
  };

export const dataModelTagsExamples: CodeExample[] = [
  dmTagsCreateExample,
  dmTagsSeriesExample,
  dmTagsInsertExample,
  dmTagsMissingExample,
  dmTagsDuplicateExample,
  dmTagsCatalogExample,
  dmTagsNoDropExample,
];
