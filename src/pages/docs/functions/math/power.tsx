import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function MathPowerPage() {
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
            math::power
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Raise a number to a power (exponentiation).
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`math::power(base, exponent)`} />
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
                  <td className="p-3"><code>base</code></td>
                  <td className="p-3">Number</td>
                  <td className="p-3">The base number</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>exponent</code></td>
                  <td className="p-3">Number</td>
                  <td className="p-3">The power to raise the base to</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns the result of raising the base to the specified exponent (base^exponent).
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Calculate squares</h3>
          <ExecutableSnippet
            initialCode={`from app.numbers
extend { squared: math::power(value, 2) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Compound growth</h3>
          <ExecutableSnippet
            initialCode={`from app.investments
extend { future_value: principal * math::power(1 + rate, years) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Square root (exponent 0.5)</h3>
          <ExecutableSnippet
            initialCode={`from app.data
extend { sqrt_value: math::power(value, 0.5) }`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/math/abs" className="text-primary-color hover:underline">
              math::abs
            </Link>
            <Link to="/docs/functions/math/round" className="text-primary-color hover:underline">
              math::round
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
