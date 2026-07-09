import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelPoliciesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Policies</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Policies are row-level security declared in the database. Because frontends
            query ReifyDB directly, there is no backend API layer to enforce access
            rules - policies are that layer. Non-root identities are denied by
            default; a policy grants access and shapes what each operation may see and
            do. Root bypasses policies entirely.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Read policies: filter and mask</h2>
          <p className="text-text-secondary mb-4">
            A policy attaches to an object and defines a pipeline per operation. The{' '}
            <Code>from</Code> pipeline runs on reads - a <Code>filter</Code> restricts
            which rows non-root identities can see at all. Run the snippets on this
            page in order:
          </p>
          <ExampleSnippet id="dm-policies-read-filter" />
          <p className="text-text-secondary mt-4 mb-4">
            A <Code>map</Code> in the <Code>from</Code> pipeline reshapes what readers
            get: mask a column by overwriting it, or hide it by omitting it from the
            projection:
          </p>
          <ExampleSnippet id="dm-policies-read-mask" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Write policies: require</h2>
          <p className="text-text-secondary mb-4">
            The <Code>insert</Code>, <Code>update</Code>, and <Code>delete</Code>{' '}
            operations take a <Code>require</Code> pipeline - a predicate every
            affected row must satisfy, or the mutation is rejected:
          </p>
          <ExampleSnippet id="dm-policies-write-require" />
          <p className="text-text-secondary mt-4 mb-4">
            For a non-root identity, a violating write fails with a policy error and
            the transaction does not commit:
          </p>
          <CodeBlock
            language="text"
            code={`> insert dm_pol::documents [{ id: 3, title: "Comp review", public: false }]

Error POLICY_001
  Policy 'no_private_inserts' denied insert on dm_pol::documents

HELP
  The write operation violates a policy constraint`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Policies attach to more than tables</h2>
          <p className="text-text-secondary mb-4">
            The same mechanism covers every primitive an identity can touch. Each
            target has its own statement form and its own set of valid operations:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>create table policy</Code>, <Code>create view policy</Code>,{' '}
                <Code>create series policy</Code>, <Code>create ringbuffer policy</Code>,{' '}
                <Code>create dictionary policy</Code> - data shapes, with{' '}
                <Code>from</Code> / <Code>insert</Code> / <Code>update</Code> /{' '}
                <Code>delete</Code> operations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>create namespace policy ... on ns</Code> - one rule for
                everything inside a namespace
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>create procedure policy</Code> - who may call a routine
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>create session policy</Code> - which session kinds (query,
                command, subscription) an identity may open
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            Policy predicates can reference the caller: tenant isolation is one policy
            comparing a row column to the requesting identity, for example{' '}
            <Code>filter {'{'} org_id == $identity.org_id {'}'}</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Lifecycle and inspection</h2>
          <p className="text-text-secondary mb-4">
            Policies are catalog objects: list them through the system catalog,
            disable and re-enable them without losing their definition, and drop them
            when obsolete.
          </p>
          <ExampleSnippet id="dm-policies-inspect" />
          <ExampleSnippet id="dm-policies-disable" className="mt-4" />
          <ExampleSnippet id="dm-policies-enable" className="mt-4" />
          <ExampleSnippet id="dm-policies-drop" className="mt-4" />
          <p className="text-text-secondary mt-4">
            Disabling a policy does not open access up - with no active policy,
            non-root identities fall back to default deny.
          </p>
        </section>

        <Callout variant="warning" title="These snippets run as root">
          The in-browser playground executes as root, which policies never restrict -
          so you can create, inspect, and drop policies here, but you will not see
          enforcement. Enforcement applies to non-root identities connecting through{' '}
          <Link to="/docs/connect" className="text-primary hover:text-primary-light font-medium transition-colors">client sessions</Link>,
          as in the static example above.
        </Callout>
      </div>
    </Layout>
  );
}
