import type { CodeExample } from '@/lib/examples/types';

export const transformPipelineExample: CodeExample = {
    id: 'transform-pipeline',
    title: 'A Pipeline, Stage by Stage',
    code: `from [
  { name: "Ada", dept: "eng", salary: 120 },
  { name: "Grace", dept: "eng", salary: 150 },
  { name: "Linus", dept: "ops", salary: 90 },
  { name: "Ken", dept: "ops", salary: 80 }
]
filter { salary > 85 }
extend { bonus: salary / 10 }
sort { salary: desc }
take 2`,
    expected: `dept | name  | salary | bonus
-----+-------+--------+------
eng  | Grace | 150    | 15
eng  | Ada   | 120    | 12`,
  };

export const transformShapeExample: CodeExample = {
    id: 'transform-shape',
    title: 'extend Adds Columns, map Replaces the Column Set',
    code: `from [{ id: 1, name: "Ada", salary: 120 }]
extend { bonus: salary / 10 }
map { name, bonus }`,
    expected: `name | bonus
-----+------
Ada  | 12`,
  };

export const transformAggregateExample: CodeExample = {
    id: 'transform-aggregate',
    title: 'Reduce with aggregate, Then Order',
    code: `from [
  { name: "Ada", dept: "eng", salary: 120.0 },
  { name: "Grace", dept: "eng", salary: 150.0 },
  { name: "Linus", dept: "ops", salary: 90.0 }
]
aggregate { payroll: math::sum(salary), headcount: math::count(name) } by { dept }
sort { dept: asc }`,
    expected: `dept | payroll | headcount
-----+---------+----------
eng  | 270.0   | 2
ops  | 90.0    | 1`,
  };

export const transformTableExample: CodeExample = {
    id: 'transform-table-scan',
    title: 'The Same Operators over a Table',
    code: `create namespace tf;
create table tf::employees { id: int4, name: utf8, dept: utf8, salary: int4 };
insert tf::employees [
  { id: 1, name: "Ada", dept: "eng", salary: 120 },
  { id: 2, name: "Grace", dept: "eng", salary: 150 },
  { id: 3, name: "Linus", dept: "ops", salary: 90 }
];
from tf::employees
filter { dept == "eng" }
map { name, salary }
sort { salary: asc }`,
    expected: `name  | salary | #rownum
------+--------+--------
Ada   | 120    | 1
Grace | 150    | 2`,
  };

export const transformOrderMattersExample: CodeExample = {
    id: 'transform-order-matters',
    title: 'Order Matters: take Before sort Is a Different Query',
    code: `from tf::employees
take 2
sort { salary: desc }
map { name, salary }`,
    expected: `name  | salary | #rownum
------+--------+--------
Grace | 150    | 2
Linus | 90     | 3`,
  };

export const rqlTransformsExamples: CodeExample[] = [
  transformPipelineExample,
  transformShapeExample,
  transformAggregateExample,
  transformTableExample,
  transformOrderMattersExample,
];
