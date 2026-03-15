import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function NamespacesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Namespaces
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Namespaces group related tables, views, and other objects. Every schema object
            belongs to a namespace.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Namespace</h2>
          <ExecutableSnippet
            title="Create Namespace"
            initialCode={getExampleById('scripting-create-namespace')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE NAMESPACE</code> to
            define a new namespace. Tables and other objects reference their namespace with
            the <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">::</code> separator.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Using Namespaces</h2>
          <ExecutableSnippet
            title="Table in Namespace"
            initialCode={getExampleById('scripting-create-table')!.code}
          />
          <p className="text-text-secondary mt-4">
            All tables, views, procedures, and events are scoped to a namespace.
            This keeps your schema organized as it grows.
          </p>
        </section>
      </div>
    </Layout>
  );
}
