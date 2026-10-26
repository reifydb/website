import { svoCreateExample as svoCreate, svoDeferredExample as svoDeferred, svoDeferredReadExample as svoDeferredRead, svoDropExample as svoDrop, svoDropIfExistsExample as svoDropIfExists, svoDropSourceExample as svoDropSource, svoReadExample as svoRead, svoReadOnlyExample as svoReadOnly, svoSameRequestExample as svoSameRequest, svoSortLastExample as svoSortLast, svoTransactionalExample as svoTransactional, svoTransactionalReadExample as svoTransactionalRead, svoWriteExample as svoWrite } from './overview.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function ViewsOverviewPage() {
  return (
    <Layout
      title="Views"
      description="The create view statement in RQL: schema and pipeline, deferred versus transactional maintenance, backfill, read-only semantics, pipeline rules, and dropping views."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Views</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A view is derived state the engine maintains for you. You declare its
            columns and a pipeline over tables or other views; ReifyDB keeps the result
            materialized as the sources change, and reading it is a plain lookup. This
            page covers the DDL: the statement, the two maintenance modes and what they
            mean for your writes, and how views are dropped. For how views fit the data
            model - gate, backing storage, chains - see{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Views in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The statement</h2>
          <p className="text-text-secondary mb-4">
            Every view statement has the same shape: an optional maintenance keyword,
            the qualified name, the column list, an optional <Code>with</Code> block
            for row settings (deferred views only), and the pipeline in an <Code>as</Code> block:
          </p>
          <CodeBlock
            language="rql"
            code={`create [deferred | transactional] view ns::name { col: type, ... }
[with { row: { ttl: 30d } }]
as { pipeline }`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The column list is the view's schema, and the pipeline must produce columns
            with those names. Without a keyword, <Code>create view</Code> creates a
            transactional view. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={svoCreate.title} initialCode={svoCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Like every DDL statement, the confirmation carries the catalog id the
            engine assigned. Now write to the source table:
          </p>
          <ExecutableSnippet title={svoWrite.title} initialCode={svoWrite.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A view is read with <Code>from</Code> like a table, and every query operator
            works on top of it. The closed order never entered the view:
          </p>
          <ExecutableSnippet title={svoRead.title} initialCode={svoRead.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Deferred or transactional</h2>
          <p className="text-text-secondary mb-4">
            The keyword decides <em>when</em> the view is maintained. A transactional
            view is updated inside the transaction that writes its source: when the
            write commits, the view is already correct, and the write pays for that
            work. A deferred view is updated after commit, driven by the change log:
            writes stay cheap, and the view catches up moments later. The pages on{' '}
            <Link to="/docs/scripting/views/transactional" className="text-primary hover:text-primary-light font-medium transition-colors">transactional views</Link>{' '}
            and{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">deferred views</Link>{' '}
            cover each in depth. Both kinds pick up rows that were written before they
            existed. A deferred view does it by processing the change log:
          </p>
          <ExecutableSnippet title={svoDeferred.title} initialCode={svoDeferred.code} />
          <ExecutableSnippet title={svoDeferredRead.title} initialCode={svoDeferredRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A transactional view scans its source when it is created, so the same
            pipeline over the same rows, created now, holds the same rows:
          </p>
          <ExecutableSnippet title={svoTransactional.title} initialCode={svoTransactional.code} />
          <ExecutableSnippet title={svoTransactionalRead.title} initialCode={svoTransactionalRead.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Views are read-only</h2>
          <p className="text-text-secondary mb-4">
            A view's contents come from its pipeline and nowhere else.{' '}
            <Code>insert</Code>, <Code>update</Code>, and <Code>delete</Code> do not
            accept a view as a target; the engine looks the name up among writable
            tables and reports that it found none:
          </p>
          <ExecutableSnippet title={svoReadOnly.title} initialCode={svoReadOnly.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Pipeline rules</h2>
          <p className="text-text-secondary mb-4">
            The pipeline accepts the transform operators you use in queries:{' '}
            <Code>filter</Code> decides which source rows are members,{' '}
            <Code>map</Code> and <Code>extend</Code> shape the columns,{' '}
            <Code>aggregate</Code> and <Code>join</Code> combine rows. Two rules are
            specific to views. First, a <Code>sort</Code> materializes the rows in that
            order, so it can only be the last operator - nothing may consume its output:
          </p>
          <ExecutableSnippet title={svoSortLast.title} initialCode={svoSortLast.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Second, the declared columns are the contract. Name every column the
            pipeline produces, and declare a column the pipeline can leave empty (the
            right side of a <Code>left join</Code>, for example) as{' '}
            <Code>Option(type)</Code>. The engine does not check the declared types
            against the pipeline at creation time, so a wrong type is not caught until
            rows flow.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Reading a view in the request that writes its source</h2>
          <p className="text-text-secondary mb-4">
            Once a request has written to a deferred view's source, reading that view
            later in the same request is an error (<Code>TXN_015</Code>), and the whole request
            rolls back - the engine refuses to hand you contents it knows are stale.
            A transactional view has no such limit: it sees the request's own writes.
            The rule follows view chains:
          </p>
          <ExecutableSnippet title={svoSameRequest.title} initialCode={svoSameRequest.code} />
          <p className="text-text-secondary mt-4">
            Split the write and the read into separate requests, or read the source
            table directly. The mechanics are explained in{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Dropping views</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop view</Code> removes the view and its materialized rows. The
            confirmation has no catalog id, only what was dropped:
          </p>
          <ExecutableSnippet title={svoDrop.title} initialCode={svoDrop.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop view if exists</Code> succeeds either way and reports{' '}
            <Code>dropped: false</Code> when there was nothing to remove:
          </p>
          <ExecutableSnippet title={svoDropIfExists.title} initialCode={svoDropIfExists.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Dependencies are enforced in both directions. A view that another view reads
            cannot be dropped (<Code>CA_036</Code>), and a table cannot be dropped while
            any view still reads it (<Code>CA_035</Code>). The error names every
            dependent flow:
          </p>
          <ExecutableSnippet title={svoDropSource.title} initialCode={svoDropSource.code} />
          <Callout variant="warning" title="cascade is parsed but not honored">
            The <Code>CA_035</Code> and <Code>CA_036</Code> help text suggests{' '}
            <Code>cascade</Code>. The engine this playground runs accepts the keyword
            and then fails with the same error. Drop dependents yourself, leaf first,
            then the source. <Code>drop namespace</Code> is the one drop that removes
            everything inside it - see{' '}
            <Link to="/docs/scripting/schema/drop" className="text-primary hover:text-primary-light font-medium transition-colors">Drop &amp; Cleanup</Link>.
          </Callout>
        </section>

        <Callout variant="note" title="Timing in the playground">
          Each snippet on this page runs as one request, and the in-browser engine
          processes the change log between requests. That is why a deferred view reads
          as current in the very next snippet. On a server, a deferred view lags its
          source by a moment; a transactional view never does.
        </Callout>
      </div>
    </Layout>
  );
}
