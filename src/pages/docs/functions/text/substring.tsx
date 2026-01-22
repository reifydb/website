import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function TextSubstringPage() {
  return (
    <DocsLayout>
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
          <div className="border-2 border-border-default">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-3 font-bold">Name</th>
                  <th className="text-left p-3 font-bold">Type</th>
                  <th className="text-left p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>value</code></td>
                  <td className="p-3">String</td>
                  <td className="p-3">The string to extract from</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>start</code></td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">The starting index (0-based)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>end</code></td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">The ending index (exclusive)</td>
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
            title="Extract prefix"
            initialCode={`from app.codes
extend { prefix: text::substring(code, 0, 3) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Get first characters</h3>
          <ExecutableSnippet
            title="Get first characters"
            initialCode={`from app.products
extend { initial: text::substring(name, 0, 1) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Extract middle portion</h3>
          <ExecutableSnippet
            title="Extract middle portion"
            initialCode={`from app.identifiers
extend { middle: text::substring(id, 3, 7) }`}
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
    </DocsLayout>
  );
}
