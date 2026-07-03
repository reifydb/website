import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function WireFormatsPage() {
  return (
    <Layout>
      <DocStub
        kicker="Clients"
        title="Wire Formats"
        description="Results travel as JSON, Protobuf, or RBCF, ReifyDB's binary column format."
        sections={[
          {
            heading: 'Choosing a format',
            body: (
              <p>
                JSON for debuggability, Protobuf for typed RPC, RBCF for the fastest path.
                This section will compare them and show how each client selects one.
              </p>
            ),
          },
          {
            heading: 'RBCF',
            body: (
              <p>
                A columnar binary encoding of frames. This section will document the layout
                for anyone implementing a client.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
