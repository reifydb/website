import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DispatchPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Dispatch
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Dispatch events to trigger their handlers. Event data is passed to the handler
            as typed fields.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dispatching Events</h2>
          <ExecutableSnippet
            title="Dispatch Events"
            initialCode={getExampleById('scripting-dispatch-event')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">DISPATCH</code> followed by
            the event variant and its field values. Multiple handlers can react to the same event.
          </p>
        </section>
      </div>
    </Layout>
  );
}
