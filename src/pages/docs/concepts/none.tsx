import { Layout } from '../layout.tsx';
import { DocStub } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function WorkingWithNonePage() {
  const propagates = getExampleById('rql5-none-propagates')!;
  const testFor = getExampleById('rqlsql-is-none')!;
  return (
    <Layout>
      <DocStub
        title="Working with none"
        description="ReifyDB has no null. The missing value is none, it is typed, and every operation defines how it behaves when none flows through."
        sections={[
          {
            heading: 'none is typed',
            body: (
              <p>
                A missing int4 is still an int4. Optional columns are declared as
                Option(type), and none carries the inner type with it. This section will
                cover declaring optional columns and what the type checker enforces.
              </p>
            ),
          },
          {
            heading: 'Propagation',
            body: (
              <>
                <p>
                  Arithmetic and most scalar functions propagate none instead of failing:
                </p>
                <ExecutableSnippet title={propagates.title} initialCode={propagates.code} />
              </>
            ),
          },
          {
            heading: 'Testing for none',
            body: (
              <>
                <p>
                  Equality against none never matches. Use is::none and is::some:
                </p>
                <ExecutableSnippet title={testFor.title} initialCode={testFor.code} />
              </>
            ),
          },
          {
            heading: 'Choosing a policy',
            body: (
              <p>
                Arithmetic comes in explicit policy variants (math::add::none,
                math::add::saturate, math::add::strict, and friends) so missing values and
                overflow are a decision, not an accident. This section will link the full
                policy reference.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
