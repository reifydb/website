import type { CodeExample } from '@/lib/examples/types';

export const execPipelineExample: CodeExample = {
    id: 'exec-pipeline',
    title: 'A Query Is a Pipeline',
    code: `create namespace cpt_exec;
create table cpt_exec::orders { id: int4, total: float8, status: utf8, region: utf8 };
create table cpt_exec::regions { name: utf8, tax: float8 };
insert cpt_exec::regions [{ name: "north", tax: 0.2 }, { name: "south", tax: 0.1 }];
insert cpt_exec::orders [
  { id: 1, total: 150.5, status: "completed", region: "north" },
  { id: 2, total: 89.99, status: "pending", region: "south" },
  { id: 3, total: 245.0, status: "completed", region: "north" },
  { id: 4, total: 55.25, status: "completed", region: "south" },
  { id: 5, total: 320.75, status: "pending", region: "north" }
];
from cpt_exec::orders
filter { status == "completed" }
sort { total: desc }
take 2`,
    expected: `id | total | status    | region
---+-------+-----------+-------
3  | 245   | completed | north
1  | 150.5 | completed | north`,
  };

export const execExplainPipelineExample: CodeExample = {
    id: 'exec-explain-pipeline',
    title: 'The Physical Plan Behind It',
    code: `call rql::explain('from cpt_exec::orders filter { status == "completed" } sort { total: desc } take 2')`,
    expected: `idx | depth | parent | kind      | detail
----+-------+--------+-----------+----------------------------------
0   | 0     | ⟪none⟫ | Take      | 2
1   | 1     | 0      | Sort      | total DESC
2   | 2     | 1      | Filter    | (status == Constant("completed"))
3   | 3     | 2      | TableScan | cpt_exec::orders`,
  };

export const execExplainFoldExample: CodeExample = {
    id: 'exec-explain-fold',
    title: 'Constants Are Folded at Plan Time',
    code: `call rql::explain('from cpt_exec::orders filter { 5 > 3 and total > 0 } map { id, x: 1 + 2 + total }')`,
    expected: `idx | depth | parent | kind      | detail
----+-------+--------+-----------+-------------------------------
0   | 0     | ⟪none⟫ | Map       | id, (Constant(3) + total) as x
1   | 1     | 0      | Filter    | (total > Constant(0))
2   | 2     | 1      | TableScan | cpt_exec::orders`,
  };

export const execExplainBranchExample: CodeExample = {
    id: 'exec-explain-branch',
    title: 'A Constant Branch Disappears',
    code: `call rql::explain('from cpt_exec::orders filter { if true { total > 0 } else { total < 0 } }')`,
    expected: `idx | depth | parent | kind      | detail
----+-------+--------+-----------+----------------------
0   | 0     | ⟪none⟫ | Filter    | (total > Constant(0))
1   | 1     | 0      | TableScan | cpt_exec::orders`,
  };

export const execExplainTwoFiltersExample: CodeExample = {
    id: 'exec-explain-two-filters',
    title: 'Two Filters Stay Two Operators',
    code: `call rql::explain('from cpt_exec::orders filter { total > 100 } filter { status == "completed" }')`,
    expected: `idx | depth | parent | kind      | detail
----+-------+--------+-----------+----------------------------------
0   | 0     | ⟪none⟫ | Filter    | (status == Constant("completed"))
1   | 1     | 0      | Filter    | (total > Constant(100))
2   | 2     | 1      | TableScan | cpt_exec::orders`,
  };

export const execExplainJoinExample: CodeExample = {
    id: 'exec-explain-join',
    title: 'A Join Has Two Inputs',
    code: `call rql::explain('from cpt_exec::orders left join { from cpt_exec::regions } as r using (region, r.name) map { id, r_tax }')`,
    expected: `idx | depth | parent | kind      | detail
----+-------+--------+-----------+------------------------
0   | 0     | ⟪none⟫ | Map       | id, r_tax
1   | 1     | 0      | JoinLeft  | on=[(region == r.name)]
2   | 2     | 1      | TableScan | cpt_exec::orders
3   | 2     | 1      | TableScan | cpt_exec::regions`,
  };

export const execExplainAggregateExample: CodeExample = {
    id: 'exec-explain-aggregate',
    title: 'Blocking Operators in the Plan',
    code: `call rql::explain('from cpt_exec::orders aggregate { revenue: math::sum(total) } by { region } sort { revenue: desc }')`,
    expected: `idx | depth | parent | kind      | detail
----+-------+--------+-----------+----------------------------------------------
0   | 0     | ⟪none⟫ | Sort      | revenue DESC
1   | 1     | 0      | Aggregate | by=[region] map=[math::sum(total) as revenue]
2   | 2     | 1      | TableScan | cpt_exec::orders`,
  };

export const execExplainInlineExample: CodeExample = {
    id: 'exec-explain-inline',
    title: 'Inline Data Is a Source Too',
    code: `call rql::explain('from [{ a: 1 }, { a: 2 }] map { a }')`,
    expected: `idx | depth | parent | kind       | detail
----+-------+--------+------------+----------------
0   | 0     | ⟪none⟫ | Map        | a
1   | 1     | 0      | InlineData | rows=2 fields=2`,
  };

export const architectureVolcanoExamples: CodeExample[] = [
  execPipelineExample,
  execExplainPipelineExample,
  execExplainFoldExample,
  execExplainBranchExample,
  execExplainTwoFiltersExample,
  execExplainJoinExample,
  execExplainAggregateExample,
  execExplainInlineExample,
];
