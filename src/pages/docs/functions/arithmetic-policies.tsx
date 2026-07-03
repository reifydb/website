import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

const policies: { name: string; behavior: string }[] = [
  { name: 'none', behavior: 'Returns none on missing input or overflow.' },
  { name: 'saturate', behavior: 'Clamps to the type\'s minimum or maximum on overflow.' },
  { name: 'wrap', behavior: 'Wraps around on overflow (two\'s complement).' },
  { name: 'zero', behavior: 'Returns zero on missing input or overflow.' },
  { name: 'default', behavior: 'Returns the type\'s default value.' },
  { name: 'strict', behavior: 'Fails the statement on missing input or overflow.' },
];

export function ArithmeticPoliciesPage() {
  return (
    <Layout>
      <DocStub
        kicker="Functions"
        title="Arithmetic Overflow & none Policies"
        description="Every arithmetic function family (math::add, math::sub, math::mul, math::div, math::rem) has explicit variants that decide what happens on overflow or missing input."
        sections={[
          {
            heading: 'The policies',
            body: (
              <div className="border-2 border-border-default overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-bg-tertiary">
                    <tr>
                      <th className="text-left p-2 sm:p-3 font-bold">Variant</th>
                      <th className="text-left p-2 sm:p-3 font-bold">Behavior</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policies.map((policy) => (
                      <tr key={policy.name} className="border-t-2 border-border-default">
                        <td className="p-2 sm:p-3 font-mono text-xs">math::add::{policy.name}</td>
                        <td className="p-2 sm:p-3 text-text-secondary">{policy.behavior}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            heading: 'Why explicit policies',
            body: (
              <p>
                Silent overflow and silently propagated missing values are the two classic numeric bugs.
                Naming the policy in the function makes the behavior visible in the query.
                This page will document each family with runnable examples per policy.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
