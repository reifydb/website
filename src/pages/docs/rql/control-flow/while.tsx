import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowWhilePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">While Loops</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>while</Code> repeats a block as long as a condition holds. It is the
            loop for "until this becomes true" work - keep going until a threshold is
            crossed, a budget is spent, a queue is drained - where the number of
            iterations is not known up front. If you are iterating over rows or a range,
            reach for{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>{' '}
            instead.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Check, run, repeat</h2>
          <p className="text-text-secondary mb-4">
            The condition is any boolean expression over{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">variables</Link>.
            The body usually reassigns at least one of them - otherwise the condition
            never changes. Declare with <Code>let</Code> once, then reassign with plain{' '}
            <Code>$name = ...</Code>; note the <Code>;</Code> after the closing brace
            before the next statement:
          </p>
          <ExampleSnippet id="cf-while-accumulate" />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>while</Code> tests the condition <em>before</em> each iteration,
            including the first. If it is false at the start, the body never runs:
          </p>
          <ExampleSnippet id="cf-while-zero-iterations" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Loops that write</h2>
          <p className="text-text-secondary mb-4">
            The body is not limited to arithmetic - any statement works, including{' '}
            <Code>insert</Code>, <Code>update</Code>, and <Code>delete</Code>. The whole
            script still runs in one transaction, so every iteration's writes commit
            together or not at all:
          </p>
          <ExampleSnippet id="cf-while-write" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The iteration cap</h2>
          <p className="text-text-secondary mb-4">
            A condition that never flips would hold its transaction open forever, so the
            engine refuses: any loop that exceeds 10,000 iterations fails the request,
            and everything it did is rolled back:
          </p>
          <ExampleSnippet id="cf-while-cap" />
          <Callout variant="note" title="The cap is a circuit breaker, not a budget">
            Hitting the limit is always a bug in the script, not a tuning problem. If a
            job legitimately needs more than 10,000 steps, it almost certainly should be
            a set-based statement - one <Code>update</Code> or <Code>insert</Code> over
            a query - rather than a row-at-a-time loop.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">while or something else?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Iterating over query results or a numeric range:{' '}
                <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Exit or skip decisions in the middle of the body, not at the top:{' '}
                <Link to="/docs/rql/control-flow/loop" className="text-primary hover:text-primary-light font-medium transition-colors">loop with break and continue</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Everything else on one page:{' '}
                <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Control Flow overview</Link>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
