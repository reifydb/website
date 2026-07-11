import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TtlPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">TTL &amp; Row Settings</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A TTL (time-to-live) puts an age bound on rows: declare it once when a store
            is created, and the engine removes rows that have not been written to for the
            given duration. Where a{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>{' '}
            bounds data by count, a TTL bounds it by age - sessions, rate-limit windows,
            caches - without a cleanup job or a delete query anywhere. The TTL lives in
            the <Code>row</Code> settings block, alongside a <Code>persistent</Code>{' '}
            switch for rows that should never reach disk at all.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Declaring a TTL</h2>
          <p className="text-text-secondary mb-4">
            Row settings are part of the <Code>with</Code> block at creation:{' '}
            <Code>with {'{'} row: {'{'} ttl: {'{'} duration: '30m', mode: drop {'}'} {'}'} {'}'}</Code>.
            The <Code>duration</Code> is required and must be positive; it is a quoted
            duration literal such as <Code>'45s'</Code>, <Code>'30m'</Code>,{' '}
            <Code>'2d'</Code>, or a compound like <Code>'2d12h'</Code>.{' '}
            <Code>mode</Code> is optional and defaults to <Code>drop</Code>, the only
            mode the collector currently executes (more on <Code>delete</Code> below).
            Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="concepts-ttl-declare" />
          <p className="text-text-secondary mt-4 mb-4">
            The same <Code>row</Code> block is accepted wherever rows are stored: tables,{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>,{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffers</Link>, and{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>.
            Row settings are fixed at creation - there is no <Code>alter</Code> for them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The clock starts at the last write</h2>
          <p className="text-text-secondary mb-4">
            A row's age is measured from its last committed write, not from a timestamp
            column you maintain. Every commit is stamped with a version, and the engine
            keeps a mapping from wall-clock time to commit versions; a row expires when
            its newest version is older than the TTL. That makes TTL an{' '}
            <em>inactivity</em> bound: updating a row - any column, any value - restarts
            its clock. A session stays alive as long as it is touched, and quietly ages
            out once it is not:
          </p>
          <ExampleSnippet id="concepts-ttl-touch-resets" />
          <p className="text-text-secondary mt-4 mb-4">
            Because expiry is anchored to the write itself, there is no per-row expiry
            column to declare and nothing to keep in sync. The engine rejects any attempt
            to anchor the TTL elsewhere:
          </p>
          <ExampleSnippet id="concepts-ttl-no-anchor" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Expiry is a background sweep</h2>
          <p className="text-text-secondary mb-4">
            Expired rows are collected by a background scan, not at read time. The
            collector wakes on an interval (60 seconds by default, the{' '}
            <Code>ROW_TTL_SCAN_INTERVAL</Code> engine setting), walks each store that
            declares a TTL in batches, and physically removes every version of each
            expired row - reclaiming the storage, from memory and disk alike.
          </p>
          <p className="text-text-secondary mb-4">
            The consequence: a TTL is a retention guarantee, not a precise visibility
            deadline. A row past its TTL can remain readable until the next sweep picks
            it up. If a query must never see rows older than some cutoff, keep a
            timestamp column and <Code>filter</Code> on it - and let the TTL handle the
            physical cleanup behind it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What expiry means for views</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop</Code> mode is silent by design. Expired rows are removed from
            storage directly - no delete events are emitted, nothing flows through CDC,
            and{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>{' '}
            and{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscriptions</Link>{' '}
            over the store are not notified. A view built over a TTL table keeps the rows
            it has already derived even after the source rows expire.
          </p>
          <p className="text-text-secondary mb-4">
            That is not a gap to work around - it is how derived retention is meant to be
            expressed. Views accept the same <Code>row</Code> settings, so derived state
            declares its own lifetime, independent of its sources:
          </p>
          <ExampleSnippet id="concepts-ttl-view" />
          <Callout variant="warning" title="mode: delete is accepted but not collected yet">
            The syntax reserves <Code>mode: delete</Code> for expiry that emits real
            deletes - removals that would flow through incremental view maintenance and
            CDC like any other write. The current collector skips stores configured with{' '}
            <Code>delete</Code> entirely, so declaring it today means no cleanup happens
            at all. Use <Code>drop</Code>.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Memory-only rows</h2>
          <p className="text-text-secondary mb-4">
            The second row setting is <Code>persistent</Code>. It defaults to{' '}
            <Code>true</Code>; set it to <Code>false</Code> and the store's rows are
            never flushed to the persistent tier - they live in memory only and do not
            survive a restart. This is the shape for state that is worthless tomorrow
            anyway: rate-limit counters, presence, short-lived coordination state. Writes
            stay transactional and queries work as usual; the rows just never cost any
            disk:
          </p>
          <ExampleSnippet id="concepts-ttl-memory-only" />
          <p className="text-text-secondary mt-4 mb-4">
            A non-persistent store must declare a TTL - rows that never reach disk and
            never expire would only ever grow. The engine enforces the pairing:
          </p>
          <ExampleSnippet id="concepts-ttl-persistent-requires-ttl" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">TTL for operator state</h2>
          <p className="text-text-secondary mb-4">
            Stateful operators inside a view query accept a TTL of their own:{' '}
            <Code>apply</Code>, <Code>distinct</Code>, and <Code>append</Code> take{' '}
            <Code>with {'{'} ttl: {'{'} duration: '1h' {'}'} {'}'}</Code>, and a join
            scopes it per side with{' '}
            <Code>with {'{'} ttl: {'{'} left: {'{'} duration: '1h' {'}'}, right: {'{'} duration: '1d' {'}'} {'}'} {'}'}</Code>.
            This bounds the operator's internal state - join entries, distinct keys -
            the same way a row TTL bounds a store: entries idle longer than the duration
            are evicted by the background collector. Operator TTL is always silent
            (only <Code>drop</Code> is allowed), so evicting state emits nothing
            downstream; it means the operator simply forgets inputs older than the TTL.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">TTL or something else?</h2>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Bound by <em>age</em>: TTL. Bound by <em>count</em>: a{' '}
                <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Bound by both: they compose. A ring buffer with a row TTL caps the row
                count <em>and</em> drops entries that go stale before eviction reaches
                them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Removal that must be observed - audited, mirrored into views the moment
                it happens: an explicit <Code>delete</Code>, which is an ordinary
                transactional write.
              </span>
            </li>
          </ul>
          <ExampleSnippet id="concepts-ttl-ringbuffer" />
        </section>

        <Callout variant="note" title="The engine eats its own cooking">
          ReifyDB's internal metrics series are seeded with row TTLs at bootstrap -
          7 days for runtime telemetry, 1 hour for profiler samples, both in{' '}
          <Code>drop</Code> mode - so the system's own append-only telemetry is bounded
          by the same mechanism available to your data.
        </Callout>
      </div>
    </Layout>
  );
}
