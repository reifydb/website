import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DurationScalePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/duration" className="font-bold hover:text-primary-color">duration</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">duration::scale</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Scale a duration by a numeric factor.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`duration::scale(duration, factor)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>duration</code></td><td className="p-2 sm:p-3">Duration</td><td className="p-2 sm:p-3">The duration to scale.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>factor</code></td><td className="p-2 sm:p-3">Number</td><td className="p-2 sm:p-3">The numeric factor to scale by.</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Duration scaled by the given factor.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="duration-scale" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/duration/add" className="text-primary-color hover:underline">duration::add</Link>
          <Link to="/docs/functions/duration/negate" className="text-primary-color hover:underline">duration::negate</Link>
        </div></section>
      </div>
    </Layout>
  );
}
