import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function ClockModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            clock Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Functions for reading and controlling the system clock in RQL.
          </p>
        </div>

        {/* Clock Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Clock Functions</h2>
          <p className="text-text-secondary mb-4">
            Read the current time from the system clock.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/clock/now"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">clock::now</h3>
              <p className="text-text-secondary text-sm">
                Get the current clock timestamp
              </p>
            </Link>
          </div>
        </section>

        {/* Internal Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Internal Functions</h2>
          <p className="text-text-secondary mb-4">
            Control the system clock for testing and deterministic replay.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/clock/set"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">
                clock::set
                <span className="ml-2 text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">Internal</span>
              </h3>
              <p className="text-text-secondary text-sm">
                Set the system clock to a specific timestamp
              </p>
            </Link>

            <Link
              to="/docs/functions/clock/advance"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">
                clock::advance
                <span className="ml-2 text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">Internal</span>
              </h3>
              <p className="text-text-secondary text-sm">
                Advance the system clock by a specified duration
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
                  <th className="text-left p-2 sm:p-3 font-bold">Function</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>clock::now</code></td>
                  <td className="p-2 sm:p-3">Clock</td>
                  <td className="p-2 sm:p-3">Get the current clock timestamp</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>clock::set</code></td>
                  <td className="p-2 sm:p-3">Internal</td>
                  <td className="p-2 sm:p-3">Set the system clock to a specific timestamp</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>clock::advance</code></td>
                  <td className="p-2 sm:p-3">Internal</td>
                  <td className="p-2 sm:p-3">Advance the system clock by a specified duration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
