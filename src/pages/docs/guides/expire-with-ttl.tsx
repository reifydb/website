import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function TtlGuidePage() {
  return (
    <Layout>
      <DocStub
        kicker="Guide"
        title="Expire Data with TTL"
        description="Give rows a lifetime and let the engine drop them, instead of running cleanup jobs."
        sections={[
          {
            heading: 'Sessions that clean themselves up',
            body: (
              <p>
                This guide will model a session table with
                with {'{ row: { ttl: { duration: \'1h\', mode: drop } } }'} and show expiry
                flowing into dependent views.
              </p>
            ),
          },
          {
            heading: 'Choosing durations and modes',
            body: (
              <p>
                This section will cover the available modes and how to pick TTLs that match
                your consistency needs.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
