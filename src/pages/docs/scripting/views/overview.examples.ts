import type { CodeExample } from '@/lib/examples/types';

export const scriptingDeferredViewExample: CodeExample = {
    id: 'scripting-deferred-view',
    title: 'Deferred View',
    category: 'scripting',
    code: `CREATE NAMESPACE vw_d;
CREATE TABLE vw_d::employees {
  id: int4,
  name: utf8,
  active: bool
};
CREATE DEFERRED VIEW vw_d::active_employees {
  id: int4,
  name: utf8
} AS {
  FROM vw_d::employees
  FILTER active == true
  MAP { id: id, name: name }
};
INSERT vw_d::employees [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Carol', active: true }
];`,
  };

export const scriptingDeferredViewQueryExample: CodeExample = {
    id: 'scripting-deferred-view-query',
    title: 'Query the Deferred View',
    category: 'scripting',
    code: `FROM vw_d::active_employees
sort { id: asc }`,
    expected: `id | name
---+------
1  | Alice
3  | Carol`,
  };

export const scriptingTransactionalViewExample: CodeExample = {
    id: 'scripting-transactional-view',
    title: 'Transactional View',
    category: 'scripting',
    code: `CREATE NAMESPACE vw_t;
CREATE TABLE vw_t::users {
  id: int4,
  name: utf8,
  active: bool
};
CREATE VIEW vw_t::active_users {
  id: int4,
  name: utf8
} AS {
  FROM vw_t::users
  FILTER active == true
  MAP { id: id, name: name }
};`,
  };

export const scriptingTransactionalViewInsertExample: CodeExample = {
    id: 'scripting-transactional-view-insert',
    title: 'Write to the Source Table',
    category: 'scripting',
    code: `INSERT vw_t::users [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
];`,
  };

export const scriptingTransactionalViewQueryExample: CodeExample = {
    id: 'scripting-transactional-view-query',
    title: 'Query the Transactional View',
    category: 'scripting',
    code: `FROM vw_t::active_users
sort { id: asc }`,
    expected: `id | name
---+------
1  | Alice`,
  };

export const scriptingViewsOverviewExamples: CodeExample[] = [
  scriptingDeferredViewExample,
  scriptingDeferredViewQueryExample,
  scriptingTransactionalViewExample,
  scriptingTransactionalViewInsertExample,
  scriptingTransactionalViewQueryExample,
];
