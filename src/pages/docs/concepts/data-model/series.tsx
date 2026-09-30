import { dmSeriesAutoKeyExample as dmSeriesAutoKey, dmSeriesDatetimeKeyExample as dmSeriesDatetimeKey, dmSeriesIntegerKeyExample as dmSeriesIntegerKey, dmSeriesKeyRangeExample as dmSeriesKeyRange, dmSeriesPartitionExample as dmSeriesPartition, dmSeriesPrecisionExample as dmSeriesPrecision, dmSeriesTagExample as dmSeriesTag, dmSeriesTagInsertExample as dmSeriesTagInsert, dmSeriesUpdateExample as dmSeriesUpdate } from './series.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelSeriesPage() {
  return (
    <Layout
      title="Series"
      description="How ReifyDB series store ordered history: the required key, newest-first reads, engine-filled keys, precision, partitions, tags, and when a series beats a table or ring buffer."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Series</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A series stores rows ordered by a required key column - a timestamp or an
            integer. It is the shape for measurements, audit trails, and historical
            records: data that arrives in order, is queried by range, and grows without
            an upper bound. A{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>{' '}
            answers "what is the state now"; a series answers "what happened, and
            when". This page covers how a series behaves. The full statement surface -
            create, insert, update, delete - is on the{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">Series how-to page</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The key defines the order</h2>
          <p className="text-text-secondary mb-4">
            Every series declares its ordering column with{' '}
            <Code>with {'{'} key: column {'}'}</Code>; without it, <Code>create series</Code>{' '}
            is rejected at parse time. The key can be an integer - sequence numbers,
            block heights, logical clocks - or a <Code>datetime</Code>. Reads walk the
            key from newest to oldest: a bare <Code>from</Code> returns the highest key
            first, so the latest entry is always the first row and{' '}
            <Code>take 1</Code> reads it without a sort. Run the snippets on this page
            in order:
          </p>
          <ExecutableSnippet title={dmSeriesIntegerKey.title} initialCode={dmSeriesIntegerKey.code} />
          <p className="text-text-secondary mt-4 mb-4">
            This is what separates a series from a table with a timestamp column. In a
            table the timestamp is just data: scans come back latest-inserted first,
            whatever the timestamps say, and nothing ties a row's place in storage to
            its place in time. In a series the key is the organizing axis. Add{' '}
            <Code>sort {'{'} seq: asc {'}'}</Code> when a pipeline needs chronological
            order.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Time-keyed series</h2>
          <p className="text-text-secondary mb-4">
            A <Code>datetime</Code> key is the common case. Constructors such as{' '}
            <Code>datetime::from_epoch_millis</Code> turn raw epoch values into typed
            timestamps at the write boundary. The stored key always renders with
            nanosecond digits, whatever precision the series declares (more on that
            below):
          </p>
          <ExecutableSnippet title={dmSeriesDatetimeKey.title} initialCode={dmSeriesDatetimeKey.code} />
          <p className="text-text-secondary mt-4 mb-4">
            If a write omits the key, the engine fills it in. For a <Code>datetime</Code>{' '}
            key that is the current time, so an append-only event log needs nothing
            beyond the payload:
          </p>
          <ExecutableSnippet title={dmSeriesAutoKey.title} initialCode={dmSeriesAutoKey.code} />
          <p className="text-text-secondary mt-4 mb-4">
            For an integer key the engine fills in one more than the highest key the
            series has ever held - after an explicit <Code>seq: 10</Code>, the next
            keyless write gets 11, and deleting the top entries does not lower the
            next value. An integer-keyed series is therefore a sequence-numbered log
            with no counter to maintain.
          </p>
          <Callout variant="note" title="The playground has no clock">
            The browser engine behind these snippets cannot read wall-clock time:{' '}
            <Code>datetime::now()</Code> returns the Unix epoch here, and so does an
            auto-assigned <Code>datetime</Code> key. The snippet above projects only{' '}
            <Code>note</Code> so its output does not depend on the clock. Against a
            server, the key is the real current time at the series' precision.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Range queries follow the key</h2>
          <p className="text-text-secondary mb-4">
            Filters on the key column select by the series' native order, which is what
            time-window and "since X" queries compile to. Results stay newest-first:
          </p>
          <ExecutableSnippet title={dmSeriesKeyRange.title} initialCode={dmSeriesKeyRange.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Everything else in the pipeline vocabulary - <Code>map</Code>,{' '}
            <Code>aggregate</Code>, <Code>join</Code>, <Code>take</Code> - applies to a
            series as it does to any source. Aggregating by the key column groups
            entries that share a key, which matters once precision comes into play.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">History can be corrected</h2>
          <p className="text-text-secondary mb-4">
            A series is ordered, not immutable. Late corrections - a recalibrated
            sensor, an amended audit record - are ordinary updates selected by key, and
            the confirmation names the store kind:
          </p>
          <ExecutableSnippet title={dmSeriesUpdate.title} initialCode={dmSeriesUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>delete</Code> takes the same key filters, including ranges, so
            trimming everything before a cutoff is a single statement. Both are one-off
            edits, not retention: to expire entries continuously, attach a TTL (see the
            note at the end of this page).
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Classifying entries with tags</h2>
          <p className="text-text-secondary mb-4">
            A series can attach a{' '}
            <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">tag type</Link>{' '}
            - a named set of variants, optionally with payload fields - to classify
            where each entry came from or what kind it is, without widening the schema
            with mostly-empty optional columns. The tag type must exist before the
            series that names it:
          </p>
          <ExecutableSnippet title={dmSeriesTag.title} initialCode={dmSeriesTag.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Entries in a tagged series carry a <Code>tag</Code> column next to the
            declared ones, and an insert may set it to one of the variants:
          </p>
          <ExecutableSnippet title={dmSeriesTagInsert.title} initialCode={dmSeriesTagInsert.code} />
          <Callout variant="warning" title="Variant tags do not read back in the current build">
            A variant name written to the <Code>tag</Code> field is not resolved: the
            column renders <Code>0</Code> for every row, whatever variant was written,
            and the value is not validated against the tag type.
            Treat a tag as declared intent for now. To filter or group on a
            classification today, store it in an ordinary column. The{' '}
            <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">Tags</Link>{' '}
            page lists the full set of limits.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Precision is a storage decision</h2>
          <p className="text-text-secondary mb-4">
            A time-keyed series stores its key at a declared <Code>precision</Code>:{' '}
            <Code>second</Code>, <Code>millisecond</Code> (the default),{' '}
            <Code>microsecond</Code>, or <Code>nanosecond</Code>. Keys are truncated to
            it on write, not on display. Here two writes 400 milliseconds apart land on
            the same whole second and become two rows with equal keys - allowed, because
            the key orders rows and does not identify them:
          </p>
          <ExecutableSnippet title={dmSeriesPrecision.title} initialCode={dmSeriesPrecision.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Two consequences. Declare a precision at least as fine as the source
            resolution: a coarser one silently merges instants that were distinct at
            the source. And filter literals are not truncated - a
            lookup for the original <Code>...201500</Code> value matches nothing, only
            the stored <Code>...201000</Code> does. Query a truncated series with keys
            at its own precision.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">One timeline per partition</h2>
          <p className="text-text-secondary mb-4">
            <Code>partition: {'{'} by: {'{'} col {'}'} {'}'}</Code> splits a series into
            one independently ordered sub-series per distinct partition value - a
            timeline per sensor, per account, per shard. Within a partition, reads are
            newest key first. Across partitions the scan order is not defined, so sort
            explicitly whenever more than one partition is in play:
          </p>
          <ExecutableSnippet title={dmSeriesPartition.title} initialCode={dmSeriesPartition.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Filtering on the partition column reads a single timeline, newest first,
            with no sort needed. The partition column is ordinary data otherwise; it is
            the <Code>key</Code> that orders entries within each partition.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Series or something else?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Current state keyed by identity (one row per user, per order): a{' '}
                <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Only the last N entries matter: a{' '}
                <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>,
                which evicts by count and scans oldest-first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Derived history - the output of a pipeline recorded over time: a
                series-backed{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A label on each entry that you need to filter or group by today: an
                ordinary column, until tags read back.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Bounding growth">
          A series grows without limit by design. To expire old entries, attach a TTL -
          see{' '}
          <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
