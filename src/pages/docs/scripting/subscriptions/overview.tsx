import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function SubscriptionsOverviewPage() {
  return (
    <Layout
      title="Subscriptions"
      description="The create subscription statement in RQL: declared shape and pipeline, the change log it produces, hydration, throttle and linger, how clients open and close a subscription, and drop subscription."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Subscriptions</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A subscription is a live query. You declare a pipeline over tables or
            views, and the engine pushes every change to its result to the client that
            opened it, on the connection it was opened on, for as long as that
            connection lives. This page covers the statement, the options in its{' '}
            <Code>with</Code> block, what the stream carries, and how a subscription is
            opened and closed. For how subscriptions sit next to views and events, see{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">Subscriptions in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The statement</h2>
          <p className="text-text-secondary mb-4">
            The shape mirrors <Code>create view</Code>: a column list, an optional{' '}
            <Code>with</Code> block, and the pipeline in an <Code>as</Code> block. The
            statement carries no name - the server names each subscription when it is
            opened and hands the id back to the client:
          </p>
          <CodeBlock
            language="rql"
            code={`create subscription { col: type, ... }
[with {
  hydration: { enabled: true, max_rows: 500 },
  throttle: '100ms',
  linger: '20ms'
}]
as { pipeline }`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The pipeline reads a table or a view with <Code>from</Code> and shapes the
            rows with <Code>filter</Code>, <Code>map</Code>, <Code>extend</Code>, and{' '}
            <Code>gate</Code>. The column list is the contract: the pipeline must
            produce those columns, and a column the pipeline can leave empty is declared{' '}
            <Code>Option(type)</Code>. A subscription over a view is the usual way to
            stream an aggregate or a join, since the view does that work once for every
            subscriber:
          </p>
          <CodeBlock
            language="rql"
            code={`create subscription { id: int4, customer: utf8, total: int8 } as {
  from shop::orders
  filter { status == "open" }
  map { id, customer, total }
}`}
          />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What arrives</h2>
          <p className="text-text-secondary mb-4">
            The stream is an append-only log. Each entry is a row of the declared shape
            plus <Code>_op</Code>: <Code>1</Code> for insert, <Code>2</Code> for update,{' '}
            <Code>3</Code> for delete. An update does not rewrite the earlier entry; it
            appends a new one carrying the row's new values. Two inserts followed by an
            update of the first row produce three entries:
          </p>
          <CodeBlock
            language="text"
            code={`id | value | _op
---+-------+----
1  | 100   | 1
2  | 200   | 1
1  | 999   | 2`}
          />
          <p className="text-text-secondary mt-4">
            A delete appends the row's last values with <Code>_op 3</Code>. A{' '}
            <Code>filter</Code> in the pipeline turns membership changes into entries
            too: a row that starts matching arrives as an insert and a row that stops
            matching arrives as a delete, so a client can keep an exact mirror of the
            result by applying each entry in order. Entries are produced from the change
            log after the source transaction commits, so a subscription is eventually
            consistent, like a{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Hydration</h2>
          <p className="text-text-secondary mb-4">
            By default a new subscription starts by delivering the rows that already
            match, each as an <Code>_op 1</Code> entry, and then continues with live
            changes. That gives a client its initial state and its updates from one
            source, with no gap between them.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>
              <Code>hydration: {'{'} enabled: false {'}'}</Code> skips the initial
              rows. The client sees only changes that commit after it subscribed.
            </li>
            <li>
              <Code>max_rows</Code> caps how many existing rows are delivered. The
              server enforces its own ceiling on top of it, 10,000 rows by default.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Throttle and linger</h2>
          <p className="text-text-secondary mb-4">
            Both options shape how entries are batched into messages; neither drops an
            entry.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>
              <Code>throttle</Code> is the minimum time between two pushes to the
              client. Entries that arrive sooner wait and go out together in the next
              push. The server enforces a floor, 50 ms by default, so a smaller value
              is raised to it.
            </li>
            <li>
              <Code>linger</Code> is how long the first entry of a batch is held so
              that entries committed right after it join the same push. It defaults to
              zero. A burst of writes then arrives as one message instead of many.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Opening and closing a subscription</h2>
          <p className="text-text-secondary mb-4">
            A subscription is opened over a persistent connection, not with a
            one-shot request. On the WebSocket protocol the client sends a{' '}
            <Code>Subscribe</Code> message carrying the statement and receives{' '}
            <Code>Subscribed</Code> with the <Code>subscription_id</Code>; entries then
            stream on that connection until the client sends <Code>Unsubscribe</Code>{' '}
            with the id or the connection closes. Either way the server drops the
            subscription; nothing is left behind.
          </p>
          <p className="text-text-secondary mb-4">
            The TypeScript client wraps this: <Code>subscribe(rql, params, shape,
            callbacks, config)</Code> takes only the pipeline body, builds the{' '}
            <Code>create subscription</Code> statement from it and the hydration,
            throttle, and linger settings in <Code>config</Code>, and resolves to the
            subscription id. The callbacks are <Code>on_insert</Code>,{' '}
            <Code>on_update</Code>, and <Code>on_remove</Code>, one per{' '}
            <Code>_op</Code>. <Code>unsubscribe(id)</Code> closes it. The React package
            adds a <Code>useSubscription</Code> hook over the same call that keeps the
            mirrored rows in state. See the{' '}
            <Link to="/docs/clients/typescript" className="text-primary hover:text-primary-light font-medium transition-colors">TypeScript client</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Dropping a subscription from RQL</h2>
          <p className="text-text-secondary mb-4">
            Server-side, every open subscription is a catalog object named{' '}
            <Code>subscription_&lt;id&gt;</Code>, and it can be removed with a
            statement. This is what the server itself runs when a connection goes away,
            and it is the tool for cleaning up from an admin session:
          </p>
          <CodeBlock language="rql" code={`drop subscription if exists subscription_999`} />
          <CodeBlock
            language="text"
            code={`subscription     | dropped
-----------------+--------
subscription_999 | false`}
          />
          <p className="text-text-secondary mt-4">
            Without <Code>if exists</Code>, an unknown name fails with{' '}
            <Code>CA_011</Code>.
          </p>
        </section>

        <Callout variant="warning" title="Not runnable in the playground">
          The in-browser engine behind the runnable snippets elsewhere in these docs
          has no subscription service and no connection to deliver entries on:{' '}
          <Code>create subscription</Code> fails there with an internal error. The
          examples on this page are static. Run them against a server over the
          WebSocket protocol or through a client library.
        </Callout>
      </div>
    </Layout>
  );
}
