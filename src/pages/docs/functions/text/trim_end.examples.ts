import type { CodeExample } from '@/lib/examples/types';

export const textTrim_endInlineExample: CodeExample = {
    id: 'text-trim_end-inline',
    title: 'Trim trailing whitespace',
    category: 'function',
    code: `map {text::trim_end('   hello   ')}`,
  };

export const functionsTextTrimEndExamples: CodeExample[] = [
  textTrim_endInlineExample,
];
