import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

function Snippet({ id }: { id: string }) {
  const example = getExampleById(id)!;
  return <ExecutableSnippet title={example.title} initialCode={example.code} />;
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function ConceptsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Application State Database
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB stores, mutates, and derives live application state under one
            transactional model. State lives in memory for low latency, is persisted
            asynchronously for durability, and is queried directly by your frontends:
            ReifyDB is built to replace the backend layer, not to sit behind one.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The problem it replaces</h2>
          <p className="text-text-secondary mb-4">
            Most applications fragment their state across systems: a database for
            persistence, a cache for speed, and background workers that keep derived data
            fresh. Each seam adds failure modes - cache invalidation bugs, stale read
            models, polling jobs that recompute what a write already knew.
          </p>
          <p className="text-text-secondary mb-4">
            ReifyDB collapses those layers into one engine: tables hold authoritative
            state, and views derive from them incrementally as data changes. Run the
            snippets on this page in order. First, a table and two views that aggregate
            it - one <Code>transactional</Code>, one <Code>deferred</Code>:
          </p>
          <Snippet id="concepts-derived-schema" />
          <p className="text-text-secondary mt-4 mb-4">
            Now write to the table. There is no second system to notify and no refresh
            job to schedule:
          </p>
          <Snippet id="concepts-derived-insert" />
          <p className="text-text-secondary mt-4 mb-4">
            The transactional view was maintained by the write itself. Reading it costs a
            lookup, not a recomputation:
          </p>
          <Snippet id="concepts-derived-query" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Transactional or deferred</h2>
          <p className="text-text-secondary mb-4">
            The two views above are kept fresh in different ways, and the difference is
            the main decision you make per view. A <Code>transactional</Code> view is
            maintained inside the writing transaction: when the commit returns, the view
            is already correct, at the cost of doing that work on the write path. A{' '}
            <Code>deferred</Code> view is maintained asynchronously from the change
            stream after the commit: writes stay cheap, and the view catches up moments
            later - it is eventually consistent.
          </p>
          <Snippet id="concepts-deferred-query" />
          <p className="text-text-secondary mt-4 mb-4">
            Use transactional views for derived state that reads must never see stale -
            balances, inventory, anything an invariant depends on. Use deferred views
            when a moment of lag is fine and write latency matters - dashboards,
            counters, feeds. See{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">
              Views
            </Link>{' '}
            for the full comparison.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">State first, queries second</h2>
          <p className="text-text-secondary mb-4">
            In ReifyDB, state is the primary concept and queries are secondary. Tables
            represent authoritative state; views represent derived state, not reports -
            you choose per view how fresh it must be.
          </p>
          <p className="text-text-secondary mb-4">
            Alongside tables and views, the engine has specialized state shapes - ring
            buffers, series, dictionaries - so state that would otherwise live in Redis or
            a custom service participates in the same transactions. A ring buffer, for
            example, is bounded state with eviction built in:
          </p>
          <Snippet id="concepts-ringbuffer" />
          <p className="text-text-muted text-sm mt-3">
            Four rows were inserted into a buffer with capacity three; the oldest was
            evicted. No cleanup job required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">In-memory, asynchronously durable</h2>
          <p className="text-text-secondary mb-4">
            All state changes go through transactions, and a committed change is visible
            immediately - but the commit does not wait for disk. Persistence happens off
            the hot path with bounded latency, and recovery rebuilds state
            deterministically from durable storage.
          </p>
          <p className="text-text-secondary mb-4">
            That trade is deliberate. Application state is read and written on every
            request, so ReifyDB prioritizes predictable low latency over synchronous
            durability on each individual write. See{' '}
            <Link to="/docs/concepts/durability" className="text-primary hover:text-primary-light font-medium transition-colors">
              Durability &amp; Storage
            </Link>{' '}
            for what this means for crash recovery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What ReifyDB is not</h2>
          <p className="text-text-secondary mb-4">
            ReifyDB manages the live, mutable state your application reasons about on
            every request. It is not a BI warehouse and not an analytics engine for
            ad-hoc queries over cold historical data. Those workloads have different
            trade-offs and belong in different systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where to go next</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/quick-start" className="text-primary hover:text-primary-light font-medium transition-colors">Quickstart</Link>{' '}
                - build a live view and watch it maintain itself
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/rql" className="text-primary hover:text-primary-light font-medium transition-colors">RQL in Five Minutes</Link>{' '}
                - the pipeline query language used on this page
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/data-model" className="text-primary hover:text-primary-light font-medium transition-colors">Data Model</Link>{' '}
                - namespaces, tables, and the specialized state shapes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Views</Link>{' '}
                - transactional vs deferred views in depth
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>{' '}
                - the model every state change goes through
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Direct client access">
          ReifyDB runs embedded in your application or as a server that clients connect
          to directly over WebSocket or HTTP. Frontends send queries straight to the
          database - authentication, roles, and policies decide what each identity may
          read and write - so there is no backend API layer to build and maintain.
        </Callout>
      </div>
    </Layout>
  );
}
