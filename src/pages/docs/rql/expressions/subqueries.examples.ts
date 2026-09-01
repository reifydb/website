import type { CodeExample } from '@/lib/examples/types';

export const subqSetupExample: CodeExample = {
    id: 'subqueries-setup',
    title: 'Tables for This Page',
    code: `create namespace expr_subq;
create table expr_subq::customers { id: int4, name: utf8, region: utf8 };
create table expr_subq::orders { id: int4, customer_id: int4, amount: float8, status: utf8 };
create table expr_subq::regions { region: utf8, manager: utf8 };
insert expr_subq::customers [
  { id: 1, name: "Ada", region: "north" },
  { id: 2, name: "Grace", region: "south" },
  { id: 3, name: "Linus", region: "north" },
  { id: 4, name: "Ken", region: "south" }
];
insert expr_subq::orders [
  { id: 10, customer_id: 1, amount: 120.0, status: "paid" },
  { id: 11, customer_id: 1, amount: 30.0, status: "open" },
  { id: 12, customer_id: 2, amount: 75.0, status: "paid" },
  { id: 13, customer_id: 3, amount: 50.0, status: "cancelled" }
];
insert expr_subq::regions [
  { region: "north", manager: "Nora" },
  { region: "south", manager: "Sam" }
];
from expr_subq::orders
inner join { from expr_subq::customers } as c using (customer_id, c.id)
map { id, customer: c_name, amount }`,
    expected: `id | customer | amount
---+----------+-------
13 | Linus    | 50
12 | Grace    | 75
11 | Ada      | 30
10 | Ada      | 120`,
  };

export const subqFilterInsideExample: CodeExample = {
    id: 'subqueries-filter-inside',
    title: 'A Pipeline Inside the Braces',
    code: `from expr_subq::orders
inner join { from expr_subq::customers | filter { region == "north" } } as c using (customer_id, c.id)
map { id, customer: c_name, region: c_region }`,
    expected: `id | customer | region
---+----------+-------
13 | Linus    | north
11 | Ada      | north
10 | Ada      | north`,
  };

export const subqNoPipeExample: CodeExample = {
    id: 'subqueries-no-pipe',
    title: 'Stages Inside Braces Need Pipes',
    description: 'Whitespace does not chain stages inside a subquery; the parser expects the closing brace and fails with AST_005.',
    code: `from expr_subq::orders
inner join { from expr_subq::customers filter { region == "north" } } as c using (customer_id, c.id)
map { id, customer: c_name }`,
    expectsError: true,
  };

export const subqMapInsideExample: CodeExample = {
    id: 'subqueries-map-inside',
    title: 'Reshape the Right Side First',
    code: `from expr_subq::orders
inner join { from expr_subq::customers | map { id, label: name + " (" + region + ")" } } as c using (customer_id, c.id)`,
    expected: `id | customer_id | amount | status    | c_id | c_label
---+-------------+--------+-----------+------+--------------
13 | 3           | 50     | cancelled | 3    | Linus (north)
12 | 2           | 75     | paid      | 2    | Grace (south)
11 | 1           | 30     | open      | 1    | Ada (north)
10 | 1           | 120    | paid      | 1    | Ada (north)`,
  };

export const subqAggregateInsideExample: CodeExample = {
    id: 'subqueries-aggregate-inside',
    title: 'Join Against an Aggregate',
    code: `from expr_subq::customers
inner join { from expr_subq::orders | filter { status == "paid" } | aggregate { paid: math::sum(amount) } by { customer_id } } as o using (id, o.customer_id)
map { name, paid: o_paid }`,
    expected: `name  | paid
------+-----
Grace | 75
Ada   | 120`,
  };

export const subqSortTakeInsideExample: CodeExample = {
    id: 'subqueries-sort-take-inside',
    title: 'Join Against the Top Row',
    code: `from expr_subq::customers
inner join { from expr_subq::orders | sort { amount: desc } | take 1 } as top using (id, top.customer_id)
map { name, biggest: top_amount }`,
    expected: `name | biggest
-----+--------
Ada  | 120`,
  };

export const subqLeftFilterInsideExample: CodeExample = {
    id: 'subqueries-left-filter-inside',
    title: 'Filter Inside Keeps Unmatched Rows',
    code: `from expr_subq::customers
left join { from expr_subq::orders | filter { status == "paid" } } as o using (id, o.customer_id)
map { name, order_id: o_id, status: o_status }`,
    expected: `name  | order_id | status
------+----------+-------
Ken   | ⟪none⟫   | ⟪none⟫
Linus | ⟪none⟫   | ⟪none⟫
Grace | 12       | paid
Ada   | 10       | paid`,
  };

export const subqLeftFilterAfterExample: CodeExample = {
    id: 'subqueries-left-filter-after',
    title: 'Filter After the Join Drops Them',
    code: `from expr_subq::customers
left join { from expr_subq::orders } as o using (id, o.customer_id)
filter { o_status == "paid" }
map { name, order_id: o_id, status: o_status }`,
    expected: `name  | order_id | status
------+----------+-------
Grace | 12       | paid
Ada   | 10       | paid`,
  };

export const subqNestedExample: CodeExample = {
    id: 'subqueries-nested',
    title: 'A Join Inside a Join',
    code: `from expr_subq::orders
inner join { from expr_subq::customers | inner join { from expr_subq::regions } as r using (region, r.region) } as c using (customer_id, c.id)
map { id, customer: c_name, manager: c_r_manager }`,
    expected: `id | customer | manager
---+----------+--------
13 | Linus    | Nora
12 | Grace    | Sam
11 | Ada      | Nora
10 | Ada      | Nora`,
  };

export const subqViewCreateExample: CodeExample = {
    id: 'subqueries-view-create',
    title: 'Name a Subquery as a View',
    code: `create deferred view expr_subq::paid_orders { id: int4, customer_id: int4, amount: float8 } as {
  from expr_subq::orders
  filter { status == "paid" }
  map { id, customer_id, amount }
}`,
    expected: `id    | namespace | view        | created
------+-----------+-------------+--------
16420 | expr_subq | paid_orders | true`,
  };

export const subqJoinViewExample: CodeExample = {
    id: 'subqueries-join-view',
    title: 'Join Against the View',
    code: `from expr_subq::customers
inner join { from expr_subq::paid_orders } as p using (id, p.customer_id)
map { name, p_amount }`,
    expected: `name  | p_amount
------+---------
Grace | 75
Ada   | 120`,
  };

export const subqViewJoinCreateExample: CodeExample = {
    id: 'subqueries-view-join-create',
    title: 'A Subquery Inside a View Body',
    code: `create deferred view expr_subq::north_orders { id: int4, customer: utf8 } as {
  from expr_subq::orders
  inner join { from expr_subq::customers | filter { region == "north" } } as c using (customer_id, c.id)
  map { id, customer: c_name }
}`,
    expected: `id    | namespace | view         | created
------+-----------+--------------+--------
16422 | expr_subq | north_orders | true`,
  };

export const subqViewJoinQueryExample: CodeExample = {
    id: 'subqueries-view-join-query',
    title: 'Read the View',
    code: `from expr_subq::north_orders`,
    expected: `id | customer
---+---------
13 | Linus
11 | Ada
10 | Ada`,
  };

export const subqAppendViewCreateExample: CodeExample = {
    id: 'subqueries-append-view-create',
    title: 'append Inside a View',
    code: `create deferred view expr_subq::people { name: utf8 } as {
  from expr_subq::customers
  map { name }
  append { from expr_subq::regions | map { name: manager } }
}`,
    expected: `id    | namespace | view   | created
------+-----------+--------+--------
16424 | expr_subq | people | true`,
  };

export const subqAppendViewQueryExample: CodeExample = {
    id: 'subqueries-append-view-query',
    title: 'Both Sources in One View',
    code: `from expr_subq::people`,
    expected: `name
-----
Sam
Nora
Ken
Linus
Grace
Ada`,
  };

export const subqLetPipedExample: CodeExample = {
    id: 'subqueries-let-piped',
    title: 'A Frame Variable as a Named Query',
    code: `let $north = from expr_subq::customers | filter { region == "north" };
from $north`,
    expected: `id | name  | region
---+-------+-------
3  | Linus | north
1  | Ada   | north`,
  };

export const subqInBracesExample: CodeExample = {
    id: 'subqueries-in-braces',
    title: 'No Subquery Inside an Expression',
    description: 'in takes a list literal, never a braced query; the parser fails with AST_005 expecting an opening bracket.',
    code: `from expr_subq::orders
filter { customer_id in { from expr_subq::customers | filter { region == "north" } | map { id } } }`,
    expectsError: true,
  };

export const subqueriesExamples: CodeExample[] = [
  subqSetupExample,
  subqFilterInsideExample,
  subqNoPipeExample,
  subqMapInsideExample,
  subqAggregateInsideExample,
  subqSortTakeInsideExample,
  subqLeftFilterInsideExample,
  subqLeftFilterAfterExample,
  subqNestedExample,
  subqViewCreateExample,
  subqJoinViewExample,
  subqViewJoinCreateExample,
  subqViewJoinQueryExample,
  subqAppendViewCreateExample,
  subqAppendViewQueryExample,
  subqLetPipedExample,
  subqInBracesExample,
];
