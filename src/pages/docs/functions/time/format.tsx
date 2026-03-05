import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function TimeFormatPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/time" className="font-bold hover:text-primary-color">time</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">time::format</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Format a time value as a string.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`time::format(time_value, format_string)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>time_value</code></td><td className="p-2 sm:p-3">Time</td><td className="p-2 sm:p-3">The time value to format</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>format_string</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The format string specifying the output format</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Utf8 containing the formatted time representation.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExecutableSnippet
            title="Format a time as a string"
            initialCode={`map {time::format(cast('14:30:45', time), '%H:%M:%S')}`}
          />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/time/trunc" className="text-primary-color hover:underline font-semibold">time::trunc</Link>
        </div></section>
      </div>
    </Layout>
  );
}
