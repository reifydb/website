import type { CodeExample } from '@/lib/examples/types';

export const ttlCreateTableExample: CodeExample = {
  id: 'ttl-create-table',
  title: 'A Session Table That Cleans Itself Up',
  code: `create namespace ttlg;
create table ttlg::sessions { id: int4, user_id: int4, token: utf8 } with {
  row: { ttl: { duration: "1h", mode: drop } }
}`,
  expected: `id    | namespace | table    | created
------+-----------+----------+--------
16416 | ttlg      | sessions | true`,
};

export const ttlCreateViewExample: CodeExample = {
  id: 'ttl-create-view',
  title: 'A View That Sees Expiry Too',
  code: `create transactional view ttlg::active_sessions { id: int4, user_id: int4 } as {
  from ttlg::sessions
  map { id, user_id }
}`,
  expected: `id    | namespace | view            | created
------+-----------+-----------------+--------
16418 | ttlg      | active_sessions | true`,
};

export const ttlInsertExample: CodeExample = {
  id: 'ttl-insert',
  title: 'Insert Sessions',
  code: `insert ttlg::sessions [
  { id: 1, user_id: 101, token: "tok_abc123" },
  { id: 2, user_id: 102, token: "tok_def456" },
  { id: 3, user_id: 101, token: "tok_ghi789" }
]`,
  expected: `namespace | table    | inserted
----------+----------+---------
ttlg      | sessions | 3`,
};

export const ttlQueryTableExample: CodeExample = {
  id: 'ttl-query-table',
  title: 'Sessions Are There Until the TTL Elapses',
  code: `from ttlg::sessions
sort { id: asc }`,
  expected: `id | user_id | token
---+---------+-----------
1  | 101     | tok_abc123
2  | 102     | tok_def456
3  | 101     | tok_ghi789`,
};

export const ttlQueryViewExample: CodeExample = {
  id: 'ttl-query-view',
  title: 'The View Agrees',
  code: `from ttlg::active_sessions
sort { id: asc }`,
  expected: `id | user_id
---+--------
1  | 101
2  | 102
3  | 101`,
};

export const ttlExamples: CodeExample[] = [
  ttlCreateTableExample,
  ttlCreateViewExample,
  ttlInsertExample,
  ttlQueryTableExample,
  ttlQueryViewExample,
];
