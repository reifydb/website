import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelViewsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Views</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A view is derived state the engine maintains for you. You declare a
            pipeline over source data; ReifyDB builds a dataflow behind it and keeps
            the result materialized as the sources change. Reading a view is a lookup,
            never a recomputation. Two decisions define every view: <em>when</em> it is
            maintained (transactional or deferred) and <em>where</em> its rows live
            (table, ring buffer, or series).
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Transactional views</h2>
          <p className="text-text-secondary mb-4">
            A transactional view is maintained inside the writing transaction: when a
            commit returns, the view is already correct.{' '}
            <Code>create view</Code> and <Code>create transactional view</Code> are
            synonyms. Create the view before writing data, then run the snippets on
            this page in order:
          </p>
          <ExampleSnippet id="dm-views-transactional" />
          <p className="text-text-secondary mt-4 mb-4">
            Write to the source table - there is nothing to refresh and no second
            system to notify:
          </p>
          <ExampleSnippet id="dm-views-transactional-write" />
          <ExampleSnippet id="dm-views-transactional-read" className="mt-4" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rows enter and leave with FILTER</h2>
          <p className="text-text-secondary mb-4">
            When a view's pipeline contains a <Code>filter</Code>, membership follows
            the predicate: a source row that matches appears in the view, and a row
            that stops matching disappears from it.
          </p>
          <ExampleSnippet id="dm-views-filter-membership" />
          <ExampleSnippet id="dm-views-filter-insert" className="mt-4" />
          <ExampleSnippet id="dm-views-filter-read" className="mt-4" />
          <p className="text-text-secondary mt-4 mb-4">
            Deactivate Alice and she leaves the view - no application code deletes
            anything from it:
          </p>
          <ExampleSnippet id="dm-views-filter-leave" />
          <ExampleSnippet id="dm-views-filter-leave-read" className="mt-4" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">GATE: membership as an explicit signal</h2>
          <p className="text-text-secondary mb-4">
            <Code>gate</Code> also controls membership with a boolean expression, but it
            models membership as explicit transitions: a row whose gate flips from
            false to true is recorded as entering the view, changes while true are
            updates, and a flip back to false is recorded as leaving. Use it when
            downstream consumers care about the transition itself, not just the current
            contents:
          </p>
          <ExampleSnippet id="dm-views-gate" />
          <p className="text-text-secondary mt-4 mb-4">
            Bob's <Code>active</Code> flag is currently false. Flip it and he enters
            the gated view:
          </p>
          <ExampleSnippet id="dm-views-gate-enter" />
          <ExampleSnippet id="dm-views-gate-read" className="mt-4" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Deferred views</h2>
          <p className="text-text-secondary mb-4">
            A deferred view is maintained asynchronously, driven by the change stream
            after each commit. Writes stay cheap; the view is eventually consistent and
            catches up moments later. Declare it with{' '}
            <Code>create deferred view</Code>:
          </p>
          <ExampleSnippet id="dm-views-deferred" />
          <ExampleSnippet id="dm-views-deferred-write-read" className="mt-4" />
          <p className="text-text-secondary mt-4 mb-4">
            By the time you read it, the deferred flow has processed the change log -
            here it counts all four orders written on this page, including those
            written before the view existed:
          </p>
          <ExampleSnippet id="dm-views-deferred-read" />
          <p className="text-text-secondary mt-4">
            Choose transactional views for derived state that reads must never see
            stale - balances, inventory, anything an invariant depends on. Choose
            deferred views when a moment of lag is fine and write latency matters -
            dashboards, counters, feeds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Backing storage: table, ring buffer, or series</h2>
          <p className="text-text-secondary mb-4">
            By default a view materializes into table storage. Deferred views can
            instead materialize into a{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>{' '}
            - the derived rows themselves get "keep the last N" semantics:
          </p>
          <ExampleSnippet id="dm-views-ringbuffer-backed" />
          <ExampleSnippet id="dm-views-ringbuffer-write" className="mt-4" />
          <p className="text-text-secondary mt-4 mb-4">
            Three rows flowed into a capacity-2 buffer; the oldest derived row was
            evicted:
          </p>
          <ExampleSnippet id="dm-views-ringbuffer-read" />
          <p className="text-text-secondary mt-4 mb-4">
            A{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>-backed
            view records its output as a keyed, time-ordered history - derived data you
            can range-query like any other series:
          </p>
          <ExampleSnippet id="dm-views-series-backed" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Views compose</h2>
          <p className="text-text-secondary mb-4">
            A view can source from another view, and a single write propagates through
            the whole chain within the same maintenance model:
          </p>
          <ExampleSnippet id="dm-views-chain" />
          <ExampleSnippet id="dm-views-chain-write" className="mt-4" />
          <ExampleSnippet id="dm-views-chain-read" className="mt-4" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Materialized sort order</h2>
          <p className="text-text-secondary mb-4">
            A <Code>sort</Code> inside the view definition materializes the rows in
            that order, so readers get sorted results without sorting at query time:
          </p>
          <ExampleSnippet id="dm-views-sorted" />
        </section>

        <Callout variant="note" title="Create views before writing data">
          A view tracks changes from the moment it exists. Transactional views reflect
          writes that happen after their creation, so declare views alongside your
          tables, before data starts flowing. Deferred views are driven by the change
          log and can also process earlier writes, as the order count above shows.
        </Callout>
      </div>
    </Layout>
  );
}
