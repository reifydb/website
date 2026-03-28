import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

const transforms = [
  {
    name: 'from',
    description: 'Start your query here. Point it at a table or use inline data.',
    exampleId: 'transform-from',
  },
  {
    name: 'filter',
    description: 'Keep only the rows you want.',
    exampleId: 'transform-filter',
  },
  {
    name: 'extend',
    description: 'Add computed columns to your results.',
    exampleId: 'transform-extend',
  },
  {
    name: 'sort',
    description: 'Order your results by any column.',
    exampleId: 'transform-sort',
  },
  {
    name: 'take',
    description: 'Grab only the first N rows.',
    exampleId: 'transform-take',
  },
  {
    name: 'distinct',
    description: 'Remove duplicate rows.',
    exampleId: 'transform-distinct',
  },
  {
    name: 'aggregate',
    description: 'Summarize your data with counts, sums, averages, and more.',
    exampleId: 'transform-aggregate',
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
            initialCode={getExampleById('transform-pipeline')!.code}
          />
        </section>

        {/* Transform Reference */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-6">Transform Reference</h2>
          <div className="space-y-8">
            {transforms.map((transform) => (
              <div
                key={transform.name}
                className="border-2 border-white/[0.08] p-6"
                id={transform.name}
              >
                <h3 className="text-xl font-black tracking-tight mb-2 text-primary-color">
                  {transform.name}
                </h3>
                <p className="text-text-secondary mb-4">{transform.description}</p>
                <ExecutableSnippet title={transform.name} initialCode={getExampleById(transform.exampleId)!.code} />
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
