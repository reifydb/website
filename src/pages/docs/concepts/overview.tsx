import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function ConceptsOverviewPage() {
  return (
    <Layout>
      <DocStub
        title="Application State Database"
        description="ReifyDB stores, mutates, and derives live application state under one transactional model. This page explains what that means and when to reach for it."
        sections={[
          {
            heading: 'The problem it replaces',
            body: (
              <p>
                Most applications bolt together a database, a cache, and glue workers that
                keep derived data fresh. This section will show how tables plus incrementally
                maintained views replace the database-plus-cache pattern and the polling jobs
                around it.
              </p>
            ),
          },
          {
            heading: 'In-memory, asynchronously durable',
            body: (
              <p>
                Commits are fast because durability is decoupled from commit latency: state
                lives in memory and is persisted asynchronously. This section will explain the
                trade-off and what it means for crash recovery.
              </p>
            ),
          },
          {
            heading: 'What ReifyDB is not',
            body: (
              <p>
                Not a BI warehouse, not a place for ad-hoc analytics over cold data, and not a
                target for untrusted queries. This section will draw the boundary honestly.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
