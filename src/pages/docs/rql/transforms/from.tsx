import { fromEmptyExample as fromEmpty, fromInlineExample as fromInline, fromInlineExpressionsExample as fromInlineExpressions, fromInlineRaggedExample as fromInlineRagged, fromMissingExample as fromMissing, fromPipelineExample as fromPipeline, fromTableExample as fromTable, fromVariableExample as fromVariable, fromViewCreateExample as fromViewCreate, fromViewReadExample as fromViewRead } from './from.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function FromPage() {
  return (
    <Layout
      title="from"
      description="The from operator starts an RQL pipeline by naming its source: a table, a view, a system table, a frame variable, or inline records."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">from</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>from</Code> starts a pipeline. It names where the rows come from and
            hands them, unchanged, to the next operator. Every query that reads stored
            data begins with it; the only pipelines that skip it are ones that build a
            single row from literals with <Code>map</Code> or <Code>extend</Code>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`from namespace::table
from namespace::view
from system::tables
from $frame_variable
from [{ field: value, ... }, { ... }]
from []`} />
          <p className="text-text-secondary mt-4">
            A stored object is always written as <Code>namespace::name</Code>; there is
            no unqualified table name and no default namespace. Inline records go in
            square brackets. A variable bound with <Code>let</Code> to a query result can
            be read back with <Code>from $name</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Reading a table</h2>
          <p className="text-text-secondary mb-4">
            A bare <Code>from</Code> over a table returns every row and every declared
            column, in the column order of the table definition. Run the snippets on
            this page in order:
          </p>
          <ExecutableSnippet title={fromTable.title} initialCode={fromTable.code} />
          <p className="text-text-muted text-sm mt-3">
            Rows come back newest first: a table scan walks its rows in reverse insertion
            order. That order is what the engine does today, not a guarantee. Add{' '}
            <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">sort</Link>{' '}
            when the order matters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Feeding the pipeline</h2>
          <p className="text-text-secondary mb-4">
            <Code>from</Code> produces a frame: a set of named, typed columns. Each
            operator after it takes that frame and produces a new one. Here{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>{' '}
            drops rows and{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>{' '}
            drops columns, in that order:
          </p>
          <ExecutableSnippet title={fromPipeline.title} initialCode={fromPipeline.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Inline records</h2>
          <p className="text-text-secondary mb-4">
            An array of records is a source too. Nothing has to exist in the catalog,
            which makes inline records the quickest way to try an expression or an
            operator. Columns from an inline source are ordered by name, not by the
            order you wrote the fields:
          </p>
          <ExecutableSnippet title={fromInline.title} initialCode={fromInline.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Records do not have to share a shape. The column set is the union of every
            field name, and a record that lacks a field holds <Code>none</Code> there:
          </p>
          <ExecutableSnippet title={fromInlineRagged.title} initialCode={fromInlineRagged.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Field values are full expressions, so arithmetic, casts, and function calls
            are evaluated before the row is produced:
          </p>
          <ExecutableSnippet title={fromInlineExpressions.title} initialCode={fromInlineExpressions.code} />
          <p className="text-text-muted text-sm mt-3">
            A bare numeric literal has a generic integer type that is distinct from the
            sized types (<Code>int4</Code>, <Code>int8</Code>, ...). When an inline
            value will be compared or joined against a typed column, wrap it in{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary hover:text-primary-light font-medium transition-colors">cast</Link>{' '}
            to give it the matching type.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">An empty source</h2>
          <p className="text-text-secondary mb-4">
            <Code>from []</Code> is a valid pipeline start with zero rows and zero
            columns. Operators after it still run, against nothing:
          </p>
          <ExecutableSnippet title={fromEmpty.title} initialCode={fromEmpty.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Views, variables, and system tables</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
            is read exactly like a table. Its rows are maintained by the engine from the
            pipeline in its definition, so reading it costs a scan, not a recomputation:
          </p>
          <ExecutableSnippet title={fromViewCreate.title} initialCode={fromViewCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The view is populated after the request that created it commits:
          </p>
          <ExecutableSnippet title={fromViewRead.title} initialCode={fromViewRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Inside a script, a query result bound with <Code>let</Code> is a frame
            variable, and <Code>from $name</Code> reads it back as a source. See{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">Variables</Link>:
          </p>
          <ExecutableSnippet title={fromVariable.title} initialCode={fromVariable.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The catalog itself is exposed as tables in the <Code>system</Code>{' '}
            namespace: <Code>system::namespaces</Code>, <Code>system::tables</Code>,{' '}
            <Code>system::columns</Code>, <Code>system::views</Code>, and others. They
            are read with the same <Code>from</Code> and accept the same operators. A
            source may also carry an alias (<Code>from tf_from::orders o</Code>); on its
            own the alias changes nothing, it exists to qualify columns in{' '}
            <Link to="/docs/rql/transforms/join" className="text-primary hover:text-primary-light font-medium transition-colors">join</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Unknown sources</h2>
          <p className="text-text-secondary mb-4">
            Naming an object that does not exist fails at plan time with{' '}
            <Code>CA_004</Code>, before any row is read. A missing namespace fails the
            same way with <Code>CA_002</Code>:
          </p>
          <ExecutableSnippet title={fromMissing.title} initialCode={fromMissing.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>from</Code> is SQL's <Code>FROM</Code> clause, but it comes first
            instead of after the select list, and it is the only clause that names a
            source. There is no <Code>SELECT *</Code>: a bare <Code>from</Code> already
            returns every column. <Code>from [...]</Code> replaces{' '}
            <Code>SELECT ... UNION ALL SELECT ...</Code> or <Code>VALUES (...)</Code>{' '}
            for ad-hoc rows, and <Code>from $var</Code> covers what a CTE would in SQL.
            See{' '}
            <Link to="/docs/rql/for-sql-users" className="text-primary hover:text-primary-light font-medium transition-colors">RQL for SQL users</Link>.
          </p>
        </section>

        <Callout variant="note" title="Scan order is not a contract">
          A table scan returns newest rows first and a ring buffer returns oldest
          first. Neither order is part of the language. Any pipeline whose result order
          matters must end with an explicit{' '}
          <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">sort</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
