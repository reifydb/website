import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

export function WithPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            The with Clause
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>with {'{ ... }'}</Code> attaches an options block to the construct
            directly before it: a create statement, a column definition, or a pipeline
            operator. It is not an operator itself - it never stands alone as a pipeline
            step. The keys inside the braces belong to whatever the clause is attached
            to, and each construct accepts a fixed set of them.
          </p>
        </div>

        <Callout variant="note" title="Not SQL's WITH">
          RQL has no common table expressions. To name an intermediate result, assign
          it to a variable with{' '}
          <DocLink to="/docs/rql/variables">let</DocLink> and pipe from{' '}
          <Code>$name</Code>, or persist it as a{' '}
          <DocLink to="/docs/concepts/data-model/views">view</DocLink>.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where with appears</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Create statements.</strong> After the column block of a table,{' '}
                <DocLink to="/docs/concepts/data-model/ring-buffers">ring buffer</DocLink>,{' '}
                <DocLink to="/docs/concepts/data-model/series">series</DocLink>, or view:
                storage options like <Code>capacity</Code> or <Code>key</Code>, row
                settings, and partitioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Column definitions.</strong> After a column's type:{' '}
                <Code>auto_increment</Code> and <Code>dictionary</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Pipeline operators.</strong> At the end of{' '}
                <DocLink to="/docs/rql/transforms/join">join</DocLink>,{' '}
                <DocLink to="/docs/rql/transforms/distinct">distinct</DocLink>, and{' '}
                <DocLink to="/docs/rql/transforms/window">window</DocLink>: state
                lifetime and behavior options for the engine that keeps views up to
                date.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Storage options at creation</h2>
          <p className="text-text-secondary mb-4">
            Each storage shape has its own keys. A ring buffer declares its{' '}
            <Code>capacity</Code>; a series declares its <Code>key</Code> column and
            optionally <Code>precision</Code> and <Code>tag</Code>. Views place the
            clause between the column block and <Code>as</Code> - a ring-buffer-backed
            view takes <Code>capacity</Code>, a series-backed view takes{' '}
            <Code>precision</Code>. Unknown keys are rejected, so a typo fails at parse
            time instead of being silently ignored:
          </p>
          <ExampleSnippet id="with-storage-options" />
          <p className="text-text-secondary mt-4">
            Here the clause is the whole reason the shape works: two rows of capacity,
            so the third insert evicts the first. See{' '}
            <DocLink to="/docs/concepts/data-model/ring-buffers">ring buffers</DocLink>{' '}
            for partitioning with <Code>partition</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Row settings</h2>
          <p className="text-text-secondary mb-4">
            Tables, ring buffers, series, and views all accept a <Code>row</Code> block
            that controls the lifetime of their rows: <Code>ttl</Code> with a{' '}
            <Code>duration</Code> such as <Code>'30m'</Code> or <Code>'30d'</Code> and
            an optional <Code>mode</Code> (<Code>drop</Code> or <Code>delete</Code>),
            plus <Code>persistent: false</Code> for rows that live in memory only.
            A non-persistent shape must also declare a TTL - rows that never reach disk
            have to expire.
          </p>
          <ExampleSnippet id="with-row-ttl" />
          <p className="text-text-secondary mt-4">
            The full expiry semantics - what anchors the clock, what each mode means for
            views and subscriptions - are covered on the{' '}
            <DocLink to="/docs/concepts/ttl">TTL</DocLink> page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Column options</h2>
          <p className="text-text-secondary mb-4">
            A with block after a column's type configures that column.{' '}
            <Code>auto_increment</Code> makes the engine fill the column from a{' '}
            <DocLink to="/docs/concepts/data-model/sequences">sequence</DocLink> when
            an insert omits it; <Code>dictionary: ns::dict</Code> stores the column
            dictionary-encoded through a{' '}
            <DocLink to="/docs/concepts/data-model/dictionaries">dictionary</DocLink>:
          </p>
          <ExampleSnippet id="with-column-options" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Operator options</h2>
          <p className="text-text-secondary mb-4">
            On pipeline operators, with configures the state the flow engine keeps when
            the pipeline runs inside a view. <Code>join</Code> accepts three keys:{' '}
            <Code>snapshot: true</Code> turns the joined-in side into a passive lookup -
            right-side changes update the join's state but emit no revisions to rows
            already joined; <Code>latest: true</Code> keeps only the newest right-side
            row per key instead of every match; and{' '}
            <Code>ttl: {'{ left: { duration: \'1h\' } }'}</Code> (and/or{' '}
            <Code>right</Code>) evicts join state that has not been touched within the
            duration.
          </p>
          <ExampleSnippet id="with-join-options" />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>distinct</Code> takes a <Code>ttl</Code> the same way: an entry the
            operator has not seen within the duration is evicted, so the value counts
            as new when it next appears.
          </p>
          <ExampleSnippet id="with-distinct-ttl" />
          <p className="text-text-secondary mt-4">
            These options exist for incremental view maintenance. An ad-hoc query like
            the ones above accepts them, but since it computes its result in one shot,
            there is no long-lived state for them to manage.{' '}
            <DocLink to="/docs/rql/transforms/window">window</DocLink> is configured the
            same way (<Code>with {'{ interval: \'5s\' }'}</Code>) and only runs inside
            deferred views; newer engine builds also accept{' '}
            <Code>with {'{ ttl: ... }'}</Code> on{' '}
            <DocLink to="/docs/rql/transforms/apply">apply</DocLink>, though the sandbox
            build on this site does not.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Keys are validated</h2>
          <p className="text-text-secondary mb-4">
            The with block is not a free-form bag of settings. Every construct checks
            the keys it is given - a table accepts <Code>row</Code> and{' '}
            <Code>partition</Code> and nothing else:
          </p>
          <ExampleSnippet id="with-unknown-key" />
        </section>
      </div>
    </Layout>
  );
}
