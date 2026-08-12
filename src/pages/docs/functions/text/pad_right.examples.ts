import type { CodeExample } from '@/lib/examples/types';

export const textPadRightInlineExample: CodeExample = {
    id: 'text-pad_right-inline',
    title: 'Pad string on the right',
    code: `map {text::pad_right('hi', 5, '0')}`,
  };

export const functionsTextPadRightExamples: CodeExample[] = [
  textPadRightInlineExample,
];
