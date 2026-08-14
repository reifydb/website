import { durationGetNanosExample as durationGetNanos } from './get_nanos.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DurationGetNanosPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/duration" className="font-bold hover:text-primary-color">duration</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">duration::get_nanos</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Get the nanoseconds component of a duration.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`duration::get_nanos(duration)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border border-border-light overflow-x-auto rounded-md"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody><tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>duration</code></td><td className="p-2 sm:p-3">Duration</td><td className="p-2 sm:p-3">The duration to extract the nanoseconds component from.</td></tr></tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns an Integer representing the nanoseconds component of the duration.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExecutableSnippet title={durationGetNanos.title} initialCode={durationGetNanos.code} />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/duration/get_months" className="text-primary-color hover:underline">duration::get_months</Link>
          <Link to="/docs/functions/duration/get_days" className="text-primary-color hover:underline">duration::get_days</Link>
        </div></section>
      </div>
    </Layout>
  );
}
