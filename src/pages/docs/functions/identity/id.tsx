import { identityIdExample as identityId } from './id.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function IdentityIdPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/identity" className="font-bold hover:text-primary-color">identity</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">identity::id</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Get the unique identifier of a record.</p>
        </div>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2><RqlCodeBlock code={`identity::id()`} /></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <p className="text-text-secondary">This function takes no parameters. It operates on the current record context.</p>
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2><p className="text-text-secondary">Returns a Utf8 containing the unique identifier of the current record.</p></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={identityId.title} initialCode={identityId.code} />
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/meta/type" className="text-primary-color hover:underline">meta::type</Link></div></section>
      </div>
    </Layout>
  );
}
