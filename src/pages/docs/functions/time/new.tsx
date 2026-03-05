import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function TimeNewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/time" className="font-bold hover:text-primary-color">time</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">time::new</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Create a new time from hour, minute, and second components.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`time::new(hour, minute, second)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>hour</code></td><td className="p-2 sm:p-3">Integer</td><td className="p-2 sm:p-3">The hour component (0-23)</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>minute</code></td><td className="p-2 sm:p-3">Integer</td><td className="p-2 sm:p-3">The minute component (0-59)</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>second</code></td><td className="p-2 sm:p-3">Integer</td><td className="p-2 sm:p-3">The second component (0-59)</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Time value constructed from the given hour, minute, and second components.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExecutableSnippet
            title="Create a new time"
            initialCode={`map {time::new(14, 30, 0)}`}
          />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/time/now" className="text-primary-color hover:underline font-semibold">time::now</Link>
        </div></section>
      </div>
    </Layout>
  );
}
