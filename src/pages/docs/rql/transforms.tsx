import { transformPipelineExample as transformPipeline, transformFromExample as transformFrom, transformFilterExample as transformFilter, transformExtendExample as transformExtend, transformSortExample as transformSort, transformTakeExample as transformTake, transformDistinctExample as transformDistinct, transformAggregateExample as transformAggregate } from './transforms.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';

const transforms = [
  {
    name: 'from',
    description: 'Start your query here. Point it at a table or use inline data.',
    example: transformFrom,
  },
  {
    name: 'filter',
    description: 'Keep only the rows you want.',
    example: transformFilter,
  },
  {
    name: 'extend',
    description: 'Add computed columns to your results.',
    example: transformExtend,
  },
  {
    name: 'sort',
    description: 'Order your results by any column.',
    example: transformSort,
  },
  {
    name: 'take',
    description: 'Grab only the first N rows.',
    example: transformTake,
  },
  {
    name: 'distinct',
    description: 'Remove duplicate rows.',
    example: transformDistinct,
  },
  {
    name: 'aggregate',
    description: 'Summarize your data with counts, sums, averages, and more.',
    example: transformAggregate,
  },
];

export function RqlTransformsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Transforms
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Transforms are how you shape your data in RQL. Chain them together to filter,
            compute, and aggregate.
          </p>
        </div>

        {/* Pipeline Concept */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Pipeline Processing</h2>
          <p className="text-text-secondary mb-4">
            Every query is a pipeline. Your data flows from one transform to the next. Each step
            takes the output of the previous one.
          </p>
          <ExecutableSnippet
            title="Pipeline Processing"
            initialCode={transformPipeline.code}
          />
        </section>

        {/* Transform Reference */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-6">Transform Reference</h2>
          <div className="space-y-8">
            {transforms.map((transform) => (
              <div
                key={transform.name}
                className="border-2 border-border-default rounded-md shadow-hard-sm p-6"
                id={transform.name}
              >
                <h3 className="text-xl font-black tracking-tight mb-2 text-primary">
                  {transform.name}
                </h3>
                <p className="text-text-secondary mb-4">{transform.description}</p>
                <ExecutableSnippet title={transform.name} initialCode={transform.example.code} />
              </div>
            ))}
          </div>
        </section>

        {/* Additional Transforms */}
        <Callout variant="info" title="More Transforms">
          More transforms are on the way: <code>derive</code>, <code>deferred</code>, <code>append</code>,{' '}
          <code>union</code>, <code>map</code>, <code>view</code>, <code>with</code>, <code>create</code>,
          and <code>insert</code>. Documentation coming soon.
        </Callout>

        {/* Next Steps */}
        <Callout variant="tip" title="Next Steps">
          Ready for more? Learn about operators and functions in{' '}
          <Link to="/docs/rql/expressions" className="text-primary-color hover:underline font-medium">
            Expressions
          </Link>.
        </Callout>
      </div>
    </Layout>
  );
}
