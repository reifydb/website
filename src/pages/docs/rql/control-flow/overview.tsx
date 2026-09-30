import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
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
    <Layout
      title="Control Flow"
      description="The map of RQL's control-flow constructs: conditionals, match, for, while, loop, and closures, and the rules they share inside one transactional request."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Control Flow</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            RQL statements can bind variables, branch, loop, and define functions, so a
            request becomes a script without leaving the language or the transaction.
            Every construct on this page runs inside the same atomic request as the
            queries around it. This page is the map; each construct has its own page
            with runnable examples.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The constructs</h2>
          <p className="text-text-secondary mb-4">
            Everything here builds on{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">variables</Link>:{' '}
            <Code>let</Code> bindings hold the values that conditions test and loops
            accumulate, and a <Code>let</Code> bound to a bare <Code>from</Code>{' '}
            captures a whole result set for a loop to walk. Start there if you have not.
          </p>
          <ul className="space-y-2 text-text-secondary">
            <Item to="/docs/rql/control-flow/conditionals" label="Conditionals">
              - <Code>if</Code> / <Code>else if</Code> / <Code>else</Code>, as a
              statement that guards a write and as an expression that produces a value
              (an <Code>if</Code> with no <Code>else</Code> yields <Code>none</Code>).
            </Item>
            <Item to="/docs/rql/control-flow/match" label="Match">
              - multi-way branching on a value or on searched conditions with{' '}
              <Code>=&gt;</Code> arms, and the idiom for defaulting <Code>none</Code>.
            </Item>
            <Item to="/docs/rql/control-flow/for" label="For loops">
              - iterate a numeric range from <Code>gen::series</Code> or the rows of a
              captured query result, with each row's columns reachable as{' '}
              <Code>$row.column</Code>.
            </Item>
            <Item to="/docs/rql/control-flow/while" label="While loops">
              - repeat while a condition holds, with a built-in iteration cap that stops
              runaway loops.
            </Item>
            <Item to="/docs/rql/control-flow/loop" label="Loop, break &amp; continue">
              - an explicit loop that only exits with <Code>break</Code>, plus{' '}
              <Code>continue</Code>; both keywords work in every loop kind.
            </Item>
            <Item to="/docs/rql/control-flow/closures" label="Closures &amp; functions">
              - anonymous closures that capture their scope, and named{' '}
              <Code>udf</Code> functions callable inside pipelines. Both live for one
              request only.
            </Item>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The shape of a script</h2>
          <p className="text-text-secondary mb-4">
            The constructs compose in the obvious way: bind a result set, walk it, test
            each row, act on the ones that qualify, then finish with a query that returns
            the outcome. Statements are separated by semicolons; a loop or branch body
            is a block in curly braces:
          </p>
          <RqlCodeBlock code={`let $items = from shop::carts;
for $item in $items {
  if $item.qty >= 2 {
    insert shop::restock [{ id: $item.id, qty: $item.qty }]
  }
};
from shop::restock sort { id: asc }`} />
          <p className="text-text-muted text-sm mt-3">
            The last statement's result is what the request returns; everything before it
            is executed for its effect.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">One request, one transaction</h2>
          <p className="text-text-secondary mb-4">
            A script is still a single request: every statement it contains - loops that
            insert, branches that update - commits atomically or not at all, with the
            same guarantees as any other request. An error anywhere, including a failed{' '}
            <Code>assert</Code>, rolls back every write the script made before it. See{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
            For reusable logic that lives in the database rather than in a script, see{' '}
            <Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            Two behaviors of the current engine are easy to trip over. Both are covered
            on the construct pages; they are collected here because they cut across
            constructs.
          </p>
          <Callout variant="warning" title="A branch body executes only its first statement">
            When an <Code>if</Code> is used as a statement, only the first statement in
            the chosen branch runs; later statements in that block are dropped without
            an error. <Code>if true {'{'} $t = $t + 100; $t = $t + 20 {'}'}</Code> leaves{' '}
            <Code>$t</Code> at 100. Keep each branch to one statement - one assignment,
            one insert - and put anything else after the <Code>if</Code>.
          </Callout>
          <Callout variant="info" title="Loop sources must be bound first">
            The playground engine only iterates a frame that was bound with{' '}
            <Code>let $rows = from ...</Code>. Putting the query directly in the loop
            header, <Code>for $row in {'{'} from ns::t {'}'}</Code>, is accepted by
            newer engine sources but fails to parse here (<Code>AST_005</Code>).
          </Callout>
        </section>

        <Callout variant="note" title="Scripts are not a general-purpose language">
          Control flow exists to orchestrate data work - conditional writes, batch
          setup, tests, migrations - not to replace application code. If a computation
          does not read or write the database, it belongs in your application, next to
          the client that calls ReifyDB.
        </Callout>
      </div>
    </Layout>
  );
}
