import { aggregateByExample as aggregateBy, aggregateByTwoExample as aggregateByTwo, aggregateEmptyInputExample as aggregateEmptyInput, aggregateHavingExample as aggregateHaving, aggregateKeysOnlyExample as aggregateKeysOnly, aggregateNoneKeyExample as aggregateNoneKey, aggregateNoneValuesExample as aggregateNoneValues, aggregateTextMinExample as aggregateTextMin, aggregateUnaliasedExample as aggregateUnaliased, aggregateWholeTableExample as aggregateWholeTable } from './aggregate.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function AggregatePage() {
  return (
    <Layout
      title="aggregate"
      description="The aggregate operator collapses rows into one summary row per group, using count, sum, avg, min, and max over the columns you name."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">aggregate</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>aggregate</Code> turns many rows into few. It groups the input by the
            columns in <Code>by</Code>, runs one or more aggregate functions over each
            group, and emits one row per group. The output shape is the group keys
            followed by the aggregates, and nothing else from the input survives.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`aggregate { alias: math::fn(column), ... }
aggregate { alias: math::fn(column), ... } by { key, ... }`} />
          <p className="text-text-secondary mt-4">
            The aggregate functions are <Code>math::count</Code>,{' '}
            <Code>math::sum</Code>, <Code>math::avg</Code>, <Code>math::min</Code>, and{' '}
            <Code>math::max</Code>. Each takes a column name. <Code>by</Code> is
            optional; leaving it out, or writing <Code>by {'{}'}</Code>, treats the whole
            input as one group. Group keys must be plain column names, not expressions.
            Both brace pairs are required (<Code>AGGREGATE_004</Code>,{' '}
            <Code>AGGREGATE_005</Code>).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">One row for everything</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. Without <Code>by</Code>, the
            whole table collapses to a single row holding the totals:
          </p>
          <ExecutableSnippet title={aggregateWholeTable.title} initialCode={aggregateWholeTable.code} />
          <p className="text-text-muted text-sm mt-3">
            <Code>math::count</Code> counts the values present in the named column, so
            count a column that is never <Code>none</Code> (an id) to count rows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">One row per group</h2>
          <p className="text-text-secondary mb-4">
            With <Code>by</Code>, each distinct value of the key becomes a group. The
            key columns come first in the output, then the aggregates in the order
            written. Groups come out in no particular order, so end with a{' '}
            <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">sort</Link>{' '}
            whenever the order matters:
          </p>
          <ExecutableSnippet title={aggregateBy.title} initialCode={aggregateBy.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Several keys group by their combination:
          </p>
          <ExecutableSnippet title={aggregateByTwo.title} initialCode={aggregateByTwo.code} />
          <p className="text-text-secondary mt-4 mb-4">
            To keep only some groups, put a{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>{' '}
            after the aggregate. It sees the aggregate columns under their aliases:
          </p>
          <ExecutableSnippet title={aggregateHaving.title} initialCode={aggregateHaving.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">none in keys and values</h2>
          <p className="text-text-secondary mb-4">
            A <Code>none</Code> key is a group like any other, collecting every row
            whose key is absent. It sorts after all present values in ascending order:
          </p>
          <ExecutableSnippet title={aggregateNoneKey.title} initialCode={aggregateNoneKey.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Inside the aggregated column, <Code>none</Code> is skipped: it is not
            counted, not added, and not part of an average. Counting an optional column
            therefore gives the number of rows that have a value, and the average
            divides by that number, not the row count. A group whose values are all{' '}
            <Code>none</Code> yields <Code>none</Code> for sum, avg, min, and max:
          </p>
          <ExecutableSnippet title={aggregateNoneValues.title} initialCode={aggregateNoneValues.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Edge cases</h2>
          <p className="text-text-secondary mb-4">
            An aggregate over zero input rows produces zero output rows, not a row of
            zeros. A count of nothing is <Code>(empty)</Code>, not <Code>0</Code>:
          </p>
          <ExecutableSnippet title={aggregateEmptyInput.title} initialCode={aggregateEmptyInput.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An empty aggregate block with a <Code>by</Code> is accepted and returns the
            distinct keys, which makes it a synonym for{' '}
            <Link to="/docs/rql/transforms/distinct" className="text-primary hover:text-primary-light font-medium transition-colors">distinct</Link>{' '}
            followed by a <Code>map</Code> to the keys:
          </p>
          <ExecutableSnippet title={aggregateKeysOnly.title} initialCode={aggregateKeysOnly.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An aggregate without an alias is named by its source text. Alias anything
            you will filter, sort, or map on:
          </p>
          <ExecutableSnippet title={aggregateUnaliased.title} initialCode={aggregateUnaliased.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>math::min</Code> and <Code>math::max</Code> accept numeric columns
            only. On text they fail with a typed error (<Code>FUNCTION_004</Code>):
          </p>
          <ExecutableSnippet title={aggregateTextMin.title} initialCode={aggregateTextMin.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>aggregate ... by</Code> is <Code>GROUP BY</Code> plus the aggregate
            part of the select list, in one operator. The keys are listed once, in{' '}
            <Code>by</Code>, and appear in the output automatically; they are not
            repeated in the aggregate block. <Code>HAVING</Code> is a <Code>filter</Code>{' '}
            placed after the aggregate. One behavior differs from SQL engines:{' '}
            <Code>COUNT(*)</Code> over an empty input returns <Code>0</Code> in SQL and
            no row at all here.
          </p>
        </section>

        <Callout variant="warning" title="Only aggregates in the aggregate block">
          The aggregate block may contain aggregate function calls only. Naming a
          plain column there, as in{' '}
          <Code>aggregate {'{'} region, total: math::sum(amount) {'}'} by {'{'} region {'}'}</Code>,
          is not caught as a typed error in this engine version; it fails inside the
          query. The keys are already in the output, so the column belongs in{' '}
          <Code>by</Code>, not in the block.
        </Callout>
      </div>
    </Layout>
  );
}
