import { Layout } from './layout.tsx';
import { DocStub } from './components';

export function ConnectPage() {
  return (
    <Layout>
      <DocStub
        title="Connect"
        description="How to reach a running ReifyDB server and pick the right client for your architecture."
        sections={[
          {
            heading: 'Endpoints',
            body: (
              <p>
                A ReifyDB server exposes HTTP on port 8090 and WebSocket on port 8091 by
                default, plus separate admin endpoints. This section will list each endpoint,
                its default bind address, and when to use which.
              </p>
            ),
          },
          {
            heading: 'Authentication',
            body: (
              <p>
                Clients authenticate with a bearer token and receive a session. This section
                will cover issuing tokens and authenticating from each client library.
              </p>
            ),
          },
          {
            heading: 'Choosing a client',
            body: (
              <p>
                Embedded Rust for in-process state, the network clients (Rust, TypeScript,
                Python) for talking to a server. This section will map common architectures
                to the right connection mode.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
