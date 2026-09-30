import { dmRingBuffersBatchExample as dmRingBuffersBatch, dmRingBuffersCatalogExample as dmRingBuffersCatalog, dmRingBuffersCreateExample as dmRingBuffersCreate, dmRingBuffersDeferredReadExample as dmRingBuffersDeferredRead, dmRingBuffersDeferredViewExample as dmRingBuffersDeferredView, dmRingBuffersDeleteExample as dmRingBuffersDelete, dmRingBuffersDropExample as dmRingBuffersDrop, dmRingBuffersEvictExample as dmRingBuffersEvict, dmRingBuffersFillExample as dmRingBuffersFill, dmRingBuffersNoCapacityExample as dmRingBuffersNoCapacity, dmRingBuffersPartitionExample as dmRingBuffersPartition, dmRingBuffersUpdateExample as dmRingBuffersUpdate, dmRingBuffersViewInsertExample as dmRingBuffersViewInsert, dmRingBuffersViewReadExample as dmRingBuffersViewRead, dmRingBuffersViewSetupExample as dmRingBuffersViewSetup } from './ring-buffers.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelRingBuffersPage() {
  return (
    <Layout
      title="Ring Buffers"
      description="Fixed-capacity storage that evicts its oldest row on insert: capacity, eviction order, partitions, mutability, and how views see evictions."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Ring Buffers</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A ring buffer is a fixed-capacity store: when it is full, inserting a new
            row evicts the oldest one. It is the shape for "keep the last N" state -
            recent activity, latest readings, bounded logs - without a cleanup job,
            a cron task, or a delete query anywhere.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Creating a ring buffer</h2>
          <p className="text-text-secondary mb-4">
            A ring buffer is declared like a{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>{' '}
            with one extra, mandatory clause: <Code>with {'{'} capacity: N {'}'}</Code>.
            The capacity is the maximum number of rows the buffer holds at once. Run the
            snippets on this page in order:
          </p>
          <ExecutableSnippet title={dmRingBuffersCreate.title} initialCode={dmRingBuffersCreate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Eviction, step by step</h2>
          <p className="text-text-secondary mb-4">
            Filling the buffer to capacity keeps everything. Note the read order: a bare
            scan of a ring buffer returns rows oldest first, which is the opposite of a
            bare table scan.
          </p>
          <ExecutableSnippet title={dmRingBuffersFill.title} initialCode={dmRingBuffersFill.code} />
          <p className="text-text-secondary mt-4 mb-4">
            One insert past capacity and the oldest row is gone. The write succeeds
            normally; eviction is a property of the store, not an error:
          </p>
          <ExecutableSnippet title={dmRingBuffersEvict.title} initialCode={dmRingBuffersEvict.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A single batch larger than the capacity behaves the same way, row by row.
            Only the newest <Code>capacity</Code> rows of the batch survive, so user 5
            here never appears at all:
          </p>
          <ExecutableSnippet title={dmRingBuffersBatch.title} initialCode={dmRingBuffersBatch.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">One buffer per partition</h2>
          <p className="text-text-secondary mb-4">
            Adding <Code>partition: {'{'} by: {'{'} col {'}'} {'}'}</Code> to the{' '}
            <Code>with</Code> clause turns one buffer into an independent buffer per
            distinct key - "the last N events per region" or "the last N actions per
            user" in a single object. Each partition has the full capacity. Here the
            third <Code>east</Code> insert evicts the first, while <Code>west</Code> is
            untouched:
          </p>
          <ExecutableSnippet title={dmRingBuffersPartition.title} initialCode={dmRingBuffersPartition.code} />
          <Callout variant="warning" title="Do not update the partition column">
            An <Code>update</Code> that changes a row's partition value is accepted, but
            the row keeps its old physical slot: a later insert into the old partition
            can evict it, and the new partition does not count it. Move a row between
            partitions by deleting it and inserting it again.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Rows stay mutable</h2>
          <p className="text-text-secondary mb-4">
            Unlike a log, a ring buffer's rows are ordinary rows. You can update them in
            place with the same <Code>filter</Code> and <Code>returning</Code> forms as
            tables:
          </p>
          <ExecutableSnippet title={dmRingBuffersUpdate.title} initialCode={dmRingBuffersUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A delete frees a slot. The next insert fills that slot instead of evicting
            anything, so the buffer is back at capacity with nothing lost:
          </p>
          <ExecutableSnippet title={dmRingBuffersDelete.title} initialCode={dmRingBuffersDelete.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Ring buffers and views</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
            can read from a ring buffer like from any other source. Evictions reach the
            view as ordinary deletes, so an aggregate over a full buffer never grows past
            the capacity:
          </p>
          <ExecutableSnippet title={dmRingBuffersViewSetup.title} initialCode={dmRingBuffersViewSetup.code} />
          <ExecutableSnippet title={dmRingBuffersViewInsert.title} initialCode={dmRingBuffersViewInsert.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Four rows went in, one was evicted, and the count reflects that:
          </p>
          <ExecutableSnippet title={dmRingBuffersViewRead.title} initialCode={dmRingBuffersViewRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The reverse also works: a view can itself be stored as a ring buffer, so
            derived rows get eviction semantics too. Add <Code>ringbuffer</Code> before{' '}
            <Code>view</Code> and give it a capacity. Both <Code>deferred</Code> and{' '}
            <Code>transactional</Code> ring-buffer views are supported:
          </p>
          <ExecutableSnippet title={dmRingBuffersDeferredView.title} initialCode={dmRingBuffersDeferredView.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A ring-buffer view keeps only its newest rows, and unlike a plain ring buffer
            it scans newest first:
          </p>
          <ExecutableSnippet title={dmRingBuffersDeferredRead.title} initialCode={dmRingBuffersDeferredRead.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the engine rejects</h2>
          <p className="text-text-secondary mb-4">
            The capacity clause is not optional. Leaving it out is a parse error, not a
            buffer with a default size:
          </p>
          <ExecutableSnippet title={dmRingBuffersNoCapacity.title} initialCode={dmRingBuffersNoCapacity.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>capacity: 0</Code> is accepted, and inserts into such a buffer report
            success, but a read always returns nothing. Treat a zero capacity as a
            mistake, not as "unbounded".
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Catalog and lifecycle</h2>
          <p className="text-text-secondary mb-4">
            Every ring buffer is listed in <Code>system::ringbuffers</Code> with its{' '}
            <Code>id</Code>, <Code>namespace_id</Code>, <Code>name</Code>,{' '}
            <Code>capacity</Code>, and <Code>primary_key_id</Code>. The engine keeps a
            few ring buffers of its own for statistics (for example{' '}
            <Code>statement_stats</Code> and <Code>request_history</Code>), which is why
            the snippet filters by name:
          </p>
          <ExecutableSnippet title={dmRingBuffersCatalog.title} initialCode={dmRingBuffersCatalog.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop ringbuffer</Code> removes the buffer and its rows:
          </p>
          <ExecutableSnippet title={dmRingBuffersDrop.title} initialCode={dmRingBuffersDrop.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Ring buffer or something else?</h2>
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
                Rows that must never disappear on their own: a{' '}
                <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Generated ids: ring buffers accept an <Code>auto_increment</Code> column
                at creation but do not draw from its sequence on insert - see{' '}
                <Link to="/docs/concepts/data-model/sequences" className="text-primary hover:text-primary-light font-medium transition-colors">Sequences</Link>.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Everything is transactional">
          Inserts, evictions, updates, and deletes on ring buffers participate in the
          same transactions as every other write. A statement that fails after inserting
          into a ring buffer rolls the insert and its eviction back together.
        </Callout>
      </div>
    </Layout>
  );
}
