import type { CodeExample } from '@/lib/examples/types';

export const architectureVolcanoExamples: CodeExample[] = [
{
    id: 'volcano-pipeline',
    title: 'Query Pipeline',
    category: 'rql',
    code: `from app::orders
filter { status == "completed" }
extend { discount: total * 0.1 }
sort {total: desc}
take 5`,
  },
{
    id: 'volcano-scan-filter',
    title: 'Scan and Filter',
    category: 'rql',
    code: `from app::users
filter { age >= 18 and status == "active" }`,
  },
{
    id: 'volcano-aggregate',
    title: 'Aggregate Pipeline',
    category: 'rql',
    code: `from app::orders
filter { status == "completed" }
aggregate { revenue: math::sum(total), orders: math::sum(1) } by { region }
sort {revenue: desc}`,
  },
];
