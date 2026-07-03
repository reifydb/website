import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function WindowedAggregationGuidePage() {
  return (
    <Layout>
      <DocStub
        kicker="Guide"
        title="Windowed Aggregation over Live Data"
        description="Maintain per-interval rollups (counts, sums, rates) with window inside a deferred view."
        sections={[
          {
            heading: 'Tumbling windows',
            body: (
              <p>
                window tumbling {'{ ... }'} with {'{ interval: \'5s\' }'} buckets rows by
                time. This guide will build a live request-rate rollup end to end.
              </p>
            ),
          },
          {
            heading: 'Reading windowed results',
            body: (
              <p>
                Querying the view returns one row per bucket. This section will cover bucket
                boundaries and late data.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
