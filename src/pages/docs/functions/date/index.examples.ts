import type { CodeExample } from '@/lib/examples/types';

export const dateOverviewQuickExample: CodeExample = {
    id: 'date-overview-quick',
    title: 'Date Module Quick Example',
    code: `from app::orders
map { id, year: date::year(order_date), quarter: date::quarter(order_date) }
sort { id: asc }`,
  };

export const functionsDateExamples: CodeExample[] = [
  dateOverviewQuickExample,
];
