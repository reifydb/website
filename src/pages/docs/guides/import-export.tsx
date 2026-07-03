import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function ImportExportGuidePage() {
  return (
    <Layout>
      <DocStub
        kicker="Guide"
        title="Import & Export Data"
        description="Move data into and out of ReifyDB: bulk inserts, exports, and getting existing datasets loaded."
        sections={[
          {
            heading: 'Bulk loading',
            body: (
              <p>
                INSERT takes arrays of records and the engine supports bulk paths for large
                loads. This guide will cover batching strategy and performance expectations.
              </p>
            ),
          },
          {
            heading: 'Exporting',
            body: (
              <p>
                This section will document the export facilities and formats, based on the
                export examples that ship with the Rust SDK.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
