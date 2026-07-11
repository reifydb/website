import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowMatchPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Match</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>match</Code> is RQL's multi-way branch. It is an expression: it
            selects one arm, evaluates it, and produces that value - in a{' '}
            <Code>let</Code> binding, in a <Code>map</Code> projection, anywhere an
            expression fits. Where{' '}
            <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">if/else</Link>{' '}
            answers a yes/no question, <Code>match</Code> replaces a ladder of them.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Value match</h2>
          <p className="text-text-secondary mb-4">
            The first form compares one value against literal arms. <Code>else</Code>{' '}
            is the catch-all; with it, the expression always produces a value:
          </p>
          <ExampleSnippet id="cf-match-value" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Searched match</h2>
          <p className="text-text-secondary mb-4">
            The second form has no scrutinee - each arm is a full boolean condition.
            This is the shape for ranges and anything else that is not a simple
            equality:
          </p>
          <ExampleSnippet id="cf-match-searched" />
          <p className="text-text-secondary mt-4 mb-4">
            Arms are checked top to bottom and the first true one wins, so order them
            from most specific to least. A broad condition listed first silently
            shadows everything below it:
          </p>
          <ExampleSnippet id="cf-match-first-wins" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Classifying rows</h2>
          <p className="text-text-secondary mb-4">
            Both forms work per row inside a pipeline - reference columns directly in
            the arms. This is the workhorse for bucketing and labeling:
          </p>
          <ExampleSnippet id="cf-match-rows" />
          <p className="text-text-secondary mt-4 mb-4">
            Match inside <Code>map</Code> and <Code>extend</Code> is covered from the
            pipeline side in{' '}
            <Link to="/docs/rql/transforms/match" className="text-primary hover:text-primary-light font-medium transition-colors">Transforms: Match</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">match and none</h2>
          <p className="text-text-secondary mb-4">
            Value-match arms compare by equality, and{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">equality against none never matches</Link>{' '}
            - not even a literal <Code>none</Code> arm. The arm below is dead code;
            the row with the missing score falls through to <Code>else</Code> and you
            never see <Code>"missing"</Code>:
          </p>
          <ExampleSnippet id="cf-match-none-arm" />
          <p className="text-text-secondary mt-4 mb-4">
            To branch on missingness, use a searched match with an{' '}
            <Link to="/docs/functions/is/none" className="text-primary hover:text-primary-light font-medium transition-colors">is::none</Link>{' '}
            arm - it always returns a definite <Code>true</Code> or <Code>false</Code>,
            which also makes this the idiom for substituting defaults:
          </p>
          <ExampleSnippet id="cf-match-none-guard" />
        </section>

        <Callout variant="note" title="Two branches? Use if">
          For a plain yes/no decision, an{' '}
          <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">if/else expression</Link>{' '}
          says the same thing with less ceremony. Reach for <Code>match</Code> when
          there are three or more outcomes, or when the arms are a value's known
          cases.
        </Callout>
      </div>
    </Layout>
  );
}
