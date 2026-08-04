import { clockLifecycleExample } from './index.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Badge } from '@reifydb/ui';
import { ExecutableSnippet } from '@/components/ui';

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
            A mock, settable clock for writing deterministic tests against time-dependent logic, distinct
            from the real wall clock behind <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">date::now()</code> and{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">datetime::now()</code>.
          </p>
        </div>

        {/* Lifecycle example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">set, advance, and now Together</h2>
          <ExecutableSnippet title={clockLifecycleExample.title} initialCode={clockLifecycleExample.code} />
          <p className="text-text-secondary mt-4">
            The clock starts at the Unix epoch and only moves when something explicitly sets or advances
            it, so every read in between is stable and repeatable.
          </p>
        </section>

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

        {/* Internal Procedures */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Internal Procedures</h2>
          <p className="text-text-secondary mb-4">
            Control the mock clock for testing and deterministic replay. These are procedures, invoked
            with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">call</code>, not
            functions you can use inside an expression.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/clock/set"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">
                clock::set
                <Badge variant="warning" className="ml-2">Internal</Badge>
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
                <Badge variant="warning" className="ml-2">Internal</Badge>
              </h3>
              <p className="text-text-secondary text-sm">
                Advance the system clock by a specified duration
              </p>
            </Link>
          </div>
        </section>

        {/* Reference Table */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Invocation</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Kind</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>clock::now()</code></td>
                  <td className="p-2 sm:p-3">Function</td>
                  <td className="p-2 sm:p-3">Get the current mock clock value, in milliseconds</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>call clock::set(point)</code></td>
                  <td className="p-2 sm:p-3">Procedure</td>
                  <td className="p-2 sm:p-3">Jump the mock clock to an absolute point in time</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>call clock::advance(amount)</code></td>
                  <td className="p-2 sm:p-3">Procedure</td>
                  <td className="p-2 sm:p-3">Move the mock clock forward by an amount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
