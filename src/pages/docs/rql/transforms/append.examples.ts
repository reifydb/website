import type { CodeExample } from '@/lib/examples/types';

export const appendViewCreateExample: CodeExample = {
    id: 'append-view-create',
    title: 'A View That Concatenates Two Tables',
    code: `create namespace tf_append;
create table tf_append::web_orders { id: int4, customer: utf8 };
create table tf_append::phone_orders { id: int4, customer: utf8 };
create deferred view tf_append::all_orders { id: int4, customer: utf8 } as {
  from tf_append::web_orders
  append { from tf_append::phone_orders }
};
insert tf_append::web_orders [{ id: 1, customer: "Alice" }, { id: 2, customer: "Bob" }];
insert tf_append::phone_orders [{ id: 3, customer: "Carol" }, { id: 4, customer: "Dan" }]`,
    expected: `namespace | table        | inserted
----------+--------------+---------
tf_append | phone_orders | 2`,
  };

export const appendViewQueryExample: CodeExample = {
    id: 'append-view-query',
    title: 'Rows from Both Sources',
    code: `from tf_append::all_orders sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
1  | Alice    | 2
2  | Bob      | 4
3  | Carol    | 3
4  | Dan      | 5`,
  };

export const appendViewIncrementalInsertExample: CodeExample = {
    id: 'append-view-incremental-insert',
    title: 'An Insert into Either Source Flows Through',
    code: `insert tf_append::phone_orders [{ id: 5, customer: "Eve" }]`,
    expected: `namespace | table        | inserted
----------+--------------+---------
tf_append | phone_orders | 1`,
  };

export const appendViewQueryAgainExample: CodeExample = {
    id: 'append-view-query-again',
    title: 'The View Picked Up the New Row',
    code: `from tf_append::all_orders sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
1  | Alice    | 2
2  | Bob      | 4
3  | Carol    | 3
4  | Dan      | 5
5  | Eve      | 7`,
  };

export const appendViewDeleteExample: CodeExample = {
    id: 'append-view-delete',
    title: 'A Delete Is Retracted from the View',
    code: `delete tf_append::web_orders filter { id == 1 }`,
    expected: `namespace | table      | deleted
----------+------------+--------
tf_append | web_orders | 1`,
  };

export const appendViewQueryAfterDeleteExample: CodeExample = {
    id: 'append-view-query-after-delete',
    title: 'The Deleted Row Is Gone',
    code: `from tf_append::all_orders sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 4
3  | Carol    | 3
4  | Dan      | 5
5  | Eve      | 7`,
  };

export const appendChainedCreateExample: CodeExample = {
    id: 'append-chained-create',
    title: 'Three Sources, Two Appends',
    code: `create table tf_append::store_orders { id: int4, customer: utf8 };
create deferred view tf_append::every_order { id: int4, customer: utf8 } as {
  from tf_append::web_orders
  append { from tf_append::phone_orders }
  append { from tf_append::store_orders }
};
insert tf_append::store_orders [{ id: 6, customer: "Fay" }]`,
    expected: `namespace | table        | inserted
----------+--------------+---------
tf_append | store_orders | 1`,
  };

export const appendChainedQueryExample: CodeExample = {
    id: 'append-chained-query',
    title: 'All Three Sources in One Frame',
    code: `from tf_append::every_order sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 8
3  | Carol    | 5
4  | Dan      | 9
5  | Eve      | 13
6  | Fay      | 6`,
  };

export const appendDuplicatesCreateExample: CodeExample = {
    id: 'append-duplicates-create',
    title: 'Duplicates Are Kept',
    code: `create deferred view tf_append::web_twice { id: int4, customer: utf8 } as {
  from tf_append::web_orders
  append { from tf_append::web_orders }
}`,
    expected: `id    | namespace | view      | created
------+-----------+-----------+--------
16423 | tf_append | web_twice | true`,
  };

export const appendDuplicatesQueryExample: CodeExample = {
    id: 'append-duplicates-query',
    title: 'Each Source Contributes Its Rows',
    code: `from tf_append::web_twice sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 5
2  | Bob      | 4`,
  };

export const appendSubqueryPipelineCreateExample: CodeExample = {
    id: 'append-subquery-pipeline-create',
    title: 'The Appended Side Is a Pipeline',
    code: `create deferred view tf_append::big_ids_a { id: int4, customer: utf8 } as {
  from tf_append::web_orders
  append { from tf_append::phone_orders | filter { id > 4 } }
}`,
    expected: `id    | namespace | view      | created
------+-----------+-----------+--------
16421 | tf_append | big_ids_a | true`,
  };

export const appendSubqueryPipelineQueryExample: CodeExample = {
    id: 'append-subquery-pipeline-query',
    title: 'Only the Filtered Rows of the Appended Side',
    code: `from tf_append::big_ids_a sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 4
5  | Eve      | 7`,
  };

export const appendAfterAppendCreateExample: CodeExample = {
    id: 'append-after-append-create',
    title: 'Operators After append See the Combined Rows',
    code: `create deferred view tf_append::big_ids_c { id: int4, customer: utf8 } as {
  from tf_append::web_orders
  filter { id > 1 }
  append { from tf_append::phone_orders }
  filter { id > 3 }
}`,
    expected: `id    | namespace | view      | created
------+-----------+-----------+--------
16422 | tf_append | big_ids_c | true`,
  };

export const appendAfterAppendQueryExample: CodeExample = {
    id: 'append-after-append-query',
    title: 'Filtered Before and After the Append',
    code: `from tf_append::big_ids_c sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
4  | Dan      | 5
5  | Eve      | 7`,
  };

export const appendTransactionalCreateExample: CodeExample = {
    id: 'append-transactional-create',
    title: 'Append in a Transactional View',
    code: `create table tf_append::tx_a { id: int4, customer: utf8 };
create table tf_append::tx_b { id: int4, customer: utf8 };
create transactional view tf_append::tx_all { id: int4, customer: utf8 } as {
  from tf_append::tx_a
  append { from tf_append::tx_b }
}`,
    expected: `id    | namespace | view   | created
------+-----------+--------+--------
16426 | tf_append | tx_all | true`,
  };

export const appendTransactionalInsertExample: CodeExample = {
    id: 'append-transactional-insert',
    title: 'Insert into Both Transactional Sources',
    code: `insert tf_append::tx_a [{ id: 1, customer: "Ann" }];
insert tf_append::tx_b [{ id: 2, customer: "Ben" }]`,
    expected: `namespace | table | inserted
----------+-------+---------
tf_append | tx_b  | 1`,
  };

export const appendTransactionalQueryExample: CodeExample = {
    id: 'append-transactional-query',
    title: 'Query the Transactional View',
    code: `from tf_append::tx_all sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
1  | Ann      | 2
2  | Ben      | 3`,
  };

export const appendMismatchedShapeExample: CodeExample = {
    id: 'append-mismatched-shape',
    title: 'Sources with Different Columns',
    code: `create table tf_append::labels { id: int4, label: utf8 };
create deferred view tf_append::mixed { id: int4, customer: utf8 } as {
  from tf_append::web_orders
  append { from tf_append::labels }
};
insert tf_append::labels [{ id: 7, label: "vip" }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
tf_append | labels | 1`,
  };

export const appendMismatchedShapeQueryExample: CodeExample = {
    id: 'append-mismatched-shape-query',
    title: 'The View\'s Column List Decides',
    code: `from tf_append::mixed sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 4
7  | ⟪none⟫   | 3`,
  };

export const appendSameRequestWritesExample: CodeExample = {
    id: 'append-same-request-writes',
    title: 'Both Sources Written in One Request',
    code: `insert tf_append::web_orders [{ id: 8, customer: "Hal" }];
insert tf_append::labels [{ id: 9, label: "gold" }]`,
    expected: `namespace | table  | inserted
----------+--------+---------
tf_append | labels | 1`,
  };

export const appendSameRequestQueryExample: CodeExample = {
    id: 'append-same-request-query',
    title: 'The Second Source Was Read with the First One\'s Layout',
    code: `from tf_append::mixed sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 4
7  | ⟪none⟫   | 3
8  | Hal      | 6
9  | ⟪none⟫   | 5`,
  };

export const appendVariableExample: CodeExample = {
    id: 'append-variable',
    title: 'Append One Frame Variable to Another',
    code: `let $rows = from tf_append::web_orders;
let $more = from tf_append::phone_orders;
append $rows from $more;
from $rows sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 2
3  | Carol    | 1
4  | Dan      | 2
5  | Eve      | 3
8  | Hal      | 3`,
  };

export const appendVariablePipeExample: CodeExample = {
    id: 'append-variable-pipe',
    title: 'Filter the Source Before Appending',
    code: `let $rows = from tf_append::web_orders;
let $more = from tf_append::phone_orders;
append $rows from $more | filter { id > 4 };
from $rows sort { id: asc }`,
    expected: `id | customer | #rownum
---+----------+--------
2  | Bob      | 2
5  | Eve      | 3
8  | Hal      | 3`,
  };

export const appendVariableMismatchExample: CodeExample = {
    id: 'append-variable-mismatch',
    title: 'Columns Must Match Exactly',
    description: 'The incoming frame has a label column where the target has customer; the statement fails with RUNTIME_011.',
    code: `let $rows = from tf_append::web_orders;
let $more = from tf_append::labels;
append $rows from $more;
from $rows`,
    expectsError: true,
  };

export const rqlTransformsAppendExamples: CodeExample[] = [
  appendViewCreateExample,
  appendViewQueryExample,
  appendViewIncrementalInsertExample,
  appendViewQueryAgainExample,
  appendViewDeleteExample,
  appendViewQueryAfterDeleteExample,
  appendChainedCreateExample,
  appendChainedQueryExample,
  appendSubqueryPipelineCreateExample,
  appendSubqueryPipelineQueryExample,
  appendAfterAppendCreateExample,
  appendAfterAppendQueryExample,
  appendDuplicatesCreateExample,
  appendDuplicatesQueryExample,
  appendTransactionalCreateExample,
  appendTransactionalInsertExample,
  appendTransactionalQueryExample,
  appendMismatchedShapeExample,
  appendMismatchedShapeQueryExample,
  appendSameRequestWritesExample,
  appendSameRequestQueryExample,
  appendVariableExample,
  appendVariablePipeExample,
  appendVariableMismatchExample,
];
