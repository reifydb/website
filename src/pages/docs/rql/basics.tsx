import { Link } from 'react-router-dom';
import { DocsLayout } from '../docs-layout';
import { RqlCodeBlock, Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';

export function RqlBasicsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            RQL Basics
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL (Relational Query Language) is a query language designed for application state.
          </p>
        </div>

        {/* What is RQL */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What is RQL?</h2>
          <p className="text-text-secondary mb-4">
            RQL is a pipeline-based query language. You start with a data source and apply
            transforms to filter, select, aggregate, and shape the data.
          </p>
          <p className="text-text-secondary">
            Unlike SQL, RQL reads top-to-bottom like a data processing pipeline. Each line
            transforms the data from the previous step.
          </p>
        </section>

        {/* Query Structure */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Query Structure</h2>
          <p className="text-text-secondary mb-4">
            Every RQL query starts with a data source, followed by transforms:
          </p>
          <RqlCodeBlock
            code={`from app.users          # Start with a table
filter age >= 18         # Filter rows
select name, email       # Choose columns`}
          />
          <p className="text-text-muted text-sm mt-3">
            Transforms are separated by newlines. Each transform operates on the result of the previous one.
          </p>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Data Sources</h2>
          <p className="text-text-secondary mb-4">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">from</code> transform specifies where data comes from.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Tables</h3>
          <p className="text-text-secondary mb-3">
            Query data from a table:
          </p>
          <RqlCodeBlock code={`from app.users`} />

          <h3 className="text-lg font-bold mt-6 mb-3">Inline Data</h3>
          <p className="text-text-secondary mb-3">
            Query inline arrays for prototyping:
          </p>
          <ExecutableSnippet
            title="Try it"
            initialCode={`from [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob"}
]`}
          />
        </section>

        {/* Comments */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Comments</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">#</code> for single-line comments:
          </p>
          <RqlCodeBlock
            code={`# This is a comment
from app.users
filter active == true  # Inline comment`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">/* */</code> for block comments:
          </p>
          <RqlCodeBlock
            code={`/*
  Multi-line comment
  describing the query
*/
from app.users`}
          />
        </section>

        {/* Literals */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Literals</h2>
          <p className="text-text-secondary mb-4">
            RQL supports these literal types:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Type</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default">Strings</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">"hello" or 'hello'</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default">Numbers</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">42, 3.14, 1_000_000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default">Booleans</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">true, false</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Undefined</td>
                  <td className="px-4 py-2 font-mono text-xs">undefined</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps */}
        <Callout variant="tip" title="Next Steps">
          Learn about the available transforms in{' '}
          <Link to="/docs/rql/transforms" className="text-primary-color hover:underline font-medium">
            Transforms
          </Link>.
        </Callout>
      </div>
    </DocsLayout>
  );
}
