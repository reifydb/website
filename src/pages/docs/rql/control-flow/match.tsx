import { cfMatchAssignArmExample as cfMatchAssignArm, cfMatchExpressionsExample as cfMatchExpressions, cfMatchFirstWinsExample as cfMatchFirstWins, cfMatchGuardExample as cfMatchGuard, cfMatchLazyArmsExample as cfMatchLazyArms, cfMatchNoElseExample as cfMatchNoElse, cfMatchNoneArmExample as cfMatchNoneArm, cfMatchNoneGuardExample as cfMatchNoneGuard, cfMatchResultExample as cfMatchResult, cfMatchRowsExample as cfMatchRows, cfMatchSearchedExample as cfMatchSearched, cfMatchTypeMismatchExample as cfMatchTypeMismatch, cfMatchValueExample as cfMatchValue } from './match.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowMatchPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Match</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>match</Code> is RQL's multi-way branch. It is an expression: it
            selects one arm, evaluates it, and produces that value - in a{' '}
            <Code>let</Code> binding, in a <Code>map</Code> projection, anywhere an
            expression fits. Where{' '}
            <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">if/else</Link>{' '}
            answers a yes/no question, <Code>match</Code> replaces a ladder of them.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Value match</h2>
          <p className="text-text-secondary mb-4">
            The first form compares one value against literal arms. <Code>else</Code>{' '}
            is the catch-all; with it, the expression always produces a value:
          </p>
          <ExecutableSnippet title={cfMatchValue.title} initialCode={cfMatchValue.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Arms are separated by commas; a trailing comma is fine, and a line break
            separates arms just as well. <Code>else</Code> is the fallback wherever
            it is written - the engine checks it only after every other arm has
            failed - so put it last, where a reader expects it.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Searched match</h2>
          <p className="text-text-secondary mb-4">
            The second form has no scrutinee - each arm is a full boolean condition.
            This is the shape for ranges and anything else that is not a simple
            equality:
          </p>
          <ExecutableSnippet title={cfMatchSearched.title} initialCode={cfMatchSearched.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Arms are checked top to bottom and the first true one wins, so order them
            from most specific to least. A broad condition listed first silently
            shadows everything below it:
          </p>
          <ExecutableSnippet title={cfMatchFirstWins.title} initialCode={cfMatchFirstWins.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Guards</h2>
          <p className="text-text-secondary mb-4">
            A value arm can carry a guard: <Code>pattern if condition =&gt; value</Code>.
            The arm is taken only when the pattern matches <em>and</em> the guard
            holds; otherwise checking moves on, including to a later arm with the
            same pattern. That lets one subject value split on a second fact
            without nesting an <Code>if</Code> inside the arm:
          </p>
          <ExecutableSnippet title={cfMatchGuard.title} initialCode={cfMatchGuard.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Subjects and patterns are expressions</h2>
          <p className="text-text-secondary mb-4">
            The subject need not be a bare variable, and a pattern need not be a
            literal. Both are expressions: each arm is checked as{' '}
            <Code>subject == pattern</Code>, top to bottom, and a pattern is
            evaluated only when its arm is reached. A variable as a pattern compares
            against its current value:
          </p>
          <ExecutableSnippet title={cfMatchExpressions.title} initialCode={cfMatchExpressions.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Classifying rows</h2>
          <p className="text-text-secondary mb-4">
            Both forms work per row inside a pipeline - reference columns directly in
            the arms. This is the workhorse for bucketing and labeling:
          </p>
          <ExecutableSnippet title={cfMatchRows.title} initialCode={cfMatchRows.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Match inside <Code>map</Code> and <Code>extend</Code> is covered from the
            pipeline side in{' '}
            <Link to="/docs/rql/transforms/match" className="text-primary hover:text-primary-light font-medium transition-colors">Transforms: Match</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the expression produces</h2>
          <p className="text-text-secondary mb-4">
            Without an <Code>else</Code>, a subject that matches no arm has nothing
            to produce, so the result is{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">none</Link>{' '}
            - the same rule as an <Code>if</Code> without <Code>else</Code>. If a
            definite value is required downstream, write the <Code>else</Code>:
          </p>
          <ExecutableSnippet title={cfMatchNoElse.title} initialCode={cfMatchNoElse.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Only the arm that is taken is evaluated. The others are never touched, so
            an arm that would fail is harmless as long as it is not chosen:
          </p>
          <ExecutableSnippet title={cfMatchLazyArms.title} initialCode={cfMatchLazyArms.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Arms produce values and nothing else. An assignment as an arm result is
            a parse error (<Code>AST_006</Code>), and the current build rejects a
            block <Code>{'{'} ... {'}'}</Code> in that position too
            (<Code>AST_005</Code>). Any other statement there - an{' '}
            <Code>insert</Code>, a <Code>let</Code>, a <Code>from</Code> query -
            traps the engine outright with no error message, so never write one.
            To act on the outcome, bind the match with <Code>let</Code> and branch
            on the variable, or assign the bound value afterwards:
          </p>
          <ExecutableSnippet title={cfMatchAssignArm.title} initialCode={cfMatchAssignArm.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Arms must be comparable with the subject</h2>
          <p className="text-text-secondary mb-4">
            Value arms compare with <Code>==</Code>, and <Code>==</Code> is only
            defined between compatible types. A text pattern against an integer
            subject is therefore an error (<Code>OPERATOR_022</Code>), not a
            non-match that quietly falls through - even when a later arm would
            have matched. Only an arm that is never reached is harmless: when an
            earlier arm matches, checking stops there:
          </p>
          <ExecutableSnippet title={cfMatchTypeMismatch.title} initialCode={cfMatchTypeMismatch.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">match and none</h2>
          <p className="text-text-secondary mb-4">
            Value-match arms compare by equality, and{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">equality against none never matches</Link>{' '}
            - not even a literal <Code>none</Code> arm. The arm below is dead code;
            the row with the missing score falls through to <Code>else</Code> and you
            never see <Code>"missing"</Code>:
          </p>
          <ExecutableSnippet title={cfMatchNoneArm.title} initialCode={cfMatchNoneArm.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A subject that is itself none behaves the same way: no value arm
            matches, and the <Code>else</Code> arm runs. To branch on missingness,
            use a searched match with an{' '}
            <Link to="/docs/functions/is/none" className="text-primary hover:text-primary-light font-medium transition-colors">is::none</Link>{' '}
            arm - it always returns a definite <Code>true</Code> or <Code>false</Code>,
            which also makes this the idiom for substituting defaults:
          </p>
          <ExecutableSnippet title={cfMatchNoneGuard.title} initialCode={cfMatchNoneGuard.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">match as the request result</h2>
          <p className="text-text-secondary mb-4">
            When a <Code>match</Code> is the last statement of a request, its value
            is the request's result, returned as a one-value frame named{' '}
            <Code>value</Code> - the same way a{' '}
            <Link to="/docs/rql/control-flow/closures" className="text-primary hover:text-primary-light font-medium transition-colors">closure call</Link>{' '}
            in final position comes back:
          </p>
          <ExecutableSnippet title={cfMatchResult.title} initialCode={cfMatchResult.code} />
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
