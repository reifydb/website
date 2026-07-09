import type { CodeExample } from '@/lib/examples/types';

export const dataModelTagsExamples: CodeExample[] = [
{
    id: 'dm-tags-create',
    title: 'A Tag Type with Payload and Unit Variants',
    category: 'concept',
    code: `create namespace dm_tag;
create tag dm_tag::origin { Sensor { location: utf8 }, Manual }`,
  },
{
    id: 'dm-tags-series',
    title: 'Attach the Tag to a Series',
    category: 'concept',
    code: `create series dm_tag::readings {
  at: datetime,
  v: float8
} with { key: at, tag: dm_tag::origin, precision: microsecond }`,
  },
];
