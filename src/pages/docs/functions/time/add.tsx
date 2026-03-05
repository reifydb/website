import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function TimeAddPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/time" className="font-bold hover:text-primary-color">time</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">time::add</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Add a duration to a time value.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`time::add(time_value, duration)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>time_value</code></td><td className="p-2 sm:p-3">Time</td><td className="p-2 sm:p-3">The base time value</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>duration</code></td><td className="p-2 sm:p-3">Duration</td><td className="p-2 sm:p-3">The duration to add</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Time value representing the result of adding the duration to the time.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExecutableSnippet
            title="Add a duration to a time"
            initialCode={`map {time::add(cast('14:30:00', time), cast('PT1H', duration))}`}
          />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/time/subtract" className="text-primary-color hover:underline font-semibold">time::subtract</Link>
          <Link to="/docs/functions/time/diff" className="text-primary-color hover:underline font-semibold">time::diff</Link>
        </div></section>
      </div>
    </Layout>
  );
}
