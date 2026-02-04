import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TextLengthPage() {
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
            text::length
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get the length of a string.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`text::length(value)`} />
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
                  <td className="p-3">The string to measure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns an integer representing the number of characters in the string.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Filter by minimum length</h3>
          <ExecutableSnippet
            title={getExampleById('text-length-filter')!.title}
            initialCode={getExampleById('text-length-filter')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Add character count field</h3>
          <ExecutableSnippet
            title={getExampleById('text-length-charcount')!.title}
            initialCode={getExampleById('text-length-charcount')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Validate input length</h3>
          <ExecutableSnippet
            title={getExampleById('text-length-validate')!.title}
            initialCode={getExampleById('text-length-validate')!.code}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/text/substring" className="text-primary-color hover:underline">
              text::substring
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
