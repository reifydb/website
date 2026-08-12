import type { CodeExample } from '@/lib/examples/types';

export const textTrimEndInlineExample: CodeExample = {
    id: 'text-trim_end-inline',
    title: 'Trim trailing whitespace',
    code: `map {text::trim_end('   hello   ')}`,
  };

export const functionsTextTrimEndExamples: CodeExample[] = [
  textTrimEndInlineExample,
];
