import { Layout } from '../layout.tsx';
import { DocStub, CodeBlock } from '../components';

export function RustEmbeddedClientPage() {
  return (
    <Layout>
      <DocStub
        kicker="Clients"
        title="Rust (Embedded)"
        description="Run the full engine inside your Rust process. No server, no network, one crate."
        sections={[
          {
            heading: 'Getting started',
            body: (
              <>
                <p>Build an in-memory database and run RQL against it:</p>
                <CodeBlock
                  language="rust"
                  code={`let db = embedded::memory().build()?;

db.command_as_root("create namespace app", Params::None)?;
let frames = db.query_as_root("from app::users", Params::None)?;`}
                />
                <p>
                  This section will grow into a complete walkthrough: the builder, storage
                  options, and shutting down cleanly.
                </p>
              </>
            ),
          },
          {
            heading: 'Commands, queries, and admin',
            body: (
              <p>
                Writes go through command sessions, reads through query sessions, and DDL
                through admin. This section will document each entry point and parameter
                binding with Params.
              </p>
            ),
          },
          {
            heading: 'Mapping rows to structs',
            body: (
              <p>
                Results arrive as frames; the FromFrame derive maps rows onto your structs.
                This section will show the derive and manual access side by side.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
