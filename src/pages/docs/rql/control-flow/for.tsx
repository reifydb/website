import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowForPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">For Loops</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A <Code>for</Code> loop runs its block once per element of a source: a
            numeric range, or the rows of a query result. It is the construct for
            "do something with each row" logic - per-row writes, running totals,
            anything a single pipeline cannot express - without leaving RQL. Like all{' '}
            <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">control flow</Link>,
            it runs inside the request's one transaction.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Over a numeric range</h2>
          <p className="text-text-secondary mb-4">
            <Code>gen::series(from, to)</Code> yields the integers <Code>from</Code>{' '}
            through <Code>to</Code>, inclusive, as a loop source. The loop variable is
            an ordinary variable inside the block; state accumulates through
            reassignment. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="cf-for-range" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Over query results</h2>
          <p className="text-text-secondary mb-4">
            To iterate rows, bind the query to a{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">frame variable</Link>{' '}
            with <Code>let</Code>, then loop over it. Inside the block, each row's
            columns are reachable as fields on the loop variable
            (<Code>$row.qty</Code>):
          </p>
          <ExampleSnippet id="cf-for-frame" />
          <p className="text-text-secondary mt-4 mb-4">
            The binding step is optional - a query wrapped in curly braces can also
            sit directly in the loop header:
          </p>
          <ExampleSnippet id="cf-for-inline-source" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Loops that write</h2>
          <p className="text-text-secondary mb-4">
            The block can contain any statement, including writes. Combined with an{' '}
            <Code>if</Code> guard, a <Code>for</Code> loop becomes a per-row dispatch:
            inspect each row, act on the ones that qualify. Every write in the loop
            commits atomically with the rest of the request:
          </p>
          <ExampleSnippet id="cf-for-writes" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">for or something else?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Known element count or a row set: <Code>for</Code>. Repeating until a
                condition flips: a{' '}
                <Link to="/docs/rql/control-flow/while" className="text-primary hover:text-primary-light font-medium transition-colors">while loop</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Exit or skip decided mid-block: a{' '}
                <Link to="/docs/rql/control-flow/loop" className="text-primary hover:text-primary-light font-medium transition-colors">loop with break and continue</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A per-row transformation with no side effects: not a loop at all - a{' '}
                <Code>map</Code> over the pipeline says the same thing declaratively
                and lets the engine do the iterating.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="gen::series is a loop source">
          <Code>gen::series</Code> feeds <Code>for</Code> loops; it is not a table and
          cannot be queried with <Code>from</Code>. To iterate rows, query them and
          bind the result to a frame variable first.
        </Callout>
      </div>
    </Layout>
  );
}
