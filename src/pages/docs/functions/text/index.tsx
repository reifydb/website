import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TextModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            text Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">text</code> module
            provides functions for string manipulation and text processing.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={getExampleById('text-overview-quick')!.code}
          />
        </section>

        {/* Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Functions</h2>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/text/lower"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text::lower</h3>
              <p className="text-text-secondary text-sm">
                Convert a string to lowercase
              </p>
            </Link>

            <Link
              to="/docs/functions/text/upper"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text::upper</h3>
              <p className="text-text-secondary text-sm">
                Convert a string to uppercase
              </p>
            </Link>

            <Link
              to="/docs/functions/text/trim"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text::trim</h3>
              <p className="text-text-secondary text-sm">
                Remove leading and trailing whitespace
              </p>
            </Link>

            <Link
              to="/docs/functions/text/length"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text::length</h3>
              <p className="text-text-secondary text-sm">
                Get the length of a string
              </p>
            </Link>

            <Link
              to="/docs/functions/text/concat"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text::concat</h3>
              <p className="text-text-secondary text-sm">
                Concatenate multiple strings together
              </p>
            </Link>

            <Link
              to="/docs/functions/text/substring"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text::substring</h3>
              <p className="text-text-secondary text-sm">
                Extract a portion of a string
              </p>
            </Link>
          </div>
        </section>

        {/* Reference Table */}
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
                  <td className="p-2 sm:p-3"><code>text::lower</code></td>
                  <td className="p-2 sm:p-3">Convert a string to lowercase</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::upper</code></td>
                  <td className="p-2 sm:p-3">Convert a string to uppercase</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::trim</code></td>
                  <td className="p-2 sm:p-3">Remove leading and trailing whitespace</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::length</code></td>
                  <td className="p-2 sm:p-3">Get the length of a string</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::concat</code></td>
                  <td className="p-2 sm:p-3">Concatenate multiple strings together</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::substring</code></td>
                  <td className="p-2 sm:p-3">Extract a portion of a string</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
