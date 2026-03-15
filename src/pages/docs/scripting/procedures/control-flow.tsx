import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function ControlFlowPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Parameters &amp; Control Flow
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Procedures support variables, conditionals, and loops for complex logic.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">If/Else</h2>
          <ExecutableSnippet
            title="Control Flow"
            initialCode={getExampleById('scripting-procedure-let-if')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">LET</code> to declare variables and{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">IF</code>/<code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ELSE</code> for
            conditional logic.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">While Loops</h2>
          <ExecutableSnippet
            title="While Loop"
            initialCode={getExampleById('scripting-procedure-while')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">LET MUT</code> for mutable
            variables and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">WHILE</code> for
            loops. You can also use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FOR</code> and{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">LOOP</code> with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">BREAK</code>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
