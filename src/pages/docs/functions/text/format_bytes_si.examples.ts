import type { CodeExample } from '@/lib/examples/types';

export const functionsTextFormatBytesSiExamples: CodeExample[] = [
{
    id: 'text-format_bytes_si-inline',
    title: 'Format bytes (SI)',
    category: 'function',
    code: `map {text::format_bytes_si(cast(1000000, int4))}`,
  },
];
