import { dmQueuesCatalogExample as dmQueuesCatalog, dmQueuesClaimExample as dmQueuesClaim, dmQueuesCreateExample as dmQueuesCreate, dmQueuesDropExample as dmQueuesDrop, dmQueuesEnqueueExample as dmQueuesEnqueue, dmQueuesImmutableExample as dmQueuesImmutable, dmQueuesOrderedClaimExample as dmQueuesOrderedClaim, dmQueuesOrderedExample as dmQueuesOrdered, dmQueuesPartitionsExample as dmQueuesPartitions, dmQueuesScanExample as dmQueuesScan } from './queues.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { AsciiDiagram, Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelQueuesPage() {
  return (
    <Layout
      title="Queues"
      description="How ReifyDB queues hand work items to exactly one worker at a time: enqueue with insert, lease with queue::claim, finish with ack, fail, or kill, plus ordering, partitions, retries, retention, and the system catalog."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Queues</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A queue holds work items that must be handled once. Producers put items in
            with <Code>insert</Code>. Workers take them out with{' '}
            <Code>queue::claim</Code>, which leases each item to exactly one worker for a
            fixed time, and report back with <Code>queue::ack</Code>,{' '}
            <Code>queue::fail</Code>, or <Code>queue::kill</Code>. The engine keeps the
            lease, the retry budget, and the dead items. The worker keeps only the token
            it was handed.
          </p>
        </div>

        <Callout variant="warning" title="Needs a newer engine than the playground runs">
          The in-browser engine on this site (<Code>@reifydb/wasm</Code> 0.8.1) has no
          queues: <Code>create queue</Code> traps with a bare <Code>unreachable</Code>{' '}
          (a Rust panic, not an error code), <Code>drop queue</Code> fails with{' '}
          <Code>AST_005</Code>, reading <Code>system::queues</Code> traps the same way, and
          the <Code>queue::</Code> procedures are unknown (<Code>PROCEDURE_001</Code>).
          The engine source is at 0.9.0. Every snippet on this page is shown, not
          runnable, and every result is taken from the engine's own tests. See{' '}
          <Link to="/docs/resources/roadmap" className="text-primary hover:text-primary-light font-medium transition-colors">Roadmap &amp; Experimental</Link>.
        </Callout>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Creating a queue</h2>
          <p className="text-text-secondary mb-4">
            A queue is declared like a{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>:
            typed columns inside a namespace. One thing is mandatory: a dispatch block in
            the <Code>with</Code> clause. <Code>fifo: {'{}'}</Code> is the only dispatch
            today, and leaving it out is a parse error, not a default. Everything else
            has a default: 16 partitions, no ordering key, no deduplication, no
            retention, and a retry budget of 5 attempts with a 10 second backoff.
          </p>
          <RqlCodeBlock code={dmQueuesCreate.code} />
          <AsciiDiagram label="result">
{`id    | namespace | queue | created
------+-----------+-------+--------
16385 | cpt_queue | jobs  | true`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The full option list is on the{' '}
            <Link to="/docs/scripting/storage/queues" className="text-primary hover:text-primary-light font-medium transition-colors">Queues how-to page</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Items go in with insert</h2>
          <p className="text-text-secondary mb-4">
            Enqueueing is an ordinary <Code>insert</Code>. The confirmation reports how
            many items were enqueued and how many were dropped as duplicates:
          </p>
          <RqlCodeBlock code={dmQueuesEnqueue.code} />
          <AsciiDiagram label="result">
{dmQueuesEnqueue.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Each item gets a row number in enqueue order, and the numbering continues
            across statements. That number is the queue's only intrinsic order, and it is
            what a worker later sees as <Code>item</Code>. A bare <Code>from</Code> reads
            the items as rows, oldest first. It shows what is stored, not the scheduling
            state: an item that has been claimed or acknowledged is still a row until
            retention removes it.
          </p>
          <RqlCodeBlock code={dmQueuesScan.code} />
          <AsciiDiagram label="result">
{dmQueuesScan.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Items are immutable. Work leaves a queue by being acknowledged or by
            retention, never by being edited, so <Code>update</Code> and{' '}
            <Code>delete</Code> are rejected with <Code>QUEUE_001</Code>:
          </p>
          <RqlCodeBlock code={dmQueuesImmutable.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Items come out with a claim</h2>
          <p className="text-text-secondary mb-4">
            <Code>queue::claim(worker, queue, max_n, lease_ttl)</Code> leases up to{' '}
            <Code>max_n</Code> due items to one named worker. Each lease has a deadline,{' '}
            <Code>now + lease_ttl</Code>. The result carries a <Code>token</Code>, the{' '}
            <Code>item</Code> number, the <Code>attempt</Code> number, the{' '}
            <Code>deadline</Code>, and then the queue's declared columns:
          </p>
          <RqlCodeBlock code={dmQueuesClaim.code} />
          <AsciiDiagram label="result (a single-partition queue holding item 1, clock at 00:00:01)">
{`token              | item | attempt | deadline                       | id | payload
-------------------+------+---------+--------------------------------+----+--------
qt1:16385:0:1:1:w1 | 1    | 1       | 1970-01-01T00:00:31.000000000Z | 1  | alpha`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            An item is leased to exactly one worker at a time. The lease write and the
            removal from the due index land together, so a second claim for the same
            items comes back empty, and two workers never receive the same item. An empty
            claim still returns the full column set, so a polling loop iterates zero rows
            instead of special-casing "no work".
          </p>
          <p className="text-text-secondary mb-4">
            The token is the whole contract between the claim and everything after it.
            It names the queue, the partition, the item, the attempt, and the worker. Pass
            it back exactly as returned; a malformed token is rejected with{' '}
            <Code>QUEUE_003</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Finishing an item</h2>
          <p className="text-text-secondary mb-4">
            Every outcome is reported by token. <Code>queue::ack(token)</Code> marks the
            attempt <Code>ok</Code>: the item is done for good and never comes back.{' '}
            <Code>queue::fail(token, response)</Code> marks it <Code>err</Code>: the item
            returns to the ready set after a backoff, until the retry budget is spent.{' '}
            <Code>queue::kill(token, response)</Code> marks it <Code>dead</Code>{' '}
            immediately, for work the worker knows is unrecoverable. The{' '}
            <Code>response</Code> is free text or <Code>none</Code>, kept in the attempt
            record.
          </p>
          <RqlCodeBlock code={`call queue::ack("qt1:16385:0:1:1:w1")`} />
          <AsciiDiagram label="result">
{`status | item | attempt
-------+------+--------
ok     | 1    | 1`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Workers retry their ack after a network timeout, so a repeat is harmless: the
            same outcome reported again returns <Code>repeat</Code> and changes nothing.
            A conflicting outcome for the same attempt returns <Code>stale</Code>; the
            first outcome stands and the contradiction is recorded in the attempt
            history. An ack for an attempt nobody holds is recorded but never applied.
          </p>
          <p className="text-text-secondary mb-4">
            A worker that needs more time calls{' '}
            <Code>queue::extend(token, lease_ttl)</Code>, which moves the deadline to{' '}
            <Code>now + lease_ttl</Code> (never earlier than it already was). Extending a
            lease that is no longer live is a hard error, <Code>QUEUE_002</Code>: the
            worker must abandon the task and claim again.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Retries, expired leases, and dead items</h2>
          <p className="text-text-secondary mb-4">
            The retry budget is declared at creation:{' '}
            <Code>retry: {'{'} attempts: 5, backoff: 10s {'}'}</Code> are the defaults.
            After a failed attempt the item waits <Code>backoff</Code>, then twice that,
            then four times, capped at one hour, before it becomes claimable again. The
            attempt number increases with every claim, so the next worker can see it is
            a retry. Once <Code>attempts</Code> is used up the item is dead: it stays
            stored, is never delivered, and no longer counts as backlog.
          </p>
          <p className="text-text-secondary mb-4">
            A worker that dies mid-task never acks. Its lease expires at the deadline, and
            a background reaper (every <Code>QUEUE_LEASE_REAP_INTERVAL</Code>, 5 seconds
            by default) records the attempt as lost and treats it as a failure: retry
            with backoff, or dead if the budget is spent. An item cannot be redelivered
            sooner than the reap interval, so keep the lease well above the time a task
            actually takes.
          </p>
          <p className="text-text-secondary mb-4">
            Dead items are the operator's to revive. <Code>queue::replay(queue, item)</Code>{' '}
            returns a dead item to the ready set with a fresh retry budget and its full
            attempt history intact. Replaying an item that is not dead is refused
            (<Code>QUEUE_005</Code>); an item number the queue does not hold is{' '}
            <Code>QUEUE_004</Code>. Item 1 above was acknowledged, so replaying it is
            refused; had it been killed instead, the same call puts it back:
          </p>
          <RqlCodeBlock code={`call queue::replay("cpt_queue::jobs", 1)`} />
          <AsciiDiagram label="result (item 1 dead)">
{`queue           | item | state
----------------+------+------
cpt_queue::jobs | 1    | ready`}
          </AsciiDiagram>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Delivery and ordering guarantees</h2>
          <p className="text-text-secondary mb-4">
            Delivery is at-least-once. An item is never handed to two workers at the same
            time, but a lease that expires is delivered again as a new attempt, so a
            worker that crashed after doing the work and before acking causes the work
            to run twice. Make the work idempotent, or key it on the <Code>item</Code>{' '}
            number, which stays the same across attempts.
          </p>
          <p className="text-text-secondary mb-4">
            Without an ordering key there is no global order. Items are spread across
            partitions by row number, and a claim walks the partitions starting from one
            picked by the worker's name, so two workers drain different partitions first.
            Within one partition, due items are handed out oldest due first.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>ordered_by: column</Code> makes order strict per key. All items with the
            same key land in the same partition, and only the oldest pending item of a
            key (its head) is claimable; younger siblings are parked until the head is
            acknowledged or dead. Here two items belong to tenant <Code>a</Code> and one
            to <Code>b</Code>, and a claim asking for five gets only the two heads:
          </p>
          <RqlCodeBlock code={dmQueuesOrdered.code} />
          <RqlCodeBlock code={dmQueuesOrderedClaim.code} />
          <AsciiDiagram label="result (queue id 16386: the second queue in this namespace, clock at 00:00:01)">
{`token              | item | attempt | deadline                       | id | tenant
-------------------+------+---------+--------------------------------+----+-------
qt1:16386:0:1:1:w1 | 1    | 1       | 1970-01-01T00:00:31.000000000Z | 1  | a
qt1:16386:0:3:1:w1 | 3    | 1       | 1970-01-01T00:00:31.000000000Z | 3  | b`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Item 2 is invisible to the claim because admission parked it, not because the
            claim skipped it. Acking item 1 releases the key, and the next claim returns
            item 2. A head that is retrying keeps blocking its siblings through its
            backoff; a head that dies releases the key to its successor; a replayed item
            re-enters the line behind whoever holds the key now. The number of keys with
            a parked sibling is reported as <Code>blocked_keys</Code>: a queue with a
            depth of 100 and 99 blocked keys is one slow key, not a throughput problem.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Partitions</h2>
          <p className="text-text-secondary mb-4">
            <Code>fifo: {'{'} partitions: N {'}'}</Code> sets how many independent lanes
            the queue has, between 1 and 1024, 16 by default. Partitions are not a
            column you see; they are the unit of contention. Each claim locks one
            partition at a time, so more partitions let more workers claim concurrently,
            and more keys drain in parallel on an ordered queue. A keyed queue hashes the{' '}
            <Code>ordered_by</Code> value to a partition, an unkeyed queue hashes the row
            number. The placement is recomputable from the stored row alone, which is
            what keeps per-key order intact across a restart. The count is fixed at
            creation.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Scheduling and deduplication</h2>
          <p className="text-text-secondary mb-4">
            Two <Code>insert</Code> options shape when and whether an item is admitted.{' '}
            <Code>with {'{'} not_before: datetime {'}'}</Code> keeps the item out of every
            claim until that instant; a retry never moves it earlier.{' '}
            <Code>with {'{'} deduplication_key: expr {'}'}</Code> evaluates a key per row
            and drops the row as a duplicate if that key is already known to the queue;
            the confirmation counts it under <Code>duplicates</Code>, and{' '}
            <Code>returning</Code> hands back the item that already exists, so a
            retrying producer learns the identity of the work it enqueued the first time.
            A queue can also fix its key at creation with{' '}
            <Code>deduplicate: {'{'} by: {'{'} cols {'}'}, ttl: 1h {'}'}</Code>; then every
            insert is keyed by those columns, <Code>none</Code> is a value like any
            other, the key expires after <Code>ttl</Code> (<Code>forever</Code> by
            default), and passing <Code>deduplication_key</Code> on top is rejected with{' '}
            <Code>INSERT_008</Code>. Keys are scoped to one queue.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Transactions and durability</h2>
          <p className="text-text-secondary mb-4">
            An enqueue is a normal transactional write. It commits with the rest of the
            request and rolls back with it, so a statement that fails after inserting
            into a queue leaves no partial items; see{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
            Producers need no admin rights. <Code>queue::claim</Code>,{' '}
            <Code>ack</Code>, <Code>fail</Code>, <Code>kill</Code>, <Code>extend</Code>,
            and <Code>replay</Code> write state, so they must run in a command
            transaction; in a read-only query they fail instead of pretending to succeed.
          </p>
          <p className="text-text-secondary mb-4">
            The scheduling state of an item (ready, leased, done, dead, parked) lives
            beside the row, not in it. A post-commit handoff admits committed items, and
            claim and ack move them from there. Handoffs are not replayed after a crash,
            so on every start the engine hydrates each queue: it scans the stored rows,
            admits any committed item that has no scheduling state, and recovers its{' '}
            <Code>not_before</Code> from the row. Committed work is therefore never lost,
            finished items are never re-admitted, and the pass is idempotent. What
            "committed" means on disk is the storage tier's promise; see{' '}
            <Link to="/docs/concepts/durability" className="text-primary hover:text-primary-light font-medium transition-colors">Durability</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Retention</h2>
          <p className="text-text-secondary mb-4">
            Acknowledging an item does not delete it. Done and dead items stay stored,
            with their attempt records, until retention removes them. Declare{' '}
            <Code>retention: {'{'} done: 7d {'}'}</Code> and a background sweeper (every{' '}
            <Code>QUEUE_RETENTION_INTERVAL</Code>, 1 minute by default) deletes finished
            items whose final attempt is older than that, along with deduplication
            records past their own <Code>ttl</Code>. Without a <Code>done</Code> duration
            finished items are kept forever, which is a retention guarantee, not a leak,
            but it is the reason to declare one on any busy queue.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Observing a queue</h2>
          <p className="text-text-secondary mb-4">
            <Code>system::queues</Code> lists every queue with its declaration
            (<Code>partitions</Code>, <Code>ordered_by</Code>,{' '}
            <Code>deduplicate_by</Code>, <Code>deduplicate_ttl</Code>, <Code>time</Code>)
            and its live counters: <Code>depth</Code> the number of items waiting (due, delayed, or parked),{' '}
            <Code>in_flight</Code> the number currently leased, <Code>blocked_keys</Code>{' '}
            the number of keys with a parked sibling, and <Code>oldest_due_at</Code> the
            earliest due instant still waiting. The counters are maintained on every
            transition, never recomputed, so they are cheap to read:
          </p>
          <RqlCodeBlock code={dmQueuesCatalog.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>system::queue_partitions</Code> breaks the same counters down per
            partition, one row per <Code>queue_id</Code> and <Code>partition</Code>:
          </p>
          <RqlCodeBlock code={dmQueuesPartitions.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Both are virtual tables of the{' '}
            <Link to="/docs/concepts/system-catalog" className="text-primary hover:text-primary-light font-medium transition-colors">system catalog</Link>.{' '}
            <Code>drop queue</Code> removes the definition, the items, and the whole
            scheduling state of that queue:
          </p>
          <RqlCodeBlock code={dmQueuesDrop.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Queue or something else?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Work that must be handled once, by one worker, with retries: a queue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                State you read and edit in place: a{' '}
                <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>.
                Queue items cannot be updated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                "The last N" with automatic eviction: a{' '}
                <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>.
                A queue never evicts unfinished work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Time-ordered history that every reader sees in full: a{' '}
                <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Pushing every change to every connected client: a{' '}
                <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>.
                A subscription broadcasts; a queue allocates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Rows that should expire by age: a{' '}
                <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL</Link>.
                Queues bound finished work with <Code>retention</Code> instead.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Syntax reference">
          The exact <Code>create queue</Code> grammar, every <Code>insert</Code> option,
          the procedure signatures, and the error codes are on the{' '}
          <Link to="/docs/scripting/storage/queues" className="text-primary hover:text-primary-light font-medium transition-colors">Queues how-to page</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
