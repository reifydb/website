import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function RqlBasicsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            RQL Basics
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL is a query language built for the way you actually work with application state.
          </p>
        </div>

        {/* What is RQL */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What is RQL?</h2>
          <p className="text-text-secondary mb-4">
            RQL is pipeline-based. You start with your data and chain transforms to filter,
            aggregate, and shape it.
          </p>
          <p className="text-text-secondary">
            Unlike SQL, RQL reads top to bottom. Each line takes the output of the previous one
            and transforms it. No nested subqueries, no inside-out reading.
          </p>
        </section>

        {/* Query Structure */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Query Structure</h2>
          <p className="text-text-secondary mb-4">
            Every query starts with a data source, then you chain transforms:
          </p>
          <ExecutableSnippet
            title={getExampleById('rql-query-structure')!.title}
            initialCode={getExampleById('rql-query-structure')!.code}
          />
          <p className="text-text-muted text-sm mt-3">
            Each transform operates on the result of the one above it. One line, one step.
          </p>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Data Sources</h2>
          <p className="text-text-secondary mb-4">
            The <code className="bg-bg-tertiary border border-dashed border-black/25 px-1.5 py-0.5 text-xs font-mono">from</code> transform tells RQL where your data lives.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Tables</h3>
          <p className="text-text-secondary mb-3">
            Pull data from a table:
          </p>
          <ExecutableSnippet title={getExampleById('rql-tables')!.title} initialCode={getExampleById('rql-tables')!.code} />

          <h3 className="text-lg font-bold mt-6 mb-3">Inline Data</h3>
          <p className="text-text-secondary mb-3">
            Use inline arrays when you want to prototype without creating a table:
          </p>
          <ExecutableSnippet
            title={getExampleById('rql-inline-data')!.title}
            initialCode={getExampleById('rql-inline-data')!.code}
          />
        </section>

        {/* TODO: Commented out - comments syntax not supported yet */}
        {/* Comments */}
        {/* <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Comments</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary border border-dashed border-black/25 px-1.5 py-0.5 text-xs font-mono">#</code> for single-line comments:
          </p>
          <ExecutableSnippet
            title={getExampleById('rql-single-line-comments')!.title}
            initialCode={getExampleById('rql-single-line-comments')!.code}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Use <code className="bg-bg-tertiary border border-dashed border-black/25 px-1.5 py-0.5 text-xs font-mono">/*</code> for block comments:
          </p>
          <ExecutableSnippet
            title={getExampleById('rql-block-comments')!.title}
            initialCode={getExampleById('rql-block-comments')!.code}
          />
        </section> */}

        {/* Literals */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Literals</h2>
          <p className="text-text-secondary mb-4">
            These are the literal types you can use in RQL:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-dashed border-black/25 text-sm overflow-hidden">
              <thead>
                <tr className="bg-bg-elevated">
                  <th className="text-left px-4 py-3 border-b border-dashed border-black/25 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 border-b border-dashed border-black/25 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="bg-bg-tertiary">
                <tr>
                  <td className="px-4 py-3 border-b border-dashed border-black/25">Strings</td>
                  <td className="px-4 py-3 border-b border-dashed border-black/25 font-mono text-xs text-text-secondary">"hello" or 'hello'</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-dashed border-black/25">Numbers</td>
                  <td className="px-4 py-3 border-b border-dashed border-black/25 font-mono text-xs text-text-secondary">42, 3.14, 1_000_000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-dashed border-black/25">Booleans</td>
                  <td className="px-4 py-3 border-b border-dashed border-black/25 font-mono text-xs text-text-secondary">true, false</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Undefined</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">undefined</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps */}
        <Callout variant="tip" title="Next Steps">
          Now that you know the basics, see what you can do with{' '}
          <Link to="/docs/rql/transforms" className="text-primary hover:text-primary-light font-medium transition-colors">
            Transforms
          </Link>.
        </Callout>
      </div>
    </Layout>
  );
}
