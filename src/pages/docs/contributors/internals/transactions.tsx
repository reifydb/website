import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function InternalsTransactionsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Transaction Internals</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            How the transaction subsystem actually works: the two concurrency-control
            layers, the life of a write from begin to commit, the oracle that validates
            commits, and the invariants that tie commits to change data capture. This page
            is for people working on the engine. For the user-facing model, read{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>{' '}
            instead.
          </p>
        </div>

        <Callout variant="note" title="Internal, not a contract">
          Everything below describes the current implementation in the{' '}
          <Code>reifydb-transaction</Code> crate (<Code>crates/transaction</Code>). It is
          documentation of internals, not a stable public interface - names, structures,
          and defaults change without notice.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Two transaction layers</h2>
          <p className="text-text-secondary mb-4">
            The crate exposes two independent concurrency-control paths behind a uniform
            handle:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Multi-version (MVCC)</strong> - <Code>src/multi</Code>. Optimistic,
                snapshot-based, validated at commit by an oracle. This is the path every
                user command and query takes. Three transaction shapes exist:{' '}
                <Code>MultiReadTransaction</Code> (query), <Code>MultiWriteTransaction</Code>{' '}
                (command), and <Code>MultiReplicaTransaction</Code> (used by CDC
                replication to apply a primary's committed writes on a replica at their
                original commit versions - not by Raft, which applies through its own
                state machine).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Single-version (SVL)</strong> - <Code>src/single</Code>. Pessimistic
                per-key read/write locking with no versioning and last-writer-wins
                semantics. A transaction must declare its keyset up front; touching an
                undeclared key is an error (<Code>TXN_010</Code>). Locks are acquired in
                sorted key order to prevent deadlock. This layer backs internal system
                state and the version provider - it is never the path for user table
                writes.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            On top of both layers, <Code>src/transaction</Code> defines the engine-facing
            wrappers - <Code>QueryTransaction</Code>, <Code>CommandTransaction</Code>, and{' '}
            <Code>AdminTransaction</Code> - each pairing a multi-version transaction with a
            single-version handle. The command/admin split is structural, not just a
            permission check: <Code>AdminTransaction</Code> carries a{' '}
            <Code>TransactionalCatalogChanges</Code> accumulator for schema and catalog
            mutations that <Code>CommandTransaction</Code> simply does not have. DDL
            compiles to incremental catalog changes, so the executor only accepts it inside
            an admin transaction; a command transaction executes DML exclusively. The two
            also commit through separate paths (<Code>commit_command</Code> vs{' '}
            <Code>commit_admin</Code> in <Code>crates/engine/src/engine.rs</Code>).
          </p>
          <p className="text-text-secondary mb-4">
            Transaction IDs are UUIDv7: monotonic, unique across the system, and sortable
            by creation time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Life of a command transaction</h2>
          <p className="text-text-secondary mb-4">
            A command begins by pinning a <strong>read snapshot version</strong> from the
            oracle. Every read it performs resolves against the multi-version store as of
            that version. Writes never touch the store directly during execution: they
            accumulate in the transaction's local buffer (<Code>pending_writes</Code> plus
            an ordered delta log), which is also consulted on read so the transaction sees
            its own uncommitted changes.
          </p>
          <p className="text-text-secondary mb-4">
            Because flow maintenance runs only at commit, a statement that reads a
            transactional view while the accumulator already holds changes upstream of it
            would see stale contents - so the view scan's <Code>initialize</Code> rejects
            it with <Code>TXN_015</Code>, failing the whole transaction. The check is
            transitive over the transactional flow DAG (a lineage snapshot the flow
            subsystem republishes whenever flows register or unregister) and stops at
            deferred views, which are asynchronous by contract. Test transactions are
            exempt: the RQL test framework maintains views inline, so its reads are
            current.
          </p>
          <p className="text-text-secondary mb-4">
            Alongside the write buffer, a <Code>ConflictManager</Code> records the
            transaction's footprint: every key read, every key written, and every range
            scanned. Point reads are tracked exactly; range reads are tracked as ranges and
            merged, and past 64 distinct ranges the manager escalates to a coarse
            "read everything" marker rather than tracking unboundedly. Read tracking is on
            by default (<Code>ConflictMode::Tracking</Code>) - that is what upgrades the
            guarantee from plain snapshot isolation to serializable snapshot isolation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The commit pipeline</h2>
          <p className="text-text-secondary mb-4">
            Commit is mediated by the <strong>oracle</strong> (<Code>src/multi/oracle</Code>),
            whose <Code>new_commit</Code> runs five phases:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">1.</span>
              <span>
                <strong>TooOld check.</strong> The oracle keeps conflict history only for a
                bounded window of recent commits. If a transaction's read snapshot predates
                what has already been evicted, it can no longer be validated and is
                rejected terminally with <Code>TXN_004</Code>. This is the accepted cost of
                bounding the history: very long-lived snapshots can age out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">2.</span>
              <span>
                <strong>Conflict detection.</strong> The committing transaction's read/write
                set is checked against the write-sets of every transaction that committed
                after its snapshot. Committed write-sets are indexed in time-windowed bloom
                filters so this scan stays cheap. Both write-write and read-write overlap
                count as conflicts; either aborts the commit with <Code>TXN_001</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">3.</span>
              <span>
                <strong>Version allocation.</strong> A surviving transaction is assigned the
                next commit version from a monotonic clock. Commit versions are the global
                order of the database: snapshots, storage, and CDC all speak in them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">4.</span>
              <span>
                <strong>Registration.</strong> The transaction's write-set is registered
                into the current time window so future commits can be validated against it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">5.</span>
              <span>
                <strong>Cleanup.</strong> When the number of windows exceeds the watermark,
                the oldest are evicted - which is what eventually produces the TooOld
                rejections in phase 1.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            Conflict tracking can be disabled per transaction, and a fully unchecked commit
            path (<Code>commit_unchecked</Code> / <Code>advance_unchecked</Code>) exists for
            trusted single-writer situations such as bulk ingest and flow operator state.
            Neither is reachable from user requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">After validation: storage, watermarks, CDC</h2>
          <p className="text-text-secondary mb-4">
            Once a commit version is allocated, <Code>finalize_commit</Code> applies the
            transaction in a carefully ordered sequence. The transaction registers with the
            command watermark <em>before</em> the storage write, then writes its deltas to
            the multi-version store at exactly its commit version. On success it publishes
            a <Code>PostCommitEvent</Code> on the event bus and only then calls{' '}
            <Code>done_commit</Code> to advance the oracle's completed-commit watermark.
          </p>
          <p className="text-text-secondary mb-4">
            That ordering is load-bearing. The CDC poll actor treats{' '}
            <Code>done_until()</Code> as the safe upper bound of what it may consume. If the
            watermark advanced before the event was published, a concurrently committing
            transaction could surface a CDC entry that causes the poll actor to permanently
            skip the current version's changes. Emit first, then advance.
          </p>
          <p className="text-text-secondary mb-4">
            The CDC producer subscribes to <Code>PostCommitEvent</Code>, converts the
            committed deltas into change entries, persists them to the append-only CDC log,
            and emits <Code>CdcWrittenEvent</Code>. Downstream consumers - deferred views
            and subscriptions - process changes strictly in commit-version order. CDC
            therefore observes exactly the committed write-set, after commit, never a
            partial transaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Automatic retry</h2>
          <p className="text-text-secondary mb-4">
            Conflict aborts are not surfaced to clients immediately. The server wraps
            command and admin execution in a <Code>RetryStrategy</Code>{' '}
            (<Code>crates/engine/src/session.rs</Code>): on <Code>TXN_001</Code> - and only
            on <Code>TXN_001</Code> - the whole request is re-executed, by default up to 10
            attempts with exponential backoff (5ms base, 200ms cap, jittered). Re-execution
            is safe precisely because a conflicted transaction committed nothing. Queries
            never conflict, so retry is a no-op for them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Error codes</h2>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_001</Code> Conflict - another transaction committed overlapping data; retried automatically.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_002</Code> RolledBack - the transaction was rolled back and cannot be used further.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_003</Code> TooLarge - the write batch exceeded size or count limits.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_004</Code> TooOld - the read snapshot predates the oracle's retained conflict history.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_010</Code> KeyOutOfScope - an SVL transaction touched a key outside its declared keyset.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_012</Code> SnapshotVersionEvicted - the requested historical version is no longer available.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_013</Code> RaftProposeFailed - replicating the write to the Raft log failed.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_014</Code> ShuttingDown - the engine is stopping and rejected the transaction.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>TXN_015</Code> ViewPendingUpstreamChanges - the transaction read a transactional view after writing to its upstream data; split into separate requests or read the source tables.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Raft and replication</h2>
          <p className="text-text-secondary mb-4">
            ReifyDB has two distribution mechanisms, and they are different things that
            plug into the commit path at different points.
          </p>
          <p className="text-text-secondary mb-4">
            <strong>Raft consensus</strong> (<Code>crates/sub-raft</Code>) is synchronous
            and sits inside commit. When Raft is configured,{' '}
            <Code>finalize_commit</Code> proposes the write
            (<Code>Command::WriteMulti</Code> with deltas, commit version, and changes) to
            the Raft log <em>before</em> applying it locally; a proposal failure surfaces
            as <Code>TXN_013</Code> and nothing is applied. Followers do not run
            transactions at all: the Raft state machine
            (<Code>sub-raft/src/state/apply.rs</Code>) applies each committed log entry by
            writing its deltas directly into the multi-version store at the leader's exact
            commit version and emitting <Code>PostCommitEvent</Code> - so CDC, views, and
            subscriptions fire on followers too. The applied index is asserted to advance
            exactly one entry at a time, so nothing is skipped or re-applied.
          </p>
          <p className="text-text-secondary mb-4">
            <strong>CDC replication</strong> (<Code>crates/sub-replication</Code>) is
            asynchronous log shipping, entirely after commit. A primary publishes its CDC
            stream over the wire - the same source-of-truth log that subscriptions read;
            there is no separate replication log - and replicas tail it. The replica
            applier consumes entries strictly in transaction-id order (out-of-order apply
            would let earlier writes stomp later ones) and applies each through a{' '}
            <Code>ReplicaTransaction</Code> / <Code>MultiReplicaTransaction</Code> at the
            primary's exact commit version, then advances the replica's version clock via{' '}
            <Code>advance_version_for_replica</Code>. There is no oracle validation on this
            path: the primary already serialized these writes, so the replica's job is
            faithful replay, and its version history converges to the primary's.
          </p>
          <p className="text-text-secondary mb-4">
            Without either subsystem configured, commit applies locally only.
          </p>
        </section>
      </div>
    </Layout>
  );
}
