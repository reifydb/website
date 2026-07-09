import type { CodeExample } from '@/lib/examples/types';

export const functionsTextTrimExamples: CodeExample[] = [
{
    id: 'text-trim-input',
    title: 'Clean user input',
    category: 'function',
    code: `from app::inputs
extend { clean_value: text::trim(value) }`,
    expected: `id | value           | clean_value
---+-----------------+------------
4  |    spaces       | spaces
3  | trimmed         | trimmed
2  |   test input    | test input
1  |   hello world   | hello world`,
  },
{
    id: 'text-trim-filter',
    title: 'Filter non-empty strings',
    category: 'function',
    code: `from app::inputs
filter { text::length(value) > 0 }`,
    expected: `id | value
---+----------------
4  |    spaces
3  | trimmed
2  |   test input
1  |   hello world`,
  },
];
