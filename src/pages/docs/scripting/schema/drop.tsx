import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DropPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Drop &amp; Cleanup
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Remove tables, views, namespaces, and other schema objects when they are no longer needed.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Drop a Table</h2>
          <ExecutableSnippet
            title="Drop Table"
            initialCode={getExampleById('scripting-drop-table')!.code}
          />
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">DROP TABLE</code> removes
            a table and all its data. This is permanent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Conditional Drop</h2>
          <ExecutableSnippet
            title="Drop If Exists"
            initialCode={getExampleById('scripting-drop-if-exists')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">IF EXISTS</code> to
            avoid errors when dropping something that may not exist. Works with tables,
            views, namespaces, ringbuffers, and other objects.
          </p>
        </section>
      </div>
    </Layout>
  );
}
