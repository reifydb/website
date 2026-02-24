import type { ReactNode } from 'react';
import { landingExamples, type CodeExample } from '@/lib/examples';
import { PipelineVisual } from './widgets/pipeline-visual';

export interface ExampleSection {
  id: string;
  title: string;
  subtitle: string;
  example: CodeExample;
  /** Extra content rendered above the snippet. Can be any React tree. */
  body?: ReactNode;
  /** Extra content rendered below the snippet. */
  footer?: ReactNode;
}

const [inlineData, filterAgg, sortLimit] = landingExamples;

export const exampleSections: ExampleSection[] = [
  {
    id: inlineData.id,
    title: inlineData.title,
    subtitle: 'Query data without a database connection',
    example: inlineData,
    body: (
      <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
        <p>
          RQL lets you write queries against inline data: arrays of objects defined directly in the query.
          No tables, no schema setup, no connection required.
        </p>
        <p>
          This is useful for prototyping queries, writing tests, or exploring how RQL transforms work
          before running them against real data.
        </p>
      </div>
    ),
  },
  {
    id: filterAgg.id,
    title: filterAgg.title,
    subtitle: 'Compose transforms into readable pipelines',
    example: filterAgg,
    body: (
      <div className="space-y-4">
        <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
          <p>
            RQL queries read top-to-bottom. Each line is a transform that takes the previous result
            and produces the next. This makes complex queries easy to follow.
          </p>
        </div>
        <PipelineVisual
          steps={[
            { label: 'from', description: '4 rows of order data' },
            { label: 'filter', description: 'Keep completed orders → 3 rows' },
            { label: 'aggregate', description: 'Sum totals by region → 2 rows' },
          ]}
        />
      </div>
    ),
  },
  {
    id: sortLimit.id,
    title: sortLimit.title,
    subtitle: 'Order and paginate results with pipeline syntax',
    example: sortLimit,
    body: (
      <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
        <p>
          Sorting and limiting are composable transforms, just like everything else in RQL.
          Chain <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary">sort</code> and{' '}
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary">take</code> to get
          top-N results in a single readable pipeline.
        </p>
        <p>
          Sort accepts <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary">asc</code> or{' '}
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary">desc</code> per
          column, and you can sort by multiple columns at once.
        </p>
      </div>
    ),
  },
];

export function getSectionById(id: string): ExampleSection | undefined {
  return exampleSections.find((s) => s.id === id);
}
