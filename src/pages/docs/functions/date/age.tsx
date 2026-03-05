import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DateAgePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/date" className="font-bold hover:text-primary-color">date</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">date::age</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Calculate the duration between two dates.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`date::age(date_a, date_b)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>date_a</code></td><td className="p-2 sm:p-3">Date</td><td className="p-2 sm:p-3">The first date</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>date_b</code></td><td className="p-2 sm:p-3">Date</td><td className="p-2 sm:p-3">The second date</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Duration representing the time between the two dates.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="date-age-inline" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/date/diff" className="text-primary-color hover:underline">date::diff</Link><Link to="/docs/functions/date/now" className="text-primary-color hover:underline">date::now</Link></div></section>
      </div>
    </Layout>
  );
}
