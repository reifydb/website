import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelRingBuffersPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Ring Buffers</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A ring buffer is a fixed-capacity store: when it is full, inserting a new
            row evicts the oldest one. It is the shape for "keep the last N" state -
            recent activity, latest readings, bounded logs - without a cleanup job,
            a cron task, or a delete query anywhere.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The last N rows, per key</h2>
          <p className="text-text-secondary mb-4">
            Capacity is declared at creation with{' '}
            <Code>with {'{'} capacity: N {'}'}</Code>. Adding{' '}
            <Code>partition_by</Code> turns one buffer into an independent buffer per
            distinct key combination - "the last N events per region" or "the last N
            actions per user" in a single object. Here each region keeps its own two
            newest events: the third <Code>east</Code> insert evicts the first, while{' '}
            <Code>west</Code> is untouched. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-ring-buffers-partition" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Eviction, step by step</h2>
          <p className="text-text-secondary mb-4">
            An unpartitioned buffer is one queue. Filling it to capacity keeps
            everything:
          </p>
          <ExampleSnippet id="dm-ring-buffers-create" />
          <p className="text-text-secondary mt-4 mb-4">
            One insert past capacity and the oldest row is gone. The write succeeds
            normally; eviction is a property of the store, not an error:
          </p>
          <ExampleSnippet id="dm-ring-buffers-evict" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rows stay mutable</h2>
          <p className="text-text-secondary mb-4">
            Unlike a log, a ring buffer's rows are ordinary rows. You can update them in
            place and delete them ahead of eviction, with the same{' '}
            <Code>filter</Code> semantics as tables:
          </p>
          <ExampleSnippet id="dm-ring-buffers-update" />
          <ExampleSnippet id="dm-ring-buffers-delete" className="mt-4" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Ring buffer or something else?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Bound by <em>count</em>: ring buffer. Bound by <em>age</em>:{' '}
                a table or series with a{' '}
                <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Unbounded, time-ordered history: a{' '}
                <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Derived state that should keep only its newest N rows: a ring-buffer-backed{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
                gives eviction semantics to computed data too.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Everything is transactional">
          Inserts, evictions, updates, and deletes on ring buffers participate in the
          same transactions as every other write. A view over a ring buffer sees
          evictions as ordinary deletes.
        </Callout>
      </div>
    </Layout>
  );
}
