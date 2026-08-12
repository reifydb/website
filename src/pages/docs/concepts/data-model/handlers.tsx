import { dmHandlersAfterDropExample as dmHandlersAfterDrop, dmHandlersDropExample as dmHandlersDrop, dmHandlersEffectsExample as dmHandlersEffects, dmHandlersNestedExample as dmHandlersNested, dmHandlersNestedEffectsExample as dmHandlersNestedEffects, dmHandlersScriptedExample as dmHandlersScripted, dmHandlersScriptedEffectExample as dmHandlersScriptedEffect, dmHandlersSetupExample as dmHandlersSetup, dmHandlersTwoExample as dmHandlersTwo } from './handlers.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelHandlersPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Handlers</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A handler binds a block of statements to one variant of an{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>.
            When that variant is dispatched, every subscribed handler runs
            synchronously, inside the dispatching transaction. Handlers are how one
            domain event fans out into independent reactions without the caller
            knowing about any of them.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Several handlers, one event</h2>
          <p className="text-text-secondary mb-4">
            Start with an event and the state the reactions will touch. Run the
            snippets on this page in order:
          </p>
          <ExecutableSnippet title={dmHandlersSetup.title} initialCode={dmHandlersSetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Each handler is an independent concern - here one records an audit entry
            while another tracks revenue. Payload fields are available in the body
            with an <Code>event_</Code> prefix (<Code>amount</Code> becomes{' '}
            <Code>event_amount</Code>). The dispatch reports how many handlers ran:
          </p>
          <ExecutableSnippet title={dmHandlersTwo.title} initialCode={dmHandlersTwo.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Adding a third reaction later means adding a handler - the dispatching
            code does not change. Both effects are already committed:
          </p>
          <ExecutableSnippet title={dmHandlersEffects.title} initialCode={dmHandlersEffects.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Bodies are scripts</h2>
          <p className="text-text-secondary mb-4">
            A handler body is not limited to a single statement - it is ReifyDB
            Scripting, with variables, control flow, and any number of reads and
            writes, just like a{' '}
            <Link to="/docs/concepts/data-model/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">procedure</Link>{' '}
            body:
          </p>
          <ExecutableSnippet title={dmHandlersScripted.title} initialCode={dmHandlersScripted.code} />
          <ExecutableSnippet title={dmHandlersScriptedEffect.title} initialCode={dmHandlersScriptedEffect.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Chained dispatch</h2>
          <p className="text-text-secondary mb-4">
            A handler can itself <Code>dispatch</Code>, so one domain event can
            trigger the next stage of a process. The whole chain executes in the
            original transaction: either everything commits or nothing does. Note
            that <Code>handlers_fired</Code> counts the handlers of the dispatched
            variant itself - three are now subscribed to <Code>OrderPlaced</Code>:
          </p>
          <ExecutableSnippet title={dmHandlersNested.title} initialCode={dmHandlersNested.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The audit trail shows the full story: this page dispatched{' '}
            <Code>OrderPlaced</Code> twice (two <Code>placed</Code> entries), and the
            chained <Code>OrderShipped</Code> handler wrote <Code>shipped</Code>:
          </p>
          <ExecutableSnippet title={dmHandlersNestedEffects.title} initialCode={dmHandlersNestedEffects.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Lifecycle</h2>
          <p className="text-text-secondary mb-4">
            Handlers are catalog objects: <Code>drop handler</Code> unsubscribes one
            without touching the event or the other handlers, and{' '}
            <Code>system::handlers</Code> lists what is currently bound:
          </p>
          <ExecutableSnippet title={dmHandlersDrop.title} initialCode={dmHandlersDrop.code} />
          <ExecutableSnippet title={dmHandlersAfterDrop.title} initialCode={dmHandlersAfterDrop.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Handler, view, or subscription?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Derived state that must track its sources: a{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
                - declarative and impossible to forget.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Pushing changes out to connected clients: a{' '}
                <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Imperative side effects of a named domain event, atomic with the
                event itself: a <strong>handler</strong>.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Synchronous and transactional">
          Handlers never run in the background. If a handler fails, the dispatching
          transaction fails with it - which is exactly what you want when the
          reaction is part of the operation's correctness.
        </Callout>
      </div>
    </Layout>
  );
}
