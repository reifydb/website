import type { CodeExample } from '@/lib/examples/types';

export const aggregateBasicExample: CodeExample = {
    id: 'aggregate-basic',
    title: 'Aggregate Basic',
    code: `from app::orders
aggregate { total_revenue: math::sum(total) }`,
  };

export const aggregateGroupByExample: CodeExample = {
    id: 'aggregate-group-by',
    title: 'Aggregate Group By',
    code: `from app::orders
aggregate { revenue: math::sum(total), orders: math::count(id) } by { region }`,
  };

export const aggregateMultiGroupExample: CodeExample = {
    id: 'aggregate-multi-group',
    title: 'Aggregate Multiple Groups',
    code: `from app::orders
aggregate { revenue: math::sum(total) } by { region, status }`,
  };

export const aggregateMultipleFnsExample: CodeExample = {
    id: 'aggregate-multiple-fns',
    title: 'Aggregate Multiple Functions',
    code: `from app::orders
aggregate {
  total: math::sum(total),
  average: math::avg(total),
  smallest: math::min(total),
  largest: math::max(total)
}`,
  };

export const rqlTransformsAggregateExamples: CodeExample[] = [
  aggregateBasicExample,
  aggregateGroupByExample,
  aggregateMultiGroupExample,
  aggregateMultipleFnsExample,
];
