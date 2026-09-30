import { dmEventsCatalogExample as dmEventsCatalog, dmEventsCreateExample as dmEventsCreate, dmEventsDispatchExample as dmEventsDispatch, dmEventsEffectExample as dmEventsEffect, dmEventsEmptyVariantExample as dmEventsEmptyVariant, dmEventsHandlerExample as dmEventsHandler, dmEventsMissingFieldExample as dmEventsMissingField, dmEventsNoDropExample as dmEventsNoDrop, dmEventsPayloadExprExample as dmEventsPayloadExpr, dmEventsRollbackCheckExample as dmEventsRollbackCheck, dmEventsRollbackDispatchExample as dmEventsRollbackDispatch, dmEventsRollbackSetupExample as dmEventsRollbackSetup, dmEventsUnhandledExample as dmEventsUnhandled, dmEventsWrongTypeExample as dmEventsWrongType } from './events.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelEventsPage() {
  return (
    <Layout
      title="Events"
      description="Declared event types with typed payloads, dispatched inside a transaction: declaration, dispatch, handlers, payload validation, rollback on failure, and the catalog."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Events</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            An event type is a declared set of variants, each with a typed payload, that
            describes something that happens rather than something that is stored.{' '}
            <Code>dispatch</Code> raises one variant with a payload; every handler bound
            to that variant runs inside the same transaction. Events give writes a name
            and a schema, so the reaction to "an order was placed" lives in the database
            next to the data instead of in every client.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Declaring an event type</h2>
          <p className="text-text-secondary mb-4">
            <Code>create event</Code> takes a namespaced name and a brace list of
            variants. Each variant lists its payload fields with types, using the same
            syntax as{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enum</Link>{' '}
            payloads. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={dmEventsCreate.title} initialCode={dmEventsCreate.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Dispatching</h2>
          <p className="text-text-secondary mb-4">
            <Code>dispatch namespace::event::Variant {'{'} fields {'}'}</Code> raises the
            event. The result is a single number, <Code>handlers_fired</Code>. With no
            handler bound, a dispatch is still valid; it validates the payload, fires
            nothing, and reports 0:
          </p>
          <ExecutableSnippet title={dmEventsUnhandled.title} initialCode={dmEventsUnhandled.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Handlers</h2>
          <p className="text-text-secondary mb-4">
            A handler binds a scripted body to one variant. Inside the body the payload
            fields are visible as <Code>event_{'<'}field{'>'}</Code>. This one records
            every placed order in an audit table:
          </p>
          <ExecutableSnippet title={dmEventsHandler.title} initialCode={dmEventsHandler.code} />
          <ExecutableSnippet title={dmEventsDispatch.title} initialCode={dmEventsDispatch.code} />
          <p className="text-text-secondary mt-4 mb-4">
            By the time <Code>dispatch</Code> returns, the handler's write has happened
            in the same transaction:
          </p>
          <ExecutableSnippet title={dmEventsEffect.title} initialCode={dmEventsEffect.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Several handlers can bind to one variant, a handler can dispatch further
            events, and handlers can be dropped and listed. Those details are on the{' '}
            <Link to="/docs/concepts/data-model/handlers" className="text-primary hover:text-primary-light font-medium transition-colors">Handlers</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Payload validation</h2>
          <p className="text-text-secondary mb-4">
            Payload fields are full expressions, evaluated before the handlers run, and
            they can use <Code>let</Code> variables from the same request:
          </p>
          <ExecutableSnippet title={dmEventsPayloadExpr.title} initialCode={dmEventsPayloadExpr.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Every declared field is required:
          </p>
          <ExecutableSnippet title={dmEventsMissingField.title} initialCode={dmEventsMissingField.code} />
          <p className="text-text-secondary mt-4 mb-4">
            And every field must fit its declared type:
          </p>
          <ExecutableSnippet title={dmEventsWrongType.title} initialCode={dmEventsWrongType.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Two things are looser than you might expect. A field the variant does not
            declare is ignored rather than rejected, and variant names are matched
            without regard to case on dispatch. A variant that does not exist at all, a{' '}
            <Code>dispatch</Code> on an enum instead of an event, or a handler bound to an
            unknown variant fail with an internal error rather than a typed one; the
            engine keeps running, but the message will not name the mistake.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Variants without payload</h2>
          <p className="text-text-secondary mb-4">
            A variant with empty braces is a pure signal. It is declared, bound, and
            dispatched with <Code>{'{'} {'}'}</Code>:
          </p>
          <ExecutableSnippet title={dmEventsEmptyVariant.title} initialCode={dmEventsEmptyVariant.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">A failing handler fails the dispatch</h2>
          <p className="text-text-secondary mb-4">
            Handlers run in the dispatching transaction, so a handler error is a request
            error. Bind two handlers to <Code>OrderShipped</Code>, one of which writes to
            a table that does not exist:
          </p>
          <ExecutableSnippet title={dmEventsRollbackSetup.title} initialCode={dmEventsRollbackSetup.code} />
          <ExecutableSnippet title={dmEventsRollbackDispatch.title} initialCode={dmEventsRollbackDispatch.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The healthy handler's insert is rolled back along with everything else in
            the request:
          </p>
          <ExecutableSnippet title={dmEventsRollbackCheck.title} initialCode={dmEventsRollbackCheck.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>handlers_fired</Code> counts only the handlers bound to the dispatched
            variant. Events that those handlers dispatch in turn run, but are not added
            to the number.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Catalog and lifecycle</h2>
          <p className="text-text-secondary mb-4">
            Event types are listed in <Code>system::events</Code> (<Code>id</Code>,{' '}
            <Code>namespace_id</Code>, <Code>name</Code>). Handlers are in{' '}
            <Code>system::handlers</Code>, where <Code>on_sumtype_id</Code> points at the
            event type and <Code>on_variant_tag</Code> is the variant's position in its
            declaration, starting at 0:
          </p>
          <ExecutableSnippet title={dmEventsCatalog.title} initialCode={dmEventsCatalog.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Declaring an event name twice in one namespace is an error. Handlers can be
            removed with <Code>drop handler</Code>, but there is no <Code>drop event</Code>{' '}
            in the grammar; an event type stays once created:
          </p>
          <ExecutableSnippet title={dmEventsNoDrop.title} initialCode={dmEventsNoDrop.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Event, view, or subscription?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Something happened and the database should react inside the same
                transaction: dispatch an event and bind{' '}
                <Link to="/docs/concepts/data-model/handlers" className="text-primary hover:text-primary-light font-medium transition-colors">handlers</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                State that should always equal a computation over other state: a{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>,
                not a handler that copies rows by hand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A client that wants to be told about changes as they commit: a{' '}
                <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Events are not stored">
          A dispatch leaves no row behind by itself. If you need a record of every
          event, have a handler write one to a{' '}
          <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>{' '}
          or table, as the audit handler above does.
        </Callout>
      </div>
    </Layout>
  );
}
