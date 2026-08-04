import { clockAdvanceBasicExample, clockAdvanceAdditiveExample, clockAdvanceRejectsNegativeExample } from './advance.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { Badge } from '@reifydb/ui';

export function ClockAdvancePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/clock" className="font-bold hover:text-primary-color">
              clock
            </Link>
            {' module'}
            <Badge variant="warning" className="ml-2">Internal</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            clock::advance
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Move the mock clock forward, relative to its current value. A procedure, invoked with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">call</code>, not a function
            you can use inside an expression.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`call clock::advance(<amount>)`} />
        </section>

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
                  <td className="p-2 sm:p-3"><code>amount</code></td>
                  <td className="p-2 sm:p-3">integer or duration</td>
                  <td className="p-2 sm:p-3">
                    How far to move the clock forward. A bare integer is milliseconds; a{' '}
                    <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">duration::*</code> value
                    is usually clearer. Must not push the clock before the Unix epoch.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            One row with a single <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">clock</code>{' '}
            column: the resulting time, as a datetime, after advancing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3">{clockAdvanceBasicExample.title}</h3>
              <ExecutableSnippet title={clockAdvanceBasicExample.title} initialCode={clockAdvanceBasicExample.code} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockAdvanceAdditiveExample.title}</h3>
              <ExecutableSnippet title={clockAdvanceAdditiveExample.title} initialCode={clockAdvanceAdditiveExample.code} />
              <p className="text-text-muted text-sm mt-3">
                Each call adds to wherever the clock already is: 30 minutes, then 45 more, lands on 1 hour
                15 minutes past the epoch, not 45 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockAdvanceRejectsNegativeExample.title}</h3>
              <ExecutableSnippet
                title={clockAdvanceRejectsNegativeExample.title}
                initialCode={clockAdvanceRejectsNegativeExample.code}
              />
              <p className="text-text-muted text-sm mt-3">
                A negative duration would move the clock before the Unix epoch, which the mock clock can't
                represent, so the call fails instead of wrapping or clamping.
              </p>
            </div>
          </div>
        </section>

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
