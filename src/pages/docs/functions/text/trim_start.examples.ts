import type { CodeExample } from '@/lib/examples/types';

export const textTrim_startInlineExample: CodeExample = {
    id: 'text-trim_start-inline',
    title: 'Trim leading whitespace',
    category: 'function',
    code: `map {text::trim_start('   hello   ')}`,
  };

export const functionsTextTrimStartExamples: CodeExample[] = [
  textTrim_startInlineExample,
];
