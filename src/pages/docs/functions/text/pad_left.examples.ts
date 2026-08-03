import type { CodeExample } from '@/lib/examples/types';

export const textPad_leftInlineExample: CodeExample = {
    id: 'text-pad_left-inline',
    title: 'Pad string on the left',
    category: 'function',
    code: `map {text::pad_left('hi', 5, '0')}`,
  };

export const functionsTextPadLeftExamples: CodeExample[] = [
  textPad_leftInlineExample,
];
