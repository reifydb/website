import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function ModelApplicationStatePage() {
  return (
    <Layout>
      <DocStub
        kicker="Guide"
        title="Model Application State"
        description="Replace a table-plus-cache pair with a table and a transactional view."
        sections={[
          {
            heading: 'The pattern',
            body: (
              <p>
                Authoritative state goes in a table; every read shape you would have cached
                becomes a view. This guide will walk a session-and-profile example end to end,
                with runnable RQL.
              </p>
            ),
          },
          {
            heading: 'What you delete from your stack',
            body: (
              <p>
                Cache invalidation code, refresh workers, and the consistency bugs between
                them. This section will make the comparison concrete.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
