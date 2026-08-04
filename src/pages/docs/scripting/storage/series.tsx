import { scriptingCreateSeriesExample as srCreate, scriptingSeriesAutoKeyExample as srAutoKey, scriptingSeriesDeleteExample as srDelete, scriptingSeriesInsertExample as srInsert, scriptingSeriesKeyRequiredExample as srKeyRequired, scriptingSeriesPartitionExample as srPartition, scriptingSeriesPrecisionExample as srPrecision, scriptingSeriesRangeExample as srRange, scriptingSeriesTagExample as srTag, scriptingSeriesUpdateExample as srUpdate } from './series.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function SeriesPage() {
  return (
    <Layout
      title="Series"
      description="Creating and working with series in RQL: the required key column, inserting time-keyed data, newest-first scans, precision, tags, partitioning, and updates and deletes by key."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Series
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A series is append-optimized storage ordered by a declared key column -
            usually a timestamp, sometimes a sequence number. It is the store for
            metrics, sensor data, audit trails, and anything else that arrives in
            order, is queried by range, and grows without an upper bound. This page
            covers the full DDL and DML surface; for the conceptual framing, see{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">Series</Link>{' '}
            in the data model section.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a series</h2>
          <p className="text-text-secondary mb-4">
            <Code>create series</Code> takes a column list like a table, plus a{' '}
            <Code>with</Code> block that names the ordering column via{' '}
            <Code>key</Code>. Like all DDL, it returns a confirmation frame that
            includes the object's catalog id (the snippets on this page run against a
            shared playground engine, so the id you see may differ):
          </p>
          <ExecutableSnippet title={srCreate.title} initialCode={srCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The key is what makes a series a series - it is the axis the storage is
            organized around - so omitting the <Code>with</Code> block is rejected at
            parse time:
          </p>
          <ExecutableSnippet title={srKeyRequired.title} initialCode={srKeyRequired.code} />
          <p className="text-text-secondary mb-4">
            Besides the required <Code>key</Code>, the <Code>with</Code> block accepts{' '}
            <Code>precision</Code>, <Code>tag</Code>, and <Code>partition</Code>, each
            covered below. The key does not have to be a <Code>datetime</Code>: an
            integer key works the same way and suits sequence numbers, block heights,
            or logical clocks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inserting time-keyed data</h2>
          <p className="text-text-secondary mb-4">
            Rows are written with a plain <Code>insert</Code>. For a{' '}
            <Code>datetime</Code> key, constructors like{' '}
            <Code>datetime::from_epoch_millis</Code> turn raw epoch values into typed
            timestamps at the write boundary:
          </p>
          <ExecutableSnippet title={srInsert.title} initialCode={srInsert.code} />
          <p className="text-text-secondary mb-4">
            The scan at the end shows the series' native read order: newest key first.
            A bare <Code>from</Code> walks the key in descending order, which is almost
            always what a dashboard or "latest readings" query wants. Note that this
            differs from a{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ringbuffer</Link>,
            which scans oldest-first - add an explicit{' '}
            <Code>sort {'{'} ts: asc {'}'}</Code> when a pipeline needs chronological
            output.
          </p>
          <p className="text-text-secondary mb-4">
            Range queries are filters on the key column, and they follow the same
            newest-first order:
          </p>
          <ExecutableSnippet title={srRange.title} initialCode={srRange.code} />
          <p className="text-text-secondary mb-4">
            If a write omits the key entirely, the engine assigns the current time - an
            append-only event log needs nothing beyond the payload:
          </p>
          <ExecutableSnippet title={srAutoKey.title} initialCode={srAutoKey.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Precision</h2>
          <p className="text-text-secondary mb-4">
            A time-keyed series stores its key at a declared <Code>precision</Code>:{' '}
            <Code>second</Code>, <Code>millisecond</Code> (the default),{' '}
            <Code>microsecond</Code>, or <Code>nanosecond</Code>. Precision is a
            storage decision, not a display one - keys are truncated to it on write.
            Here a timestamp with 500 milliseconds of sub-second detail is stored in a{' '}
            <Code>precision: second</Code> series and comes back on the whole second:
          </p>
          <ExecutableSnippet title={srPrecision.title} initialCode={srPrecision.code} />
          <p className="text-text-secondary mb-4">
            Choose the coarsest precision your data honestly has. Two writes that
            truncate to the same key are two rows with equal keys, not a conflict - but
            if the key is meant to identify a measurement instant, storing at a
            precision coarser than the source resolution silently merges instants.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Tags</h2>
          <p className="text-text-secondary mb-4">
            A series can attach a{' '}
            <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">tag type</Link>{' '}
            - a named set of variants, optionally carrying payload fields - to classify
            where each entry came from or what kind it is, without widening the schema
            with mostly-empty optional columns. Define the tag type first, then reference it in the{' '}
            <Code>with</Code> block:
          </p>
          <ExecutableSnippet title={srTag.title} initialCode={srTag.code} />
          <p className="text-text-secondary mb-4">
            Entries in a tagged series carry a <Code>tag</Code> column alongside the
            declared ones, and inserts may set it to one of the type's variants, such
            as <Code>tag: Manual</Code> or{' '}
            <Code>tag: Sensor {'{'} location: "roof" {'}'}</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Partitioning</h2>
          <p className="text-text-secondary mb-4">
            <Code>partition: {'{'} by: {'{'} col {'}'} {'}'}</Code> splits the series
            into an independently ordered sub-series per distinct value of the
            partition columns - one timeline per sensor, per account, per shard. Scans
            return each partition's rows together, newest key first within the
            partition:
          </p>
          <ExecutableSnippet title={srPartition.title} initialCode={srPartition.code} />
          <p className="text-text-secondary mb-4">
            The order in which partitions appear in a scan is not defined - sort
            explicitly if it matters. Multiple partition columns are allowed
            (<Code>by: {'{'} sensor, location {'}'}</Code>), and each unique
            combination keeps its own ordering.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Updates and deletes by key</h2>
          <p className="text-text-secondary mb-4">
            A series is ordered, not immutable. A late correction - a recalibrated
            sensor, an amended audit entry - is an ordinary <Code>update</Code>{' '}
            selected by key, and the confirmation frame names the store kind:
          </p>
          <ExecutableSnippet title={srUpdate.title} initialCode={srUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Deletes take the same key filters, including ranges - useful for trimming
            history before a cutoff:
          </p>
          <ExecutableSnippet title={srDelete.title} initialCode={srDelete.code} />
          <Callout variant="note" title="Bounding growth">
            A series grows without limit by design; a range delete is a one-off trim,
            not a retention policy. To expire old entries continuously, attach a row
            TTL - see{' '}
            <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>.
            If only the newest N entries matter at all, a{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ringbuffer</Link>{' '}
            is the better fit.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Why not a table with a datetime column?</h2>
          <p className="text-text-secondary mb-4">
            A table with a <Code>datetime</Code> column stores the same values, but the
            timestamp is just another column: the table is organized around row
            identity, scans return latest-inserted rows first regardless of their
            timestamps, and nothing relates a row's position in storage to its position
            in time. A series makes the key the organizing axis instead - storage is
            append-optimized and time-ordered, scans and range filters follow the key,
            the engine fills in the key with the current time when a write omits it,
            and <Code>precision</Code> pins down what a timestamp means. Use a{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>{' '}
            for current state keyed by identity (one row per user, per order) and a
            series for how values evolved over time. Derived history - the output of a
            pipeline recorded over time - can use series storage too, via{' '}
            <Code>create deferred series view ... with {'{'} key: ts {'}'}</Code> - see{' '}
            <Link to="/docs/scripting/views" className="text-primary hover:text-primary-light font-medium transition-colors">Views</Link>.
          </p>
        </section>

        <Callout variant="note" title="Everything is transactional">
          Series writes commit atomically with the rest of the request, like every
          other write - see{' '}
          <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
