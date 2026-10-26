import { conceptsTtlDeclareExample as conceptsTtlDeclare, conceptsTtlMemoryOnlyExample as conceptsTtlMemoryOnly, conceptsTtlNoAnchorExample as conceptsTtlNoAnchor, conceptsTtlPersistentRequiresTtlExample as conceptsTtlPersistentRequiresTtl, conceptsTtlRingbufferExample as conceptsTtlRingbuffer, conceptsTtlTouchResetsExample as conceptsTtlTouchResets, conceptsTtlViewExample as conceptsTtlView } from './ttl.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TtlPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">TTL &amp; Row Settings</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
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
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Declaring a TTL</h2>
          <p className="text-text-secondary mb-4">
            Row settings are part of the <Code>with</Code> block at creation, next to the
            object's time domain:{' '}
            <Code>with {'{'} time: processing, row: {'{'} ttl: 30m {'}'} {'}'}</Code>.
            The ttl is a bare duration literal such as <Code>45s</Code>, <Code>30m</Code>,{' '}
            <Code>2d</Code>, or a compound like <Code>2d12h</Code>, and must be positive.
            A row ttl needs a time domain, <Code>time: processing</Code> or{' '}
            <Code>time: event(col)</Code>; without one the create fails with{' '}
            <Code>TIME_005</Code>. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={conceptsTtlDeclare.title} initialCode={conceptsTtlDeclare.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same <Code>row</Code> block is accepted wherever rows are stored: tables,{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>,{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffers</Link>, and deferred{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>.
            A transactional view rejects a row ttl (<Code>FLOW_084</Code>). Row settings are fixed at creation - there is no <Code>alter</Code> for them.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The clock starts at the last write</h2>
          <p className="text-text-secondary mb-4">
            A row's age is measured from its last write, not from a timestamp column you
            maintain. Every insert and update stamps the row with the engine clock, and a
            row expires once that stamp is older than the TTL. That holds under{' '}
            <Code>time: event(col)</Code> too: the event column decides how windows bucket
            a row, not when it expires. That makes TTL an{' '}
            <em>inactivity</em> bound: updating a row - any column, any value - restarts
            its clock. A session stays alive as long as it is touched, and quietly ages
            out once it is not:
          </p>
          <ExecutableSnippet title={conceptsTtlTouchResets.title} initialCode={conceptsTtlTouchResets.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because expiry is anchored to the write itself, there is no per-row expiry
            column to declare and nothing to keep in sync. The engine rejects any attempt
            to anchor the TTL elsewhere:
          </p>
          <ExecutableSnippet title={conceptsTtlNoAnchor.title} initialCode={conceptsTtlNoAnchor.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Expiry is a background sweep</h2>
          <p className="text-text-secondary mb-4">
            Expired rows are collected by a background scan, not at read time. The
            collector wakes on an interval (60 seconds by default, the{' '}
            <Code>RETENTION_EVICT_INTERVAL</Code> engine setting), walks each store that
            declares a TTL in batches, and physically removes every version of each
            expired row - reclaiming the storage, from memory and disk alike. The
            in-browser playground runs no collector, so rows on this page never expire here.
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
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What expiry means for views</h2>
          <p className="text-text-secondary mb-4">
            Expiry is silent by design. Expired rows are removed from
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
            expressed. Deferred views accept the same <Code>row</Code> settings, so derived state
            declares its own lifetime, independent of its sources:
          </p>
          <ExecutableSnippet title={conceptsTtlView.title} initialCode={conceptsTtlView.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Memory-only rows</h2>
          <p className="text-text-secondary mb-4">
            The second row setting is <Code>persistent</Code>. It defaults to{' '}
            <Code>true</Code>; set it to <Code>false</Code> and the store's rows are
            never flushed to the persistent tier - they live in memory only and do not
            survive a restart. This is the shape for state that is worthless tomorrow
            anyway: rate-limit counters, presence, short-lived coordination state. Writes
            stay transactional and queries work as usual; the rows just never cost any
            disk:
          </p>
          <ExecutableSnippet title={conceptsTtlMemoryOnly.title} initialCode={conceptsTtlMemoryOnly.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A non-persistent store must declare a TTL - rows that never reach disk and
            never expire would only ever grow. The engine enforces the pairing:
          </p>
          <ExecutableSnippet title={conceptsTtlPersistentRequiresTtl.title} initialCode={conceptsTtlPersistentRequiresTtl.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">TTL for operator state</h2>
          <p className="text-text-secondary mb-4">
            Stateful operators inside a view query keep internal state of their own. A
            join bounds it per side with{' '}
            <Code>with {'{'} retention: {'{'} left: 1h, right: 2d {'}'} {'}'}</Code>, and{' '}
            <Code>lookup</Code> takes the same form. Retention needs event time on the
            sources. Eviction is silent: the operator simply forgets inputs older than the
            retention. <Code>distinct</Code> has no retention option.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">TTL or something else?</h2>
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
          <ExecutableSnippet title={conceptsTtlRingbuffer.title} initialCode={conceptsTtlRingbuffer.code} />
        </section>

        <Callout variant="note" title="The engine eats its own cooking">
          ReifyDB's internal metrics series are seeded with row TTLs at bootstrap -
          7 days for runtime telemetry, 1 hour for profiler samples - so the system's own append-only telemetry is bounded
          by the same mechanism available to your data.
        </Callout>
      </div>
    </Layout>
  );
}
