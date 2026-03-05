import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function MathEPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/math" className="font-bold hover:text-primary-color">math</Link>
            {' module · Scalar Function'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">math::e</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Return Euler's number (approximately 2.71828).</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`math::e()`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">This function takes no parameters.</p>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Number representing Euler's number (approximately 2.71828).</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="math-e-inline" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/math/pi" className="text-primary-color hover:underline">math::pi</Link><Link to="/docs/functions/math/exp" className="text-primary-color hover:underline">math::exp</Link></div></section>
      </div>
    </Layout>
  );
}
