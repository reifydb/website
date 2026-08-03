import type { CodeExample } from '@/lib/examples/types';

export const textPad_rightInlineExample: CodeExample = {
    id: 'text-pad_right-inline',
    title: 'Pad string on the right',
    category: 'function',
    code: `map {text::pad_right('hi', 5, '0')}`,
  };

export const functionsTextPadRightExamples: CodeExample[] = [
  textPad_rightInlineExample,
];
