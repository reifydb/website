import { stQueueAllOptionsExample as qAllOptions, stQueueBadPartitionsExample as qBadPartitions, stQueueClaimExample as qClaim, stQueueCreateExample as qCreate, stQueueDeclaredDedupExample as qDeclaredDedup, stQueueDeclaredDedupScanExample as qDeclaredDedupScan, stQueueDedupConflictExample as qDedupConflict, stQueueDedupKeyExample as qDedupKey, stQueueDedupRepeatExample as qDedupRepeat, stQueueDedupScanExample as qDedupScan, stQueueDropExample as qDrop, stQueueDropIfExistsExample as qDropIfExists, stQueueImmutableExample as qImmutable, stQueueInsertExample as qInsert, stQueueNoDispatchExample as qNoDispatch, stQueueNotBeforeExample as qNotBefore, stQueueReturningExample as qReturning, stQueueScanExample as qScan, stQueueUnknownOptionExample as qUnknownOption } from './queues.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { AsciiDiagram, Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function QueuesPage() {
  return (
    <Layout
      title="Queues"
      description="Creating and working with queues in RQL: the create queue grammar and every option, insert with deduplication_key and not_before, reading items back, the queue::claim, ack, fail, kill, extend, and replay procedures, drop queue, and the error codes."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Queues
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A queue is a store for work items that must be handled once: items go in
            with <Code>insert</Code>, a worker leases them with{' '}
            <Code>queue::claim</Code>, and reports the outcome with{' '}
            <Code>queue::ack</Code>, <Code>queue::fail</Code>, or{' '}
            <Code>queue::kill</Code>. This page covers the full DDL, DML, and procedure
            surface; for what the engine guarantees and when to pick a queue over
            another store, see{' '}
            <Link to="/docs/concepts/data-model/queues" className="text-primary hover:text-primary-light font-medium transition-colors">Queues</Link>{' '}
            in the data model section.
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
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a queue</h2>
          <p className="text-text-secondary mb-4">
            <Code>create queue</Code> takes the same column list as a table plus a{' '}
            <Code>with</Code> block. The block must contain a dispatch block;{' '}
            <Code>fifo: {'{}'}</Code> is the only dispatch today. Like all DDL, it
            returns a confirmation with the object's catalog id:
          </p>
          <RqlCodeBlock code={qCreate.code} />
          <AsciiDiagram label="result">
{`id    | namespace | queue | created
------+-----------+-------+--------
16385 | st_queue  | jobs  | true`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The complete grammar, with every option filled in:
          </p>
          <RqlCodeBlock code={qAllOptions.code} />
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>fifo: {'{'} partitions, ordered_by {'}'}</Code>: required, even
                when empty. <Code>partitions</Code> is a number from 1 to 1024 (default
                16). <Code>ordered_by</Code> names one column; items with the same value
                are delivered strictly in enqueue order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>deduplicate: {'{'} by: {'{'} cols {'}'}, ttl {'}'}</Code>:{' '}
                <Code>by</Code> is required inside the block and lists one or more
                distinct columns; <Code>ttl</Code> is a duration or{' '}
                <Code>forever</Code> (the default) and bounds how long a key suppresses
                a repeat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>retention: {'{'} done {'}'}</Code>: how long finished (done or
                dead) items stay stored. Without it they are kept forever.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>retry: {'{'} attempts, backoff {'}'}</Code>: <Code>attempts</Code>{' '}
                is at least 1 (default 5); <Code>backoff</Code> is a positive duration
                (default <Code>10s</Code>) that doubles after each failure, capped at one
                hour. Either key may stand alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>time: none | processing | event(column)</Code>: the same time
                declaration tables accept; it shows up in the <Code>time</Code> and{' '}
                <Code>ts</Code> columns of <Code>system::queues</Code>.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            Durations inside the block are bare literals (<Code>7d</Code>,{' '}
            <Code>1h</Code>, <Code>10s</Code>); a plain number is rejected because it
            would carry whatever unit the reader assumes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What the engine rejects at creation</h2>
          <p className="text-text-secondary mb-4">
            The dispatch block is not optional. If a missing block defaulted to{' '}
            <Code>fifo</Code>, adding a second dispatch later would silently change what
            every existing queue meant, so its absence is a parse error:
          </p>
          <RqlCodeBlock code={qNoDispatch.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The rest of the option validation happens when the statement is compiled,
            before anything is created. Each of these is a clean error, never a queue
            with a surprising shape:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>AST_005</Code>: no dispatch block, two <Code>fifo</Code> blocks,{' '}
                <Code>partitions</Code> or <Code>ordered_by</Code> outside the{' '}
                <Code>fifo</Code> block, a misspelled option key at any level, a{' '}
                <Code>partitions</Code> value outside 1 to 1024, <Code>attempts</Code>{' '}
                below 1, a non-positive duration, a <Code>deduplicate</Code> block
                without <Code>by</Code>, an empty <Code>by</Code>, or a column repeated
                in <Code>by</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>CA_004</Code>: <Code>ordered_by</Code> or a <Code>by</Code> column
                that is not one of the declared columns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>CA_095</Code>: a queue with that name already exists in the
                namespace.
              </span>
            </li>
          </ul>
          <RqlCodeBlock code={qBadPartitions.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Enqueueing</h2>
          <p className="text-text-secondary mb-4">
            <Code>insert</Code> enqueues one item per record. Its confirmation names the
            queue and counts what was enqueued and what was dropped as a duplicate; an
            insert from a query source works the same way, and an empty input enqueues
            nothing without burning row numbers. Producers do not need admin rights:
          </p>
          <RqlCodeBlock code={qInsert.code} />
          <AsciiDiagram label="result">
{qInsert.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            <Code>returning</Code> hands back the enqueued items with their declared
            columns. On a duplicate it returns the item that already exists, so a
            retrying producer learns which work is queued:
          </p>
          <RqlCodeBlock code={qReturning.code} />
          <AsciiDiagram label="result">
{qReturning.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>with</Code> block after the records accepts exactly two options,
            each at most once. <Code>not_before</Code> is a datetime before which no
            claim will return the item:
          </p>
          <RqlCodeBlock code={qNotBefore.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>deduplication_key</Code> is an expression evaluated once per row, with
            that row's columns in scope. A repeat of a key the queue has already seen is
            reported as a duplicate and not enqueued, whether it arrives in the same
            statement or a later one. The key is scoped to one queue, and a key that
            evaluates to <Code>none</Code> is a key like any other:
          </p>
          <RqlCodeBlock code={qDedupKey.code} />
          <AsciiDiagram label="result">
{qDedupKey.expected ?? ''}
          </AsciiDiagram>
          <RqlCodeBlock code={qDedupRepeat.code} />
          <AsciiDiagram label="result">
{qDedupRepeat.expected ?? ''}
          </AsciiDiagram>
          <RqlCodeBlock code={qDedupScan.code} />
          <AsciiDiagram label="result">
{qDedupScan.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            A queue that declares <Code>deduplicate</Code> derives the key from the
            stored row itself, so producers pass nothing. With several columns the key
            is the tuple, not a concatenation, so <Code>("ab", "c")</Code> and{' '}
            <Code>("a", "bc")</Code> stay distinct:
          </p>
          <RqlCodeBlock code={qDeclaredDedup.code} />
          <AsciiDiagram label="result">
{qDeclaredDedup.expected ?? ''}
          </AsciiDiagram>
          <RqlCodeBlock code={qDeclaredDedupScan.code} />
          <AsciiDiagram label="result">
{qDeclaredDedupScan.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Duplicates never consume a row number, so the queue's numbering has no gaps
            from rejected items. The insert-side error codes:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>INSERT_006</Code>: an option other than{' '}
                <Code>deduplication_key</Code> or <Code>not_before</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>INSERT_007</Code>: the same option twice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>INSERT_008</Code>: <Code>deduplication_key</Code> on a queue that
                declares <Code>deduplicate</Code>; the declared columns would win and the
                passed key would be dropped on the floor, so the engine refuses instead.
              </span>
            </li>
          </ul>
          <RqlCodeBlock code={qDedupConflict.code} />
          <RqlCodeBlock code={qUnknownOption.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reading items back</h2>
          <p className="text-text-secondary mb-4">
            A bare <Code>from</Code> returns the stored items as rows in enqueue order,
            with the declared columns only; the scheduling fields the engine keeps beside
            each item never surface as columns. Claimed, done, and dead items are still
            rows until retention removes them:
          </p>
          <RqlCodeBlock code={qScan.code} />
          <AsciiDiagram label="result">
{qScan.expected ?? ''}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Items are immutable. <Code>update</Code> and <Code>delete</Code> on a queue
            fail with <Code>QUEUE_001</Code>: items leave a queue by being acknowledged
            or by retention, not by being edited.
          </p>
          <RqlCodeBlock code={qImmutable.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Consuming</h2>
          <p className="text-text-secondary mb-4">
            Workers drive a queue through procedures. All of them must run in a command
            transaction; in a read-only query they fail rather than report success while
            changing nothing.{' '}
            <Code>queue::claim(worker, queue, max_n, lease_ttl)</Code> takes a non-empty
            worker id, the qualified queue name as text, a positive item count, and a
            positive lease duration. It leases up to <Code>max_n</Code> due items and
            returns one row per lease: the <Code>token</Code>, the <Code>item</Code>{' '}
            number, the <Code>attempt</Code>, the <Code>deadline</Code>, then the
            declared columns. An empty claim returns zero rows with the same columns.
          </p>
          <RqlCodeBlock code={qClaim.code} />
          <AsciiDiagram label="result (single-partition queue holding item 1, clock at 00:00:01)">
{`token              | item | attempt | deadline                       | id | payload
-------------------+------+---------+--------------------------------+----+--------
qt1:16385:0:1:1:w1 | 1    | 1       | 1970-01-01T00:00:31.000000000Z | 1  | alpha`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The token is opaque; pass it back verbatim. <Code>ack</Code>, <Code>fail</Code>,
            and <Code>kill</Code> are addressed by it and return the same three columns: a{' '}
            <Code>status</Code> of{' '}
            <Code>ok</Code>, <Code>repeat</Code> (the same outcome reported again), or{' '}
            <Code>stale</Code> (a conflicting or no-longer-live attempt, recorded but not
            applied), plus the <Code>item</Code> and <Code>attempt</Code>.
          </p>
          <RqlCodeBlock code={`call queue::ack("qt1:16385:0:1:1:w1")`} />
          <AsciiDiagram label="result">
{`status | item | attempt
-------+------+--------
ok     | 1    | 1`}
          </AsciiDiagram>
          <ul className="space-y-2 text-text-secondary mt-4 mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>queue::ack(token)</Code>: the attempt succeeded; the item is done
                and never delivered again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>queue::fail(token, response)</Code>: the attempt failed; the item
                is retried after the backoff, or buried once the retry budget is spent.{' '}
                <Code>response</Code> is text or <Code>none</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>queue::kill(token, response)</Code>: the work is unrecoverable;
                the item is dead immediately, whatever budget remains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>queue::extend(token, lease_ttl)</Code>: move the deadline to{' '}
                <Code>now + lease_ttl</Code>, never earlier than it already is. Returns{' '}
                <Code>item</Code>, <Code>attempt</Code>, and the new{' '}
                <Code>deadline</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>queue::replay(queue, item)</Code>: return a dead item to the ready
                set with a fresh retry budget. Returns <Code>queue</Code>,{' '}
                <Code>item</Code>, and a <Code>state</Code> of <Code>ready</Code>, or{' '}
                <Code>parked</Code> when another item of the same key is pending.
              </span>
            </li>
          </ul>
          <RqlCodeBlock code={`call queue::extend("qt1:16385:0:1:1:w1", duration::seconds(120))`} />
          <AsciiDiagram label="result (on the live lease, before the ack above; after it the same call is QUEUE_002)">
{`item | attempt | deadline
-----+---------+-------------------------------
1    | 1       | 1970-01-01T00:02:01.000000000Z`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The procedure error codes:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>QUEUE_002</Code>: <Code>extend</Code> on a lease that is not live
                (already acked, reissued under a later attempt, or reaped). Abandon the
                task and claim again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>QUEUE_003</Code>: a malformed token.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>QUEUE_004</Code>: <Code>replay</Code> of an item number the queue
                does not hold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>QUEUE_005</Code>: <Code>replay</Code> of an item that is not dead
                (ready, leased, done, or parked).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>CA_096</Code>: a queue name that does not resolve, from{' '}
                <Code>claim</Code> or <Code>replay</Code>. A typo never looks like an
                empty queue.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            An empty worker id, a <Code>max_n</Code> below 1, and a non-positive lease
            duration are caller bugs and fail as procedure argument errors rather than
            returning an empty result.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dropping a queue</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop queue</Code> removes the definition, the items, and the queue's
            scheduling state. The confirmation has no id column:
          </p>
          <RqlCodeBlock code={qDrop.code} />
          <AsciiDiagram label="result">
{`namespace | queue | dropped
----------+-------+--------
st_queue  | dedup | true`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            With <Code>if exists</Code> a missing queue reports{' '}
            <Code>dropped: false</Code> instead of failing. The guard covers the queue
            only; a missing namespace is still an error. Dropping a namespace removes
            the queues inside it, and a dropped name can be reused at once:
          </p>
          <RqlCodeBlock code={qDropIfExists.code} />
          <AsciiDiagram label="result">
{`namespace | queue | dropped
----------+-------+--------
st_queue  | dedup | false`}
          </AsciiDiagram>
        </section>

        <Callout variant="note" title="Everything is transactional">
          An enqueue commits with the rest of the request and rolls back with it, so a
          failed statement leaves no partial items. Claims and acks write scheduling
          state and need a command transaction. What the engine promises about delivery,
          ordering, restarts, and retention is covered in{' '}
          <Link to="/docs/concepts/data-model/queues" className="text-primary hover:text-primary-light font-medium transition-colors">Queues</Link>{' '}
          and{' '}
          <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
