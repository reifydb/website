import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function BlobModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">blob Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Functions for encoding and decoding binary data (blobs) to and from various string formats.
          </p>
        </div>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Encoding Functions</h2>
          <p className="text-text-secondary mb-4">Convert between blobs and encoded string representations.</p>
          <div className="grid gap-3">
            <Link to="/docs/functions/blob/b58" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">blob::b58</h3>
              <p className="text-text-secondary text-sm">Encode or decode using Base58</p>
            </Link>
            <Link to="/docs/functions/blob/b64" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">blob::b64</h3>
              <p className="text-text-secondary text-sm">Encode or decode using Base64</p>
            </Link>
            <Link to="/docs/functions/blob/b64url" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">blob::b64url</h3>
              <p className="text-text-secondary text-sm">Encode or decode using URL-safe Base64</p>
            </Link>
            <Link to="/docs/functions/blob/hex" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">blob::hex</h3>
              <p className="text-text-secondary text-sm">Encode or decode using hexadecimal</p>
            </Link>
            <Link to="/docs/functions/blob/utf8" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">blob::utf8</h3>
              <p className="text-text-secondary text-sm">Encode or decode as UTF-8 text</p>
            </Link>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Function</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/blob/b58" className="text-primary-color hover:underline font-bold">blob::b58</Link></td>
                  <td className="p-2 sm:p-3 text-text-secondary">Encode or decode a blob using Base58 encoding</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/blob/b64" className="text-primary-color hover:underline font-bold">blob::b64</Link></td>
                  <td className="p-2 sm:p-3 text-text-secondary">Encode or decode a blob using Base64 encoding</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/blob/b64url" className="text-primary-color hover:underline font-bold">blob::b64url</Link></td>
                  <td className="p-2 sm:p-3 text-text-secondary">Encode or decode a blob using URL-safe Base64 encoding</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/blob/hex" className="text-primary-color hover:underline font-bold">blob::hex</Link></td>
                  <td className="p-2 sm:p-3 text-text-secondary">Encode or decode a blob using hexadecimal encoding</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/blob/utf8" className="text-primary-color hover:underline font-bold">blob::utf8</Link></td>
                  <td className="p-2 sm:p-3 text-text-secondary">Encode or decode a blob as UTF-8 text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
