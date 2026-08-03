import type { CodeExample } from '@/lib/examples/types';

export const functionsDateExamples: CodeExample[] = [
{
    id: 'date-overview-quick',
    title: 'Date Module Quick Example',
    category: 'function',
    code: `from app::orders
map { id, year: date::year(order_date), quarter: date::quarter(order_date) }
sort { id: asc }`,
  },
];
