import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DurationGetMonthsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/duration" className="font-bold hover:text-primary-color">duration</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">duration::get_months</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Get the months component of a duration.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`duration::get_months(duration)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody><tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>duration</code></td><td className="p-2 sm:p-3">Duration</td><td className="p-2 sm:p-3">The duration to extract the months component from.</td></tr></tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns an Integer representing the months component of the duration.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="duration-get_months" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/duration/get_days" className="text-primary-color hover:underline">duration::get_days</Link>
          <Link to="/docs/functions/duration/get_nanos" className="text-primary-color hover:underline">duration::get_nanos</Link>
        </div></section>
      </div>
    </Layout>
  );
}
