import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function HandlersPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Handlers
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Handlers define what happens when an event is dispatched. They run automatically
            and can insert, update, or delete data.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Handler</h2>
          <ExecutableSnippet
            title="Handler"
            initialCode={getExampleById('scripting-create-handler')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE HANDLER</code> with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ON</code> to bind to a specific
            event variant. The handler body can access event fields with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">$field</code> syntax.
          </p>
        </section>
      </div>
    </Layout>
  );
}
