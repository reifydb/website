import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function TtlPage() {
  return (
    <Layout>
      <DocStub
        title="TTL & Row Settings"
        description="Rows can expire. Views and tables accept row settings that tell the engine when and how to drop stale data."
        sections={[
          {
            heading: 'Declaring a TTL',
            body: (
              <p>
                Row lifetime is declared with the with block, for example
                with {'{ row: { ttl: { duration: \'1h\', mode: drop } } }'}. This section will
                cover the syntax and the available modes.
              </p>
            ),
          },
          {
            heading: 'What expiry means for views',
            body: (
              <p>
                Expired rows flow through incremental maintenance like any other delete. This
                section will explain how TTL interacts with derived state.
              </p>
            ),
          },
          {
            heading: 'Use cases',
            body: (
              <p>
                Session state, rate-limit windows, caches with a real eviction contract. This
                section will show canonical patterns.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
