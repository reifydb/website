import type { CodeExample } from '@/lib/examples/types';

export const volcanoPipelineExample: CodeExample = {
    id: 'volcano-pipeline',
    title: 'Query Pipeline',
    code: `from app::orders
filter { status == "completed" }
extend { discount: total * 0.1 }
sort {total: desc}
take 5`,
  };

export const volcanoScanFilterExample: CodeExample = {
    id: 'volcano-scan-filter',
    title: 'Scan and Filter',
    code: `from app::users
filter { age >= 18 and status == "active" }`,
  };

export const volcanoAggregateExample: CodeExample = {
    id: 'volcano-aggregate',
    title: 'Aggregate Pipeline',
    code: `from app::orders
filter { status == "completed" }
aggregate { revenue: math::sum(total), orders: math::count(id) } by { region }
sort {revenue: desc}`,
  };

export const architectureVolcanoExamples: CodeExample[] = [
  volcanoPipelineExample,
  volcanoScanFilterExample,
  volcanoAggregateExample,
];
