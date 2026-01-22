import { DocsLayout } from '../docs-layout';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';

export function RqlExpressionsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Expressions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Expressions are used in filters, computed columns, and aggregations. They include
            operators, literals, column references, and function calls.
          </p>
        </div>

        {/* Operators */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Operators</h2>

          <h3 className="text-lg font-bold mt-6 mb-3">Arithmetic</h3>
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
                  <td className="px-4 py-2 border-b border-border-default font-mono">//</td>
                  <td className="px-4 py-2 border-b border-border-default">Integer division</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">total // 10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">%</td>
                  <td className="px-4 py-2">Modulo</td>
                  <td className="px-4 py-2 font-mono text-xs">id % 2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Comparison</h3>
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
                  <td className="px-4 py-2 border-b border-border-default font-mono">&lt;=</td>
                  <td className="px-4 py-2 border-b border-border-default">Less or equal</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">stock &lt;= 5</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">~=</td>
                  <td className="px-4 py-2">Pattern match</td>
                  <td className="px-4 py-2 font-mono text-xs">email ~= "%@gmail.com"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Logical</h3>
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
                  <td className="px-4 py-2 border-b border-border-default font-mono">&&</td>
                  <td className="px-4 py-2 border-b border-border-default">Logical AND</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">active && verified</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default font-mono">||</td>
                  <td className="px-4 py-2 border-b border-border-default">Logical OR</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">admin || moderator</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">??</td>
                  <td className="px-4 py-2">Null coalesce</td>
                  <td className="px-4 py-2 font-mono text-xs">nickname ?? name</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Other</h3>
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
                  <td className="px-4 py-2 border-b border-border-default font-mono">-&gt;</td>
                  <td className="px-4 py-2 border-b border-border-default">Field access</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">user-&gt;address</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">=&gt;</td>
                  <td className="px-4 py-2">Lambda expression</td>
                  <td className="px-4 py-2 font-mono text-xs">x =&gt; x * 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Modules */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Built-in Modules</h2>
          <p className="text-text-secondary mb-4">
            RQL includes built-in modules for common operations. Call module functions using
            the <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">::</code> syntax.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">math</h3>
          <p className="text-text-secondary mb-3">Mathematical functions and aggregations.</p>
          <ExecutableSnippet
            initialCode={`from app.orders
aggregate math::sum(total) by region`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">text</h3>
          <p className="text-text-secondary mb-3">String manipulation functions.</p>
          <ExecutableSnippet
            initialCode={`from app.users
extend { lower_email: text::lower(email) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">date</h3>
          <p className="text-text-secondary mb-3">Date and time functions.</p>
          <ExecutableSnippet
            initialCode={`from app.events
filter date::year(created_at) == 2024`}
          />
        </section>

        {/* Case Expression */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Case Expression</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">case</code> for conditional logic:
          </p>
          <ExecutableSnippet
            initialCode={`from app.orders
extend {
  priority: case
    total > 1000 => "high"
    total > 100 => "medium"
    true => "low"
}`}
          />
        </section>

        {/* Named Arguments */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Named Arguments</h2>
          <p className="text-text-secondary mb-4">
            Use named arguments for clarity:
          </p>
          <ExecutableSnippet
            initialCode={`from app.users
take count: 10`}
          />
        </section>

        {/* Tip */}
        <Callout variant="tip" title="Combining Expressions">
          Expressions can be combined freely. Use parentheses to control precedence when needed.
        </Callout>
      </div>
    </DocsLayout>
  );
}
