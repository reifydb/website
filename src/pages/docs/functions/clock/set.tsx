import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { Badge } from '@reifydb/ui';
import {
  clockSetBasicExample,
  clockSetThenNowExample,
  clockSetJumpsBackwardExample,
  clockSetRejectsNegativeExample,
} from './set.examples';

export function ClockSetPage() {
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
            clock::set
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Jump the mock clock to an absolute point in time. A procedure, invoked with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">call</code>, not a function
            you can use inside an expression.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`call clock::set(<point>)`} />
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
                  <td className="p-2 sm:p-3"><code>point</code></td>
                  <td className="p-2 sm:p-3">integer, duration, or datetime</td>
                  <td className="p-2 sm:p-3">
                    Where to set the clock. A bare integer is milliseconds since the Unix epoch; a{' '}
                    <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">duration::*</code> or{' '}
                    <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">datetime::*</code> value
                    works too. Must not be before the Unix epoch.
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
            column: the time you just set, as a datetime.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3">{clockSetBasicExample.title}</h3>
              <ExecutableSnippet title={clockSetBasicExample.title} initialCode={clockSetBasicExample.code} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockSetThenNowExample.title}</h3>
              <ExecutableSnippet title={clockSetThenNowExample.title} initialCode={clockSetThenNowExample.code} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockSetJumpsBackwardExample.title}</h3>
              <ExecutableSnippet
                title={clockSetJumpsBackwardExample.title}
                initialCode={clockSetJumpsBackwardExample.code}
              />
              <p className="text-text-muted text-sm mt-3">
                Unlike{' '}
                <Link to="/docs/functions/clock/advance" className="text-primary-color hover:underline">
                  clock::advance
                </Link>
                , which only ever moves forward,{' '}
                <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">clock::set</code> jumps to
                whatever point you name, earlier included, as long as it isn't before the epoch.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockSetRejectsNegativeExample.title}</h3>
              <ExecutableSnippet
                title={clockSetRejectsNegativeExample.title}
                initialCode={clockSetRejectsNegativeExample.code}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/clock/advance" className="text-primary-color hover:underline">
              clock::advance
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
