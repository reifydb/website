import type { CodeExample } from '@/lib/examples/types';

export const textTrimStartInlineExample: CodeExample = {
    id: 'text-trim_start-inline',
    title: 'Trim leading whitespace',
    category: 'function',
    code: `map {text::trim_start('   hello   ')}`,
  };

export const functionsTextTrimStartExamples: CodeExample[] = [
  textTrimStartInlineExample,
];
