import type { CodeExample } from '@/lib/examples/types';

export const functionsTextFormatBytesExamples: CodeExample[] = [
{
    id: 'text-format_bytes-inline',
    title: 'Format bytes (binary)',
    category: 'function',
    code: `map {text::format_bytes(cast(1048576, int4))}`,
  },
];
