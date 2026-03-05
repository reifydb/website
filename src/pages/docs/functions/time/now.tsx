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
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">time::now</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Get the current time of day.</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`time::now()`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">This function takes no parameters.</p>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Time value representing the current time of day.</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExecutableSnippet
            title="Get the current time"
            initialCode={`map {time::now()}`}
          />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap">
          <Link to="/docs/functions/time/new" className="text-primary-color hover:underline font-semibold">time::new</Link>
          <Link to="/docs/functions/datetime/now" className="text-primary-color hover:underline font-semibold">datetime::now</Link>
        </div></section>
      </div>
    </Layout>
  );
}
