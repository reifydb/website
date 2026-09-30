import { mapComputeExample as mapCompute, mapDropsColumnsExample as mapDropsColumns, mapLiteralsOnlyExample as mapLiteralsOnly, mapMatchExample as mapMatch, mapNoneExample as mapNone, mapRownumExample as mapRownum, mapSelectExample as mapSelect, mapUnaliasedExample as mapUnaliased, mapUnknownColumnExample as mapUnknownColumn } from './map.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function MapPage() {
  return (
    <Layout
      title="map"
      description="The map operator replaces the row shape: it keeps, renames, and computes exactly the columns you list and drops everything else."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">map</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>map</Code> defines the output shape of a pipeline. Each entry in its
            block becomes one column, in the order written, and every column that is
            not mentioned is gone. It does not touch the row count. Use it to project,
            rename, and compute; use{' '}
            <Link to="/docs/rql/transforms/extend" className="text-primary hover:text-primary-light font-medium transition-colors">extend</Link>{' '}
            when you want to add a column and keep the rest.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`map { column, alias: expression, expression, ... }`} />
          <p className="text-text-secondary mt-4">
            A bare column name keeps that column under its own name. <Code>alias:
            expression</Code> evaluates the expression per row and names the result. An
            expression without an alias is allowed; its column is named after the
            expression's text. The braces are required (<Code>MAP_002</Code>).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Picking columns</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. The first creates a table and keeps
            two of its four columns. Output columns follow the order in the{' '}
            <Code>map</Code> block, not the table definition:
          </p>
          <ExecutableSnippet title={mapSelect.title} initialCode={mapSelect.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Aliases rename, and any expression over the input row computes a new value.
            The input columns that fed the expression are not carried along unless you
            list them too:
          </p>
          <ExecutableSnippet title={mapCompute.title} initialCode={mapCompute.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Without an alias, the column is named by the expression's source text. That
            name is awkward to reference later, so alias anything you will use
            downstream:
          </p>
          <ExecutableSnippet title={mapUnaliased.title} initialCode={mapUnaliased.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A <Code>map</Code> with no <Code>from</Code> in front of it evaluates its
            expressions once and yields a single row. It is the quickest way to try an
            expression or a function call:
          </p>
          <ExecutableSnippet title={mapLiteralsOnly.title} initialCode={mapLiteralsOnly.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">none in expressions</h2>
          <p className="text-text-secondary mb-4">
            Arithmetic and comparisons propagate <Code>none</Code>: if any input is
            absent, the result is absent. The row itself is kept, so a computed column
            can be <Code>none</Code> on some rows and a value on others:
          </p>
          <ExecutableSnippet title={mapNone.title} initialCode={mapNone.code} />
          <p className="text-text-secondary mt-4 mb-4">
            To substitute a value for <Code>none</Code>, or to branch on any condition,
            use a{' '}
            <Link to="/docs/rql/transforms/match" className="text-primary hover:text-primary-light font-medium transition-colors">match</Link>{' '}
            expression inside the map:
          </p>
          <ExecutableSnippet title={mapMatch.title} initialCode={mapMatch.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">System columns</h2>
          <p className="text-text-secondary mb-4">
            Stored rows carry engine-maintained columns prefixed with <Code>#</Code>.
            They are hidden from a bare scan and appear only when projected explicitly.{' '}
            <Code>#rownum</Code> is the row's stable number within its table:
          </p>
          <ExecutableSnippet title={mapRownum.title} initialCode={mapRownum.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            Whatever <Code>map</Code> leaves out is gone for the rest of the pipeline.
            A later <Code>sort</Code> on a dropped column fails with{' '}
            <Code>QUERY_001</Code>. Put <Code>sort</Code> before the <Code>map</Code>,
            or keep the column:
          </p>
          <ExecutableSnippet title={mapDropsColumns.title} initialCode={mapDropsColumns.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>sort</Code> is the strict one. Inside a <Code>map</Code>,{' '}
            <Code>extend</Code>, or <Code>filter</Code> expression, a name that matches
            no column is not an error: it evaluates to <Code>none</Code> on every row.
            A misspelled column shows up as a column full of <Code>none</Code>, or as a
            filter that matches nothing:
          </p>
          <ExecutableSnippet title={mapUnknownColumn.title} initialCode={mapUnknownColumn.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>map</Code> is the <Code>SELECT</Code> list, moved to wherever in the
            pipeline you need it. <Code>alias: expression</Code> is{' '}
            <Code>expression AS alias</Code> with the two halves swapped. There is no{' '}
            <Code>SELECT *</Code>; leave <Code>map</Code> out to keep every column, or
            use <Code>extend</Code> to keep every column and add some. Because{' '}
            <Code>map</Code> can appear more than once, a chain of{' '}
            <Code>map</Code> steps replaces nested subqueries that exist only to rename
            or stage a computation.
          </p>
        </section>

        <Callout variant="tip" title="map or extend?">
          Reach for <Code>map</Code> when the output shape matters: an API response, a
          view definition, the last step of a query. Reach for{' '}
          <Link to="/docs/rql/transforms/extend" className="text-primary hover:text-primary-light font-medium transition-colors">extend</Link>{' '}
          in the middle of a pipeline, where you want a helper column without listing
          everything you already have.
        </Callout>
      </div>
    </Layout>
  );
}
