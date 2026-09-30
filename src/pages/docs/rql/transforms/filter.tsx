import { filterBasicExample as filterBasic, filterBetweenExample as filterBetween, filterChainedExample as filterChained, filterHavingExample as filterHaving, filterInExample as filterIn, filterNoneEqExample as filterNoneEq, filterNoneIsExample as filterNoneIs, filterOrExample as filterOr, filterSymbolicOpsExample as filterSymbolicOps, filterThreeValuedExample as filterThreeValued, filterUnknownColumnExample as filterUnknownColumn } from './filter.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function FilterPage() {
  return (
    <Layout
      title="filter"
      description="The filter operator keeps the rows whose condition is true, drops the rest, and treats a none result as a miss."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">filter</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>filter</Code> keeps the rows for which a condition is <Code>true</Code>{' '}
            and drops every other row. It never changes columns: the frame that comes
            out has exactly the shape of the frame that went in, with fewer rows. It can
            appear anywhere in a pipeline, as many times as you like, including after{' '}
            <Code>aggregate</Code>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`filter { condition }`} />
          <p className="text-text-secondary mt-4">
            The condition is one expression that must evaluate to a{' '}
            <Code>bool</Code>. Comparison operators (<Code>==</Code>,{' '}
            <Code>!=</Code>, <Code>&lt;</Code>, <Code>&lt;=</Code>, <Code>&gt;</Code>,{' '}
            <Code>&gt;=</Code>), the keywords <Code>and</Code>, <Code>or</Code>,{' '}
            <Code>not</Code>, the list test <Code>in</Code>, the range test{' '}
            <Code>between ... and ...</Code>, and any function that returns a bool all
            qualify. See{' '}
            <Link to="/docs/rql/expressions/operators" className="text-primary hover:text-primary-light font-medium transition-colors">Operators</Link>{' '}
            for precedence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Keeping rows</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. The first creates a small orders
            table and keeps the orders over 20:
          </p>
          <ExecutableSnippet title={filterBasic.title} initialCode={filterBasic.code} />
          <p className="text-text-muted text-sm mt-3">
            Surviving rows keep their relative order. A table scan delivers newest rows
            first, so the result does too.
          </p>
          <p className="text-text-secondary mt-4 mb-4">
            Conditions combine with the words <Code>and</Code>, <Code>or</Code>, and{' '}
            <Code>not</Code>; parentheses group as usual:
          </p>
          <ExecutableSnippet title={filterOr.title} initialCode={filterOr.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>in</Code> tests membership in a literal list, and{' '}
            <Code>between</Code> tests a range with both ends included:
          </p>
          <ExecutableSnippet title={filterIn.title} initialCode={filterIn.code} />
          <ExecutableSnippet title={filterBetween.title} initialCode={filterBetween.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Two filters in a row are the same as one filter with <Code>and</Code>. The
            second only ever sees what the first let through:
          </p>
          <ExecutableSnippet title={filterChained.title} initialCode={filterChained.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Filtering on none</h2>
          <p className="text-text-secondary mb-4">
            A comparison involving <Code>none</Code> does not produce <Code>false</Code>;
            it produces <Code>none</Code>, and <Code>filter</Code> drops any row whose
            condition is <Code>none</Code>. To find absent values, ask with{' '}
            <Code>is::none</Code> (or <Code>is::some</Code> for present ones):
          </p>
          <ExecutableSnippet title={filterNoneIs.title} initialCode={filterNoneIs.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Writing <Code>== none</Code> instead compares each value with an absent
            value. The result is <Code>none</Code> on every row, so nothing survives:
          </p>
          <ExecutableSnippet title={filterNoneEq.title} initialCode={filterNoneEq.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same rule reaches through <Code>not</Code>. Negating a <Code>none</Code>{' '}
            gives <Code>none</Code>, so rows with an absent <Code>note</Code> are dropped
            by both <Code>note == "rush"</Code> and its negation. Only the rows whose
            note is present and differs survive here:
          </p>
          <ExecutableSnippet title={filterThreeValued.title} initialCode={filterThreeValued.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>or</Code> and <Code>and</Code> follow three-valued logic:{' '}
            <Code>true or none</Code> is <Code>true</Code>, <Code>false and none</Code>{' '}
            is <Code>false</Code>, and everything else involving <Code>none</Code> stays{' '}
            <Code>none</Code>. See{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Filtering groups</h2>
          <p className="text-text-secondary mb-4">
            There is no separate operator for conditions on aggregated values. Put a{' '}
            <Code>filter</Code> after{' '}
            <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>{' '}
            and refer to the aggregate columns by the names you gave them:
          </p>
          <ExecutableSnippet title={filterHaving.title} initialCode={filterHaving.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            The logical operators are words. The C-style forms <Code>&amp;&amp;</Code>{' '}
            and <Code>||</Code> are not tokens the parser knows, and the query fails
            before it runs:
          </p>
          <ExecutableSnippet title={filterSymbolicOps.title} initialCode={filterSymbolicOps.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A column name that does not exist in the frame is not an error inside an
            expression: it evaluates to <Code>none</Code> on every row, and the filter
            silently matches nothing. A typo looks exactly like an empty table:
          </p>
          <ExecutableSnippet title={filterUnknownColumn.title} initialCode={filterUnknownColumn.code} />
          <p className="text-text-muted text-sm mt-3">
            <Code>sort</Code>, by contrast, rejects an unknown column
            (<Code>QUERY_001</Code>). If a filter returns nothing you did not expect,
            check the column name first.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>filter</Code> is <Code>WHERE</Code> and <Code>HAVING</Code> in one:
            before <Code>aggregate</Code> it filters rows, after it filters groups, and
            the position in the pipeline says which. Its treatment of <Code>none</Code>{' '}
            matches SQL's treatment of <Code>NULL</Code> in <Code>WHERE</Code>: an
            unknown result is a miss, and <Code>IS NULL</Code> becomes{' '}
            <Code>is::none(col)</Code>. <Code>AND</Code>/<Code>OR</Code>/<Code>NOT</Code>{' '}
            keep their names, in lowercase.
          </p>
        </section>

        <Callout variant="warning" title="The condition must be a bool">
          The engine does not coerce. A condition that evaluates to a number or a
          string, such as <Code>filter {'{'} total {'}'}</Code>, is not a typed error
          but an internal failure of the query. Compare explicitly:{' '}
          <Code>filter {'{'} total != 0 {'}'}</Code>.
        </Callout>
      </div>
    </Layout>
  );
}
