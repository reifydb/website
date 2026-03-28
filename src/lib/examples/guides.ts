import type { CodeExample } from './index';

export const guideExamples: CodeExample[] = [
  {
    id: 'guide-first-query',
    title: 'Your First Query',
    category: 'guide',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]`,
    expected: `id | name  | role
---+-------+------
1  | Alice | admin
2  | Bob   | user
3  | Carol | user`,
  },
  {
    id: 'guide-filtering-data',
    title: 'Filtering Data',
    category: 'guide',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]
filter { role == "user" }`,
    expected: `id | name  | role
---+-------+-----
2  | Bob   | user
3  | Carol | user`,
  },
  {
    id: 'guide-creating-table',
    title: 'Creating a Table',
    category: 'guide',
    code: `create table app::todos {
  id: int4,
  title: utf8,
  done: bool
}`,
    expected: `namespace | table | created
----------+-------+--------
app       | todos | true`,
  },
  {
    id: 'guide-inserting-data',
    title: 'Inserting Data',
    category: 'guide',
    code: `INSERT app::todos [
  {id: 1, title: "Learn RQL", done: false},
  {id: 2, title: "Build an app", done: false}
]`,
    expected: `namespace | table | inserted
----------+-------+---------
app       | todos | 2`,
  },
  {
    id: 'guide-querying-tables',
    title: 'Querying Tables',
    category: 'guide',
    code: `from app::users
filter { role == "admin" }`,
  },
  {
    id: 'guide-built-in-testing',
    title: 'Built-in Testing',
    category: 'guide',
    code: `CREATE NAMESPACE IF NOT EXISTS tp;
CREATE TABLE IF NOT EXISTS tp::users { id: int4, name: utf8 };

CREATE TEST PROCEDURE tp::seed_users AS {
  INSERT tp::users [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
};

CREATE TEST tp::can_query {
  CALL tp::seed_users();
  FROM tp::users | ASSERT { id > 0 };
};

CREATE TEST tp::can_filter {
  CALL tp::seed_users();
  FROM tp::users | FILTER name == 'Alice' | ASSERT { id == 1 };
};

RUN TESTS tp | map { name, namespace, outcome, message };`,
    expected: `name       | namespace | outcome | message
-----------+-----------+---------+--------
can_filter | tp        | pass    |
can_query  | tp        | pass    |`,
  },
];
