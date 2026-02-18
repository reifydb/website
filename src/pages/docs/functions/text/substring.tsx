import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TextSubstringPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/text" className="font-bold hover:text-primary-color">
              text
            </Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            text::substring
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Extract a portion of a string.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`text::substring(value, start, end)`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Name</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>value</code></td>
                  <td className="p-2 sm:p-3">String</td>
                  <td className="p-2 sm:p-3">The string to extract from</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>start</code></td>
                  <td className="p-2 sm:p-3">Integer</td>
                  <td className="p-2 sm:p-3">The starting index (0-based)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>end</code></td>
                  <td className="p-2 sm:p-3">Integer</td>
                  <td className="p-2 sm:p-3">The ending index (exclusive)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a new string containing the characters from the start index up to (but not including) the end index.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Extract prefix</h3>
          <ExecutableSnippet
            title={getExampleById('text-substring-prefix')!.title}
            initialCode={getExampleById('text-substring-prefix')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Get first characters</h3>
          <ExecutableSnippet
            title={getExampleById('text-substring-first')!.title}
            initialCode={getExampleById('text-substring-first')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Extract middle portion</h3>
          <ExecutableSnippet
            title={getExampleById('text-substring-middle')!.title}
            initialCode={getExampleById('text-substring-middle')!.code}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/text/length" className="text-primary-color hover:underline">
              text::length
            </Link>
            <Link to="/docs/functions/text/concat" className="text-primary-color hover:underline">
              text::concat
            </Link>
            <Link to="/docs/functions/text/trim" className="text-primary-color hover:underline">
              text::trim
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
