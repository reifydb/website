import { Layout } from '../layout.tsx';
import { DocStub, CodeBlock } from '../components';

export function PythonClientPage() {
  return (
    <Layout>
      <DocStub
        kicker="Clients"
        title="Python"
        description="Use ReifyDB from Python, embedded in-process via native bindings."
        sections={[
          {
            heading: 'Getting started',
            body: (
              <>
                <p>Create an embedded database and run RQL:</p>
                <CodeBlock
                  language="python"
                  code={`from reifydb import Embedded

db = Embedded()
rows = db.tx('from app::users')`}
                />
                <p>
                  This section will cover installation, transactions, and reading results.
                </p>
              </>
            ),
          },
          {
            heading: 'Type mapping',
            body: (
              <p>
                How RQL types, including none and the temporal types, map onto Python values.
                This section will provide the full table.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
