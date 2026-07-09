import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelNamespacesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Namespaces</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Namespaces organize every other object in ReifyDB. Tables, views, ring
            buffers, series, dictionaries, and types all live inside a namespace and are
            addressed as <Code>namespace::object</Code>. A namespace must exist before
            you can create objects in it.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a namespace</h2>
          <p className="text-text-secondary mb-4">
            <Code>create namespace</Code> registers the container; from then on, every
            reference to an object inside it uses the <Code>::</Code> separator. Run the
            snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-namespaces-create" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Names are scoped, not global</h2>
          <p className="text-text-secondary mb-4">
            Two namespaces can hold objects with the same name without conflict. This is
            the natural way to separate environments, tenants, or subsystems inside one
            database: <Code>prod::orders</Code> and <Code>staging::orders</Code> are
            entirely distinct tables.
          </p>
          <ExampleSnippet id="dm-namespaces-same-name" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Idempotent creation</h2>
          <p className="text-text-secondary mb-4">
            <Code>if not exists</Code> makes creation safe to re-run, which matters for
            setup scripts and migrations. The result reports <Code>created: false</Code>{' '}
            when the namespace was already there:
          </p>
          <ExampleSnippet id="dm-namespaces-if-not-exists" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Nested namespaces</h2>
          <p className="text-text-secondary mb-4">
            Namespaces nest. Creating <Code>dm_ns::internal</Code> places a child
            namespace under <Code>dm_ns</Code>, and objects inside it are addressed with
            the full path, for example <Code>dm_ns::internal::audit</Code>. Use nesting
            to group related state without inventing name prefixes:
          </p>
          <ExampleSnippet id="dm-namespaces-nested" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inspecting namespaces</h2>
          <p className="text-text-secondary mb-4">
            The system catalog is itself queryable. <Code>system::namespaces</Code>{' '}
            lists every namespace with its full name, its local name, and the id of its
            parent - nested namespaces show up as children of the namespace that
            contains them:
          </p>
          <ExampleSnippet id="dm-namespaces-system" />
          <p className="text-text-secondary mt-4">
            The <Code>system</Code> namespace also exposes <Code>system::tables</Code>,{' '}
            <Code>system::views</Code>, <Code>system::policies</Code>, and storage
            metrics. Reads on <Code>system::*</Code> are policy-gated for non-root
            identities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where to go next</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
                - the primary shape for authoritative state
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/data-model/policies" className="text-primary hover:text-primary-light font-medium transition-colors">Policies</Link>{' '}
                - control what each identity may read and write, per namespace or per object
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/data-model" className="text-primary hover:text-primary-light font-medium transition-colors">Data Model overview</Link>{' '}
                - all primitives at a glance
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Reserved namespaces">
          ReifyDB reserves a few namespaces for itself, most visibly{' '}
          <code>system</code> (the queryable catalog) and <code>default</code>. Your
          application namespaces live alongside them.
        </Callout>
      </div>
    </Layout>
  );
}
