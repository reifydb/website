import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelSeriesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Series</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A series stores rows ordered by a required key column - a timestamp or an
            integer. It is the shape for measurements, audit trails, and historical
            records: data that arrives in order, is queried by range, and grows without
            an upper bound.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The key defines the order</h2>
          <p className="text-text-secondary mb-4">
            Every series declares its ordering column with{' '}
            <Code>with {'{'} key: column {'}'}</Code>. The key can be an integer -
            useful for sequence numbers, block heights, or logical clocks. Reads return
            the newest entries first. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-series-integer-key" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Time-keyed series and precision</h2>
          <p className="text-text-secondary mb-4">
            With a <Code>datetime</Code> key, the series stores timestamps at a
            declared <Code>precision</Code>: <Code>second</Code>,{' '}
            <Code>millisecond</Code> (the default), <Code>microsecond</Code>, or{' '}
            <Code>nanosecond</Code>:
          </p>
          <ExampleSnippet id="dm-series-datetime-key" />
          <p className="text-text-secondary mt-4 mb-4">
            If a write omits the key, the engine assigns the current time - so an
            append-only event log needs nothing beyond the payload:
          </p>
          <ExampleSnippet id="dm-series-auto-key" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Range queries follow the key</h2>
          <p className="text-text-secondary mb-4">
            Filters on the key column select by the series' native order, which is what
            time-window and "since X" queries compile to:
          </p>
          <ExampleSnippet id="dm-series-key-range" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">History can be corrected</h2>
          <p className="text-text-secondary mb-4">
            A series is ordered, not immutable. Late corrections - a recalibrated
            sensor, an amended audit record - are ordinary updates selected by key:
          </p>
          <ExampleSnippet id="dm-series-update" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Classifying entries with tags</h2>
          <p className="text-text-secondary mb-4">
            A series can attach a{' '}
            <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">tag type</Link>{' '}
            - a named set of variants, optionally with payload fields - to classify
            where each entry came from or what kind it is, without widening the schema:
          </p>
          <ExampleSnippet id="dm-series-tag" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Series or something else?</h2>
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
                <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>.
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
