import type { CodeExample } from '@/lib/examples/types';

export const textTrimInputExample: CodeExample = {
    id: 'text-trim-input',
    title: 'Clean user input',
    code: `from app::inputs
extend { clean_value: text::trim(value) }`,
    expected: `id | value           | clean_value | #rownum
---+-----------------+-------------+--------
4  |    spaces       | spaces      | 4
3  | trimmed         | trimmed     | 3
2  |   test input    | test input  | 2
1  |   hello world   | hello world | 1`,
  };

export const textTrimFilterExample: CodeExample = {
    id: 'text-trim-filter',
    title: 'Filter non-empty strings',
    code: `from app::inputs
filter { text::length(value) > 0 }`,
    expected: `id | value           | #rownum
---+-----------------+--------
4  |    spaces       | 4
3  | trimmed         | 3
2  |   test input    | 2
1  |   hello world   | 1`,
  };

export const functionsTextTrimExamples: CodeExample[] = [
  textTrimInputExample,
  textTrimFilterExample,
];
