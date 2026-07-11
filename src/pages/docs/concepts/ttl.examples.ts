import type { CodeExample } from '@/lib/examples/types';

export const conceptsTtlExamples: CodeExample[] = [
{
    id: 'concepts-ttl-declare',
    title: 'Declare a TTL at Creation',
    category: 'concept',
    code: `create namespace cpt_ttl;
create table cpt_ttl::sessions {
  token: utf8,
  user_id: int4
} with { row: { ttl: { duration: '30m', mode: drop } } };
insert cpt_ttl::sessions [
  { token: "a1", user_id: 1 },
  { token: "b2", user_id: 2 }
];
from cpt_ttl::sessions sort { user_id: asc }`,
    expected: `token | user_id
------+--------
a1    | 1
b2    | 2`,
  },
{
    id: 'concepts-ttl-touch-resets',
    title: 'Any Write Restarts the Row\'s Clock',
    category: 'concept',
    code: `update cpt_ttl::sessions { user_id: 3 } filter { token == "b2" }`,
    expected: `namespace | table    | updated
----------+----------+--------
cpt_ttl   | sessions | 1`,
  },
{
    id: 'concepts-ttl-no-anchor',
    title: 'There Is No Per-Row Anchor Column',
    description: 'TTL is anchored to the last write, not to a column you pick; the engine rejects an on clause.',
    category: 'concept',
    code: `create table cpt_ttl::events {
  id: int4
} with { row: { ttl: { duration: '1h', on: created_at } } }`,
    expectsError: true,
  },
{
    id: 'concepts-ttl-view',
    title: 'A View Carries Its Own Row TTL',
    category: 'concept',
    code: `create table cpt_ttl::orders { id: int4, total: float8 };
create transactional view cpt_ttl::revenue {
  total: float8
} with { row: { ttl: { duration: '30d' } } } as {
  from cpt_ttl::orders
  aggregate { total: math::sum(total) } by {}
}`,
  },
{
    id: 'concepts-ttl-memory-only',
    title: 'Memory-Only Rows with persistent: false',
    category: 'concept',
    code: `create table cpt_ttl::rate_limits {
  key: utf8,
  count: int4
} with { row: { ttl: { duration: '1m' }, persistent: false } };
insert cpt_ttl::rate_limits [{ key: "ip:10.0.0.1", count: 1 }];
from cpt_ttl::rate_limits`,
    expected: `key         | count
------------+------
ip:10.0.0.1 | 1`,
  },
{
    id: 'concepts-ttl-persistent-requires-ttl',
    title: 'Non-Persistent Rows Must Have a TTL',
    description: 'Rows that never reach disk have to expire; the engine refuses persistent: false without a ttl.',
    category: 'concept',
    code: `create table cpt_ttl::broken {
  id: int4
} with { row: { persistent: false } }`,
    expectsError: true,
  },
{
    id: 'concepts-ttl-ringbuffer',
    title: 'Bound by Count and by Age at Once',
    category: 'concept',
    code: `create ringbuffer cpt_ttl::recent_errors {
  id: int4,
  message: utf8
} with { capacity: 1000, row: { ttl: { duration: '1d' } } };
insert cpt_ttl::recent_errors [{ id: 1, message: "timeout" }];
from cpt_ttl::recent_errors`,
    expected: `id | message
---+--------
1  | timeout`,
  },
];
