import { cfLoopBreakExample as cfLoopBreak, cfLoopBreakInForExample as cfLoopBreakInFor, cfLoopBreakOutsideExample as cfLoopBreakOutside, cfLoopCapExactExample as cfLoopCapExact, cfLoopCapExample as cfLoopCap, cfLoopContinueExample as cfLoopContinue, cfLoopContinueInWhileExample as cfLoopContinueInWhile, cfLoopInForExample as cfLoopInFor, cfLoopInWhileExample as cfLoopInWhile, cfLoopNestedExample as cfLoopNested, cfLoopResultExample as cfLoopResult } from './loop.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowLoopPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Loop, Break &amp; Continue</h1>
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
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">loop runs until break</h2>
          <p className="text-text-secondary mb-4">
            The block executes over and over; <Code>break</Code> exits immediately,
            and whatever the variables hold at that moment is what you keep. Here the
            exit condition depends on the value being computed - exactly the case a
            condition-first loop states awkwardly:
          </p>
          <ExecutableSnippet title={cfLoopBreak.title} initialCode={cfLoopBreak.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">continue skips to the next iteration</h2>
          <p className="text-text-secondary mb-4">
            <Code>continue</Code> abandons the rest of the current iteration and jumps
            straight back to the top. Statements after it - including writes -
            do not run for that pass. Note the <Code>;</Code> after each{' '}
            <Code>if ... {'{'} ... {'}'}</Code> block before the next statement:
          </p>
          <ExecutableSnippet title={cfLoopContinue.title} initialCode={cfLoopContinue.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Carry a result out of the loop</h2>
          <p className="text-text-secondary mb-4">
            Variables declared before the loop survive it; variables declared with{' '}
            <Code>let</Code> inside the block are scoped to one iteration. Accumulate
            into outer variables, use them after <Code>break</Code>:
          </p>
          <ExecutableSnippet title={cfLoopResult.title} initialCode={cfLoopResult.code} />
          <p className="text-text-secondary mt-4 mb-4">
            One caveat about that scoping in the engine build the playground runs: a
            loop left through <Code>break</Code> does not drop its body scope, so the
            last pass's <Code>let</Code> bindings stay readable afterwards. This
            script returns <Code>last = 2</Code> today, while the same{' '}
            <Code>map</Code> after a <Code>while</Code> that ended on its own fails
            with <Code>RUNTIME_001</Code>. Do not build on the leak - declare every
            result variable before the loop, as <Code>$b</Code> and{' '}
            <Code>$steps</Code> are above:
          </p>
          <RqlCodeBlock code={`let $i = 0;
loop {
  let $last = $i;
  $i = $i + 1;
  if $i == 3 { break }
};
map { last: $last }`} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Nested loops</h2>
          <p className="text-text-secondary mb-4">
            Loops nest, and <Code>break</Code> and <Code>continue</Code> always act on
            the innermost loop that contains them. The inner <Code>break</Code> below
            ends one inner run; the outer loop keeps going until its own{' '}
            <Code>break</Code>:
          </p>
          <ExecutableSnippet title={cfLoopNested.title} initialCode={cfLoopNested.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">break and continue work in every loop</h2>
          <p className="text-text-secondary mb-4">
            A <Code>while</Code> loop can bail out before its condition turns false:
          </p>
          <ExecutableSnippet title={cfLoopInWhile.title} initialCode={cfLoopInWhile.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>continue</Code> in a <Code>while</Code> loop goes back to the
            condition check. Advance the counter <em>before</em> the{' '}
            <Code>continue</Code>, or the skipped pass repeats forever:
          </p>
          <ExecutableSnippet title={cfLoopContinueInWhile.title} initialCode={cfLoopContinueInWhile.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Inside a{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>{' '}
            loop, <Code>continue</Code> acts as a per-iteration filter:
          </p>
          <ExecutableSnippet title={cfLoopInFor.title} initialCode={cfLoopInFor.code} />
          <p className="text-text-secondary mt-4 mb-4">
            And <Code>break</Code> stops a <Code>for</Code> loop before its source is
            exhausted - the loop visits 1 to 4, and the remaining 96 values are never
            visited:
          </p>
          <ExecutableSnippet title={cfLoopBreakInFor.title} initialCode={cfLoopBreakInFor.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Outside a loop they are errors</h2>
          <p className="text-text-secondary mb-4">
            <Code>break</Code> and <Code>continue</Code> need an enclosing loop to act
            on. With none around them - an <Code>if</Code> does not count - the
            request fails: <Code>RUNTIME_004</Code> for <Code>break</Code>,{' '}
            <Code>RUNTIME_005</Code> for <Code>continue</Code>:
          </p>
          <ExecutableSnippet title={cfLoopBreakOutside.title} initialCode={cfLoopBreakOutside.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">There is no infinite loop</h2>
          <p className="text-text-secondary mb-4">
            A <Code>loop</Code> with no reachable <Code>break</Code> does not hang the
            engine. Iteration is capped at 10,000; exceeding the cap fails the request
            with <Code>RUNTIME_006</Code>, and the failed request rolls back like any
            other error:
          </p>
          <ExecutableSnippet title={cfLoopCap.title} initialCode={cfLoopCap.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The cap counts jumps back to the top of the loop, and a <Code>break</Code>{' '}
            runs before the jump. Ten thousand jumps are allowed. This loop breaks on
            its 10,000th pass, after 9,999 jumps; a break on pass 10,001 still passes,
            and a loop that reaches pass 10,002 fails:
          </p>
          <ExecutableSnippet title={cfLoopCapExact.title} initialCode={cfLoopCapExact.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Nested loops share the outer loop's budget; loops in sequence each get
            their own. The{' '}
            <Link to="/docs/rql/control-flow/while" className="text-primary hover:text-primary-light font-medium transition-colors">while page</Link>{' '}
            shows both.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Keep break on its own</h2>
          <p className="text-text-secondary mb-4">
            In the engine build the playground runs, an <Code>if</Code> branch executes
            only its first statement and silently drops the rest. A <Code>break</Code>{' '}
            that follows another statement in the same branch therefore never runs:
            this loop spins to the cap and fails with <Code>RUNTIME_006</Code> instead
            of stopping at 3:
          </p>
          <RqlCodeBlock code={`let $i = 0;
let $hits = 0;
loop {
  $i = $i + 1;
  if $i == 3 { $hits = $hits + 1; break }
};
map { i: $i, hits: $hits }`} />
          <p className="text-text-secondary mt-4 mb-4">
            Putting <Code>break</Code> first drops the other statement instead. Give
            each statement its own <Code>if</Code>, and the script does what it says
            (<Code>i = 3</Code>, <Code>hits = 1</Code>):
          </p>
          <RqlCodeBlock code={`let $i = 0;
let $hits = 0;
loop {
  $i = $i + 1;
  if $i == 3 { $hits = $hits + 1 };
  if $i == 3 { break }
};
map { i: $i, hits: $hits }`} />
          <Callout variant="warning" title="break and continue are statements" className="mt-4">
            They are not expressions: <Code>break</Code> cannot be a match arm's
            result, and a loop has no value to bind, so{' '}
            <Code>let $x = loop {'{'} ... {'}'}</Code> is not valid. The current build
            reports neither with a clean error, which is why the playground does not
            run them here. The same build also traps on a query with{' '}
            <Code>filter</Code>, <Code>sort</Code> or <Code>take</Code> inside a loop
            body; see{' '}
            <Link to="/docs/rql/control-flow/while" className="text-primary hover:text-primary-light font-medium transition-colors">what not to put in the body</Link>.
          </Callout>
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
