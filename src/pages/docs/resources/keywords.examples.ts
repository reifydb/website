import type { CodeExample } from '@/lib/examples/types';

export const resKeywordsColumnsExample: CodeExample = {
    id: 'res-keywords-columns',
    title: 'Columns Named With Keywords',
    code: `create namespace res_kw;
create table res_kw::hops { from: utf8, to: utf8, filter: bool, key: int4 };
insert res_kw::hops [
  { from: "a", to: "b", filter: true, key: 1 },
  { from: "b", to: "c", filter: false, key: 2 }
];
from res_kw::hops sort { key: asc }`,
    expected: `from | to | filter | key
-----+----+--------+----
a    | b  | true   | 1
b    | c  | false  | 2`,
  };

export const resKeywordsBareFailsExample: CodeExample = {
    id: 'res-keywords-bare-fails',
    title: 'A Hard Keyword Cannot Be Referenced Bare',
    description: 'from is read as the start of a new pipeline, so the parser stops with AST_005.',
    code: `from res_kw::hops map { from, to }`,
    expectsError: true,
  };

export const resKeywordsBacktickExample: CodeExample = {
    id: 'res-keywords-backtick',
    title: 'Backticks Turn Any Keyword Into a Name',
    code: `from res_kw::hops
filter { \`filter\` == true }
map { \`from\`, \`to\` }`,
    expected: `from | to
-----+---
a    | b`,
  };

export const resKeywordsSoftExample: CodeExample = {
    id: 'res-keywords-soft',
    title: 'Soft Keywords Work Bare',
    code: `from res_kw::hops map { key, to } sort { key: asc }`,
    expected: `key | to
----+---
1   | b
2   | c`,
  };

export const resKeywordsTableNameExample: CodeExample = {
    id: 'res-keywords-table-name',
    title: 'A Table Named With a Keyword',
    code: `create table res_kw::user { id: int4, role: utf8 };
insert res_kw::user [{ id: 1, role: "admin" }];
from res_kw::user map { id, role }`,
    expected: `id | role
---+------
1  | admin`,
  };

export const resKeywordsExamples: CodeExample[] = [
  resKeywordsColumnsExample,
  resKeywordsBareFailsExample,
  resKeywordsBacktickExample,
  resKeywordsSoftExample,
  resKeywordsTableNameExample,
];
