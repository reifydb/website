import type { CodeExample } from '@/lib/examples/types';

export const textPadLeftInlineExample: CodeExample = {
    id: 'text-pad_left-inline',
    title: 'Pad string on the left',
    code: `map {text::pad_left('hi', 5, '0')}`,
  };

export const functionsTextPadLeftExamples: CodeExample[] = [
  textPadLeftInlineExample,
];
