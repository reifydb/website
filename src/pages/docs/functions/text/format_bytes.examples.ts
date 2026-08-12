import type { CodeExample } from '@/lib/examples/types';

export const textFormatBytesInlineExample: CodeExample = {
    id: 'text-format_bytes-inline',
    title: 'Format bytes (binary)',
    code: `map {text::format_bytes(cast(1048576, int4))}`,
  };

export const functionsTextFormatBytesExamples: CodeExample[] = [
  textFormatBytesInlineExample,
];
