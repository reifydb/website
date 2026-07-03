import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function DurabilityPage() {
  return (
    <Layout>
      <DocStub
        title="Durability & Storage"
        description="State lives in memory for latency and is persisted asynchronously for durability. Storage backends decide where the persistent copy goes."
        sections={[
          {
            heading: 'Asynchronous persistence',
            body: (
              <p>
                Commit latency is decoupled from disk. This section will explain the write
                path, flush behavior, and the failure window that asynchronous durability
                implies.
              </p>
            ),
          },
          {
            heading: 'Storage backends',
            body: (
              <p>
                Pure in-memory for tests and ephemeral state, SQLite-backed persistence for
                durable deployments. This section will cover configuring each backend.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
