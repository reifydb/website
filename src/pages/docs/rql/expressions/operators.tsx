import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import {
  arithmeticExample,
  comparisonExample,
  logicalExample,
  textMatchExample,
} from './operators.examples';

export function OperatorsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Operators
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            All the operators you can use in RQL expressions.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Arithmetic Operators</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Operator</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Description</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">+</td>
                  <td className="px-4 py-2 border-b border-border-default">Addition</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">price + tax</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">-</td>
                  <td className="px-4 py-2 border-b border-border-default">Subtraction</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">total - discount</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">*</td>
                  <td className="px-4 py-2 border-b border-border-default">Multiplication</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">quantity * price</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">/</td>
                  <td className="px-4 py-2 border-b border-border-default">Division</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">total / count</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">%</td>
                  <td className="px-4 py-2">Modulo</td>
                  <td className="px-4 py-2 font-mono text-xs">id % 2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">/</code> truncates
            when both operands are integers (<code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">7 / 2</code> is{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">3</code>); it produces a
            fractional result as soon as either side is a float (<code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">7 / 2.0</code> is{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">3.5</code>). There is no
            separate integer-division operator.
          </p>
          <ExecutableSnippet title="Arithmetic Operators" initialCode={arithmeticExample.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Comparison Operators</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Operator</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Description</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">==</td>
                  <td className="px-4 py-2 border-b border-border-default">Equal</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">status == "active"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">!=</td>
                  <td className="px-4 py-2 border-b border-border-default">Not equal</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">role != "guest"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">&gt;</td>
                  <td className="px-4 py-2 border-b border-border-default">Greater than</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">age &gt; 18</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">&lt;</td>
                  <td className="px-4 py-2 border-b border-border-default">Less than</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">price &lt; 100</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">&gt;=</td>
                  <td className="px-4 py-2 border-b border-border-default">Greater or equal</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">count &gt;= 10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">&lt;=</td>
                  <td className="px-4 py-2">Less or equal</td>
                  <td className="px-4 py-2 font-mono text-xs">stock &lt;= 5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            For substring or pattern matching, use the text module instead of an operator:{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">text::contains()</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">text::starts_with()</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">text::ends_with()</code>.
          </p>
          <ExecutableSnippet title="Comparison Operators" initialCode={comparisonExample.code} />
          <div className="mt-4">
            <ExecutableSnippet title="Text Matching" initialCode={textMatchExample.code} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Logical Operators</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Operator</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Description</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">and</td>
                  <td className="px-4 py-2 border-b border-border-default">Logical AND</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">active and verified</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">or</td>
                  <td className="px-4 py-2 border-b border-border-default">Logical OR</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">admin or moderator</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">not</td>
                  <td className="px-4 py-2">Negation</td>
                  <td className="px-4 py-2 font-mono text-xs">not active</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Logical operators are lowercase keywords, not symbols. For handling missing values, see{' '}
            <Link to="/docs/concepts/none" className="text-primary-color hover:underline font-medium">
              Working with none
            </Link>.
          </p>
          <ExecutableSnippet title="Logical Operators" initialCode={logicalExample.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Other Tokens</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Token</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Description</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">::</td>
                  <td className="px-4 py-2 border-b border-border-default">Namespace / module access</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">app::orders, math::sum(total)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">=&gt;</td>
                  <td className="px-4 py-2">Match arm separator</td>
                  <td className="px-4 py-2 font-mono text-xs">status == "active" =&gt; "Active"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">=&gt;</code> only
            appears inside a{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">match {'{'} ... {'}'}</code> block,
            separating a condition from its result. See{' '}
            <Link to="/docs/rql/transforms/match" className="text-primary-color hover:underline font-medium">
              match
            </Link> for the full syntax.
          </p>
        </section>

      </div>
    </Layout>
  );
}
