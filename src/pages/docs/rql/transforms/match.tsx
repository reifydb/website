import { matchExtendThenFilterExample as matchExtendThenFilter, matchGuardExample as matchGuard, matchInFilterExample as matchInFilter, matchNoElseExample as matchNoElse, matchNoneSearchedExample as matchNoneSearched, matchNoneSubjectExample as matchNoneSubject, matchSearchedExample as matchSearched, matchStandaloneExample as matchStandalone, matchValueExample as matchValue } from './match.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function MatchPage() {
  return (
    <Layout
      title="match"
      description="How the match expression maps a value or a list of conditions to a result inside map, extend, and filter, with first-arm-wins ordering, guards, and else."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">match</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>match</Code> is RQL's conditional expression. It takes a list of arms,
            evaluates them top to bottom, and produces the result of the first arm that
            fits. It is the tool for turning codes into labels, numbers into buckets, and
            several conditions into one column - anywhere an expression is allowed:{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>,{' '}
            <Link to="/docs/rql/transforms/extend" className="text-primary hover:text-primary-light font-medium transition-colors">extend</Link>,{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>,
            and insert payloads.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Value match</h2>
          <p className="text-text-secondary mb-4">
            Put the value to inspect between <Code>match</Code> and the opening brace.
            Each arm is <Code>pattern =&gt; result</Code>; the arm whose pattern equals
            the value wins. <Code>else</Code> catches everything the other arms did not.
            Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={matchValue.title} initialCode={matchValue.code} />
          <p className="text-text-muted text-sm mt-3">
            Arms are separated by commas; a newline between arms works too.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Searched match</h2>
          <p className="text-text-secondary mb-4">
            Leave out the subject and each arm becomes a boolean condition of its own.
            Arms are tried in order and the first true one wins, so put the narrowest
            condition first - here <Code>245</Code> is greater than both 200 and 100,
            and gets <Code>large</Code> because that arm comes first:
          </p>
          <ExecutableSnippet title={matchSearched.title} initialCode={matchSearched.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Leaving out else</h2>
          <p className="text-text-secondary mb-4">
            <Code>else</Code> is optional. When no arm matches and there is no{' '}
            <Code>else</Code>, the expression is <Code>none</Code>:
          </p>
          <ExecutableSnippet title={matchNoElse.title} initialCode={matchNoElse.code} />
          <p className="text-text-secondary mt-4 mb-4">
            That is convenient when the column is meant to be optional and a trap
            when it is not. Add an <Code>else</Code> whenever every row needs a result.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Guards</h2>
          <p className="text-text-secondary mb-4">
            A value arm can carry an extra condition: <Code>pattern if condition =&gt;
            result</Code>. The arm matches only when both the pattern equals the subject
            and the guard is true. Because arms are ordered, the guarded arm goes
            before the plain one:
          </p>
          <ExecutableSnippet title={matchGuard.title} initialCode={matchGuard.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">match in filter and extend</h2>
          <p className="text-text-secondary mb-4">
            A <Code>match</Code> whose arms return booleans is a predicate, so it can be
            the whole <Code>filter</Code> condition - a readable way to write an
            allow-list:
          </p>
          <ExecutableSnippet title={matchInFilter.title} initialCode={matchInFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The more common pattern is to compute a label with <Code>extend</Code> and
            filter on it in the next stage. The label is an ordinary column from then on:
          </p>
          <ExecutableSnippet title={matchExtendThenFilter.title} initialCode={matchExtendThenFilter.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">none as a subject</h2>
          <p className="text-text-secondary mb-4">
            A value arm compares with <Code>==</Code>, and <Code>none</Code> is never
            equal to anything - not even to a <Code>none</Code> pattern. A{' '}
            <Code>none</Code> subject therefore skips every value arm and lands in{' '}
            <Code>else</Code>:
          </p>
          <ExecutableSnippet title={matchNoneSubject.title} initialCode={matchNoneSubject.code} />
          <p className="text-text-secondary mt-4 mb-4">
            To branch on absence, use a searched match with{' '}
            <Code>is::none(...)</Code> as the condition:
          </p>
          <ExecutableSnippet title={matchNoneSearched.title} initialCode={matchNoneSearched.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">match on its own</h2>
          <p className="text-text-secondary mb-4">
            A <Code>match</Code> can also stand alone as a statement. It yields a single
            row with one column named <Code>value</Code>, which is handy in scripts and
            when trying an expression out:
          </p>
          <ExecutableSnippet title={matchStandalone.title} initialCode={matchStandalone.code} />
        </section>

        <Callout variant="warning" title="Keep every arm the same type">
          Arms that return different types - <Code>"paid" =&gt; 1, else =&gt; "no"</Code> -
          are not rejected by the parser, but evaluating them over a table with more
          than one row crashes the engine instead of producing a typed error. Return
          the same type from every arm, including <Code>else</Code>; cast in the arm if
          you have to.
        </Callout>

        <Callout variant="note" title="Not the control-flow match">
          This page is about <Code>match</Code> as an expression inside a pipeline. For
          branching between statements in a script, see{' '}
          <Link to="/docs/rql/control-flow/match" className="text-primary hover:text-primary-light font-medium transition-colors">the control-flow match statement</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
