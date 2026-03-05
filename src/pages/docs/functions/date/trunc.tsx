import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DateTruncPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/date" className="font-bold hover:text-primary-color">date</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">date::trunc</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Truncate a date to a specified precision (e.g., month, year).</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`date::trunc(date_value, precision)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>date_value</code></td><td className="p-2 sm:p-3">Date</td><td className="p-2 sm:p-3">The date to truncate.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>precision</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The precision to truncate to (e.g., month, year).</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Date truncated to the specified precision.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="date-trunc-inline" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/date/start_of_month" className="text-primary-color hover:underline">date::start_of_month</Link><Link to="/docs/functions/date/start_of_year" className="text-primary-color hover:underline">date::start_of_year</Link></div></section>
      </div>
    </Layout>
  );
}
