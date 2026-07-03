import { Layout } from '../layout.tsx';
import { DocStub, CodeBlock } from '../components';

export function AiAgentsPage() {
  return (
    <Layout>
      <DocStub
        kicker="Resources"
        title="For AI Agents"
        description="Machine-readable entry points for coding assistants working with ReifyDB and RQL."
        sections={[
          {
            heading: 'llms.txt',
            body: (
              <>
                <p>
                  A curated index of these docs lives at /llms.txt, and the full text of every
                  page is concatenated at /llms-full.txt:
                </p>
                <CodeBlock
                  language="bash"
                  code={`curl https://reifydb.com/llms.txt
curl https://reifydb.com/llms-full.txt`}
                />
              </>
            ),
          },
          {
            heading: 'Ground rules for generated RQL',
            body: (
              <p>
                RQL is not SQL: there is no SELECT, projection is map, filtering is filter,
                grouping is aggregate ... by, and the missing value is none, never null.
                Pointing an agent at the RQL section of these docs prevents most invented
                syntax.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
