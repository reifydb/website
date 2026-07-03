import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

function Snippet({ id }: { id: string }) {
  const example = getExampleById(id)!;
  return <ExecutableSnippet title={example.title} initialCode={example.code} />;
}

export function QuickStartPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Quickstart
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Create a table, define a live view over it, and watch ReifyDB keep that view
            up to date as the data changes. Right here in your browser, nothing to install.
          </p>
        </div>

        <Callout variant="info" title="This page is a real database">
          Every snippet below runs against a real ReifyDB engine compiled to WebAssembly.
          Click <strong>Run</strong> on each snippet, top to bottom. You can edit any of them.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">1. Create a table</h2>
          <p className="text-text-secondary mb-4">
            Tables hold authoritative state. Every table lives in a namespace and is addressed
            as <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">namespace::table</code>:
          </p>
          <Snippet id="quickstart-create-table" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">2. Define a live view</h2>
          <p className="text-text-secondary mb-4">
            A transactional view is derived state. You declare the query once; ReifyDB maintains
            the result incrementally, inside the same transaction as every write that affects it.
            No polling, no cache invalidation, no batch refresh:
          </p>
          <Snippet id="quickstart-create-view" />
          <p className="text-text-muted text-sm mt-3">
            The view tracks changes from the moment it is created, so we define it before
            inserting data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">3. Insert rows</h2>
          <p className="text-text-secondary mb-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">INSERT</code> takes
            an array of records:
          </p>
          <Snippet id="quickstart-insert" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">4. Query the table</h2>
          <p className="text-text-secondary mb-4">
            RQL queries are pipelines. Start with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">from</code>, then
            chain steps; each line transforms the output of the line above it:
          </p>
          <Snippet id="quickstart-query-table" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">5. Query the view</h2>
          <p className="text-text-secondary mb-4">
            The view already contains the two open orders. Nothing recomputed the query;
            the inserts themselves maintained it:
          </p>
          <Snippet id="quickstart-query-view" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">6. Change the data</h2>
          <p className="text-text-secondary mb-4">
            Ship the keyboard order:
          </p>
          <Snippet id="quickstart-ship-order" />
          <p className="text-text-secondary mt-4 mb-4">
            Then query the view again. The shipped order is gone, because the view's{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">filter</code> no
            longer matches it:
          </p>
          <Snippet id="quickstart-view-updated" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">7. Aggregate</h2>
          <p className="text-text-secondary mb-4">
            Pipelines end wherever you need them to. Group and aggregate with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">aggregate ... by</code>:
          </p>
          <Snippet id="quickstart-aggregate" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where next</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/rql" className="text-primary hover:text-primary-light font-medium transition-colors">RQL in five minutes</Link>{' '}
                - the query language, one concept at a time
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/installation" className="text-primary hover:text-primary-light font-medium transition-colors">Installation</Link>{' '}
                - run ReifyDB for real, embedded or as a server
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts" className="text-primary hover:text-primary-light font-medium transition-colors">Concepts</Link>{' '}
                - what an application state database is and when to use one
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
