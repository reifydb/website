import { timeNowExample } from './now.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function TimeNowPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/time" className="font-bold hover:text-primary-color">time</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">time::now</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Get the current time of day.</p>
        </div>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2><RqlCodeBlock code={`time::now()`} /></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <p className="text-text-secondary">This function takes no parameters.</p>
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2><p className="text-text-secondary">Returns a Time value representing the current time of day.</p></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={timeNowExample.title} initialCode={timeNowExample.code} />
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/time/new" className="text-primary-color hover:underline">time::new</Link>
          <Link to="/docs/functions/datetime/now" className="text-primary-color hover:underline">datetime::now</Link>
        </div></section>
      </div>
    </Layout>
  );
}
