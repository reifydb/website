import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

export function IsAnonymousPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/is" className="font-bold hover:text-primary-color">is</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">is::anonymous</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Check if the current user is anonymous (not authenticated).</p>
        </div>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2><RqlCodeBlock code={`is::anonymous()`} /></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">This function takes no parameters.</p>
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2><p className="text-text-secondary">Returns a Boolean indicating whether the current user is anonymous (not authenticated).</p></section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExampleSnippet id="is-anonymous" />
        </section>
        <section><h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/is/root" className="text-primary-color hover:underline font-mono">is::root</Link></div></section>
      </div>
    </Layout>
  );
}
