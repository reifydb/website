import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function MathAbsPage() {
  return (
    <Layout>
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
            math::abs
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get the absolute value of a number.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`math::abs(value)`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Name</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>value</code></td>
                  <td className="p-2 sm:p-3">Number</td>
                  <td className="p-2 sm:p-3">The number to get the absolute value of</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns the absolute value of the input. Negative numbers become positive, positive numbers remain unchanged.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Convert to absolute value</h3>
          <ExecutableSnippet
            title={getExampleById('math-abs-convert')!.title}
            initialCode={getExampleById('math-abs-convert')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Filter by absolute magnitude</h3>
          <ExecutableSnippet
            title={getExampleById('math-abs-filter')!.title}
            initialCode={getExampleById('math-abs-filter')!.code}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/math/round" className="text-primary-color hover:underline">
              math::round
            </Link>
            <Link to="/docs/functions/math/power" className="text-primary-color hover:underline">
              math::power
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
