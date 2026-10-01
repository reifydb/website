import type { CodeExample } from '@/lib/examples/types';

export const textLengthFilterExample: CodeExample = {
    id: 'text-length-filter',
    title: 'Filter by minimum length',
    code: `from app::posts
filter { text::length(content) > 100 }`,
    expected: `(empty)`,
  };

export const textLengthCharcountExample: CodeExample = {
    id: 'text-length-charcount',
    title: 'Add character count field',
    code: `from app::articles
extend { char_count: text::length(body) }`,
    expected: `id | body                                                                       | char_count | #rownum
---+----------------------------------------------------------------------------+------------+--------
4  | Performance optimization strategies for large datasets.                    | 55         | 4
3  | Best practices for data modeling in document databases.                    | 55         | 3
2  | Advanced query techniques using RQL expressions and transforms.            | 63         | 2
1  | Introduction to ReifyDB and its powerful features for modern applications. | 74         | 1`,
  };

export const textLengthValidateExample: CodeExample = {
    id: 'text-length-validate',
    title: 'Validate input length',
    code: `from app::usernames
filter { text::length(username) >= 3 and text::length(username) <= 20 }`,
    expected: `id | username     | #rownum
---+--------------+--------
4  | david_brown  | 4
3  | carol_wilson | 3
2  | bob_jones    | 2
1  | alice_smith  | 1`,
  };

export const functionsTextLengthExamples: CodeExample[] = [
  textLengthFilterExample,
  textLengthCharcountExample,
  textLengthValidateExample,
];
