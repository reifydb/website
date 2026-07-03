import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function CaveatsPage() {
  return (
    <Layout>
      <DocStub
        kicker="Resources"
        title="Caveats & Limitations"
        description="Known sharp edges, stated plainly. ReifyDB is in development and not yet recommended for production."
        sections={[
          {
            heading: 'Flow transactions and read sets',
            body: (
              <p>
                Flow transactions do not currently track read sets, which is safe only for
                flows over disjoint keys. This section will keep the authoritative list of
                concurrency caveats in sync with the engine.
              </p>
            ),
          },
          {
            heading: 'Durability window',
            body: (
              <p>
                Persistence is asynchronous by design; a crash can lose the most recent
                commits. This section will quantify the window per storage backend.
              </p>
            ),
          },
          {
            heading: 'Pre-1.0 stability',
            body: (
              <p>
                Syntax and APIs can still change between releases. Breaking changes are
                called out in release notes.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
