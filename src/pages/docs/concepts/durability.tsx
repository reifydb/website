import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout, CodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DurabilityPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Durability &amp; Storage</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            ReifyDB decouples commit from disk. A committed write is immediately visible to
            every subsequent transaction - it lives in an in-memory, multi-version store -
            and a background flusher migrates it to persistent storage afterwards. The
            storage backend you choose decides where that persistent copy goes: nowhere
            (pure in-memory), or SQLite files on disk. This page explains the write path,
            what "durable" means for each backend, and exactly what survives a restart.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Choosing a backend</h2>
          <p className="text-text-secondary mb-4">
            The backend is fixed when the database is constructed. The embedded Rust API
            exposes three factories, and the server builder mirrors them
            (<Code>server::memory()</Code>, <Code>server::sqlite(config)</Code>,{' '}
            <Code>server::sqlite_without_buffer(config)</Code>):
          </p>
          <CodeBlock
            language="rust"
            code={`// Nothing persists. Tests, ephemeral state, the browser playground.
let db = embedded::memory().build()?;

// The default durable shape: hot writes stay in memory,
// a background flusher migrates them into SQLite.
let db = embedded::sqlite(SqliteConfig::new("/var/lib/myapp/data")).build()?;

// No in-memory buffer: every commit is written to SQLite
// before it returns. Durable at commit, slower to write.
let db = embedded::sqlite_without_buffer(SqliteConfig::new("/var/lib/myapp/data")).build()?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            RQL is identical on all three. Tables, views, subscriptions, TTLs - everything
            behaves the same; the backend only changes where committed bytes end up and
            what a restart brings back.
          </p>
          <Callout variant="note" title="The browser build is memory-only">
            The WebAssembly build that powers the playground and the TypeScript wasm
            package compiles without the SQLite backend - <Code>embedded::memory()</Code>{' '}
            is the only shape it can run. Nothing survives a page reload, and there is no
            restart to observe, which is why this page has no runnable snippets.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The write path: commit now, disk later</h2>
          <p className="text-text-secondary mb-4">
            When a{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">transaction</Link>{' '}
            commits, its writes are published to the <strong>commit buffer</strong> - an
            in-memory tier that keeps every recent version of every key, stamped with its
            commit version. That publish is what makes the commit visible; no disk I/O
            happens on the commit path. Commit latency is memory latency.
          </p>
          <p className="text-text-secondary mb-4">
            A background <strong>flush actor</strong> wakes on an interval (60 seconds by
            default, the <Code>MULTI_FLUSH_INTERVAL</Code> engine setting) and runs a
            sweep. The sweep is gated by a watermark: the oldest commit version still
            needed by any active query snapshot, version lease, or deferred view that has
            not caught up.
            For every key with versions at or below that watermark, the sweep writes the
            newest such value into SQLite, then drops those versions from the buffer.
            Everything above the watermark stays resident, because someone may still read
            it.
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Each sweep is applied to SQLite as one transaction. A crash mid-flush
                leaves the persistent file at the previous sweep, never half-written.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Deletes are persisted as tombstones, so a deleted row cannot resurrect
                from an older persisted value after a restart.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                If persisting fails, the sweep aborts and the buffer keeps the data. The
                engine never drops the only copy of a committed write.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Flushed keys are seeded into a read cache on the way out, so reads that
                would otherwise fall through to SQLite are usually served from memory
                anyway.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            The consequence of this design: the commit buffer holds the recent,
            multi-version working set; SQLite holds the newest flushed value per key. Old
            row versions are garbage collected once no active reader can need them - MVCC
            history is a runtime structure, not an archive on disk.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What "durable" means</h2>
          <p className="text-text-secondary mb-4">
            <strong>Memory backend:</strong> nothing is durable. Stop the process - cleanly
            or not - and all data is gone. That is its contract; use it for tests and for
            state you can rebuild.
          </p>
          <p className="text-text-secondary mb-4">
            <strong>SQLite backend (buffered, the default):</strong> a commit is durable
            once the flusher has swept it to disk. A clean shutdown (<Code>stop()</Code>)
            makes that unconditional: it runs a full
            flush that persists every committed write regardless of the watermark - after
            a clean stop, a reopen sees every commit. A crash (<Code>kill -9</Code>, power
            loss) is where the asynchrony shows: commits that had not been flushed yet are
            lost. That window is roughly the flush interval, plus whatever the watermark
            was holding back for long-running readers or lagging consumers. What is on
            disk stays consistent - each file is a SQLite database in WAL mode, so a crash
            never corrupts it - but the database reopens at the last flushed state, not
            the last commit.
          </p>
          <p className="text-text-secondary mb-4">
            <strong>SQLite without buffer:</strong> commits write straight into SQLite and
            are durable the moment they return. You pay for that on every write, and
            memory-only stores (<Code>persistent: false</Code>) are rejected at creation
            (<Code>CA_086</Code>) because there is no buffer tier for them to live in.
          </p>
          <Callout variant="warning" title="No write-ahead log for user commits">
            There is no engine-level WAL that records commits before they are applied.
            The in-memory tier is the record of recent commits, and the flush is the only
            path to disk. If a hard crash inside the failure window is unacceptable for
            your workload, use <Code>sqlite_without_buffer</Code> and accept the write
            latency, or treat ReifyDB's upstream (an event log, a queue) as the source of
            truth to replay from.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">On disk: three SQLite files</h2>
          <p className="text-text-secondary mb-4">
            Point <Code>SqliteConfig::new</Code> at a directory-style path and the engine
            lays out one directory with three databases (each with its own{' '}
            <Code>-wal</Code> / <Code>-shm</Code> companions):
          </p>
          <CodeBlock
            language="bash"
            code={`/var/lib/myapp/data/
  multi.db     # row data: tables, views, ring buffers, series
  single.db    # small system state, including the commit-version clock
  operator.db  # deferred-view operator state
  wal/         # the write-ahead log: every committed write, in order`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            All three run SQLite in WAL journal mode. The default preset
            (<Code>SqliteConfig::new</Code>) uses <Code>synchronous = NORMAL</Code>: an OS
            crash or power loss can drop the last moments of WAL activity but never
            corrupts the files. <Code>SqliteConfig::safe</Code> switches to{' '}
            <Code>FULL</Code> for maximum sync strictness; <Code>SqliteConfig::fast</Code>{' '}
            turns syncing off for bulk or throwaway workloads. Since persistence is
            already asynchronous in the buffered shape, these presets mostly matter for{' '}
            <Code>sqlite_without_buffer</Code>, where the SQLite sync mode is the
            durability guarantee.
          </p>
          <p className="text-text-secondary mb-4">
            Flush cadence and WAL checkpointing are tunable through engine settings
            (<Code>MULTI_FLUSH_INTERVAL</Code>, <Code>MULTI_WAL_AUTOCHECKPOINT</Code>,{' '}
            <Code>OPERATOR_WAL_AUTOCHECKPOINT</Code>, and the read-cache sizing knobs). See{' '}
            <Link to="/docs/operate/configuration" className="text-primary hover:text-primary-light font-medium transition-colors">Storage &amp; Configuration</Link>{' '}
            for the full reference.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What survives a restart</h2>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>All flushed data</strong> - tables, views, ring buffers, series,
                the catalog, and operator state come back exactly as persisted, and any
                commit still in the write-ahead log is replayed. After a clean stop, that
                is everything.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>The commit-version clock.</strong> Versions are allocated in
                blocks of 100,000 and the block boundary is persisted in{' '}
                <Code>single.db</Code> before any version from the block is handed out.
                On restart the clock resumes past the last persisted boundary, so commit
                versions are monotonic across restarts and never repeat - the version
                numbers may jump, but order is preserved. Snapshots, storage, and the WAL all
                keep speaking the same version language across the restart.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Not MVCC history.</strong> The persistent tier stores the newest
                flushed value per key, not the chain of older versions. History exists in
                memory, bounded by the read watermark, and is gone after a restart. There
                is no time-travel archive on disk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Not memory-only rows.</strong> Stores created with{' '}
                <Code>persistent: false</Code> are skipped by the flush sweep entirely -
                their rows never reach <Code>multi.db</Code> and reopen empty, by design.
                See{' '}
                <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>{' '}
                for when and how to declare them.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            On open, the engine also verifies a persisted storage-format version, so a
            data directory written by an incompatible storage layout fails loudly instead
            of being misread.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The write-ahead log</h2>
          <p className="text-text-secondary mb-4">
            Every commit is appended to the write-ahead log before it becomes visible.
            The log is a directory of segment files (64 MiB each), and each record carries
            the commit version and a checksum.{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Deferred views</Link>{' '}
            read new commits from memory and fall back to the log when they lag;{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscriptions</Link>{' '}
            start reading at the head of the log.
          </p>
          <p className="text-text-secondary mb-4">
            A segment is deleted once every store has saved past it and every deferred
            view has processed it. The log has no age limit.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Scope: one node, local disk</h2>
          <p className="text-text-secondary mb-4">
            Everything above describes a single node: durability means the local SQLite
            files. There is no replication: a deployment commits to the local disk only.
            The mechanics are covered in{' '}
            <Link to="/docs/contributors/internals/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transaction Internals</Link>.
          </p>
        </section>

        <Callout variant="note" title="Where this shows up elsewhere">
          <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>{' '}
          explains what commit guarantees to concurrent readers - that part is synchronous
          and unaffected by the backend.{' '}
          <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>{' '}
          covers <Code>persistent: false</Code>, the per-store opt-out of the flush
          pipeline. Both compose with everything on this page.
        </Callout>
      </div>
    </Layout>
  );
}
