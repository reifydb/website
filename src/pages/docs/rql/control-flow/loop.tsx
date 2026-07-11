import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowLoopPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Loop, Break &amp; Continue</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>loop</Code> repeats its block with no condition of its own - it runs
            until a <Code>break</Code> ends it. That makes it the shape for "repeat
            until done", where the exit condition emerges mid-iteration rather than
            up front. <Code>break</Code> and <Code>continue</Code> are not tied to{' '}
            <Code>loop</Code>: they steer{' '}
            <Link to="/docs/rql/control-flow/while" className="text-primary hover:text-primary-light font-medium transition-colors">while</Link>{' '}
            and{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>{' '}
            loops the same way.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">loop runs until break</h2>
          <p className="text-text-secondary mb-4">
            The block executes over and over; <Code>break</Code> exits immediately,
            and whatever the variables hold at that moment is what you keep. Here the
            exit condition depends on the value being computed - exactly the case a
            condition-first loop states awkwardly:
          </p>
          <ExampleSnippet id="cf-loop-break" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">continue skips to the next iteration</h2>
          <p className="text-text-secondary mb-4">
            <Code>continue</Code> abandons the rest of the current iteration and jumps
            straight back to the top. Statements after it - including writes - simply
            do not run for that pass. Note the <Code>;</Code> after each{' '}
            <Code>if ... {'{'} ... {'}'}</Code> block before the next statement:
          </p>
          <ExampleSnippet id="cf-loop-continue" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Carry a result out of the loop</h2>
          <p className="text-text-secondary mb-4">
            Variables declared before the loop survive it; variables declared with{' '}
            <Code>let</Code> inside the block are scoped to one iteration. Accumulate
            into outer variables, use them after <Code>break</Code>:
          </p>
          <ExampleSnippet id="cf-loop-result" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">break and continue work in every loop</h2>
          <p className="text-text-secondary mb-4">
            A <Code>while</Code> loop can bail out before its condition turns false:
          </p>
          <ExampleSnippet id="cf-loop-in-while" />
          <p className="text-text-secondary mt-4 mb-4">
            And <Code>continue</Code> inside a{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>{' '}
            loop acts as a per-iteration filter:
          </p>
          <ExampleSnippet id="cf-loop-in-for" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">There is no infinite loop</h2>
          <p className="text-text-secondary mb-4">
            A <Code>loop</Code> with no reachable <Code>break</Code> does not hang the
            engine. Iteration is capped at 10,000; exceeding the cap fails the request
            with <Code>RUNTIME_006</Code>, and the failed request rolls back like any
            other error:
          </p>
          <ExampleSnippet id="cf-loop-cap" />
        </section>

        <Callout variant="note" title="Loops are statements, not transforms">
          Loops iterate variables and statements, not rows. To transform rows, prefer
          the pipeline -{' '}
          <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>,{' '}
          <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>,{' '}
          <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>{' '}
          - and reach for a loop when the logic is genuinely iterative. The other
          constructs are on the{' '}
          <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Control Flow</Link>{' '}
          overview.
        </Callout>
      </div>
    </Layout>
  );
}
