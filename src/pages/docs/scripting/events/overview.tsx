import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function EventsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Events
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Events enable reactive state transitions. Define event types, attach handlers,
            and dispatch events to trigger side effects.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create an Event</h2>
          <ExecutableSnippet
            title="Create Event"
            initialCode={getExampleById('scripting-create-event')!.code}
          />
          <p className="text-text-secondary mt-4">
            Events are enum-like types. Each variant represents a different event that can be dispatched.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Full Example</h2>
          <ExecutableSnippet
            title="Event + Handler + Dispatch"
            initialCode={getExampleById('scripting-create-handler')!.code}
          />
          <p className="text-text-secondary mt-4">
            Create an event type, attach a handler, dispatch the event, and query the results.
            The handler runs automatically when the event is dispatched.
          </p>
        </section>
      </div>
    </Layout>
  );
}
