import { scriptingCreateRingbufferExample as rbCreate, scriptingRbCapacityRequiredExample as rbCapacityRequired, scriptingRbDeleteExample as rbDelete, scriptingRbEvictExample as rbEvict, scriptingRbFillExample as rbFill, scriptingRbPartitionExample as rbPartition, scriptingRbTableOrderExample as rbTableOrder, scriptingRbUpdateExample as rbUpdate, scriptingRbViewInsertExample as rbViewInsert, scriptingRbViewReadExample as rbViewRead, scriptingRbViewSetupExample as rbViewSetup } from './ringbuffers.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RingbuffersPage() {
  return (
    <Layout
      title="Ringbuffers"
      description="Creating and working with ringbuffers in RQL: declaring capacity, eviction of the oldest rows, insertion-order scans, per-partition capacity, updates and deletes, and ringbuffer-backed views."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ringbuffers
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A ringbuffer is a fixed-capacity store: it holds at most the number of rows
            you declare, and inserting past that limit evicts the oldest row. That makes
            "keep the last N" state - recent activity, bounded logs, latest readings -
            a property of the storage itself, with no cleanup job or delete query
            anywhere. This page covers the full DDL and DML surface; for the conceptual
            framing, see{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">Ring Buffers</Link>{' '}
            in the data model section.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a ringbuffer</h2>
          <p className="text-text-secondary mb-4">
            <Code>create ringbuffer</Code> takes the same column list as a table, plus a{' '}
            <Code>with</Code> block that declares the capacity. Like all DDL, it returns
            a confirmation frame that includes the object's catalog id (the snippets on
            this page run against a shared playground engine, so the id you see may
            differ):
          </p>
          <ExecutableSnippet title={rbCreate.title} initialCode={rbCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>capacity</Code> is not optional. A ringbuffer without a bound would
            just be a table, so leaving it out is rejected before anything is created:
          </p>
          <ExecutableSnippet title={rbCapacityRequired.title} initialCode={rbCapacityRequired.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Eviction</h2>
          <p className="text-text-secondary mb-4">
            Up to capacity, a ringbuffer behaves like any other store - inserts
            accumulate and every row stays put:
          </p>
          <ExecutableSnippet title={rbFill.title} initialCode={rbFill.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The next insert crosses the limit, and the engine drops the oldest row to
            make room. The write itself succeeds normally: eviction is bookkeeping, not
            an error, and there is no way to observe a moment where the buffer holds
            four rows:
          </p>
          <ExecutableSnippet title={rbEvict.title} initialCode={rbEvict.code} />
          <p className="text-text-secondary mb-4">
            Eviction happens inside the inserting transaction, so readers either see
            the buffer before the write or after it - never a half-rotated state. A
            multi-row insert that overshoots capacity evicts as many of the oldest rows
            as it needs to.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Scans run in insertion order</h2>
          <p className="text-text-secondary mb-4">
            Both snippets above came back oldest-first. That is the ringbuffer's native
            order: a bare <Code>from</Code> walks the buffer from the oldest surviving
            row to the newest. Regular tables do the opposite - a bare scan returns the
            latest rows first:
          </p>
          <ExecutableSnippet title={rbTableOrder.title} initialCode={rbTableOrder.code} />
          <Callout variant="note" title="Do not rely on scan order across store kinds">
            Insertion order is natural for a buffer you consume as a log, but if a
            pipeline must produce a specific order, say so with an explicit{' '}
            <Code>sort {'{'} column: asc {'}'}</Code> or{' '}
            <Code>sort {'{'} column: desc {'}'}</Code> rather than inheriting whatever
            the underlying store happens to deliver.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Partitioned ringbuffers</h2>
          <p className="text-text-secondary mb-4">
            Adding <Code>partition: {'{'} by: {'{'} col {'}'} {'}'}</Code> to the{' '}
            <Code>with</Code> block splits one ringbuffer into an independent buffer per
            distinct value of the partition columns, each with the full declared
            capacity. "The last two log lines per region" becomes a single object: the
            third <Code>east</Code> insert evicts only the oldest <Code>east</Code> row,
            and <Code>west</Code> keeps its single entry untouched:
          </p>
          <ExecutableSnippet title={rbPartition.title} initialCode={rbPartition.code} />
          <p className="text-text-secondary mb-4">
            Within each partition, rows keep insertion order. The order in which the
            partitions themselves appear in a scan is not defined - group with{' '}
            <Code>sort</Code> if the output order matters. Multiple partition columns
            are allowed (<Code>by: {'{'} region, service {'}'}</Code>), and each unique
            combination gets its own buffer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Updates and deletes</h2>
          <p className="text-text-secondary mb-4">
            A ringbuffer's rows are ordinary rows until eviction takes them. They can be
            updated in place with the same <Code>filter</Code> semantics as tables, and
            the confirmation frame names the store kind:
          </p>
          <ExecutableSnippet title={rbUpdate.title} initialCode={rbUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Deleting does not wait for eviction either - a row can be removed early,
            and the buffer simply holds fewer rows until inserts fill it back up:
          </p>
          <ExecutableSnippet title={rbDelete.title} initialCode={rbDelete.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Ringbuffer or a table with TTL?</h2>
          <p className="text-text-secondary mb-4">
            Both bound growth; they bound different things. A ringbuffer bounds{' '}
            <em>count</em>: it always holds the newest N rows, whether those arrived in
            the last second or the last month. A table or series with a{' '}
            <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">row TTL</Link>{' '}
            bounds <em>age</em>: rows expire on a clock, so a quiet hour leaves the
            store empty and a busy hour leaves it large. Pick by which invariant the
            consumer relies on - "show the last 50 events" is a ringbuffer, "show
            everything from the past 24 hours" is a TTL. For unbounded, time-ordered
            history, use a{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>{' '}
            instead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Ringbuffer-backed views</h2>
          <p className="text-text-secondary mb-4">
            Eviction semantics extend to derived data:{' '}
            <Link to="/docs/scripting/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>{' '}
            can name a ringbuffer as their storage, so a pipeline's output keeps only
            its newest N rows automatically. Declare it by putting{' '}
            <Code>ringbuffer</Code> between the view kind and <Code>view</Code>, and a{' '}
            <Code>capacity</Code> in the <Code>with</Code> block:
          </p>
          <ExecutableSnippet title={rbViewSetup.title} initialCode={rbViewSetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Writes land in the source table as usual:
          </p>
          <ExecutableSnippet title={rbViewInsert.title} initialCode={rbViewInsert.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The view absorbed all three rows but retains only the two newest - the
            capacity applies to the view's own storage, independent of how large the
            source grows:
          </p>
          <ExecutableSnippet title={rbViewRead.title} initialCode={rbViewRead.code} />
          <p className="text-text-secondary mb-4">
            The same shape works for transactional views
            (<Code>create transactional ringbuffer view</Code>). How the two view kinds
            propagate changes is covered in{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">Deferred Views</Link>{' '}
            and{' '}
            <Link to="/docs/scripting/views/transactional" className="text-primary hover:text-primary-light font-medium transition-colors">Transactional Views</Link>.
          </p>
        </section>

        <Callout variant="note" title="Everything is transactional">
          Inserts, evictions, updates, and deletes on ringbuffers commit atomically
          with the rest of the request, like every other write - see{' '}
          <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          A view over a ringbuffer source observes evictions as ordinary deletes.
        </Callout>
      </div>
    </Layout>
  );
}
