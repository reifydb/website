import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelSubscriptionsPage() {
  return (
    <Layout
      title="Subscriptions"
      description="Live queries that deliver the current rows once and then every committed change: declaration, the _op column, hydration, throttle and linger, and dropping."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Subscriptions</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A subscription is a live query. A client registers a pipeline, receives the
            rows that match right now, and from then on receives every change to that
            result as it commits: new rows, changed rows, and removed rows. Nothing is
            polled and nothing is diffed on the client; the server pushes exactly what
            moved.
          </p>
        </div>

        <Callout variant="warning" title="Not runnable in the playground">
          Subscriptions need a running server with a client connection to deliver to.
          The in-browser engine used by the executable snippets elsewhere in these docs
          has no subscription service, so <Code>create subscription</Code> fails there
          with an internal error. The statements on this page are shown as static code.
        </Callout>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Declaring a subscription</h2>
          <p className="text-text-secondary mb-4">
            <Code>create subscription</Code> takes an optional output shape, an optional{' '}
            <Code>with</Code> block, and a required <Code>as</Code> block holding the
            pipeline. The pipeline is ordinary RQL: any source, including a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>,
            and any operators.
          </p>
          <RqlCodeBlock code={`create subscription { id: int4, status: utf8 } as {
  from shop::orders
  filter { status == "open" }
  map { id, status }
}`} />
          <p className="text-text-secondary mt-4 mb-4">
            The shape can be left out, in which case the pipeline's own columns are
            delivered. <Code>as</Code> cannot be left out. The confirmation returns the
            new subscription's id together with the settings that ended up in effect:
          </p>
          <CodeBlock language="text" code={`subscription_id | created | hydration_enabled | hydration_max_rows | throttle_ms | linger_ms`} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">What arrives: the _op column</h2>
          <p className="text-text-secondary mb-4">
            Every delivered row carries one implicit column, <Code>_op</Code>, a{' '}
            <Code>uint1</Code> that says what happened to the row:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>1</Code>: insert. The row entered the result.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>2</Code>: update. The row is still in the result, with new values.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Code>3</Code>: remove. The row left the result.</span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            "Left the result" is judged against the pipeline, not the table. An order
            whose status changes from <Code>"open"</Code> to <Code>"shipped"</Code> is
            an update in <Code>shop::orders</Code> but arrives at the subscription above
            as a remove, because it no longer passes the filter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Hydration</h2>
          <p className="text-text-secondary mb-4">
            Hydration is the initial snapshot. It is on by default: before any live
            change is sent, every row currently matching the pipeline is delivered as an
            insert, so a client can build its state from the stream alone. Turn it off
            when the client only cares about what happens from now on, or cap it when
            the current result is large:
          </p>
          <RqlCodeBlock code={`create subscription with { hydration: { enabled: false } } as {
  from shop::orders
};

create subscription with { hydration: { max_rows: 1000 } } as {
  from shop::orders
}`} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>hydration</Code> is always a block with <Code>enabled</Code> and/or{' '}
            <Code>max_rows</Code>; a bare <Code>hydration: false</Code> is a parse error,
            and <Code>max_rows</Code> must be greater than zero.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Throttle and linger</h2>
          <p className="text-text-secondary mb-4">
            Two duration settings shape how changes are batched on the way out. Both
            take a bare duration literal such as <Code>250ms</Code> or <Code>1s</Code>:
          </p>
          <RqlCodeBlock code={`create subscription with { throttle: 1s, linger: 50ms } as {
  from shop::orders
  filter { status == "open" }
}`} />
          <ul className="space-y-2 text-text-secondary mt-4 mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>throttle</Code> is the minimum interval between two sends to the
                same subscription. Changes that arrive inside the interval are held and
                sent together. The server enforces a floor on non-zero values
                (<Code>subscribe_min_throttle</Code>, 50 ms by default), so asking for
                less rounds up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>linger</Code> is how long to wait after the first pending change
                before sending, so a burst of writes lands as one batch instead of many.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            The values actually in effect after clamping are the <Code>throttle_ms</Code>{' '}
            and <Code>linger_ms</Code> columns of the create confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Dropping a subscription</h2>
          <p className="text-text-secondary mb-4">
            A subscription lives until it is dropped or the client unsubscribes.{' '}
            <Code>drop subscription</Code> names it as <Code>subscription_</Code>{' '}
            followed by the <Code>subscription_id</Code> number from the create
            confirmation, and reports <Code>subscription | dropped</Code>. A name that
            does not match a live subscription is an error unless you add{' '}
            <Code>if exists</Code>, in which case the row comes back with{' '}
            <Code>dropped: false</Code>:
          </p>
          <RqlCodeBlock code={`drop subscription subscription_7;
drop subscription if exists subscription_7`} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Consistency</h2>
          <p className="text-text-secondary mb-4">
            Changes are produced from the commit log after a transaction commits, never
            from uncommitted writes, and a subscription observes each transaction's
            effect on its result. Delivery is eventually consistent: a client sees the
            change shortly after commit, subject to the throttle and linger settings, not
            inside the committing transaction. If you need work to happen inside the
            transaction, use an{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>{' '}
            with a handler instead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Consuming from a client</h2>
          <p className="text-text-secondary mb-4">
            You rarely write <Code>create subscription</Code> by hand. The client
            libraries take the pipeline body and the settings, wrap them in the statement
            above, and turn <Code>_op</Code> into callbacks, so application code sees{' '}
            <Code>on_insert</Code>, <Code>on_update</Code>, and <Code>on_remove</Code>{' '}
            with the <Code>_op</Code> column already stripped. Several subscriptions can
            be opened in one request and share a single delivery envelope. See the{' '}
            <Link to="/docs/clients/typescript" className="text-primary hover:text-primary-light font-medium transition-colors">TypeScript client</Link>{' '}
            for the API and{' '}
            <Link to="/docs/clients/wire-formats" className="text-primary hover:text-primary-light font-medium transition-colors">Wire Formats</Link>{' '}
            for the messages on the socket. The scripting section has a shorter{' '}
            <Link to="/docs/scripting/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscriptions overview</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Subscription, view, or event?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A client process needs to be told about changes: subscription. It is the
                only one of the three that leaves the database.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                The database should keep a computed result up to date for anyone to
                query: a{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>.
                Subscribing to a view is the usual way to stream a complex result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                The database should react to a change inside the same transaction: an{' '}
                <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>{' '}
                with{' '}
                <Link to="/docs/concepts/data-model/handlers" className="text-primary hover:text-primary-light font-medium transition-colors">handlers</Link>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
