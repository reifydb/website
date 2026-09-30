import { textPadRightInlineExample as textPadRightInline } from './pad_right.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function TextPadRightPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/text" className="font-bold hover:text-primary-color">text</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">text::pad_right</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Pad a string on the right to a specified length.</p>
        </div>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2><RqlCodeBlock code={`text::pad_right(value, length, pad_char)`} /></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <div className="dialog overflow-x-auto"><table className="w-full">
            <thead className="bg-[#efedfb]"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>value</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The string to pad.</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>length</code></td><td className="p-2 sm:p-3">Integer</td><td className="p-2 sm:p-3">The desired total length of the resulting string.</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>pad_char</code></td><td className="p-2 sm:p-3">Utf8</td><td className="p-2 sm:p-3">The character to use for padding.</td></tr>
            </tbody>
          </table></div>
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2><p className="text-text-secondary">Returns a Utf8 padded on the right to the specified length.</p></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={textPadRightInline.title} initialCode={textPadRightInline.code} />
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/text/pad_left" className="text-primary-color hover:underline">text::pad_left</Link><Link to="/docs/functions/text/length" className="text-primary-color hover:underline">text::length</Link></div></section>
      </div>
    </Layout>
  );
}
