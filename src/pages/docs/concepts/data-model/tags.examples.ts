import type { CodeExample } from '@/lib/examples/types';

export const dmTagsCreateExample: CodeExample = {
    id: 'dm-tags-create',
    title: 'A Tag Type with Payload and Unit Variants',
    code: `create namespace dm_tag;
create tag dm_tag::origin { Sensor { location: utf8 }, Manual }`,
  };

export const dmTagsSeriesExample: CodeExample = {
    id: 'dm-tags-series',
    title: 'Attach the Tag to a Series',
    code: `create series dm_tag::readings {
  at: datetime,
  v: float8
} with { key: at, tag: dm_tag::origin, precision: microsecond }`,
  };

export const dataModelTagsExamples: CodeExample[] = [
  dmTagsCreateExample,
  dmTagsSeriesExample,
];
