import { cfWhileAccumulateExample as cfWhileAccumulate, cfWhileBodyScopeExample as cfWhileBodyScope, cfWhileCapExactExample as cfWhileCapExact, cfWhileCapExample as cfWhileCap, cfWhileCapNestedExample as cfWhileCapNested, cfWhileCapSequentialExample as cfWhileCapSequential, cfWhileFlagExample as cfWhileFlag, cfWhileNestedExample as cfWhileNested, cfWhileNoneConditionExample as cfWhileNoneCondition, cfWhileRollbackErrorExample as cfWhileRollbackError, cfWhileRollbackSetupExample as cfWhileRollbackSetup, cfWhileRollbackVerifyExample as cfWhileRollbackVerify, cfWhileUpdateExample as cfWhileUpdate, cfWhileWriteExample as cfWhileWrite, cfWhileZeroIterationsExample as cfWhileZeroIterations } from './while.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

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
            before the next statement. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={cfWhileAccumulate.title} initialCode={cfWhileAccumulate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>while</Code> tests the condition <em>before</em> each iteration,
            including the first. If it is false at the start, the body never runs:
          </p>
          <ExecutableSnippet title={cfWhileZeroIterations.title} initialCode={cfWhileZeroIterations.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Flags and none</h2>
          <p className="text-text-secondary mb-4">
            The condition is evaluated from scratch before every pass, so a boolean
            the body flips is a natural shape for "until done" - the exit decision
            lives inside the body, the loop header just reads it:
          </p>
          <ExecutableSnippet title={cfWhileFlag.title} initialCode={cfWhileFlag.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A condition that evaluates to{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">none</Link>{' '}
            - an <Code>if</Code> expression without an <Code>else</Code>, a column
            that holds none - counts as false. The loop does not run at all; there is no
            error to catch:
          </p>
          <ExecutableSnippet title={cfWhileNoneCondition.title} initialCode={cfWhileNoneCondition.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Variables inside the body</h2>
          <p className="text-text-secondary mb-4">
            The body is a block, and a block is a scope. A <Code>let</Code> inside it
            declares a fresh variable on every pass and drops it when the pass ends;
            after the loop the name is gone (<Code>RUNTIME_001</Code>):
          </p>
          <ExecutableSnippet title={cfWhileBodyScope.title} initialCode={cfWhileBodyScope.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Anything the loop must hand back is declared before it, as{' '}
            <Code>$cells</Code> and <Code>$days</Code> were above. A per-pass{' '}
            <Code>let</Code> is the right tool for the counter of a nested loop: every
            pass of the outer loop starts a fresh <Code>$col</Code>, so the inner loop
            runs in full each time:
          </p>
          <ExecutableSnippet title={cfWhileNested.title} initialCode={cfWhileNested.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Loops that write</h2>
          <p className="text-text-secondary mb-4">
            The body is not limited to arithmetic - any statement works, including{' '}
            <Code>insert</Code>, <Code>update</Code>, and <Code>delete</Code>. The whole
            script still runs in one transaction, so every iteration's writes commit
            together or not at all:
          </p>
          <ExecutableSnippet title={cfWhileWrite.title} initialCode={cfWhileWrite.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A loop can also revisit the same row. Each <Code>update</Code> reads the
            column as the previous pass left it, so the writes compound:
          </p>
          <ExecutableSnippet title={cfWhileUpdate.title} initialCode={cfWhileUpdate.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">An error anywhere undoes every iteration</h2>
          <p className="text-text-secondary mb-4">
            Because the request is{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">one transaction</Link>,
            a failure in pass three does not leave passes one and two behind. First,
            a table for the loop to write:
          </p>
          <ExecutableSnippet title={cfWhileRollbackSetup.title} initialCode={cfWhileRollbackSetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The loop inserts a row per pass and fails on the third. The error is a
            clean <Code>CAST_002</Code>, and the request fails with it:
          </p>
          <ExecutableSnippet title={cfWhileRollbackError.title} initialCode={cfWhileRollbackError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The rows from the first two passes were rolled back with everything else:
          </p>
          <ExecutableSnippet title={cfWhileRollbackVerify.title} initialCode={cfWhileRollbackVerify.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The iteration cap</h2>
          <p className="text-text-secondary mb-4">
            A condition that never flips would hold its transaction open forever, so the
            engine refuses: any loop that exceeds 10,000 iterations fails the request
            with <Code>RUNTIME_006</Code>, and everything it did is rolled back:
          </p>
          <ExecutableSnippet title={cfWhileCap.title} initialCode={cfWhileCap.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The count is exact. Ten thousand completed passes are fine; the
            10,001st fails:
          </p>
          <ExecutableSnippet title={cfWhileCapExact.title} initialCode={cfWhileCapExact.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The budget belongs to the outermost loop statement and covers every pass
            of every loop nested inside it. An inner loop that is small on its own can
            still exhaust it:
          </p>
          <ExecutableSnippet title={cfWhileCapNested.title} initialCode={cfWhileCapNested.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Loops that run one after the other are separate statements, and each
            starts from zero:
          </p>
          <ExecutableSnippet title={cfWhileCapSequential.title} initialCode={cfWhileCapSequential.code} />
          <Callout variant="note" title="The cap is a circuit breaker, not a budget">
            Hitting the limit is always a bug in the script, not a tuning problem. If a
            job legitimately needs more than 10,000 steps, it almost certainly should be
            a set-based statement - one <Code>update</Code> or <Code>insert</Code> over
            a query - rather than a row-at-a-time loop.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What not to put in the body</h2>
          <p className="text-text-secondary mb-4">
            Two things go wrong inside a loop body in the engine build the playground
            runs. Neither is a design rule - both are limits of the current build - but
            both are silent or worse, so they are worth knowing. First, an{' '}
            <Code>if</Code> branch inside the body runs only its first statement; the
            rest of the branch is dropped without an error. Three passes of this loop
            leave <Code>$total</Code> at 300, not 360:
          </p>
          <RqlCodeBlock code={`let $i = 0;
let $total = 0;
while $i < 3 {
  $i = $i + 1;
  if true { $total = $total + 100; $total = $total + 20 }
};
map { total: $total }`} />
          <Callout variant="warning" title="Keep each if-branch to one statement" className="mt-4">
            Write one <Code>if</Code> per statement, or fold the arithmetic into a
            single assignment.
          </Callout>
          <p className="text-text-secondary mt-4 mb-4">
            Second: a query with <Code>filter</Code>, <Code>sort</Code> or{' '}
            <Code>take</Code> inside the body - bare, or bound with <Code>let</Code>{' '}
            - fails with a raw engine trap instead of an error message, so the
            playground does not show one. Bind the rows with a bare <Code>from</Code>{' '}
            before the loop and test them with <Code>if</Code> inside it, as the{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for page</Link>{' '}
            does.
          </p>
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
