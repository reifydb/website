import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DatetimeNewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/datetime" className="font-bold hover:text-primary-color">datetime</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">datetime::new</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Create a new datetime from a date and time.</p>
        </div>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`datetime::new(date, time)`} />
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
                  <td className="p-2 sm:p-3"><code>date</code></td>
                  <td className="p-2 sm:p-3">Date</td>
                  <td className="p-2 sm:p-3">The date component</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>time</code></td>
                  <td className="p-2 sm:p-3">Time</td>
                  <td className="p-2 sm:p-3">The time component</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">Returns a Datetime constructed from the specified date and time.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="datetime-new" />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/datetime/now" className="border-2 border-border-default px-3 py-1 hover:bg-bg-tertiary transition-colors font-bold text-primary-color">datetime::now</Link>
            <Link to="/docs/functions/datetime/from_epoch" className="border-2 border-border-default px-3 py-1 hover:bg-bg-tertiary transition-colors font-bold text-primary-color">datetime::from_epoch</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
