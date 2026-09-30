import { sortAscExample as sortAsc, sortBareExample as sortBare, sortDescExample as sortDesc, sortDroppedColumnExample as sortDroppedColumn, sortExpressionExample as sortExpression, sortMultiExample as sortMulti, sortNoneAscExample as sortNoneAsc, sortNoneDescExample as sortNoneDesc, sortTakeExample as sortTake, sortTextExample as sortText } from './sort.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function SortPage() {
  return (
    <Layout
      title="sort"
      description="The sort operator orders rows by one or more columns; each key takes asc or desc, and a key with no direction sorts descending."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">sort</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>sort</Code> orders the rows of a frame by one or more columns. It
            changes nothing but the order: same rows, same columns. Nothing else in a
            pipeline promises an order, so a query whose result order matters ends with
            a <Code>sort</Code>, and a top-N query is a <Code>sort</Code> followed by{' '}
            <Link to="/docs/rql/transforms/take" className="text-primary hover:text-primary-light font-medium transition-colors">take</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`sort { column: asc }
sort { column: desc }
sort { first: asc, second: desc, ... }`} />
          <p className="text-text-secondary mt-4">
            Each key is a column name followed by an optional direction. The braces are
            required (<Code>SORT_001</Code>). Keys are compared left to right: the
            second key only decides between rows that tie on the first.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Ordering rows</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. The first creates a table and sorts
            it by amount, smallest first:
          </p>
          <ExecutableSnippet title={sortAsc.title} initialCode={sortAsc.code} />
          <ExecutableSnippet title={sortDesc.title} initialCode={sortDesc.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Several keys break ties. Each key carries its own direction:
          </p>
          <ExecutableSnippet title={sortMulti.title} initialCode={sortMulti.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Rows that tie on every key have no defined order between them. Add a unique
            column such as <Code>id</Code> as the last key when the result must be
            reproducible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The default direction is descending</h2>
          <p className="text-text-secondary mb-4">
            A key without a direction sorts <em>descending</em>. This is the opposite of
            SQL, where a bare <Code>ORDER BY</Code> column is ascending, and it is
            easy to get wrong when reading a query. The output below is identical to{' '}
            <Code>sort {'{'} total: desc {'}'}</Code>:
          </p>
          <ExecutableSnippet title={sortBare.title} initialCode={sortBare.code} />
          <p className="text-text-muted text-sm mt-3">
            Write the direction out on every key. <Code>sort {'{'} total: asc {'}'}</Code>{' '}
            says what it does; <Code>sort {'{'} total {'}'}</Code> does not.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Where none goes</h2>
          <p className="text-text-secondary mb-4">
            <Code>none</Code> is treated as larger than every present value. Ascending
            puts it last:
          </p>
          <ExecutableSnippet title={sortNoneAsc.title} initialCode={sortNoneAsc.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Descending puts it first. There is no modifier to override this (nothing
            like SQL's <Code>NULLS FIRST</Code>); to push <Code>none</Code> rows to the
            far end regardless of direction, sort on a helper column from{' '}
            <Code>extend {'{'} missing: is::none(note) {'}'}</Code> first:
          </p>
          <ExecutableSnippet title={sortNoneDesc.title} initialCode={sortNoneDesc.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Top N</h2>
          <p className="text-text-secondary mb-4">
            <Code>sort</Code> followed by <Code>take</Code> gives the largest (or
            smallest) N rows. The engine recognises the pair and keeps only N rows in
            memory while scanning, instead of sorting the whole input:
          </p>
          <ExecutableSnippet title={sortTake.title} initialCode={sortTake.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Text order</h2>
          <p className="text-text-secondary mb-4">
            Text compares by byte value, not by language rules. Every uppercase letter
            sorts before every lowercase one, so <Code>Bob</Code> comes before{' '}
            <Code>ada</Code>. For a case-insensitive order, sort on{' '}
            <Code>text::lower(name)</Code> computed with <Code>extend</Code>:
          </p>
          <ExecutableSnippet title={sortText.title} initialCode={sortText.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            Keys are column names, nothing else. An expression in a key position is a
            parse error; compute the value with{' '}
            <Link to="/docs/rql/transforms/extend" className="text-primary hover:text-primary-light font-medium transition-colors">extend</Link>{' '}
            first and sort on the new column:
          </p>
          <ExecutableSnippet title={sortExpression.title} initialCode={sortExpression.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Unlike <Code>filter</Code>, <Code>map</Code>, and <Code>extend</Code>, which
            silently read an unknown column as <Code>none</Code>, <Code>sort</Code>{' '}
            rejects a column that is not in its input (<Code>QUERY_001</Code>). A{' '}
            <Code>map</Code> that dropped the column is the usual cause; sort first,
            then map:
          </p>
          <ExecutableSnippet title={sortDroppedColumn.title} initialCode={sortDroppedColumn.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>sort</Code> is <Code>ORDER BY</Code>, with three differences: it can
            appear anywhere in the pipeline rather than only at the end, its keys must
            be column names rather than expressions, and a key without a direction is
            descending rather than ascending. <Code>ORDER BY ... LIMIT n</Code> becomes{' '}
            <Code>sort {'{'} ... {'}'} take n</Code>. <Code>NULL</Code> ordering matches
            engines that treat nulls as largest: last ascending, first descending.
          </p>
        </section>

        <Callout variant="warning" title="Always write the direction">
          <Code>sort {'{'} column {'}'}</Code> sorts descending in the shipped engine, and
          its default may change. A query that spells out <Code>asc</Code> or{' '}
          <Code>desc</Code> on every key means the same thing on every version.
        </Callout>
      </div>
    </Layout>
  );
}
