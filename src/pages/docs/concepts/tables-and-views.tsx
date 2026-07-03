import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function TablesAndViewsPage() {
  return (
    <Layout>
      <DocStub
        title="Tables & Views"
        description="Tables hold the state you write. Views hold the state ReifyDB derives from it, kept current incrementally instead of recomputed."
        sections={[
          {
            heading: 'Incremental maintenance',
            body: (
              <p>
                When a row changes, the engine applies the delta to every affected view via
                change data capture and the flow engine. This section will explain the
                mechanism and its cost model.
              </p>
            ),
          },
          {
            heading: 'Transactional vs deferred views',
            body: (
              <p>
                Transactional views update inside the writing transaction; readers can never
                observe them stale. Deferred views update asynchronously for cheaper writes.
                This section will help you choose.
              </p>
            ),
          },
          {
            heading: 'Views over views',
            body: (
              <p>
                Derived state can feed further derived state. This section will cover
                composing views and where windowed aggregation fits.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
