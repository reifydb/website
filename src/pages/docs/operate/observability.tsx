import { Layout } from '../layout.tsx';
import { DocStub, CodeBlock } from '../components';

export function ObservabilityPage() {
  return (
    <Layout>
      <DocStub
        kicker="Operate"
        title="Metrics & Observability"
        description="The engine's own state is queryable with RQL through system vtables, and exportable via OpenTelemetry."
        sections={[
          {
            heading: 'System vtables',
            body: (
              <>
                <p>Storage and engine metrics are ordinary queryable sources:</p>
                <CodeBlock language="rql" code={`from system::metrics::storage::table::current`} />
                <p>This section will catalog the available vtables.</p>
              </>
            ),
          },
          {
            heading: 'OpenTelemetry',
            body: (
              <p>
                The server can export traces and metrics via OTEL. This section will cover
                enabling and configuring the exporter.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
