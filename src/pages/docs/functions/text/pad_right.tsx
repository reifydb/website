import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function TextPadRightPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/text" className="font-bold hover:text-primary-color">text</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">text::pad_right</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Pad a string on the right to a specified length.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`text::pad_right(value, length, pad_char)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>value</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The string to pad.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>length</code></td><td className="p-2 sm:p-3">Integer</td><td className="p-2 sm:p-3">The desired total length of the resulting string.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>pad_char</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The character to use for padding.</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Utf8 padded on the right to the specified length.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="text-pad_right-inline" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/text/pad_left" className="text-primary-color hover:underline">text::pad_left</Link><Link to="/docs/functions/text/length" className="text-primary-color hover:underline">text::length</Link></div></section>
      </div>
    </Layout>
  );
}
