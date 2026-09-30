import { scriptingProcedureLetIfExample as scriptingProcedureLetIf, scriptingProcedureWhileExample as scriptingProcedureWhile, spCfAssertExample as spCfAssert, spCfAssertFailsExample as spCfAssertFails, spCfContinueExample as spCfContinue, spCfElseIfExample as spCfElseIf, spCfForFrameExample as spCfForFrame, spCfForSeriesExample as spCfForSeries, spCfGuardExample as spCfGuard, spCfLoopCallExample as spCfLoopCall, spCfMissingArgExample as spCfMissingArg, spCfPositionalExample as spCfPositional, spCfReturnEarlyExample as spCfReturnEarly, spCfReturnFrameExample as spCfReturnFrame, spCfReturnVoidExample as spCfReturnVoid } from './control-flow.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function ControlFlowPage() {
  return (
    <Layout
      title="Parameters & Control Flow"
      description="How procedure arguments bind to parameters, and how if, loops, return, and assert behave inside a procedure body."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Parameters &amp; Control Flow</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A procedure body is a script. Parameters arrive as <Code>$</Code>-prefixed
            variables, and the body can bind more with <Code>let</Code>, branch with{' '}
            <Code>if</Code> and <Code>match</Code>, loop with <Code>for</Code>,{' '}
            <Code>while</Code>, and <Code>loop</Code>, and leave early with{' '}
            <Code>return</Code>. Each construct has its own page under{' '}
            <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Control Flow</Link>;
            this page covers what is specific to a body: how arguments bind, what{' '}
            <Code>return</Code> does to the call's result, and the edges that bite
            inside a procedure.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">How arguments bind</h2>
          <p className="text-text-secondary mb-4">
            Arguments bind to parameters by position - the first argument to the first
            parameter, and so on. Names play no part in the call. Run the snippets on
            this page in order:
          </p>
          <ExecutableSnippet title={spCfPositional.title} initialCode={spCfPositional.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The engine does not check the argument count against the parameter list.
            Pass too few and the call is accepted; the body then fails with{' '}
            <Code>RUNTIME_001</Code> the first time it reads the parameter that never
            got a value:
          </p>
          <ExecutableSnippet title={spCfMissingArg.title} initialCode={spCfMissingArg.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Pass too many and the extra arguments are silently ignored. Writing an
            argument as <Code>name: value</Code> does not bind by name either: the
            parameter receives <Code>none</Code>, not the value. Inside the body, a{' '}
            <Code>let</Code> with the same name as a parameter replaces it for the rest
            of the body.
          </p>
          <Callout variant="warning" title="Parameter types are not enforced at the call">
            The playground engine binds whatever it is given: a text argument for an{' '}
            <Code>int4</Code> parameter is accepted, and <Code>$n + 1</Code> then
            concatenates instead of adding; <Code>none</Code> is accepted for a
            non-optional parameter. The mismatch surfaces only when the value reaches a
            typed column or a cast. The engine checks neither the count nor the type at
            the call, so validate at the boundary with <Code>assert</Code> (below) when
            it matters.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Branching</h2>
          <p className="text-text-secondary mb-4">
            <Code>if</Code> is an expression: bind its value with <Code>let</Code> and
            use it later in the body, in a write or in the result:
          </p>
          <ExecutableSnippet title={scriptingProcedureLetIf.title} initialCode={scriptingProcedureLetIf.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Conditions chain with <Code>else if</Code>; the first true branch wins.{' '}
            <Code>match</Code> works the same way inside a body for many arms - see{' '}
            <Link to="/docs/rql/control-flow/match" className="text-primary hover:text-primary-light font-medium transition-colors">Match</Link>:
          </p>
          <ExecutableSnippet title={spCfElseIf.title} initialCode={spCfElseIf.code} />
          <p className="text-text-secondary mt-4 mb-4">
            As a statement, an <Code>if</Code> guards a write. The body below only
            inserts when the argument is positive; the negative call writes nothing and
            the final query proves it:
          </p>
          <ExecutableSnippet title={spCfGuard.title} initialCode={spCfGuard.code} />
          <Callout variant="warning" title="One statement per branch">
            In the current engine a branch used as a statement executes only its first
            statement; anything after it in the same block is dropped without an error.
            Keep each branch to one statement - one insert, one assignment, one{' '}
            <Code>call</Code> - and put the rest after the <Code>if</Code>. The same
            edge applies at the top level of a request; see{' '}
            <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Control Flow</Link>.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Loops</h2>
          <p className="text-text-secondary mb-4">
            <Code>while</Code> repeats while a condition holds. Reassign with plain{' '}
            <Code>=</Code>. A <Code>let</Code> inside the loop declares a new variable
            scoped to that block, so <Code>let $i = $i + 1</Code> never changes the
            loop's <Code>$i</Code> and the loop runs until the 10,000-iteration cap
            fails it with <Code>RUNTIME_006</Code>:
          </p>
          <ExecutableSnippet title={scriptingProcedureWhile.title} initialCode={scriptingProcedureWhile.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A parameter can bound a <Code>for</Code> loop over a numeric range from{' '}
            <Code>gen::series</Code>:
          </p>
          <ExecutableSnippet title={spCfForSeries.title} initialCode={spCfForSeries.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A body can also capture a query result with <Code>let $rows = from ...</Code>{' '}
            and walk it, reading each row's columns as <Code>$row.column</Code>:
          </p>
          <ExecutableSnippet title={spCfForFrame.title} initialCode={spCfForFrame.code} />
          <Callout variant="note" title="A one-column result binds the bare value">
            When the captured result has exactly one column, the loop variable holds
            that value directly - <Code>$x</Code>, not <Code>$x.column</Code>. Reading a
            field from it fails with <Code>RUNTIME_009</Code> ("has no fields"). Only
            results with two or more columns are iterated as rows with fields.
          </Callout>
          <p className="text-text-secondary mt-4 mb-4">
            <Code>continue</Code> and <Code>break</Code> work inside a body just as they
            do at the top level:
          </p>
          <ExecutableSnippet title={spCfContinue.title} initialCode={spCfContinue.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Leaving early with return</h2>
          <p className="text-text-secondary mb-4">
            <Code>return</Code> ends the body immediately, from any depth of nesting, and
            makes its value the call's result. Return a variable and the result column
            takes the variable's name:
          </p>
          <ExecutableSnippet title={spCfReturnEarly.title} initialCode={spCfReturnEarly.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A bare <Code>return</Code> ends the body with no value; the call then
            returns <Code>value: none</Code>, the same as a body that produces nothing.
            This is the idiom for "do nothing in this case":
          </p>
          <ExecutableSnippet title={spCfReturnVoid.title} initialCode={spCfReturnVoid.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Two limits. Returning an expression rather than a variable gives the column
            a generated name (<Code>value</Code> for a literal), so bind first when the
            name matters. And <Code>return</Code> carries a scalar only: a variable that
            holds a query result is rejected with <Code>RUNTIME_002</Code>, and a
            record literal or a <Code>from</Code> query after <Code>return</Code> is
            not supported in the playground engine. To return rows, end the body with
            the query itself:
          </p>
          <ExecutableSnippet title={spCfReturnFrame.title} initialCode={spCfReturnFrame.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Validating with assert</h2>
          <p className="text-text-secondary mb-4">
            <Code>assert</Code> fails the call when its condition is false for any row,
            and a failed call rolls back everything the body wrote. Put it before the
            write it protects - here the reservation only happens when the requested
            slot is above every existing one:
          </p>
          <ExecutableSnippet title={spCfAssert.title} initialCode={spCfAssert.code} />
          <ExecutableSnippet title={spCfAssertFails.title} initialCode={spCfAssertFails.code} />
          <p className="text-text-secondary mt-4">
            The error carries the message string and the expression that was false.
            Remember the body rule: <Code>from t assert {'{'} ... {'}'}</Code>, not{' '}
            <Code>from t | assert ...</Code>. Assertions in tests and the{' '}
            <Code>assert error</Code> form are on{' '}
            <Link to="/docs/scripting/testing" className="text-primary hover:text-primary-light font-medium transition-colors">Testing</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Calling procedures from a script</h2>
          <p className="text-text-secondary mb-4">
            The same control flow works around a call. A request can walk a result set
            and call a procedure once per row, passing row fields as arguments; each
            call's own result is discarded inside the loop, and the request ends with
            whatever query it chooses:
          </p>
          <ExecutableSnippet title={spCfLoopCall.title} initialCode={spCfLoopCall.code} />
          <p className="text-text-secondary mt-4">
            A body can <Code>call</Code> other procedures the same way, in a loop or in
            a single-statement branch; see{' '}
            <Link to="/docs/concepts/data-model/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link>{' '}
            in the data model for composition.
          </p>
        </section>

        <Callout variant="note" title="The constructs in depth">
          <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">Variables</Link>,{' '}
          <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">conditionals</Link>,{' '}
          <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>,{' '}
          <Link to="/docs/rql/control-flow/while" className="text-primary hover:text-primary-light font-medium transition-colors">while</Link>{' '}
          (including its iteration cap), and{' '}
          <Link to="/docs/rql/control-flow/loop" className="text-primary hover:text-primary-light font-medium transition-colors">loop, break &amp; continue</Link>{' '}
          behave inside a procedure exactly as they do at the top level of a request.
          Everything on those pages applies here.
        </Callout>
      </div>
    </Layout>
  );
}
