import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function DataModelPage() {
  return (
    <Layout>
      <DocStub
        title="Data Model"
        description="Namespaces organize state; tables, views, ringbuffers, sequences, series, and dictionaries hold it."
        sections={[
          {
            heading: 'Namespaces',
            body: (
              <p>
                Every object is addressed as namespace::object, for example company::employees.
                This section will cover creating namespaces and how the default namespace works.
              </p>
            ),
          },
          {
            heading: 'Tables and views',
            body: (
              <p>
                Tables hold authoritative, mutable state. Views hold derived state the engine
                maintains incrementally. This section will summarize both and link to the
                deep dive.
              </p>
            ),
          },
          {
            heading: 'Specialized primitives',
            body: (
              <p>
                Ringbuffers for bounded queues, sequences for id generation, series for
                time-series data, dictionaries for interned values. This section will describe
                when each one beats a plain table.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
