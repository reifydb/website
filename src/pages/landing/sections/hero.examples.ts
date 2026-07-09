import type { CodeExample } from '@/lib/examples/types';

export const heroExamples: CodeExample[] = [
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
