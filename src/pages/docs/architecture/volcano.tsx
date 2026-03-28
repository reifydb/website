import { Layout } from '../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function VolcanoPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            How Queries Execute
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL uses a volcano-style execution model. Your query compiles to a pipeline of
            operators that pull data one row at a time.
          </p>
        </div>

        {/* Pipeline Model */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Pipeline Model</h2>
          <p className="text-text-secondary mb-4">
            Every transform in your query becomes an operator in a pipeline. Operators are
            chained together — each one pulls rows from the one below it.
          </p>
          <ExecutableSnippet
            title="Pipeline Model"
            initialCode={getExampleById('volcano-pipeline')!.code}
          />
          <p className="text-text-secondary mt-4">
            This query compiles to: <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ScanOp → FilterOp → ExtendOp → SortOp → TakeOp</code>.
            Five operators, one pipeline.
          </p>
        </section>

        {/* Top to Bottom */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Top to Bottom</h2>
          <p className="text-text-secondary mb-4">
            Your query reads top to bottom. The engine executes it the same way. No nested
            subqueries, no inside-out reading. One line, one step.
          </p>
          <ExecutableSnippet
            title="Top to Bottom"
            initialCode={getExampleById('volcano-scan-filter')!.code}
          />
        </section>

        {/* Lazy Evaluation */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Lazy Evaluation</h2>
          <p className="text-text-secondary">
            Nothing runs until a consumer pulls. If you <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">take 5</code>,
            the pipeline stops after producing 5 rows — even if the source table has millions.
            Only the operators needed to satisfy the result actually execute.
          </p>
        </section>

        {/* Streaming */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Streaming</h2>
          <p className="text-text-secondary">
            Rows flow through the pipeline without materializing full intermediate results.
            A filter doesn't build a temporary table of passing rows — it passes each row
            through immediately. The exceptions are operators that need all their input before
            producing output: <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort</code> and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">aggregate</code>.
            These buffer internally.
          </p>
        </section>

        {/* Execution Phases */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Execution Phases</h2>
          <div className="glass-card p-6">
            <ol className="space-y-3 list-decimal list-inside text-text-secondary">
              <li>
                <span className="font-bold text-text-primary">Parse</span> — RQL text to AST
              </li>
              <li>
                <span className="font-bold text-text-primary">Plan</span> — AST to operator DAG
              </li>
              <li>
                <span className="font-bold text-text-primary">Resolve Types</span> — infer and check types across the pipeline
              </li>
              <li>
                <span className="font-bold text-text-primary">Execute</span> — pull rows through the operator chain
              </li>
            </ol>
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            The full pipeline in action — scan, filter, aggregate, sort.
          </p>
          <ExecutableSnippet
            title="Full Pipeline"
            initialCode={getExampleById('volcano-aggregate')!.code}
          />
        </section>
      </div>
    </Layout>
  );
}
