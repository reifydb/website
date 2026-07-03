import { Layout } from '../layout.tsx';
import { DocStub } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function RqlControlFlowPage() {
  const letExample = getExampleById('rql5-let')!;
  return (
    <Layout>
      <DocStub
        kicker="RQL scripting"
        title="Variables & Control Flow"
        description="RQL statements can bind variables and branch, turning queries into scripts without leaving the language."
        sections={[
          {
            heading: 'Variables with let',
            body: (
              <>
                <p>Bind a value once, use it anywhere in the statement:</p>
                <ExecutableSnippet title={letExample.title} initialCode={letExample.code} />
              </>
            ),
          },
          {
            heading: 'Branching and loops',
            body: (
              <p>
                if/else expressions, loop, while, break, continue, and match. This section
                will document each construct with runnable examples.
              </p>
            ),
          },
          {
            heading: 'Closures',
            body: (
              <p>
                Anonymous functions for reusable expressions inside scripts. This section will
                cover closure syntax and where closures can be called.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
