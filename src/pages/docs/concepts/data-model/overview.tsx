import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function Item({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary font-mono">--</span>
      <span>
        <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{label}</Link>{' '}
        {children}
      </span>
    </li>
  );
}

export function DataModelPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Data Model</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB models application state with a small set of purpose-built
            primitives instead of tables-for-everything. Each storage shape has
            distinct semantics - how rows are kept, ordered, evicted, or derived - and
            all of them participate in the same transactions. This page is the map;
            every primitive has its own page with runnable examples.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Namespaces organize everything</h2>
          <p className="text-text-secondary mb-4">
            Every object lives in a{' '}
            <Link to="/docs/concepts/data-model/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">namespace</Link>{' '}
            and is addressed as <Code>namespace::object</Code>, for example{' '}
            <Code>shop::orders</Code>. Namespaces nest, isolate names, and are the
            natural boundary for environments and tenants. The engine's own catalog is
            exposed the same way, under <Code>system::*</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The storage shapes</h2>
          <p className="text-text-secondary mb-4">
            Six shapes hold rows. Two store what your application asserts, three
            specialize how state is kept, and one derives state from the others:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <Item to="/docs/concepts/data-model/tables" label="Tables">
              - authoritative, mutable state; the primary shape. Typed columns,
              optional columns, auto-increment, primary keys, in-place schema
              evolution.
            </Item>
            <Item to="/docs/concepts/data-model/views" label="Views">
              - derived state the engine maintains incrementally. Transactional
              (correct at commit) or deferred (catches up moments later), materialized
              into table, ring buffer, or series storage.
            </Item>
            <Item to="/docs/concepts/data-model/ring-buffers" label="Ring Buffers">
              - fixed capacity, oldest row evicted when full; optionally one buffer
              per partition key. "Keep the last N" without cleanup jobs.
            </Item>
            <Item to="/docs/concepts/data-model/series" label="Series">
              - rows ordered by a required time or integer key. Measurements, audit
              trails, historical records; range queries follow the key.
            </Item>
            <Item to="/docs/concepts/data-model/dictionaries" label="Dictionaries">
              - value interning: strings stored once, referenced by compact IDs,
              wired into table columns transparently.
            </Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reacting to change</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item to="/docs/concepts/data-model/subscriptions" label="Subscriptions">
              - an append-only change stream over a source, tagged insert / update /
              delete; what a live frontend consumes.
            </Item>
            <Item to="/docs/concepts/data-model/events" label="Events">
              - declared domain events with typed payloads, dispatched inside a
              transaction.
            </Item>
            <Item to="/docs/concepts/data-model/handlers" label="Handlers">
              - reactions bound to event variants; they run synchronously in the
              dispatching transaction and can chain further dispatches.
            </Item>
            <Item to="/docs/concepts/data-model/procedures" label="Procedures">
              - named, callable logic stored next to the data: typed parameters,
              scripted bodies, in-database tests.
            </Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Types and identity</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item to="/docs/concepts/data-model/enums" label="Enums">
              - closed variant sets as column types, with optional payload fields.
            </Item>
            <Item to="/docs/concepts/data-model/tags" label="Tags">
              - variant sets that classify series entries.
            </Item>
            <Item to="/docs/concepts/data-model/sequences" label="Sequences">
              - the counters behind auto-increment columns; inspectable and
              repositionable.
            </Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Access control</h2>
          <p className="text-text-secondary mb-4">
            Because clients query the database directly,{' '}
            <Link to="/docs/concepts/data-model/policies" className="text-primary hover:text-primary-light font-medium transition-colors">policies</Link>{' '}
            replace the API layer as the place where access rules live: row filters,
            column masks, and write constraints per identity, attached to tables,
            views, namespaces, sessions, and procedures. Non-root identities are
            denied by default.
          </p>
        </section>

        <Callout variant="tip" title="Where to start">
          If you are new to ReifyDB, read{' '}
          <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
          and{' '}
          <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Views</Link>{' '}
          first - together they carry most applications. Reach for the specialized
          shapes when a table plus application code starts reimplementing eviction,
          ordering, or interning by hand.
        </Callout>
      </div>
    </Layout>
  );
}
