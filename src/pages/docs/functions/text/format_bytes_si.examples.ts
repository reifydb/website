import type { CodeExample } from '@/lib/examples/types';

export const textFormat_bytes_siInlineExample: CodeExample = {
    id: 'text-format_bytes_si-inline',
    title: 'Format bytes (SI)',
    category: 'function',
    code: `map {text::format_bytes_si(cast(1000000, int4))}`,
  };

export const functionsTextFormatBytesSiExamples: CodeExample[] = [
  textFormat_bytes_siInlineExample,
];
