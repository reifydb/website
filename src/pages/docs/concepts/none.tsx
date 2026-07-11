import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function WorkingWithNonePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Working with none</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB has no NULL. The missing value is <Code>none</Code>, it is typed - a
            missing <Code>int4</Code> is still an <Code>int4</Code> - and it only exists
            where the schema says it may. Columns are required by default; a column that
            can be missing is declared as <Code>Option(type)</Code>. This page covers
            where <Code>none</Code> comes from, how it moves through expressions,
            filters, joins, and aggregates, and how to test for it and replace it.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where none comes from</h2>
          <p className="text-text-secondary mb-4">
            An optional column holds <Code>none</Code> when an insert omits it or writes
            the <Code>none</Code> literal explicitly - the two are equivalent. Run the
            snippets on this page in order:
          </p>
          <ExampleSnippet id="concepts-none-optional-columns" />
          <p className="text-text-secondary mt-4 mb-4">
            Every non-<Code>Option</Code> column rejects <Code>none</Code> at write time.
            There is no "forgot the NOT NULL constraint" failure mode - required is the
            default, and a missing value in a required column is an error
            (<Code>CONSTRAINT_007</Code>) that rolls back the whole request:
          </p>
          <ExampleSnippet id="concepts-none-required-rejects" />
          <p className="text-text-secondary mt-4 mb-4">
            Besides optional columns, <Code>none</Code> is produced by queries
            themselves: unmatched rows in a left join, aggregates over groups with
            nothing to aggregate, and any expression whose input is missing. Each case
            is covered below. See{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            for the rest of the column model.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Propagation through expressions</h2>
          <p className="text-text-secondary mb-4">
            Arithmetic, comparisons, and scalar functions propagate <Code>none</Code>{' '}
            instead of failing or inventing a value: if an input is missing, the result
            is missing. Because <Code>none</Code> carries its type, the expression still
            type-checks - <Code>price * 2</Code> on a missing price is a missing number,
            not an error:
          </p>
          <ExampleSnippet id="concepts-none-propagates" />
          <p className="text-text-secondary mt-4 mb-4">
            Logical operators are the deliberate exception. When one side already decides
            the answer, the missing side cannot change it, so the result is definite:{' '}
            <Code>none and false</Code> is <Code>false</Code>, <Code>none or true</Code>{' '}
            is <Code>true</Code>. Only when the answer genuinely depends on the missing
            value does <Code>none</Code> come through:
          </p>
          <ExampleSnippet id="concepts-none-logic" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Testing for none</h2>
          <p className="text-text-secondary mb-4">
            <Code>none</Code> is the absence of a value, so comparing anything to it -
            including another <Code>none</Code> - never produces <Code>true</Code>. A
            filter on <Code>== none</Code> matches nothing:
          </p>
          <ExampleSnippet id="concepts-none-eq-never-matches" />
          <p className="text-text-secondary mt-4 mb-4">
            The functions{' '}
            <Link to="/docs/functions/is/none" className="text-primary hover:text-primary-light font-medium transition-colors">is::none</Link>{' '}
            and{' '}
            <Link to="/docs/functions/is/some" className="text-primary hover:text-primary-light font-medium transition-colors">is::some</Link>{' '}
            exist for exactly this: they always return a definite <Code>true</Code> or{' '}
            <Code>false</Code>, never <Code>none</Code>. They are RQL's counterpart to
            SQL's <Code>IS NULL</Code> and <Code>IS NOT NULL</Code> (see{' '}
            <Link to="/docs/rql/for-sql-users" className="text-primary hover:text-primary-light font-medium transition-colors">RQL for SQL users</Link>):
          </p>
          <ExampleSnippet id="concepts-none-is-none" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Filters keep only definite matches</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>{' '}
            keeps a row only when its predicate is definitely <Code>true</Code>. A
            predicate that evaluates to <Code>none</Code> drops the row, the same as{' '}
            <Code>false</Code>:
          </p>
          <ExampleSnippet id="concepts-none-filter-drops" />
          <p className="text-text-secondary mt-4 mb-4">
            The consequence worth internalizing: a predicate and its negation do not
            split the data into two halves. <Code>not (none &gt; 50)</Code> is still{' '}
            <Code>none</Code>, so the row with the missing score matches neither side.
            If "the rows where the predicate did not hold" must include missing values,
            say so with <Code>is::none</Code>:
          </p>
          <ExampleSnippet id="concepts-none-filter-complement" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Replacing none</h2>
          <p className="text-text-secondary mb-4">
            To substitute a default, use a{' '}
            <Link to="/docs/rql/transforms/match" className="text-primary hover:text-primary-light font-medium transition-colors">match</Link>{' '}
            expression with an <Code>is::none</Code> arm. Note that a value match
            (<Code>match nickname {'{'} ... {'}'}</Code>) cannot do this - its arms
            compare by equality, and equality never matches <Code>none</Code>:
          </p>
          <ExampleSnippet id="concepts-none-replace" />
          <p className="text-text-secondary mt-4 mb-4">
            The write side mirrors it: assigning <Code>none</Code> to an optional column
            in an <Code>update</Code> clears the stored value:
          </p>
          <ExampleSnippet id="concepts-none-clear" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Joins introduce none</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/rql/transforms/join" className="text-primary hover:text-primary-light font-medium transition-colors">left join</Link>{' '}
            keeps every left row; where the right side has no match, all of its columns
            are <Code>none</Code> - even columns whose source table declares them as
            required. Any column that arrives via a left join can therefore be missing:
          </p>
          <ExampleSnippet id="concepts-none-left-join" />
          <p className="text-text-secondary mt-4 mb-4">
            That makes <Code>is::none</Code> on a joined column the idiom for "rows
            without a match":
          </p>
          <ExampleSnippet id="concepts-none-join-missing" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Aggregates skip it, group keys keep it</h2>
          <p className="text-text-secondary mb-4">
            Aggregate functions (<Code>math::sum</Code>, <Code>math::avg</Code>,{' '}
            <Code>math::min</Code>, <Code>math::max</Code>, <Code>math::count</Code>)
            ignore <Code>none</Code> inputs - a missing reading does not drag an average
            down or a count up. <Code>math::count</Code> counts defined values, so
            counting an optional column and counting a required column answer different
            questions. A group whose inputs are all missing has nothing to aggregate,
            and its result is <Code>none</Code>:
          </p>
          <ExampleSnippet id="concepts-none-aggregates" />
          <p className="text-text-secondary mt-4 mb-4">
            As a group key, <Code>none</Code> behaves differently: all rows with a
            missing key land in one group of their own rather than being discarded.
            Grouping never loses rows:
          </p>
          <ExampleSnippet id="concepts-none-group-key" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Sorting and output</h2>
          <p className="text-text-secondary mb-4">
            <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">Sorting</Link>{' '}
            ranks <Code>none</Code> above every defined value: ascending order puts
            missing values last, descending order puts them first.
          </p>
          <ExampleSnippet id="concepts-none-sort-asc" />
          <ExampleSnippet id="concepts-none-sort-desc" className="mt-4" />
          <p className="text-text-secondary mt-4 mb-4">
            In rendered tables - the CLI, the docs snippets on this page - a missing
            value prints as <Code>⟪none⟫</Code>, deliberately unmistakable for a string.
          </p>
        </section>

        <Callout variant="note" title="Overflow is a decision too">
          Missing inputs propagate through arithmetic in every case, but what happens
          when a result cannot exist - overflow, division by zero - is a choice. The
          arithmetic function families come in explicit policy variants -{' '}
          <Code>math::add_none</Code> turns overflow into <Code>none</Code>,{' '}
          <Code>math::add_zero</Code> substitutes zero, <Code>math::add_strict</Code>{' '}
          fails the statement with your own message, and friends - so the behavior is
          visible in the query, not an accident.
          See{' '}
          <Link to="/docs/functions/arithmetic-policies" className="text-primary hover:text-primary-light font-medium transition-colors">Arithmetic Overflow &amp; none Policies</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
