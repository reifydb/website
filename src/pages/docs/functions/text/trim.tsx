import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TextTrimPage() {
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
            text::trim
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Remove leading and trailing whitespace from a string.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`text::trim(value)`} />
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
                  <td className="p-2 sm:p-3">The string to trim</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a new string with leading and trailing whitespace removed.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Clean user input</h3>
          <ExecutableSnippet
            title={getExampleById('text-trim-input')!.title}
            initialCode={getExampleById('text-trim-input')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Filter non-empty strings</h3>
          <ExecutableSnippet
            title={getExampleById('text-trim-filter')!.title}
            initialCode={getExampleById('text-trim-filter')!.code}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/text/length" className="text-primary-color hover:underline">
              text::length
            </Link>
            <Link to="/docs/functions/text/substring" className="text-primary-color hover:underline">
              text::substring
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
