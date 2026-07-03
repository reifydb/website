import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function IncrementalViewsGuidePage() {
  return (
    <Layout>
      <DocStub
        kicker="Guide"
        title="Build Incremental Views"
        description="Design derived state with transactional and deferred views, and know which to pick."
        sections={[
          {
            heading: 'Transactional when reads must be exact',
            body: (
              <p>
                Balances, inventories, anything a subsequent read depends on. This guide will
                build one and demonstrate read-your-writes behavior.
              </p>
            ),
          },
          {
            heading: 'Deferred when writes must be cheap',
            body: (
              <p>
                Dashboards, counters, windowed rollups. This guide will build one and show
                the propagation delay in practice.
              </p>
            ),
          },
          {
            heading: 'Composing views',
            body: (
              <p>
                Views can read from views. This section will cover layering and the
                operational limits.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
