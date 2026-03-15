import { Layout } from '../../layout.tsx';
import { CodeBlock } from '../../components';
import { Callout } from '../../components';

export function SubscriptionsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Subscriptions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Subscriptions provide live, streaming queries. When underlying data changes,
            subscribers receive updates automatically.
          </p>
        </div>

        <Callout variant="note" title="Server Required">
          Subscriptions are long-lived streaming connections and require a running ReifyDB server.
          They cannot be demonstrated in the browser playground.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Subscription</h2>
          <CodeBlock
            language="rql"
            code={`CREATE NAMESPACE app;
CREATE TABLE app::events { id: int4, kind: utf8 };

CREATE SUBSCRIPTION {
  id: int4,
  kind: utf8
} AS {
  FROM app::events
}`}
          />
          <p className="text-text-secondary mt-4">
            A subscription defines a schema and a query. When data matching the query changes,
            connected clients receive the updated rows.
          </p>
        </section>
      </div>
    </Layout>
  );
}
