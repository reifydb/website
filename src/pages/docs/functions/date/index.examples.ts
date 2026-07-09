import type { CodeExample } from '@/lib/examples/types';

export const functionsDateExamples: CodeExample[] = [
{
    id: 'date-overview-quick',
    title: 'Date Module Quick Example',
    category: 'function',
    code: `from app::records
extend { processed_at: date::now() }`,
  },
];
