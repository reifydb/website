import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock, Callout } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function MathCountPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/math" className="font-bold hover:text-primary-color">
              math
            </Link>
            {' module · Aggregation Function'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            math::count
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Count the number of rows in a group.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`math::count()`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">
            This function takes no parameters.
          </p>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns the number of rows in the group as an integer.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Count by status</h3>
          <ExecutableSnippet
            title="Count by status"
            initialCode={`from app.users
aggregate math::count() by status`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Count with other aggregations</h3>
          <ExecutableSnippet
            title="Count with other aggregations"
            initialCode={`from app.orders
aggregate {
  order_count: math::count(),
  total_revenue: math::sum(total)
} by region`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Total count</h3>
          <ExecutableSnippet
            title="Total count"
            initialCode={`from app.events
aggregate { total: math::count() }`}
          />
        </section>

        <Callout variant="info">
          This is an aggregation function. Use it with the <code>aggregate</code> transform to compute values across multiple rows.
        </Callout>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/math/sum" className="text-primary-color hover:underline">
              math::sum
            </Link>
            <Link to="/docs/functions/math/avg" className="text-primary-color hover:underline">
              math::avg
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
