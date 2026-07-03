import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function ClientsOverviewPage() {
  return (
    <Layout>
      <DocStub
        title="Clients"
        description="ReifyDB runs embedded inside your process or as a server behind HTTP, WebSocket, and gRPC. Pick the client that matches your architecture."
        sections={[
          {
            heading: 'Embedded or server',
            body: (
              <p>
                Embedded Rust gives you the engine in-process with no network hop. The server
                exposes the same engine to any language over the wire. This section will map
                typical architectures to a mode.
              </p>
            ),
          },
          {
            heading: 'Available clients',
            body: (
              <p>
                Rust (embedded and network), TypeScript/JavaScript, and Python, plus a WASM
                build for browsers. This section will summarize maturity and feature coverage
                per client.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
