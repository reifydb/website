import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelProceduresPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Procedures</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A procedure is named, callable logic stored in the catalog next to the data
            it operates on. In an architecture where frontends query the database
            directly, procedures are where multi-step business operations live -
            invoked with <Code>call</Code>, executed transactionally, governed by
            policies like any other object.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating and calling</h2>
          <p className="text-text-secondary mb-4">
            The body is a block of statements; calling the procedure returns the
            result of its last statement. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-procedures-create" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary mb-4">
            Parameters are declared as a typed record and referenced in the body with a{' '}
            <Code>$</Code> prefix. Calls pass arguments positionally:
          </p>
          <ExampleSnippet id="dm-procedures-params" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The body is a full script</h2>
          <p className="text-text-secondary mb-4">
            Procedure bodies are ReifyDB Scripting, not just single queries: variables
            with <Code>let</Code>, conditionals, loops, and any number of reads and
            writes. See{' '}
            <Link to="/docs/scripting/procedures/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Parameters &amp; Control Flow</Link>{' '}
            for the scripting constructs in depth.
          </p>
          <ExampleSnippet id="dm-procedures-logic" />
          <p className="text-text-secondary mt-4 mb-4">
            Procedures compose - a procedure can <Code>call</Code> another:
          </p>
          <ExampleSnippet id="dm-procedures-compose" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Test procedures</h2>
          <p className="text-text-secondary mb-4">
            ReifyDB's testing framework runs inside the database.{' '}
            <Code>create test procedure</Code> declares a helper callable only from
            test context - fixtures like seeding rows - and{' '}
            <Code>create test</Code> plus <Code>run tests</Code> execute assertions
            against real data:
          </p>
          <ExampleSnippet id="dm-procedures-test" />
          <p className="text-text-secondary mt-4 mb-4">
            Each test runs in a transaction that is rolled back, so tests never leak
            state into your data - the seeded row does not survive the run:
          </p>
          <ExampleSnippet id="dm-procedures-test-isolation" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Beyond RQL bodies</h2>
          <p className="text-text-secondary mb-4">
            RQL is one of several procedure kinds the catalog manages. Procedures can
            also be backed by built-in native implementations, by functions loaded from
            FFI libraries, or by WASM modules - all invoked through the same{' '}
            <Code>call</Code> statement with the same typed parameters. Event-driven
            logic, by contrast, is not a procedure kind: declare an{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>{' '}
            and attach handlers, which run automatically on dispatch instead of being
            called.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Access control</h2>
          <p className="text-text-secondary mb-4">
            Who may invoke a procedure is governed by a{' '}
            <Link to="/docs/concepts/data-model/policies" className="text-primary hover:text-primary-light font-medium transition-colors">policy</Link>{' '}
            with the <Code>call</Code> operation:{' '}
            <Code>create procedure policy on ns::proc {'{'} call: {'{'} filter {'{'} ... {'}'} {'}'} {'}'}</Code>.
            Like all policies, procedure policies apply to non-root identities.
          </p>
        </section>

        <Callout variant="note" title="Procedure or view?">
          If the logic computes state from other state, you usually want a{' '}
          <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
          - it stays correct by itself. Reach for a procedure when the operation is an
          action: multiple writes that belong together, validation with branching, or
          an API-like entry point you want to expose to clients.
        </Callout>
      </div>
    </Layout>
  );
}
