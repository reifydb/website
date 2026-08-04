import { sdDropDictionaryExample as sdDropDictionary, sdDropEnumExample as sdDropEnum, sdDropIfExistsExample as sdDropIfExists, sdDropMissingErrorExample as sdDropMissingError, sdDropNamespaceExample as sdDropNamespace, sdDropNamespaceIfExistsExample as sdDropNamespaceIfExists, sdDropRingbufferExample as sdDropRingbuffer, sdDropSeriesExample as sdDropSeries, sdDropTableExample as sdDropTable, sdDropViewExample as sdDropView, sdIfExistsNamespaceCaveatExample as sdIfExistsNamespaceCaveat, sdNamespaceGoneExample as sdNamespaceGone, sdQueryDroppedExample as sdQueryDropped, sdRecreateExample as sdRecreate, sdSetupExample as sdSetup } from './drop.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DropPage() {
  return (
    <Layout
      title="Drop & Cleanup"
      description="Removing tables, views, dictionaries, series, ring buffers, enums, and whole namespaces with drop: confirmations, if exists guards, and what happens to the data."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Drop &amp; Cleanup
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>drop</Code> removes a schema object from the catalog together with
            everything it stores. It is the inverse of <Code>create</Code>, it works on
            every object kind, and it is permanent - there is no undo, no recycle bin,
            and recreating an object with the same name does not bring its data back.
            Like all DDL, a drop only runs inside an{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">admin transaction</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dropping a table</h2>
          <p className="text-text-secondary mb-4">
            Start with something to remove - a namespace, a table, and a couple of
            rows (the snippets on this page run in order):
          </p>
          <ExecutableSnippet title={sdSetup.title} initialCode={sdSetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop table</Code> takes the qualified name and removes the table and
            all of its rows in one step. The confirmation names what was dropped and
            reports <Code>dropped: true</Code>. Unlike <Code>create</Code>{' '}
            confirmations, there is no catalog id column - the id refers to an object
            that no longer exists:
          </p>
          <ExecutableSnippet title={sdDropTable.title} initialCode={sdDropTable.code} />
          <p className="text-text-secondary mt-4 mb-4">
            From that moment the name is unknown to the catalog. Referencing it fails
            exactly like a table that never existed:
          </p>
          <ExecutableSnippet title={sdQueryDropped.title} initialCode={sdQueryDropped.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dropped data is gone</h2>
          <p className="text-text-secondary mb-4">
            A drop deletes the object's contents, not just its catalog entry.
            Recreating the table under the same name produces a brand-new, empty object
            with a new catalog id - the two rows inserted above are not recoverable:
          </p>
          <ExecutableSnippet title={sdRecreate.title} initialCode={sdRecreate.code} />
          <Callout variant="warning" title="Permanent, but transactional">
            Within a request, a drop is as atomic as any other statement: if a later
            statement in the same request fails, the whole request rolls back and the
            dropped object comes back untouched, data included. Once the request
            commits, the removal is final. See{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>{' '}
            for how multi-statement requests commit as one unit.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Every object kind has a drop</h2>
          <p className="text-text-secondary mb-4">
            Each <Code>create</Code> has a matching <Code>drop</Code> that takes the
            same qualified name. The confirmation always has the same shape - the
            namespace, a column named after the object kind, and <Code>dropped</Code>:
          </p>
          <ExecutableSnippet title={sdDropView.title} initialCode={sdDropView.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same pattern covers{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionaries</Link>,{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>,{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffers</Link>, and{' '}
            <Link to="/docs/scripting/schema/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enums</Link>:
          </p>
          <ExecutableSnippet title={sdDropDictionary.title} initialCode={sdDropDictionary.code} />
          <div className="mt-4">
            <ExecutableSnippet title={sdDropSeries.title} initialCode={sdDropSeries.code} />
          </div>
          <div className="mt-4">
            <ExecutableSnippet title={sdDropRingbuffer.title} initialCode={sdDropRingbuffer.code} />
          </div>
          <div className="mt-4">
            <ExecutableSnippet title={sdDropEnum.title} initialCode={sdDropEnum.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Each drop is kind-specific: <Code>drop table</Code> only removes tables,
            so pointing it at a view fails with <Code>CA_004</Code> rather than
            silently removing an object of a different kind. Procedures follow the
            same pattern with <Code>drop procedure</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">if exists</h2>
          <p className="text-text-secondary mb-4">
            Cleanup scripts should not fail just because there was nothing to clean
            up. <Code>if exists</Code> turns a missing object from an error into a
            reported no-op - the confirmation still names the object, with{' '}
            <Code>dropped: false</Code>:
          </p>
          <ExecutableSnippet title={sdDropIfExists.title} initialCode={sdDropIfExists.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Without the guard, dropping something that does not exist is an error
            (<Code>CA_004</Code>), and in a multi-statement request that error rolls
            back everything else in the request:
          </p>
          <ExecutableSnippet title={sdDropMissingError.title} initialCode={sdDropMissingError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            One caveat: the guard covers the object, not the namespace in front of it.
            If the namespace itself does not exist, the reference fails with{' '}
            <Code>CA_002</Code> even with <Code>if exists</Code>. Scripts that cannot
            assume the namespace exists should guard it separately with{' '}
            <Code>drop namespace if exists</Code>:
          </p>
          <ExecutableSnippet title={sdIfExistsNamespaceCaveat.title} initialCode={sdIfExistsNamespaceCaveat.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dropping a namespace</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop namespace</Code> removes the namespace and its entire contents
            recursively: every table with its data, every view, every other object,
            and every nested child namespace. There is no emptiness check and no extra
            keyword to opt into the recursion - one statement takes the whole subtree:
          </p>
          <ExecutableSnippet title={sdDropNamespace.title} initialCode={sdDropNamespace.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The table that lived inside is gone with its container:
          </p>
          <ExecutableSnippet title={sdNamespaceGone.title} initialCode={sdNamespaceGone.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>if exists</Code> guard works here like everywhere else:
          </p>
          <ExecutableSnippet title={sdDropNamespaceIfExists.title} initialCode={sdDropNamespaceIfExists.code} />
          <Callout variant="warning" title="One statement, an entire subtree">
            Because a namespace drop cascades through everything beneath it, it is the
            single most destructive statement in RQL. Combined with the fact that only
            admin transactions can execute DDL, day-to-day application traffic can
            never do this - but an admin script can, so double-check the name before
            running one. See{' '}
            <Link to="/docs/scripting/schema/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">Namespaces</Link>{' '}
            for how namespaces and their contents are organized.
          </Callout>
        </section>
      </div>
    </Layout>
  );
}
