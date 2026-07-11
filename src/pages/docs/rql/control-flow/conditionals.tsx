import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowConditionalsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Conditionals</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>if</Code> branches a script on a condition. It is both a statement -
            run these statements only when the condition holds - and an expression that
            produces a value you can bind with <Code>let</Code>. Together with{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">variables</Link>,
            it turns a request from a fixed pipeline into logic that reacts to data.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">if is an expression</h2>
          <p className="text-text-secondary mb-4">
            Used on the right-hand side of a <Code>let</Code>, each branch's block
            produces the value of the whole expression. Run the snippets on this page
            in order:
          </p>
          <ExampleSnippet id="cf-if-expression" />
          <p className="text-text-secondary mt-4 mb-4">
            Chain any number of conditions with <Code>else if</Code>; the first one
            that holds wins:
          </p>
          <ExampleSnippet id="cf-if-else-if" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">No else means maybe none</h2>
          <p className="text-text-secondary mb-4">
            An <Code>if</Code> expression without an <Code>else</Code> has no value to
            produce when the condition fails, so it produces{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">none</Link>.
            That is often exactly right - "a warning, or nothing" - but if a definite
            value is required downstream, write the <Code>else</Code>:
          </p>
          <ExampleSnippet id="cf-if-no-else" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Guarding writes</h2>
          <p className="text-text-secondary mb-4">
            As a statement, <Code>if</Code> runs a block of statements - including
            inserts, updates, and deletes - only when the condition holds. The whole
            request is still{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">one transaction</Link>,
            whichever branches run. Note the <Code>;</Code> after the closing brace:
            a block is a statement, and the next statement needs the separator:
          </p>
          <ExampleSnippet id="cf-if-guard-write" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Branches choose the result</h2>
          <p className="text-text-secondary mb-4">
            When the <Code>if</Code> statement is the last thing in a request, the
            branch that ran determines the request's result - the branches do not have
            to produce the same shape:
          </p>
          <ExampleSnippet id="cf-if-branch-shapes" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reassigning outer variables</h2>
          <p className="text-text-secondary mb-4">
            A branch can assign to a variable declared outside it, which is the
            imperative alternative to the expression form - useful when several
            statements in the branch contribute to the final value:
          </p>
          <ExampleSnippet id="cf-if-reassign" />
        </section>

        <Callout variant="note" title="Many arms? Use match">
          A long <Code>else if</Code> chain that compares the same value against many
          candidates reads better as a{' '}
          <Link to="/docs/rql/control-flow/match" className="text-primary hover:text-primary-light font-medium transition-colors">match</Link>{' '}
          expression - one scrutinee, one arm per case, and an <Code>else</Code> arm
          for the rest. See the{' '}
          <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">control flow overview</Link>{' '}
          for how the constructs fit together.
        </Callout>
      </div>
    </Layout>
  );
}
