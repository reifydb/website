import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function RustClientPage() {
  return (
    <Layout>
      <DocStub
        kicker="Clients"
        title="Rust (Client)"
        description="Talk to a ReifyDB server from Rust over WebSocket, HTTP, or gRPC."
        sections={[
          {
            heading: 'Transports',
            body: (
              <p>
                The reifydb-client crate ships WebSocket, HTTP, and gRPC transports behind
                feature flags. This section will cover choosing a transport and connecting.
              </p>
            ),
          },
          {
            heading: 'Authentication and sessions',
            body: (
              <p>
                Clients authenticate with a bearer token and hold a session. This section will
                document the token flow.
              </p>
            ),
          },
          {
            heading: 'Running RQL',
            body: (
              <p>
                Commands and queries mirror the embedded API. This section will show
                end-to-end examples per transport.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
