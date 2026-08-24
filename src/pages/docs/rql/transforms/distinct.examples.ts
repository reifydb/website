import type { CodeExample } from '@/lib/examples/types';

export const distinctSingleExample: CodeExample = {
    id: 'distinct-single',
    title: 'One Row per Key',
    code: `create namespace tf_distinct;
create table tf_distinct::visits { id: int4, user: utf8, page: utf8 };
insert tf_distinct::visits [
  { id: 1, user: "ada", page: "/home" },
  { id: 2, user: "grace", page: "/docs" },
  { id: 3, user: "ada", page: "/docs" },
  { id: 4, user: "linus", page: "/home" },
  { id: 5, user: "grace", page: "/docs" }
];
from tf_distinct::visits
distinct { user }`,
    expected: `id | user  | page
---+-------+------
5  | grace | /docs
4  | linus | /home
3  | ada   | /docs`,
  };

export const distinctMultiExample: CodeExample = {
    id: 'distinct-multi',
    title: 'Deduplicate on a Combination of Columns',
    code: `from tf_distinct::visits
distinct { user, page }`,
    expected: `id | user  | page
---+-------+------
5  | grace | /docs
4  | linus | /home
3  | ada   | /docs
1  | ada   | /home`,
  };

export const distinctSortFirstExample: CodeExample = {
    id: 'distinct-sort-first',
    title: 'Sort First to Choose the Survivor',
    code: `from tf_distinct::visits
sort { id: asc }
distinct { user }`,
    expected: `id | user  | page
---+-------+------
1  | ada   | /home
2  | grace | /docs
4  | linus | /home`,
  };

export const distinctProjectExample: CodeExample = {
    id: 'distinct-project',
    title: 'Just the Distinct Values',
    code: `from tf_distinct::visits
distinct { page }
map { page }`,
    expected: `page
-----
/docs
/home`,
  };

export const distinctNoneExample: CodeExample = {
    id: 'distinct-none',
    title: 'none Is a Key Like Any Other',
    code: `create table tf_distinct::signups { id: int4, referrer: Option(utf8) };
insert tf_distinct::signups [
  { id: 1, referrer: "ads" },
  { id: 2 },
  { id: 3, referrer: "ads" },
  { id: 4 }
];
from tf_distinct::signups
distinct { referrer }`,
    expected: `id | referrer
---+---------
4  | ⟪none⟫
3  | ads`,
  };

export const distinctEmptyExample: CodeExample = {
    id: 'distinct-empty',
    title: 'Empty Braces Deduplicate on Nothing',
    code: `from tf_distinct::visits
distinct {}`,
    expected: `id | user  | page
---+-------+------
5  | grace | /docs
4  | linus | /home
3  | ada   | /docs
2  | grace | /docs
1  | ada   | /home`,
  };

export const rqlTransformsDistinctExamples: CodeExample[] = [
  distinctSingleExample,
  distinctMultiExample,
  distinctSortFirstExample,
  distinctProjectExample,
  distinctNoneExample,
  distinctEmptyExample,
];
