import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';

export function MathModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            math Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">math</code> module
            provides mathematical functions and aggregations for numerical data processing.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={`from app.sales
aggregate {
  total_revenue: math::sum(amount),
  avg_sale: math::avg(amount),
  transaction_count: math::count()
} by region`}
          />
        </section>

        {/* Aggregation Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Aggregation Functions</h2>
          <p className="text-text-secondary mb-4">
            Use these functions with the <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm">aggregate</code> transform to compute values across multiple rows.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/math/sum"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::sum</h3>
              <p className="text-text-secondary text-sm">
                Calculate the sum of numeric values
              </p>
            </Link>

            <Link
              to="/docs/functions/math/avg"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::avg</h3>
              <p className="text-text-secondary text-sm">
                Calculate the average of numeric values
              </p>
            </Link>

            <Link
              to="/docs/functions/math/min"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::min</h3>
              <p className="text-text-secondary text-sm">
                Find the minimum value
              </p>
            </Link>

            <Link
              to="/docs/functions/math/max"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::max</h3>
              <p className="text-text-secondary text-sm">
                Find the maximum value
              </p>
            </Link>

            <Link
              to="/docs/functions/math/count"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::count</h3>
              <p className="text-text-secondary text-sm">
                Count the number of rows
              </p>
            </Link>
          </div>
        </section>

        {/* Scalar Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Scalar Functions</h2>
          <p className="text-text-secondary mb-4">
            Transform individual numeric values row-by-row.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/math/abs"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::abs</h3>
              <p className="text-text-secondary text-sm">
                Get the absolute value of a number
              </p>
            </Link>

            <Link
              to="/docs/functions/math/round"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::round</h3>
              <p className="text-text-secondary text-sm">
                Round to the nearest integer or decimal place
              </p>
            </Link>

            <Link
              to="/docs/functions/math/floor"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::floor</h3>
              <p className="text-text-secondary text-sm">
                Round down to the nearest integer
              </p>
            </Link>

            <Link
              to="/docs/functions/math/ceil"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::ceil</h3>
              <p className="text-text-secondary text-sm">
                Round up to the nearest integer
              </p>
            </Link>

            <Link
              to="/docs/functions/math/power"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math::power</h3>
              <p className="text-text-secondary text-sm">
                Raise a number to a power
              </p>
            </Link>
          </div>
        </section>

        {/* Reference Table */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-3 font-bold">Function</th>
                  <th className="text-left p-3 font-bold">Type</th>
                  <th className="text-left p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::sum</code></td>
                  <td className="p-3">Aggregation</td>
                  <td className="p-3">Calculate the sum of numeric values</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::avg</code></td>
                  <td className="p-3">Aggregation</td>
                  <td className="p-3">Calculate the average of numeric values</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::min</code></td>
                  <td className="p-3">Aggregation</td>
                  <td className="p-3">Find the minimum value</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::max</code></td>
                  <td className="p-3">Aggregation</td>
                  <td className="p-3">Find the maximum value</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::count</code></td>
                  <td className="p-3">Aggregation</td>
                  <td className="p-3">Count the number of rows</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::abs</code></td>
                  <td className="p-3">Scalar</td>
                  <td className="p-3">Get the absolute value of a number</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::round</code></td>
                  <td className="p-3">Scalar</td>
                  <td className="p-3">Round to the nearest integer or decimal place</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::floor</code></td>
                  <td className="p-3">Scalar</td>
                  <td className="p-3">Round down to the nearest integer</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::ceil</code></td>
                  <td className="p-3">Scalar</td>
                  <td className="p-3">Round up to the nearest integer</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>math::power</code></td>
                  <td className="p-3">Scalar</td>
                  <td className="p-3">Raise a number to a power</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
