import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DatetimeEpochMillisPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/datetime" className="font-bold hover:text-primary-color">datetime</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">datetime::epoch_millis</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Get the Unix epoch timestamp in milliseconds from a datetime.</p>
        </div>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`datetime::epoch_millis(datetime_value)`} />
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
                  <td className="p-2 sm:p-3"><code>datetime_value</code></td>
                  <td className="p-2 sm:p-3">Datetime</td>
                  <td className="p-2 sm:p-3">The datetime to convert to epoch milliseconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">Returns an integer representing the number of milliseconds since the Unix epoch.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="datetime-epoch_millis" />
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
