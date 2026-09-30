import { extendAfterAggregateExample as extendAfterAggregate, extendBasicExample as extendBasic, extendDuplicateExample as extendDuplicate, extendFilterExample as extendFilter, extendMultipleExample as extendMultiple, extendUnaliasedExample as extendUnaliased, extendUnknownColumnExample as extendUnknownColumn } from './extend.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function ExtendPage() {
  return (
    <Layout
      title="extend"
      description="The extend operator appends computed columns to every row while keeping all existing columns; a name that already exists is an error."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">extend</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>extend</Code> adds columns. Every column that enters it leaves it
            unchanged, and the new columns are appended on the right, in the order
            written. It never removes anything and never changes the row count. It is
            the operator for helper values in the middle of a pipeline: a flag to
            filter on, a total to sort by, an intermediate you want to reuse.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`extend { alias: expression, expression, ... }`} />
          <p className="text-text-secondary mt-4">
            Each entry is an expression over the current row. <Code>alias:</Code> names
            the new column; an expression without an alias is named by its source
            text. The braces are required (<Code>EXTEND_002</Code> when they are
            missing).
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Adding columns</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. The first creates a table of line
            items with an optional quantity and computes each line's cost. The
            original three columns stay; <Code>line</Code> is appended. Where an input
            is <Code>none</Code>, the result is <Code>none</Code>, and the row is kept:
          </p>
          <ExecutableSnippet title={extendBasic.title} initialCode={extendBasic.code} />
          <p className="text-text-secondary mt-4 mb-4">
            One block can add several columns. They are added left to right, and an
            expression can refer to a column added earlier in the same block:
          </p>
          <ExecutableSnippet title={extendMultiple.title} initialCode={extendMultiple.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Without an alias the new column takes the expression's text as its name,
            which is fine for a quick look and awkward to reference afterwards:
          </p>
          <ExecutableSnippet title={extendUnaliased.title} initialCode={extendUnaliased.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Using the new column downstream</h2>
          <p className="text-text-secondary mb-4">
            Anything <Code>extend</Code> adds is a normal column for the operators that
            follow. A bool column can be the whole condition of a{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>:
          </p>
          <ExecutableSnippet title={extendFilter.title} initialCode={extendFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same works after{' '}
            <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>.
            Aggregate columns are plain columns once the aggregate has run, so a
            derived ratio is one <Code>extend</Code> away:
          </p>
          <ExecutableSnippet title={extendAfterAggregate.title} initialCode={extendAfterAggregate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Name collisions</h2>
          <p className="text-text-secondary mb-4">
            <Code>extend</Code> only ever adds. Giving a new column the name of a column
            that already exists is an error (<Code>EXTEND_002</Code>), including a name
            repeated inside one block. Column names are case-sensitive, so{' '}
            <Code>Price</Code> and <Code>price</Code> are different columns:
          </p>
          <ExecutableSnippet title={extendDuplicate.title} initialCode={extendDuplicate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            To overwrite a column in place, use <Code>patch</Code>, which treats an
            existing name as a replacement and a new name as an addition:{' '}
            <Code>patch {'{'} price: price * 2 {'}'}</Code>. To replace the whole shape,
            use{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            A column name that does not exist in the incoming frame is not an error
            inside an expression; it reads as <Code>none</Code> on every row. That is
            easy to hit after a <Code>map</Code> has narrowed the frame. The extend
            below succeeds and produces a column of <Code>none</Code>, because{' '}
            <Code>qty</Code> was dropped one step earlier:
          </p>
          <ExecutableSnippet title={extendUnknownColumn.title} initialCode={extendUnknownColumn.code} />
          <p className="text-text-muted text-sm mt-3">
            When a computed column is unexpectedly all <Code>none</Code>, check the
            spelling of the inputs and what the previous <Code>map</Code> kept.
          </p>
          <p className="text-text-secondary mt-4 mb-4">
            <Code>extend</Code> without a <Code>from</Code> in front of it behaves like{' '}
            <Code>map</Code> in the same position: it evaluates its expressions once and
            yields a single row. Over an empty input it yields no rows, with the new
            columns present in the shape.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>extend</Code> is <Code>SELECT *, expression AS alias</Code>, but it can
            sit anywhere in the pipeline and its columns can be used by the very next
            operator without a subquery. Referring to an alias defined earlier in the
            same block is allowed here; in SQL that requires nesting or a lateral join.
            The refusal to overwrite an existing column has no SQL equivalent: SQL
            happily returns two columns with the same name.
          </p>
        </section>

        <Callout variant="note" title="Column order is part of the output">
          New columns always land at the end of the row, in the order they appear in
          the block. If you need them elsewhere, finish with a{' '}
          <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>{' '}
          that lists the final order.
        </Callout>
      </div>
    </Layout>
  );
}
