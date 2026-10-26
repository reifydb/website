import { appendAfterAppendCreateExample as appendAfterAppendCreate, appendAfterAppendQueryExample as appendAfterAppendQuery, appendChainedCreateExample as appendChainedCreate, appendChainedQueryExample as appendChainedQuery, appendDuplicatesCreateExample as appendDuplicatesCreate, appendDuplicatesQueryExample as appendDuplicatesQuery, appendMismatchedShapeExample as appendMismatchedShape, appendMismatchedShapeQueryExample as appendMismatchedShapeQuery, appendSameRequestQueryExample as appendSameRequestQuery, appendSameRequestWritesExample as appendSameRequestWrites, appendSubqueryPipelineCreateExample as appendSubqueryPipelineCreate, appendSubqueryPipelineQueryExample as appendSubqueryPipelineQuery, appendTransactionalCreateExample as appendTransactionalCreate, appendTransactionalInsertExample as appendTransactionalInsert, appendTransactionalQueryExample as appendTransactionalQuery, appendVariableExample as appendVariable, appendVariableMismatchExample as appendVariableMismatch, appendVariablePipeExample as appendVariablePipe, appendViewCreateExample as appendViewCreate, appendViewDeleteExample as appendViewDelete, appendViewIncrementalInsertExample as appendViewIncrementalInsert, appendViewQueryAfterDeleteExample as appendViewQueryAfterDelete, appendViewQueryAgainExample as appendViewQueryAgain, appendViewQueryExample as appendViewQuery } from './append.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const adhoc = `from tf_append::web_orders
append { from tf_append::phone_orders }`;

const syntax = `from <source>
append { <pipeline> }
append { <pipeline> }`;

const variableSyntax = `append $target from $source
append $target from $source | filter { ... }
append $target from [ { ... }, { ... } ]`;

const blockForm = `let $rows = from tf_append::web_orders;
append $rows from { from tf_append::phone_orders };
from $rows`;

export function AppendPage() {
  return (
    <Layout
      title="append"
      description="The append operator concatenates the rows of a second pipeline under the current one inside a view, kept current by the flow engine; the append statement extends a frame variable in a script."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">append</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>append</Code> concatenates rows. The rows of the pipeline inside the
            braces are added under the rows already flowing, and everything downstream
            sees one stream. It is the operator for "these are the same kind of thing":
            orders from two channels, events from several producers, a live table and
            its archive. It runs inside a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>,
            where the flow engine keeps the combined result current as either source
            changes.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Only inside a view</h2>
          <Callout variant="warning" title="Do not run append in an ad-hoc query">
            The playground engine executes <Code>append</Code> only as part of a view
            definition. In a plain query it does not return an error; it aborts the
            engine ("Append operator is only supported in deferred views and requires
            the flow engine"). The statement below is shown as static text for that
            reason and must not be pasted into a runnable snippet on this site.
          </Callout>
          <div className="mt-4">
            <RqlCodeBlock code={adhoc} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={syntax} />
          <p className="text-text-secondary mt-4">
            The braces hold a complete pipeline that starts with its own{' '}
            <Link to="/docs/rql/transforms/from" className="text-primary hover:text-primary-light font-medium transition-colors">from</Link>;
            further operators inside the braces are chained with <Code>|</Code>. Any
            number of appends can follow each other. The columns of the result are the
            view's declared columns, not a merge of the sources (more on that below).
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Concatenating two tables</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. The first creates two order tables,
            a{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>{' '}
            that appends one to the other, and a few rows in each:
          </p>
          <ExecutableSnippet title={appendViewCreate.title} initialCode={appendViewCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A deferred view fills in after the write commits, so the read goes in its
            own request (see{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>).
            The view holds every row of both tables:
          </p>
          <ExecutableSnippet title={appendViewQuery.title} initialCode={appendViewQuery.code} />
          <p className="text-text-secondary mt-4 mb-4">
            From here the view is maintained incrementally. An insert into either source
            shows up on the next read:
          </p>
          <ExecutableSnippet title={appendViewIncrementalInsert.title} initialCode={appendViewIncrementalInsert.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendViewQueryAgain.title} initialCode={appendViewQueryAgain.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            A delete is retracted the same way. The view never keeps a row its source has
            lost:
          </p>
          <ExecutableSnippet title={appendViewDelete.title} initialCode={appendViewDelete.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendViewQueryAfterDelete.title} initialCode={appendViewQueryAfterDelete.code} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">More than two sources</h2>
          <p className="text-text-secondary mb-4">
            Appends chain. Each one adds another pipeline under the stream so far:
          </p>
          <ExecutableSnippet title={appendChainedCreate.title} initialCode={appendChainedCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendChainedQuery.title} initialCode={appendChainedQuery.code} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Each side is a pipeline</h2>
          <p className="text-text-secondary mb-4">
            The braces take a full pipeline, with its operators chained by{' '}
            <Code>|</Code>. Writing them on separate lines inside the braces is a parse
            error (<Code>AST_005</Code>) in the playground engine:
          </p>
          <ExecutableSnippet title={appendSubqueryPipelineCreate.title} initialCode={appendSubqueryPipelineCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendSubqueryPipelineQuery.title} initialCode={appendSubqueryPipelineQuery.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Operators written before the append shape the left side only. Operators
            written after it run over the combined rows:
          </p>
          <ExecutableSnippet title={appendAfterAppendCreate.title} initialCode={appendAfterAppendCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendAfterAppendQuery.title} initialCode={appendAfterAppendQuery.code} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Nothing is deduplicated</h2>
          <p className="text-text-secondary mb-4">
            <Code>append</Code> is a plain concatenation. A row present on both sides -
            here a table appended to itself - appears once per side. Put a{' '}
            <Link to="/docs/rql/transforms/distinct" className="text-primary hover:text-primary-light font-medium transition-colors">distinct</Link>{' '}
            after the append if the combined stream must be unique:
          </p>
          <ExecutableSnippet title={appendDuplicatesCreate.title} initialCode={appendDuplicatesCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendDuplicatesQuery.title} initialCode={appendDuplicatesQuery.code} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Transactional views</h2>
          <p className="text-text-secondary mb-4">
            Despite the wording of the engine abort above, <Code>append</Code> is not
            limited to deferred views; a{' '}
            <Link to="/docs/scripting/views/transactional" className="text-primary hover:text-primary-light font-medium transition-colors">transactional view</Link>{' '}
            accepts it too. A transactional view is updated in the same transaction as
            its sources, so it can be read in the request that created it or wrote a
            source, and it backfills: rows already in either source when the view is
            created are part of it, on both sides of the append.
          </p>
          <ExecutableSnippet title={appendTransactionalCreate.title} initialCode={appendTransactionalCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendTransactionalInsert.title} initialCode={appendTransactionalInsert.code} />
          </div>
          <div className="mt-4">
            <ExecutableSnippet title={appendTransactionalQuery.title} initialCode={appendTransactionalQuery.code} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The view's columns decide the shape</h2>
          <p className="text-text-secondary mb-4">
            <Code>append</Code> does not compare the two sides' columns. Rows are placed
            into the view's declared columns by name: a source column the view does not
            declare is dropped, and a declared column the source lacks reads as{' '}
            <Code>none</Code>. Nothing warns about either. Appending a table that has a{' '}
            <Code>label</Code> column instead of <Code>customer</Code>:
          </p>
          <ExecutableSnippet title={appendMismatchedShape.title} initialCode={appendMismatchedShape.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendMismatchedShapeQuery.title} initialCode={appendMismatchedShapeQuery.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            That holds for every request that writes to one source. A request that
            writes to both sources of the same append is handled differently by the
            playground engine: every row it committed is read with the column layout of
            the source before the <Code>append</Code>, whatever table it came from. The
            same two tables, written in one request, put the label where the customer
            belongs:
          </p>
          <ExecutableSnippet title={appendSameRequestWrites.title} initialCode={appendSameRequestWrites.code} />
          <div className="mt-4">
            <ExecutableSnippet title={appendSameRequestQuery.title} initialCode={appendSameRequestQuery.code} />
          </div>
          <div className="mt-4">
            <Callout variant="warning" title="Write the two sources in separate requests">
              When both sources have exactly the same columns, in the same order, the
              mix-up is invisible; that is why the first snippet on this page gets away
              with two inserts in one request. When the names differ, values land under
              the wrong name, as above. When the types or the column count differ, a
              deferred view becomes empty and stays empty, even for later single-source
              writes; a transactional view rejects the write itself with{' '}
              <Code>INTERNAL_ERROR</Code> (column type mismatch) and is fine again on
              the next request. None of this is reported. Until the engine is fixed, give
              each source its own request.
            </Callout>
          </div>
          <p className="text-text-secondary mt-4">
            When the sources are not literally the same shape, end the appended side in
            a{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>{' '}
            that lists the view's columns, so the correspondence is written down where a
            reader can check it instead of being filled in by name. A{' '}
            <Code>map</Code> on the appended side is applied on both paths, so it also
            keeps a same-request write from crossing the layouts.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Appending to a frame variable</h2>
          <p className="text-text-secondary mb-4">
            The same keyword has a second form for scripts. As a statement,{' '}
            <Code>append $target from ...</Code> extends a frame bound with{' '}
            <Code>let</Code> in place. The source is another frame variable, optionally
            followed by piped operators, or an inline list of rows:
          </p>
          <RqlCodeBlock code={variableSyntax} />
          <div className="mt-4">
            <ExecutableSnippet title={appendVariable.title} initialCode={appendVariable.code} />
          </div>
          <div className="mt-4">
            <ExecutableSnippet title={appendVariablePipe.title} initialCode={appendVariablePipe.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Unlike the view operator, this form checks the shape. The incoming rows must
            have the same columns as the target, in the same order, or the statement
            fails with <Code>RUNTIME_011</Code>:
          </p>
          <ExecutableSnippet title={appendVariableMismatch.title} initialCode={appendVariableMismatch.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Inline rows are held to the same rule, and a record literal does not keep
            the order its fields were written in: its columns come out sorted by name,
            so <Code>[{'{'} id: 9, customer: "Zed" {'}'}]</Code> arrives as{' '}
            <Code>customer, id</Code> and cannot be appended to a frame read from a table
            whose columns are <Code>id, customer</Code>. Inline rows append cleanly to a
            frame that was itself built from inline rows.
          </p>
          <p className="text-text-secondary mb-4">
            The source may also be a query in braces. That form needs a newer engine
            than the playground currently runs, so the snippet below is not executable
            here:
          </p>
          <RqlCodeBlock code={blockForm} />
          <p className="text-text-secondary mt-4">
            See{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">Variables</Link>{' '}
            and{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>{' '}
            for what a frame variable can do next.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>append</Code> is <Code>UNION ALL</Code>: concatenation, duplicates kept,
            no attempt to reconcile the sides. Two differences. SQL matches the two{' '}
            <Code>SELECT</Code> lists by position and refuses a count mismatch;{' '}
            <Code>append</Code> matches by name against the view's column list and fills
            what it cannot find with <Code>none</Code>. And where a SQL union is
            recomputed on every read, a view over <Code>append</Code> is maintained
            as its sources change: an insert or delete in either source is reflected
            in the combined result on the next read.
          </p>
        </section>

        <Callout variant="note" title="No with clause">
          <Code>append</Code> keeps no state of its own - there is no key to remember,
          so nothing to expire - and the current engine source rejects a{' '}
          <Code>with</Code> clause on it ("append does not take a with-clause"). The
          playground build still accepts <Code>with {'{'} ttl: ... {'}'}</Code> after an
          append. Do not write one.
        </Callout>
      </div>
    </Layout>
  );
}
