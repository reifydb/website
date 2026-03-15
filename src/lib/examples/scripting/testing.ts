import type { CodeExample } from '../index';

export const scriptingTestingExamples: CodeExample[] = [
  {
    id: 'scripting-create-test',
    title: 'Create and Run Tests',
    category: 'scripting',
    code: `CREATE NAMESPACE tg;
CREATE TABLE tg::items { id: int4, name: utf8 };

CREATE TEST PROCEDURE tg::seed AS {
  INSERT tg::items [{ id: 1, name: 'one' }, { id: 2, name: 'two' }]
};

CREATE TEST tg::query_all {
  CALL tg::seed();
  FROM tg::items | ASSERT { id > 0 }
};

CREATE TEST tg::filter_one {
  CALL tg::seed();
  FROM tg::items | FILTER name == 'one' | ASSERT { id == 1 }
};

RUN TESTS tg | MAP { name, namespace, outcome }`,
    expected: `name       | namespace | outcome
-----------+-----------+--------
filter_one | tg        | pass
query_all  | tg        | pass`,
  },
  {
    id: 'scripting-assert-literal',
    title: 'Assert Expressions',
    category: 'scripting',
    code: `CREATE NAMESPACE tg_a;

CREATE TEST tg_a::assert_true {
  ASSERT { true }
};

CREATE TEST tg_a::assert_math {
  ASSERT { 2 + 2 == 4 }
};

RUN TESTS tg_a | MAP { name, outcome }`,
    expected: `name        | outcome
------------+--------
assert_math | pass
assert_true | pass`,
  },
];
