import { Layout } from '../../layout.tsx';
import { DocStub } from '../../components';

export function ApplyPage() {
  return (
    <Layout>
      <DocStub
        kicker="RQL pipeline operator"
        title="apply"
        description="Runs a named operator as a pipeline step, extending a query with reusable transformations."
        sections={[
          {
            heading: 'What apply is for',
            body: (
              <p>
                apply invokes an operator by name inside a pipeline, with its own options
                block. This page will document the syntax, the built-in operators available
                through apply, and how it composes with the rest of the pipeline.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
