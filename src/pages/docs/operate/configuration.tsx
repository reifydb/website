import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function ConfigurationPage() {
  return (
    <Layout>
      <DocStub
        kicker="Operate"
        title="Storage & Configuration"
        description="Configure the engine: storage backend, logging, and optional subsystems."
        sections={[
          {
            heading: 'Storage backends',
            body: (
              <p>
                In-memory or SQLite-backed persistence. This section will document the
                configuration for each and how to size them.
              </p>
            ),
          },
          {
            heading: 'Environment and logging',
            body: (
              <p>
                Log levels and tracing are controlled via environment variables. This section
                will list the supported settings.
              </p>
            ),
          },
          {
            heading: 'Optional subsystems',
            body: (
              <p>
                Metrics, tracing, and other subsystems are feature-gated. This section will
                describe what each adds and its cost.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
