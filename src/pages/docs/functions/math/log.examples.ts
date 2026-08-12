import type { CodeExample } from '@/lib/examples/types';

export const mathLogInlineExample: CodeExample = {
    id: 'math-log-inline',
    title: 'Calculate natural logarithm',
    code: `map {math::log(cast(2.0, float8))}`,
  };

export const functionsMathLogExamples: CodeExample[] = [
  mathLogInlineExample,
];
