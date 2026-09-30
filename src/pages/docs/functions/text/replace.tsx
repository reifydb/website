import { textReplaceInlineExample as textReplaceInline } from './replace.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function TextReplacePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/text" className="font-bold hover:text-primary-color">text</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">text::replace</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Replace all occurrences of a substring with another string.</p>
        </div>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2><RqlCodeBlock code={`text::replace(value, search, replacement)`} /></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <div className="dialog overflow-x-auto"><table className="w-full">
            <thead className="bg-[#efedfb]"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>value</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The original string.</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>search</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The substring to search for.</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>replacement</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The string to replace each occurrence with.</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2><p className="text-text-secondary">Returns a Utf8 with all occurrences of the search substring replaced by the replacement string.</p></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={textReplaceInline.title} initialCode={textReplaceInline.code} />
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/text/contains" className="text-primary-color hover:underline">text::contains</Link><Link to="/docs/functions/text/count" className="text-primary-color hover:underline">text::count</Link></div></section>
      </div>
    </Layout>
  );
}
