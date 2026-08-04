import { snsCreateNamespaceExample as snsCreateNamespace, snsCreateTableExample as snsCreateTable, snsEnumExample as snsEnum, snsIfNotExistsExample as snsIfNotExists, snsMissingNamespaceExample as snsMissingNamespace, snsNestedExample as snsNested, snsNestedTableExample as snsNestedTable, snsSystemCatalogExample as snsSystemCatalog, snsUseTableExample as snsUseTable } from './namespaces.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function NamespacesPage() {
  return (
    <Layout
      title="Namespaces"
      description="Creating namespaces with RQL: qualified names with ::, nesting, idempotent creation with if not exists, and how namespaces appear in queries and the system catalog."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Namespaces</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A namespace is the container every other schema object lives in. Tables,
            views, dictionaries, series, ring buffers, and enums are all created inside
            a namespace and addressed as <Code>namespace::object</Code>. Nothing can be
            created before its namespace exists, so <Code>create namespace</Code> is
            usually the first statement of any schema script. This page covers the DDL;
            for the conceptual view, see{' '}
            <Link to="/docs/concepts/data-model/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">Namespaces in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a namespace</h2>
          <p className="text-text-secondary mb-4">
            <Code>create namespace</Code> takes a bare name - no <Code>::</Code>{' '}
            qualifier, because the namespace is the thing that provides qualification.
            The confirmation echoes the name, reports <Code>created: true</Code>, and
            includes the catalog id the engine assigned. Every <Code>create</Code>{' '}
            confirmation carries this id column; the exact number depends on what was
            created before, so treat it as an identifier, not a stable constant:
          </p>
          <ExecutableSnippet title={snsCreateNamespace.title} initialCode={snsCreateNamespace.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Like all DDL, this runs in an{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">admin transaction</Link>{' '}
            - command transactions cannot touch the schema. A namespace created earlier
            in a request is immediately usable later in the same request, and if any
            statement in the request fails, the namespace creation rolls back with
            everything else.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Qualified names with ::</h2>
          <p className="text-text-secondary mb-4">
            Once the namespace exists, every object inside it is created and referenced
            with the <Code>::</Code> separator. There is no notion of a current or
            default working namespace to <Code>use</Code> - references are always
            written out in full, so a statement means the same thing no matter where it
            runs:
          </p>
          <ExecutableSnippet title={snsCreateTable.title} initialCode={snsCreateTable.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Reads and writes use the same qualified name:
          </p>
          <ExecutableSnippet title={snsUseTable.title} initialCode={snsUseTable.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Tables are only one of the object kinds a namespace holds. The same{' '}
            <Code>namespace::name</Code> pattern applies to{' '}
            <Link to="/docs/scripting/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>,{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionaries</Link>,{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>,{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffers</Link>, and{' '}
            <Link to="/docs/scripting/schema/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enums</Link>:
          </p>
          <ExecutableSnippet title={snsEnum.title} initialCode={snsEnum.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because names are scoped to their namespace, two namespaces can each have a{' '}
            <Code>users</Code> table without conflict - which is how you separate
            environments, tenants, or subsystems inside one database.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Nested namespaces</h2>
          <p className="text-text-secondary mb-4">
            Namespaces nest. Creating <Code>sns::internal</Code> registers a child
            namespace under <Code>sns</Code>; the confirmation shows the full path as
            the namespace's name:
          </p>
          <ExecutableSnippet title={snsNested.title} initialCode={snsNested.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Objects inside a nested namespace are addressed with the whole path,
            each level separated by <Code>::</Code>:
          </p>
          <ExecutableSnippet title={snsNestedTable.title} initialCode={snsNestedTable.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Nesting is a naming hierarchy, not an inheritance mechanism - a child
            namespace does not see or share the objects of its parent. Use it to group
            related state without inventing name prefixes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Idempotent creation</h2>
          <p className="text-text-secondary mb-4">
            Creating a namespace that already exists is an error (<Code>CA_001</Code>).
            For setup scripts and migrations that must be safe to re-run, append{' '}
            <Code>if not exists</Code>: the statement succeeds either way, and the
            confirmation tells you what actually happened. Here the namespace already
            exists, so the result reports <Code>created: false</Code> and returns the
            existing catalog id:
          </p>
          <ExecutableSnippet title={snsIfNotExists.title} initialCode={snsIfNotExists.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same guard works on the other object kinds, written before the
            qualified name: <Code>create table if not exists sns::users {'{ ... }'}</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The namespace must exist first</h2>
          <p className="text-text-secondary mb-4">
            Referencing a namespace that has not been created fails with{' '}
            <Code>CA_002</Code>, whether you are creating an object, querying, or
            dropping. ReifyDB never creates a namespace implicitly as a side effect:
          </p>
          <ExecutableSnippet title={snsMissingNamespace.title} initialCode={snsMissingNamespace.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Namespaces in the catalog</h2>
          <p className="text-text-secondary mb-4">
            The catalog is itself queryable: <Code>system::namespaces</Code> lists
            every namespace with its full name, local name, and the id of its parent.
            The nested namespace created above shows up as a child of <Code>sns</Code>:
          </p>
          <ExecutableSnippet title={snsSystemCatalog.title} initialCode={snsSystemCatalog.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Removing a namespace</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop namespace</Code> removes the namespace and everything inside it -
            tables with their data, views, and nested child namespaces alike. Because
            that reach is much wider than a single-object drop, the mechanics and the
            guards are covered on their own page:{' '}
            <Link to="/docs/scripting/schema/drop" className="text-primary hover:text-primary-light font-medium transition-colors">Drop &amp; Cleanup</Link>.
          </p>
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
