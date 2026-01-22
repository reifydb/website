import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function TextConcatPage() {
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
            text::concat
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Concatenate multiple strings together.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`text::concat(value1, value2, ...)`} />
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
                  <td className="p-3"><code>value1, value2, ...</code></td>
                  <td className="p-3">String</td>
                  <td className="p-3">Two or more strings to concatenate together</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a new string with all input strings joined together in order.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Build full name</h3>
          <ExecutableSnippet
            title="Build full name"
            initialCode={`from app.users
extend { full_name: text::concat(first_name, " ", last_name) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Create display labels</h3>
          <ExecutableSnippet
            title="Create display labels"
            initialCode={`from app.products
extend { label: text::concat(name, " (", sku, ")") }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Build URLs</h3>
          <ExecutableSnippet
            title="Build URLs"
            initialCode={`from app.pages
extend { url: text::concat("/", category, "/", slug) }`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/text/substring" className="text-primary-color hover:underline">
              text::substring
            </Link>
            <Link to="/docs/functions/text/length" className="text-primary-color hover:underline">
              text::length
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
