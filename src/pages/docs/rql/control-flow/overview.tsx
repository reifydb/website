import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function Item({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary font-mono">--</span>
      <span>
        <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{label}</Link>{' '}
        {children}
      </span>
    </li>
  );
}

export function RqlControlFlowPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Control Flow</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL statements can bind variables, branch, loop, and define functions -
            queries become scripts without leaving the language or the transaction.
            Every construct runs inside the same atomic request as the queries around
            it. This page is the map; each construct has its own page with runnable
            examples.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The constructs</h2>
          <p className="text-text-secondary mb-4">
            Everything here builds on{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">variables</Link>{' '}
            - <Code>let</Code> bindings hold the values that conditions test and
            loops accumulate. Start there if you have not.
          </p>
          <ul className="space-y-2 text-text-secondary">
            <Item to="/docs/rql/control-flow/conditionals" label="Conditionals">
              - <Code>if</Code> / <Code>else if</Code> / <Code>else</Code> as
              statements that guard writes and as expressions that produce values.
            </Item>
            <Item to="/docs/rql/control-flow/match" label="Match">
              - multi-way branching on a value or on conditions, and the idiom for
              defaulting missing values.
            </Item>
            <Item to="/docs/rql/control-flow/for" label="For loops">
              - iterate a numeric range or the rows of a captured query result.
            </Item>
            <Item to="/docs/rql/control-flow/while" label="While loops">
              - repeat while a condition holds, with a built-in runaway guard.
            </Item>
            <Item to="/docs/rql/control-flow/loop" label="Loop, break &amp; continue">
              - explicit loops that exit with <Code>break</Code> and skip with{' '}
              <Code>continue</Code>.
            </Item>
            <Item to="/docs/rql/control-flow/closures" label="Closures &amp; functions">
              - anonymous closures that capture their scope, and named{' '}
              <Code>udf</Code> functions callable inside pipelines.
            </Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One request, one transaction</h2>
          <p className="text-text-secondary mb-4">
            A script is still a single request: every statement it contains - loops
            that insert, branches that update - commits atomically or not at all, with
            the same guarantees as any other request. See{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
            For reusable logic that lives in the database rather than in a script, see{' '}
            <Link to="/docs/concepts/data-model/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link>.
          </p>
        </section>

        <Callout variant="note" title="Scripts are not a general-purpose language">
          Control flow exists to orchestrate data work - conditional writes, batch
          setup, migrations - not to replace application code. If a computation does
          not read or write the database, it belongs in your application, next to the
          client that calls ReifyDB.
        </Callout>
      </div>
    </Layout>
  );
}
