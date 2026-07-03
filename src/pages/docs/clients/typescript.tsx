import { Layout } from '../layout.tsx';
import { DocStub, CodeBlock } from '../components';

export function TypeScriptClientPage() {
  return (
    <Layout>
      <DocStub
        kicker="Clients"
        title="TypeScript / JavaScript"
        description="Connect to a ReifyDB server from Node.js or the browser with @reifydb/client."
        sections={[
          {
            heading: 'Connecting',
            body: (
              <>
                <p>Connect over WebSocket or HTTP:</p>
                <CodeBlock
                  language="typescript"
                  code={`import { Client } from '@reifydb/client';

const client = await Client.connect_ws('ws://localhost:8091');
const frames = await client.query('from app::users');`}
                />
                <p>
                  This section will cover both transports, JSON versus binary encodings, and
                  reconnect behavior.
                </p>
              </>
            ),
          },
          {
            heading: 'React hooks',
            body: (
              <p>
                @reifydb/react provides hooks for queries and live results. This section will
                document them with a small component example.
              </p>
            ),
          },
          {
            heading: 'In-browser WASM',
            body: (
              <p>
                @reifydb/wasm runs the whole engine in the browser; it is what powers the
                runnable snippets in these docs. This section will cover when that is the
                right tool.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
