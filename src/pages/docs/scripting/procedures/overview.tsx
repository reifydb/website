import { Layout } from '../../layout.tsx';
import { scriptingCreateProcedure, scriptingProcedureParams } from './examples.examples';
import { ExecutableSnippet } from '@/components/ui';

export function ProceduresOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Procedures
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Procedures encapsulate reusable logic. Define them once, call them
            from queries, tests, or other procedures.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Procedure</h2>
          <ExecutableSnippet
            title="Create Procedure"
            initialCode={scriptingCreateProcedure.code}
          />
          <p className="text-text-secondary mt-4">
            A procedure has a name and a body. Call it with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CALL</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <ExecutableSnippet
            title="Procedure Parameters"
            initialCode={scriptingProcedureParams.code}
          />
          <p className="text-text-secondary mt-4">
            Procedures can take typed parameters. Reference them with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">$param</code> in the body.
          </p>
        </section>
      </div>
    </Layout>
  );
}
