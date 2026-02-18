import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

const transforms = [
  {
    name: 'from',
    description: 'Start a query with a data source (table or inline data).',
    exampleId: 'transform-from',
  },
  {
    name: 'filter',
    description: 'Keep only rows that match a condition.',
    exampleId: 'transform-filter',
  },
  {
    name: 'select',
    description: 'Choose which columns to include in the output.',
    exampleId: 'transform-select',
  },
  {
    name: 'extend',
    description: 'Add new computed columns.',
    exampleId: 'transform-extend',
  },
  {
    name: 'sort',
    description: 'Order rows by one or more columns.',
    exampleId: 'transform-sort',
  },
  {
    name: 'take',
    description: 'Limit the number of rows returned.',
    exampleId: 'transform-take',
  },
  {
    name: 'distinct',
    description: 'Remove duplicate values.',
    exampleId: 'transform-distinct',
  },
  {
    name: 'join',
    description: 'Combine rows from two tables based on a condition.',
    exampleId: 'transform-join',
  },
  {
    name: 'group',
    description: 'Group rows by one or more columns.',
    exampleId: 'transform-group',
  },
  {
    name: 'aggregate',
    description: 'Compute aggregate values over groups.',
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
            Transforms are the building blocks of RQL queries. Chain them together to filter,
            shape, and aggregate your data.
          </p>
        </div>

        {/* Pipeline Concept */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Pipeline Processing</h2>
          <p className="text-text-secondary mb-4">
            RQL queries are pipelines. Data flows from one transform to the next, with each
            transform modifying the data before passing it on.
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
                className="border-2 border-border-default bg-white p-6"
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
          Additional transforms include <code>derive</code>, <code>deferred</code>, <code>append</code>,{' '}
          <code>union</code>, <code>map</code>, <code>view</code>, <code>with</code>, <code>create</code>,
          and <code>insert</code>. Documentation for these is coming soon.
        </Callout>

        {/* Next Steps */}
        <Callout variant="tip" title="Next Steps">
          Learn about operators and functions in{' '}
          <Link to="/docs/rql/expressions" className="text-primary-color hover:underline font-medium">
            Expressions
          </Link>.
        </Callout>
      </div>
    </Layout>
  );
}
