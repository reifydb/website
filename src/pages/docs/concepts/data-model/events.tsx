import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelEventsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Events</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            An event is a declared type with variants that carry typed payloads.
            Handlers subscribe to a specific variant, and <Code>dispatch</Code> runs
            every matching handler synchronously, inside the dispatching transaction -
            in-database domain events with transactional guarantees.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Events and handlers</h2>
          <p className="text-text-secondary mb-4">
            Declare the event's variants and payload fields, then bind handlers with{' '}
            <Code>create handler ... on ns::event::Variant</Code>. Inside the handler
            body, payload fields are available with an <Code>event_</Code> prefix -
            the <Code>id</Code> field below is read as <Code>event_id</Code>.{' '}
            <Link to="/docs/concepts/data-model/handlers" className="text-primary hover:text-primary-light font-medium transition-colors">Handlers</Link>{' '}
            covers them in depth: several handlers per variant, scripted bodies,
            chained dispatch, lifecycle. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-events-create" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dispatching</h2>
          <p className="text-text-secondary mb-4">
            <Code>dispatch</Code> names a variant and supplies its payload. The result
            reports how many handlers ran; several handlers can subscribe to the same
            variant and each one runs:
          </p>
          <ExampleSnippet id="dm-events-dispatch" />
          <p className="text-text-secondary mt-4 mb-4">
            Because handlers run in the same transaction, their writes are already
            visible - and if the transaction rolls back, the handler's effects roll
            back with it:
          </p>
          <ExampleSnippet id="dm-events-effect" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Events or views?</h2>
          <p className="text-text-secondary mb-4">
            Both react to change, so choose by what you are modeling. State that is a
            function of other state - counts, sums, projections - belongs in a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>:
            declarative, incrementally maintained, impossible to forget. Events are for
            actions with their own meaning - "an order was placed" - where several
            independent reactions should fire and each reaction is an imperative step.
            If a change stream for external consumers is what you need, see{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscriptions</Link>.
          </p>
        </section>

        <Callout variant="note" title="Synchronous by design">
          Dispatch does not queue. Handlers execute before the dispatching statement
          returns, and chained dispatches from within handlers execute in the same
          transaction as well.
        </Callout>
      </div>
    </Layout>
  );
}
