import { mathAtan2InlineExample as mathAtan2Inline } from './atan2.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function MathAtan2Page() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/math" className="font-bold hover:text-primary-color">math</Link>
            {' module · Scalar Function'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">math::atan2</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Compute the two-argument arctangent, returning the angle in radians between the positive x-axis and the point (x, y).</p>
        </div>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2><RqlCodeBlock code={`math::atan2(y, x)`} /></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <div className="dialog overflow-x-auto"><table className="w-full">
            <thead className="bg-[#efedfb]"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>y</code></td><td className="p-2 sm:p-3">Number</td><td className="p-2 sm:p-3">The y-coordinate</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>x</code></td><td className="p-2 sm:p-3">Number</td><td className="p-2 sm:p-3">The x-coordinate</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2><p className="text-text-secondary">Returns a Number representing the angle in radians.</p></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={mathAtan2Inline.title} initialCode={mathAtan2Inline.code} />
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/math/atan" className="text-primary-color hover:underline">math::atan</Link><Link to="/docs/functions/math/cos" className="text-primary-color hover:underline">math::cos</Link><Link to="/docs/functions/math/sin" className="text-primary-color hover:underline">math::sin</Link></div></section>
      </div>
    </Layout>
  );
}
