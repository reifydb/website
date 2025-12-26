import { Link } from 'react-router-dom';
import { DocsLayout } from '../docs-layout';
import { RqlCodeBlock, Callout } from '../components';

const transforms = [
  {
    name: 'from',
    description: 'Start a query with a data source (table or inline data).',
    example: `from app.users`,
  },
  {
    name: 'filter',
    description: 'Keep only rows that match a condition.',
    example: `from app.users
filter age >= 18`,
  },
  {
    name: 'select',
    description: 'Choose which columns to include in the output.',
    example: `from app.users
select name, email`,
  },
  {
    name: 'extend',
    description: 'Add new computed columns.',
    example: `from app.employees
extend { bonus: salary * 0.1 }`,
  },
  {
    name: 'sort',
    description: 'Order rows by one or more columns.',
    example: `from app.users
sort created_at`,
  },
  {
    name: 'take',
    description: 'Limit the number of rows returned.',
    example: `from app.users
sort created_at
take 10`,
  },
  {
    name: 'distinct',
    description: 'Remove duplicate values.',
    example: `from app.products
distinct { category }`,
  },
  {
    name: 'join',
    description: 'Combine rows from two tables based on a condition.',
    example: `from app.employees
join { from app.departments } dept on dept_id == dept.id`,
  },
  {
    name: 'group',
    description: 'Group rows by one or more columns.',
    example: `from app.orders
group by region`,
  },
  {
    name: 'aggregate',
    description: 'Compute aggregate values over groups.',
    example: `from app.orders
aggregate math::sum(total) by region`,
  },
];

export function RqlTransformsPage() {
  return (
    <DocsLayout>
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
          <RqlCodeBlock
            code={`from app.orders              # Start with orders table
filter status == "completed" # Keep only completed orders
aggregate math::sum(total) by region  # Sum totals per region
sort total                   # Order by total
take 5                       # Top 5 regions`}
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
                <RqlCodeBlock code={transform.example} />
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
    </DocsLayout>
  );
}
