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

        {/* TODO: Commented out - '#' comments not supported yet */}
        {/* Query Structure */}
        {/* <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Query Structure</h2>
          <p className="text-text-secondary mb-4">
            Every RQL query starts with a data source, followed by transforms:
          </p>
          <ExecutableSnippet
            title={getExampleById('rql-query-structure')!.title}
            initialCode={getExampleById('rql-query-structure')!.code}
          />
          <p className="text-text-muted text-sm mt-3">
            Transforms are separated by newlines. Each transform operates on the result of the previous one.
          </p>
        </section> */}

        {/* Data Sources */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Data Sources</h2>
          <p className="text-text-secondary mb-4">
            The <code className="bg-bg-tertiary border border-white/10 px-1.5 py-0.5 rounded text-xs font-mono">from</code> transform specifies where data comes from.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Tables</h3>
          <p className="text-text-secondary mb-3">
            Query data from a table:
          </p>
          <ExecutableSnippet title={getExampleById('rql-tables')!.title} initialCode={getExampleById('rql-tables')!.code} />

          <h3 className="text-lg font-bold mt-6 mb-3">Inline Data</h3>
          <p className="text-text-secondary mb-3">
            Query inline arrays for prototyping:
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
            Use <code className="bg-bg-tertiary border border-white/10 px-1.5 py-0.5 rounded text-xs font-mono">#</code> for single-line comments:
          </p>
          <ExecutableSnippet
            title={getExampleById('rql-single-line-comments')!.title}
            initialCode={getExampleById('rql-single-line-comments')!.code}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Use <code className="bg-bg-tertiary border border-white/10 px-1.5 py-0.5 rounded text-xs font-mono">/* </code> for block comments:
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
            RQL supports these literal types:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl text-sm overflow-hidden">
              <thead>
                <tr className="bg-bg-elevated">
                  <th className="text-left px-4 py-3 border-b border-white/10 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 border-b border-white/10 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="bg-bg-tertiary">
                <tr>
                  <td className="px-4 py-3 border-b border-white/10">Strings</td>
                  <td className="px-4 py-3 border-b border-white/10 font-mono text-xs text-text-secondary">"hello" or 'hello'</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-white/10">Numbers</td>
                  <td className="px-4 py-3 border-b border-white/10 font-mono text-xs text-text-secondary">42, 3.14, 1_000_000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-white/10">Booleans</td>
                  <td className="px-4 py-3 border-b border-white/10 font-mono text-xs text-text-secondary">true, false</td>
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
          Learn about the available transforms in{' '}
          <Link to="/docs/rql/transforms" className="text-primary hover:text-primary-light font-medium transition-colors">
            Transforms
          </Link>.
        </Callout>
      </div>
    </Layout>
  );
}
