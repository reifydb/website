import { Layout } from '../../layout.tsx';

export function OperatorsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Operators
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL provides a comprehensive set of operators for arithmetic, comparison, and logical operations.
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
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Other Operators</h2>
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

      </div>
    </Layout>
  );
}
