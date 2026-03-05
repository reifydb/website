import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DatetimeFromEpochPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/datetime" className="font-bold hover:text-primary-color">datetime</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">datetime::from_epoch</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Create a datetime from a Unix epoch timestamp in seconds.</p>
        </div>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`datetime::from_epoch(seconds)`} />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary"><tr>
                <th className="text-left p-2 sm:p-3 font-bold">Name</th>
                <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                <th className="text-left p-2 sm:p-3 font-bold">Description</th>
              </tr></thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>seconds</code></td>
                  <td className="p-2 sm:p-3">Integer</td>
                  <td className="p-2 sm:p-3">The number of seconds since the Unix epoch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">Returns a Datetime corresponding to the given epoch timestamp in seconds.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="datetime-from_epoch" />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/datetime/epoch" className="border-2 border-border-default px-3 py-1 hover:bg-bg-tertiary transition-colors font-bold text-primary-color">datetime::epoch</Link>
            <Link to="/docs/functions/datetime/from_epoch_millis" className="border-2 border-border-default px-3 py-1 hover:bg-bg-tertiary transition-colors font-bold text-primary-color">datetime::from_epoch_millis</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
