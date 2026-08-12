import type { CodeExample } from '@/lib/examples/types';

export const createTransactionalViewExample: CodeExample = {
  id: 'scripting-transactional-view',
  title: 'Transactional View',
  code: `create namespace vw_t;
create table vw_t::users {
  id: int4,
  name: utf8,
  active: bool
};
create transactional view vw_t::active_users {
  id: int4,
  name: utf8
} as {
  from vw_t::users
  filter active == true
  map { id: id, name: name }
}`,
};

export const insertIntoTransactionalSourceExample: CodeExample = {
  id: 'scripting-transactional-view-insert',
  title: 'Insert Into the Source Table',
  code: `insert vw_t::users [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
]`,
};

export const queryTransactionalViewExample: CodeExample = {
  id: 'scripting-transactional-view-query',
  title: 'Query the Transactional View',
  code: `from vw_t::active_users`,
  expected: `id | name
---+------
1  | Alice`,
};

export const transactionalViewsExamples: CodeExample[] = [
  createTransactionalViewExample,
  insertIntoTransactionalSourceExample,
  queryTransactionalViewExample,
];
