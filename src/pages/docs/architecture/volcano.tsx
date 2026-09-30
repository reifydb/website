import { execExplainAggregateExample as execExplainAggregate, execExplainBranchExample as execExplainBranch, execExplainFoldExample as execExplainFold, execExplainInlineExample as execExplainInline, execExplainJoinExample as execExplainJoin, execExplainPipelineExample as execExplainPipeline, execExplainTwoFiltersExample as execExplainTwoFilters, execPipelineExample as execPipeline } from './volcano.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { AsciiDiagram, Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{children}</Link>;
}

export function VolcanoPage() {
  return (
    <Layout
      title="Query Execution"
      description="How an RQL request becomes a plan and runs: parse, logical and physical planning, constant folding, the pull-based operator tree, batching, blocking operators, and reading plans with rql::explain."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Query Execution</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            An RQL query is a pipeline you read top to bottom, and the engine runs it the
            same way: each operator in your text becomes one node in a tree, and rows are
            pulled through that tree a batch at a time. This page follows a request from
            text to result and shows how to inspect the plan the engine chose with{' '}
            <Code>rql::explain</Code>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">From text to plan</h2>
          <p className="text-text-secondary mb-4">
            Every request goes through the same stages before a single row is read:
          </p>
          <AsciiDiagram label="Request pipeline">{`
  RQL text
     |  tokenize + parse
     v
  AST
     |  logical planning: resolve names against the catalog,
     |  check types, inject read policies
     v
  logical plan
     |  physical lowering + expression rewrites (constant folding)
     v
  physical plan
     |  compiled into an instruction stream
     v
  VM  --- Query instruction --->  operator tree (pull-based)
                                    |  next() returns a batch
                                    v
                                  result frame
`}</AsciiDiagram>
          <p className="text-text-secondary mb-4">
            The split between logical and physical planning is deliberate. The logical
            plan knows nothing about storage; it is where names are resolved, types are
            checked, and{' '}
            <DocLink to="/docs/concepts/data-model/policies">read policies</DocLink> are
            spliced into the query as extra <Code>filter</Code> and <Code>map</Code>{' '}
            steps. Physical lowering then turns it into what the engine's virtual
            machine executes. Scripting constructs - <Code>let</Code>, <Code>if</Code>,{' '}
            <Code>for</Code>, procedure calls - compile to VM instructions; a query
            pipeline compiles to a single <Code>Query</Code> instruction that carries its
            physical plan.
          </p>
          <ExecutableSnippet title={execPipeline.title} initialCode={execPipeline.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Reading a plan with rql::explain</h2>
          <p className="text-text-secondary mb-4">
            <Code>call rql::explain('...')</Code> plans the quoted query and returns the
            physical operator tree as rows: <Code>idx</Code> numbers the nodes,{' '}
            <Code>depth</Code> and <Code>parent</Code> give the tree shape,{' '}
            <Code>kind</Code> is the operator, and <Code>detail</Code> is what it was
            configured with. The root is row 0 and the source is the deepest node - so
            the tree reads bottom-up in the order you wrote the query top-down:
          </p>
          <ExecutableSnippet title={execExplainPipeline.title} initialCode={execExplainPipeline.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Nothing here is reordered. Your <Code>filter</Code> runs before your{' '}
            <Code>sort</Code>, which runs before <Code>take</Code>, because that is the
            order you wrote them in. The engine also does not merge adjacent operators:
            two filters stay two nodes, each evaluated in turn:
          </p>
          <ExecutableSnippet title={execExplainTwoFilters.title} initialCode={execExplainTwoFilters.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the planner rewrites</h2>
          <p className="text-text-secondary mb-4">
            The rewrites the planner does perform are expression-level. Sub-expressions
            that involve only constants are folded at plan time, and a predicate that
            folds to <Code>true</Code> is dropped from the filter entirely:
          </p>
          <ExecutableSnippet title={execExplainFold.title} initialCode={execExplainFold.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same folding resolves an <Code>if</Code> whose condition is a constant,
            leaving only the branch that can run:
          </p>
          <ExecutableSnippet title={execExplainBranch.title} initialCode={execExplainBranch.code} />
          <Callout variant="note" title="What you write is what runs">
            There is no cost-based reordering of your pipeline, no predicate pushdown
            through a join, and no automatic index choice. Put the most selective{' '}
            <Code>filter</Code> first yourself, and keep blocking operators (below) as
            late and as narrow as you can. The plan you read in <Code>rql::explain</Code>{' '}
            is the plan that executes.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Pull-based execution</h2>
          <p className="text-text-secondary mb-4">
            Every node in the tree implements the same small interface:{' '}
            <Code>initialize</Code> once, then <Code>next</Code> until it returns nothing.
            The root is asked for its next batch; it asks its child, which asks its child,
            down to the scan. A batch is a set of columns holding up to{' '}
            <Code>QueryRowBatchSize</Code> rows - 128 by default - not a single row, so
            filters and expressions are evaluated column-wise over the whole batch.
          </p>
          <p className="text-text-secondary mb-4">
            Pulling makes laziness free. <Code>take 2</Code> stops asking its child once
            it has handed out two rows, so a scan under it never reads past what was
            needed. Streaming operators - <Code>filter</Code>, <Code>map</Code>,{' '}
            <Code>extend</Code>, <Code>take</Code> - pass each batch through as it arrives.
            Blocking operators must drain their whole input first: <Code>sort</Code>{' '}
            collects every batch before it can emit the first ordered row,{' '}
            <Code>aggregate</Code> must see every group's last row before emitting any
            group, and <Code>distinct</Code> must remember every key it has seen. Their
            position in the plan tells you where the pipeline stops streaming:
          </p>
          <ExecutableSnippet title={execExplainAggregate.title} initialCode={execExplainAggregate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Here the <Code>Sort</Code> above the <Code>Aggregate</Code> is cheap - it only
            sees one row per region - but a <Code>sort</Code> placed directly over a large
            scan holds the entire scan in memory. Each query runs under a memory budget
            (<Code>QueryMemoryLimit</Code>, 1 GiB by default); exceeding it fails the query
            with an error rather than swapping or spilling.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Sources and joins</h2>
          <p className="text-text-secondary mb-4">
            Leaf nodes produce batches from somewhere: a <Code>TableScan</Code> reads a
            table, a view, or another store; <Code>InlineData</Code> serves the records
            you wrote in the query itself. A join is the one operator with two children,
            both at the same depth under it:
          </p>
          <ExecutableSnippet title={execExplainJoin.title} initialCode={execExplainJoin.code} />
          <ExecutableSnippet title={execExplainInline.title} initialCode={execExplainInline.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The join's <Code>detail</Code> shows the flattened column naming you will see
            downstream: the right side's columns are prefixed with its alias
            (<Code>r_tax</Code>), which is why the <Code>map</Code> above the join refers
            to <Code>r_tax</Code> rather than <Code>r.tax</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The result</h2>
          <p className="text-text-secondary mb-4">
            The VM drains the root node and appends every batch into one frame, which is
            what the client receives. A query result is therefore fully materialized
            before it is returned - there is no cursor to page through and no partial
            result on error. If a request contains several statements, each pipeline
            produces its own frame, and the frames come back together once the whole
            request has committed (see{' '}
            <DocLink to="/docs/concepts/transactions">Transactions</DocLink>). For results
            that should keep flowing as data changes, the answer is not a long-running
            query but a{' '}
            <DocLink to="/docs/concepts/data-model/views">view</DocLink> - maintained
            incrementally by the flow engine rather than re-executed - consumed through a{' '}
            <DocLink to="/docs/concepts/data-model/subscriptions">subscription</DocLink>.
          </p>
        </section>

        <Callout variant="info" title="Operators in the plan">
          The <Code>kind</Code> column uses the operator's internal name, which matches the
          RQL keyword in most cases: <Code>Filter</Code>, <Code>Map</Code>,{' '}
          <Code>Extend</Code>, <Code>Sort</Code>, <Code>Take</Code>, <Code>Distinct</Code>,{' '}
          <Code>Aggregate</Code>, <Code>JoinLeft</Code> and its siblings,{' '}
          <Code>Window</Code>, <Code>TableScan</Code>, <Code>InlineData</Code>. Each is
          documented under{' '}
          <DocLink to="/docs/rql">RQL</DocLink>.
        </Callout>
      </div>
    </Layout>
  );
}
