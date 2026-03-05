import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function MathTruncatePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/math" className="font-bold hover:text-primary-color">math</Link>
            {' module · Scalar Function'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">math::truncate</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Truncate a number toward zero.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`math::truncate(value)`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><code>value</code></td><td className="p-2 sm:p-3">Number</td><td className="p-2 sm:p-3">The number to truncate</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Number truncated toward zero.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="math-truncate-inline" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/math/round" className="text-primary-color hover:underline">math::round</Link><Link to="/docs/functions/math/floor" className="text-primary-color hover:underline">math::floor</Link><Link to="/docs/functions/math/ceil" className="text-primary-color hover:underline">math::ceil</Link></div></section>
      </div>
    </Layout>
  );
}
