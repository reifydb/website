import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { OperatorPage } from '../../components';

export function ApplyPage() {
  return (
    <Layout>
      <OperatorPage
        name="apply"
        summary="Runs an operator registered by the host application as a pipeline step."
        syntax={`from app::orders
apply kind_counter {}`}
        description={
          <>
            <p>
              apply invokes an operator by name inside a pipeline. The operator is not part
              of RQL itself: it is code that the embedding application or a plugin registered
              with the engine under that name. apply is the extension point that lets those
              operators participate in a pipeline alongside built-ins like{' '}
              <Link to="/docs/rql/transforms/map" className="text-primary-color hover:underline">
                map
              </Link>{' '}
              and{' '}
              <Link to="/docs/rql/transforms/filter" className="text-primary-color hover:underline">
                filter
              </Link>
              . Referencing a name that was never registered is an error.
            </p>
            <p>
              The braces after the operator name are required, even when there are no
              arguments: apply kind_counter without braces is rejected at parse time
              (error APPLY_002). Inside the braces you pass comma-separated{' '}
              <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">name: value</code>{' '}
              options, for example{' '}
              <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">
                apply running_sum {'{ value: 10 }'}
              </code>
              . In a view, the options are evaluated once when the view is registered and
              handed to the operator as its configuration. They are constants, not per-row
              expressions.
            </p>
            <p>
              The main home of apply is view definitions. Inside a{' '}
              <Link to="/docs/scripting/views/deferred" className="text-primary-color hover:underline">
                deferred
              </Link>{' '}
              or{' '}
              <Link to="/docs/scripting/views/transactional" className="text-primary-color hover:underline">
                transactional
              </Link>{' '}
              view, the flow engine hosts the operator: it receives every change flowing
              through the pipeline, can keep persistent state between changes, can emit rows
              with a completely different shape than its input (the operator declares its own
              output columns), and can run work on a timer. That makes apply the way to add
              behavior RQL has no keyword for - running tallies, custom alerting, bespoke
              windowing - while the engine keeps the result incrementally up to date.
            </p>
            <p>
              When a view is registered, the engine resolves the operator name in order:
              operators the application registered programmatically first, then native plugin
              operators, then FFI operators loaded from a configured operator directory.
              Operators are written in Rust against the operator SDK; the embedded builder
              registers them by name, and that name is what apply references.
            </p>
          </>
        }
        notes={
          <>
            <p>
              apply also works in an ad-hoc query, where the operator name resolves against
              transforms the host registered for the query engine; the transform is invoked
              on each batch of rows as it streams through the pipeline. Out of the box no
              transforms are registered, so ad-hoc apply only does something in deployments
              that ship their own.
            </p>
            <p>
              The browser sandbox on this page runs the wasm build, which cannot load
              operator plugins and registers none of its own - so apply cannot execute here.
              This is the same limitation as{' '}
              <Link to="/docs/rql/transforms/window" className="text-primary-color hover:underline">
                window
              </Link>
              , which only runs where the flow engine is available.
            </p>
          </>
        }
        related={[
          { label: 'window', href: '/docs/rql/transforms/window' },
          { label: 'Deferred views', href: '/docs/scripting/views/deferred' },
          { label: 'Views', href: '/docs/concepts/data-model/views' },
        ]}
      />
    </Layout>
  );
}
