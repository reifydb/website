import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock, Callout } from '../../components';

export function MathSumPage() {
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
            math::sum
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Calculate the sum of numeric values across multiple rows.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`math::sum(value)`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-3 font-bold">Name</th>
                  <th className="text-left p-3 font-bold">Type</th>
                  <th className="text-left p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>value</code></td>
                  <td className="p-3">Number</td>
                  <td className="p-3">The numeric field to sum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns the total sum of all values in the group.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Calculate total revenue</h3>
          <RqlCodeBlock
            code={`from app.orders
aggregate math::sum(total) by region`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Multiple aggregations</h3>
          <RqlCodeBlock
            code={`from app.sales
aggregate {
  total_revenue: math::sum(amount),
  transaction_count: math::count()
}`}
          />
        </section>

        <Callout variant="info">
          This is an aggregation function. Use it with the <code>aggregate</code> transform to compute values across multiple rows.
        </Callout>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/math/avg" className="text-primary-color hover:underline">
              math::avg
            </Link>
            <Link to="/docs/functions/math/count" className="text-primary-color hover:underline">
              math::count
            </Link>
            <Link to="/docs/functions/math/min" className="text-primary-color hover:underline">
              math::min
            </Link>
            <Link to="/docs/functions/math/max" className="text-primary-color hover:underline">
              math::max
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
