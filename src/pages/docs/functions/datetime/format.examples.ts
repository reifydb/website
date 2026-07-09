import type { CodeExample } from '@/lib/examples/types';

export const functionsDatetimeFormatExamples: CodeExample[] = [
{
    id: 'datetime-format',
    title: 'Format datetime as string',
    category: 'function',
    code: `map {datetime::format(cast('2024-03-15T14:30:45Z', datetime), '%Y-%m-%dT%H:%M:%SZ')}`,
  },
];
