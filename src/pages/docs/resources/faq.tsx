import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function TroubleshootingFaqPage() {
  return (
    <Layout>
      <DocStub
        kicker="Resources"
        title="Troubleshooting & FAQ"
        description="Common errors, what they mean, and answers to the questions everyone asks first."
        sections={[
          {
            heading: 'Common errors',
            body: (
              <p>
                RQL errors carry stable codes (AST_*, RUNTIME_*, FUNCTION_*) with location
                and help text. This section will index the frequent ones with fixes.
              </p>
            ),
          },
          {
            heading: 'Frequently asked questions',
            body: (
              <p>
                Is RQL a SQL dialect? (No.) Can I use ReifyDB as my only database? When do
                views recompute? This section will collect and answer real questions as they
                come in.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
