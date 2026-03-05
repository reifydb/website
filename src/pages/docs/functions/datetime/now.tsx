import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function DatetimeNowPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/datetime" className="font-bold hover:text-primary-color">datetime</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">datetime::now</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Get the current datetime.</p>
        </div>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`datetime::now()`} />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">This function takes no parameters.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">Returns a Datetime representing the current date and time.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="datetime-now" />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/datetime/new" className="border-2 border-border-default px-3 py-1 hover:bg-bg-tertiary transition-colors font-bold text-primary-color">datetime::new</Link>
            <Link to="/docs/functions/datetime/age" className="border-2 border-border-default px-3 py-1 hover:bg-bg-tertiary transition-colors font-bold text-primary-color">datetime::age</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
