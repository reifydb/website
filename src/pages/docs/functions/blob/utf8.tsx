import { blobUtf8Example as blobUtf8 } from './utf8.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function BlobUtf8Page() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/blob" className="font-bold hover:text-primary-color">blob</Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">blob::utf8</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Encode or decode a blob as UTF-8 text.</p>
        </div>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`blob::utf8(value)`} />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border border-border-light overflow-x-auto rounded-md">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Name</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border-light">
                  <td className="p-2 sm:p-3"><code>value</code></td>
                  <td className="p-2 sm:p-3">Blob / Utf8</td>
                  <td className="p-2 sm:p-3">The blob to decode or string to encode</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">A UTF-8 string when given a blob, or a blob when given a string.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <ExecutableSnippet title={blobUtf8.title} initialCode={blobUtf8.code} />
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/blob/b58" className="text-primary-color hover:underline">blob::b58</Link>
            <Link to="/docs/functions/blob/b64" className="text-primary-color hover:underline">blob::b64</Link>
            <Link to="/docs/functions/blob/hex" className="text-primary-color hover:underline">blob::hex</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
