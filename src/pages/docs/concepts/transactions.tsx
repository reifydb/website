import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function TransactionsPage() {
  return (
    <Layout>
      <DocStub
        title="Transactions"
        description="ReifyDB is ACID with multi-version concurrency control. Writes go through command transactions, reads through query transactions."
        sections={[
          {
            heading: 'Command vs query transactions',
            body: (
              <p>
                Commands mutate state, queries read a consistent snapshot. This section will
                explain the split and how the client APIs expose it.
              </p>
            ),
          },
          {
            heading: 'MVCC and snapshots',
            body: (
              <p>
                Readers never block writers. This section will describe versioning, snapshot
                visibility, and conflict behavior.
              </p>
            ),
          },
          {
            heading: 'Views and transactions',
            body: (
              <p>
                Transactional views commit atomically with the writes that affect them. This
                section will also state the current caveats around flow transactions.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
