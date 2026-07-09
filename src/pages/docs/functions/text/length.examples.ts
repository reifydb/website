import type { CodeExample } from '@/lib/examples/types';

export const functionsTextLengthExamples: CodeExample[] = [
{
    id: 'text-length-filter',
    title: 'Filter by minimum length',
    category: 'function',
    code: `from app::posts
filter { text::length(content) > 100 }`,
    expected: `(empty)`,
  },
{
    id: 'text-length-charcount',
    title: 'Add character count field',
    category: 'function',
    code: `from app::articles
extend { char_count: text::length(body) }`,
    expected: `id | body                                                                       | char_count
---+----------------------------------------------------------------------------+-----------
4  | Performance optimization strategies for large datasets.                    | 55
3  | Best practices for data modeling in document databases.                    | 55
2  | Advanced query techniques using RQL expressions and transforms.            | 63
1  | Introduction to ReifyDB and its powerful features for modern applications. | 74`,
  },
{
    id: 'text-length-validate',
    title: 'Validate input length',
    category: 'function',
    code: `from app::usernames
filter { text::length(username) >= 3 and text::length(username) <= 20 }`,
    expected: `id | username
---+-------------
4  | david_brown
3  | carol_wilson
2  | bob_jones
1  | alice_smith`,
  },
];
