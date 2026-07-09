import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsAggregateExamples: CodeExample[] = [
{
    id: 'aggregate-basic',
    title: 'Aggregate Basic',
    category: 'rql',
    code: `from app::orders
aggregate { total_revenue: math::sum(total) }`,
  },
{
    id: 'aggregate-group-by',
    title: 'Aggregate Group By',
    category: 'rql',
    code: `from app::orders
aggregate { revenue: math::sum(total), orders: math::sum(1) } by { region }`,
  },
{
    id: 'aggregate-multi-group',
    title: 'Aggregate Multiple Groups',
    category: 'rql',
    code: `from app::orders
aggregate { revenue: math::sum(total) } by { region, status }`,
  },
{
    id: 'aggregate-multiple-fns',
    title: 'Aggregate Multiple Functions',
    category: 'rql',
    code: `from app::orders
aggregate {
  total: math::sum(total),
  average: math::avg(total),
  smallest: math::min(total),
  largest: math::max(total)
}`,
  },
];
