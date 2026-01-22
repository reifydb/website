import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function MathRoundPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/math" className="font-bold hover:text-primary-color">
              math
            </Link>
            {' module · Scalar Function'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            math::round
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Round to the nearest integer or decimal place.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`math::round(value, decimal_places)`} />
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
                  <td className="p-3">The number to round</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>decimal_places</code></td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">Number of decimal places to round to (optional)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns the number rounded to the specified number of decimal places. If decimal_places is omitted, rounds to the nearest integer.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Round to 2 decimal places</h3>
          <ExecutableSnippet
            initialCode={`from app.prices
extend { rounded: math::round(price, 2) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Round to nearest integer</h3>
          <ExecutableSnippet
            initialCode={`from app.metrics
extend { rounded_value: math::round(value) }`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/math/floor" className="text-primary-color hover:underline">
              math::floor
            </Link>
            <Link to="/docs/functions/math/ceil" className="text-primary-color hover:underline">
              math::ceil
            </Link>
            <Link to="/docs/functions/math/abs" className="text-primary-color hover:underline">
              math::abs
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
