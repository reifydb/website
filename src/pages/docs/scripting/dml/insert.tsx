import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DmlInsertPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Insert
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Add rows to a table with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">INSERT</code>.
            You can insert one or many rows at once.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Insert Rows</h2>
          <ExecutableSnippet
            title="Insert Rows"
            initialCode={getExampleById('scripting-insert-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Pass an array of objects. Each object must match the table's schema.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Inserts</h2>
          <ExecutableSnippet
            title="Multiple Inserts"
            initialCode={getExampleById('scripting-insert-multiple')!.code}
          />
          <p className="text-text-secondary mt-4">
            You can call INSERT multiple times. Each insert is part of the same transaction.
          </p>
        </section>
      </div>
    </Layout>
  );
}
