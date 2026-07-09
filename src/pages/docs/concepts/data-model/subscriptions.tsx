import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelSubscriptionsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Subscriptions</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A subscription is a change stream over a data source. It uses the same
            change-data-capture flow machinery as deferred{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>,
            but instead of materializing into a storage shape, it produces an
            append-only log of changes that connected clients consume - the primitive
            behind live queries in a frontend.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a subscription</h2>
          <p className="text-text-secondary mb-4">
            The declaration mirrors a view: a column list and a pipeline. The pipeline
            supports <Code>from</Code>, <Code>filter</Code>, and <Code>map</Code>, so a
            client can subscribe to exactly the slice of state it renders:
          </p>
          <CodeBlock
            language="rql"
            code={`create subscription { id: int4, status: utf8 } as {
  from shop::orders
  filter { status != "draft" }
  map { id, status }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The change log</h2>
          <p className="text-text-secondary mb-4">
            Each entry in the stream is a row of the declared shape plus an implicit{' '}
            <Code>_op</Code> column recording what happened to it:{' '}
            <Code>1</Code> for insert, <Code>2</Code> for update, <Code>3</Code> for
            delete. The log is append-only - an update does not rewrite an earlier
            entry, it appends a new one:
          </p>
          <CodeBlock
            language="text"
            code={`id | status    | _op
---+-----------+----
1  | placed    | 1
2  | placed    | 1
1  | shipped   | 2
2  | cancelled | 3`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Subscription, view, or event?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                You want the <em>current</em> derived state, queryable at any time: a{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                You want to <em>push each change</em> to consumers as it happens - a
                live-updating UI, a sync layer: a <strong>subscription</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                You want imperative reactions inside the database when something
                happens: an{' '}
                <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>{' '}
                with handlers.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mt-4">
            Like deferred views, subscriptions are eventually consistent: entries are
            produced from the change log after the source transaction commits.
          </p>
        </section>

        <Callout variant="warning" title="Not runnable in the browser playground">
          The examples on this page are static. Subscriptions are consumed over a
          client connection (for example WebSocket) and are not available in the
          in-browser WASM build that powers the runnable snippets elsewhere in these
          docs.
        </Callout>
      </div>
    </Layout>
  );
}
