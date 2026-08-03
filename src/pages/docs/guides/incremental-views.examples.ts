import type { CodeExample } from '@/lib/examples/types';

export const ivTransactionalSetupExample: CodeExample = {
  id: 'iv-transactional-setup',
  title: 'Table + Transactional View',
  category: 'guide',
  code: `create namespace iv_t;
create table iv_t::tickets { id: int4, subject: utf8, status: utf8 };
create transactional view iv_t::open_tickets { id: int4, subject: utf8 } as {
  from iv_t::tickets
  filter { status == "open" }
  map { id, subject }
}`,
  expected: `id    | namespace | view         | created
------+-----------+--------------+--------
16418 | iv_t      | open_tickets | true`,
};

export const ivComposedSetupExample: CodeExample = {
  id: 'iv-composed-setup',
  title: 'A View over a View',
  category: 'guide',
  code: `create transactional view iv_t::open_ticket_count { total: int8 } as {
  from iv_t::open_tickets
  aggregate { total: math::count(id) }
}`,
  expected: `id    | namespace | view              | created
------+-----------+-------------------+--------
16420 | iv_t      | open_ticket_count | true`,
};

export const ivTransactionalInsertExample: CodeExample = {
  id: 'iv-transactional-insert',
  title: 'Insert Tickets',
  category: 'guide',
  code: `insert iv_t::tickets [
  { id: 1, subject: "Login fails on Safari", status: "open" },
  { id: 2, subject: "Typo on pricing page", status: "closed" },
  { id: 3, subject: "Export button missing", status: "open" }
]`,
  expected: `namespace | table   | inserted
----------+---------+---------
iv_t      | tickets | 3`,
};

export const ivTransactionalQueryExample: CodeExample = {
  id: 'iv-transactional-query',
  title: 'Read Your Write',
  category: 'guide',
  code: `from iv_t::open_tickets
sort { id: asc }`,
  expected: `id | subject
---+----------------------
1  | Login fails on Safari
3  | Export button missing`,
};

export const ivComposedQueryExample: CodeExample = {
  id: 'iv-composed-query',
  title: 'Query the Composed View',
  category: 'guide',
  code: `from iv_t::open_ticket_count`,
  expected: `total
-----
2`,
};

export const ivDeferredSetupExample: CodeExample = {
  id: 'iv-deferred-setup',
  title: 'Table + Deferred View',
  category: 'guide',
  code: `create namespace iv_d;
create table iv_d::events { id: int4, kind: utf8 };
create deferred view iv_d::error_events { id: int4, kind: utf8 } as {
  from iv_d::events
  filter { kind == "error" }
  map { id, kind }
}`,
  expected: `id    | namespace | view         | created
------+-----------+--------------+--------
16423 | iv_d      | error_events | true`,
};

export const ivDeferredInsertExample: CodeExample = {
  id: 'iv-deferred-insert',
  title: 'Insert Events',
  category: 'guide',
  code: `insert iv_d::events [
  { id: 1, kind: "info" },
  { id: 2, kind: "error" },
  { id: 3, kind: "error" }
]`,
  expected: `namespace | table  | inserted
----------+--------+---------
iv_d      | events | 3`,
};

export const ivDeferredQueryExample: CodeExample = {
  id: 'iv-deferred-query',
  title: 'Query the Deferred View',
  category: 'guide',
  code: `from iv_d::error_events
sort { id: asc }`,
  expected: `id | kind
---+------
2  | error
3  | error`,
};

export const incrementalViewsExamples: CodeExample[] = [
  ivTransactionalSetupExample,
  ivComposedSetupExample,
  ivTransactionalInsertExample,
  ivTransactionalQueryExample,
  ivComposedQueryExample,
  ivDeferredSetupExample,
  ivDeferredInsertExample,
  ivDeferredQueryExample,
];
