import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';


export function ClockAdvancePage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/clock" className="font-bold hover:text-primary-color">
              clock
            </Link>
            {' module'}
            <span className="ml-2 text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">Internal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            clock::advance
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Advance the system clock by a specified duration. Used for testing time-dependent logic.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`clock::advance(duration)`} />
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
                  <td className="p-2 sm:p-3"><code>duration</code></td>
                  <td className="p-2 sm:p-3">Duration</td>
                  <td className="p-2 sm:p-3">The duration to advance the clock by</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Nothing. Advances the clock as a side effect.
          </p>
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/clock/set" className="text-primary-color hover:underline">
              clock::set
            </Link>
            <Link to="/docs/functions/clock/now" className="text-primary-color hover:underline">
              clock::now
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
