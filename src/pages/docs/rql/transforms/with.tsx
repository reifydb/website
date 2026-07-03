import { Layout } from '../../layout.tsx';
import { DocStub } from '../../components';

export function WithPage() {
  return (
    <Layout>
      <DocStub
        kicker="RQL clause"
        title="with"
        description="Attaches an options block to the construct before it: window intervals, row TTL settings, and other configuration."
        sections={[
          {
            heading: 'Where with appears',
            body: (
              <p>
                Windows take with {'{ interval: \'5s\' }'}; views and tables take row settings
                such as with {'{ row: { ttl: { duration: \'1h\', mode: drop } } }'}. This page
                will enumerate every construct that accepts a with block and its options.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
