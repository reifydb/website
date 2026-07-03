import { Layout } from '../layout.tsx';
import { DocStub, CodeBlock } from '../components';

export function RunServerPage() {
  return (
    <Layout>
      <DocStub
        kicker="Operate"
        title="Run the Server"
        description="Start reifydb-server, know its ports, and shut it down cleanly."
        sections={[
          {
            heading: 'Starting',
            body: (
              <>
                <CodeBlock language="bash" code={`reifydb-server`} />
                <p>
                  By default the server listens for HTTP on 0.0.0.0:8090 and WebSocket on
                  0.0.0.0:8091, with admin endpoints bound to localhost. This section will
                  document every port and flag.
                </p>
              </>
            ),
          },
          {
            heading: 'Lifecycle',
            body: (
              <p>
                The server runs until signalled and shuts down gracefully. This section will
                cover signals, draining, and what happens to unflushed state.
              </p>
            ),
          },
          {
            heading: 'Docker',
            body: (
              <p>
                This section will provide a container image reference and a minimal
                docker run example.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
