import { migApplyExample as migApply, migApplyNoRollbackExample as migApplyNoRollback, migApplyRestExample as migApplyRest, migAppliedExample as migApplied, migFailingApplyExample as migFailingApply, migFailingRegisterExample as migFailingRegister, migFailingStatusExample as migFailingStatus, migIdempotentExample as migIdempotent, migImmutableExample as migImmutable, migNoRollbackBodyExample as migNoRollbackBody, migNoopExample as migNoop, migPendingExample as migPending, migReapplyExample as migReapply, migRegisterExample as migRegister, migRegisterMoreExample as migRegisterMore, migRollbackExample as migRollback, migRollbackFailedStatusExample as migRollbackFailedStatus, migRollbackStatusExample as migRollbackStatus, migTargetStatusExample as migTargetStatus, migToTargetExample as migToTarget } from './overview.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function MigrationsOverviewPage() {
  return (
    <Layout
      title="Migrations"
      description="Versioned, immutable schema changes in RQL: create migration, migrate, migrate to, rollback migration, the system::migrations ledger, and loading migration files at startup."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Migrations</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A migration is a named block of RQL that the database records before it
            runs. Registering it is one step, applying it is another, and the engine
            keeps a ledger of which migrations have been applied so the same script can
            be run against any environment and converge on the same schema. Bodies are
            hashed and immutable, and a migration that declares a rollback block can be
            reverted.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Register, then apply</h2>
          <p className="text-text-secondary mb-4">
            <Code>create migration 'name' {'{'} ... {'}'}</Code> registers a body under
            a quoted name. The body can hold any admin statements - DDL, inserts,
            policies - separated by semicolons. Nothing in it runs yet. Run the
            snippets on this page in order:
          </p>
          <ExecutableSnippet title={migRegister.title} initialCode={migRegister.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The ledger is the <Code>system::migrations</Code> table. A freshly
            registered migration is <Code>Pending</Code>:
          </p>
          <ExecutableSnippet title={migPending.title} initialCode={migPending.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>migrate</Code> applies every pending migration, in name order, and
            reports how many it ran:
          </p>
          <ExecutableSnippet title={migApply.title} initialCode={migApply.code} />
          <ExecutableSnippet title={migApplied.title} initialCode={migApplied.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Applied migrations are skipped on every later run, which is what makes{' '}
            <Code>migrate</Code> safe to call unconditionally at startup or deploy:
          </p>
          <ExecutableSnippet title={migNoop.title} initialCode={migNoop.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Names are the order</h2>
          <p className="text-text-secondary mb-4">
            Pending migrations run sorted by name, as plain text - <Code>10_x</Code>{' '}
            sorts before <Code>2_x</Code>. Zero-padded numeric prefixes keep the order
            you intend. A migration may depend on objects an earlier one created:
          </p>
          <ExecutableSnippet title={migRegisterMore.title} initialCode={migRegisterMore.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>migrate to 'name'</Code> applies pending migrations up to and
            including the named one and leaves the rest pending:
          </p>
          <ExecutableSnippet title={migToTarget.title} initialCode={migToTarget.code} />
          <ExecutableSnippet title={migTargetStatus.title} initialCode={migTargetStatus.code} />
          <p className="text-text-muted text-sm mt-3">
            <Code>system::migrations</Code> lists newest registration first. It also
            exposes <Code>body</Code> and <Code>rollback_body</Code> as text.
          </p>
          <ExecutableSnippet title={migApplyRest.title} initialCode={migApplyRest.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rolling back</h2>
          <p className="text-text-secondary mb-4">
            A migration reverts only if it declared how:{' '}
            <Code>create migration 'name' {'{'} ... {'}'} rollback {'{'} ... {'}'}</Code>.
            The rollback body is ordinary RQL that undoes the forward body - usually
            the matching <Code>drop</Code> statements in reverse order. The engine
            does not derive it for you. <Code>rollback migration</Code> reverts the
            most recently applied migration:
          </p>
          <ExecutableSnippet title={migRollback.title} initialCode={migRollback.code} />
          <ExecutableSnippet title={migRollbackStatus.title} initialCode={migRollbackStatus.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A rolled-back migration counts as pending again, so the next{' '}
            <Code>migrate</Code> re-applies it. <Code>rollback migration to 'name'</Code>{' '}
            reverts every applied migration after the named one, newest first, and
            stops there:
          </p>
          <ExecutableSnippet title={migReapply.title} initialCode={migReapply.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Without a rollback body (or with an empty one), the migration is
            forward-only. Asking to revert it fails with <Code>CA_048</Code> and
            changes nothing:
          </p>
          <ExecutableSnippet title={migApplyNoRollback.title} initialCode={migApplyNoRollback.code} />
          <ExecutableSnippet title={migNoRollbackBody.title} initialCode={migNoRollbackBody.code} />
          <ExecutableSnippet title={migRollbackFailedStatus.title} initialCode={migRollbackFailedStatus.code} />
          <Callout variant="note" title="rollback here is not transaction control">
            ReifyDB has no <Code>BEGIN</Code> / <Code>COMMIT</Code> / <Code>ROLLBACK</Code>;
            every request is already one atomic{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">transaction</Link>.
            The <Code>rollback</Code> keyword on a migration only names the compensating
            statements for reverting it later.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Bodies are immutable</h2>
          <p className="text-text-secondary mb-4">
            At registration the engine hashes the body together with the rollback body
            and stores the hash. Registering the same name with the same content again
            is a no-op - whether the migration is still pending or already applied - so
            a startup script can re-register its whole list every time:
          </p>
          <ExecutableSnippet title={migIdempotent.title} initialCode={migIdempotent.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Registering different content under an existing name is refused with{' '}
            <Code>CA_049</Code>. Editing an applied migration would let two
            environments that ran the same name end up with different schemas. Change
            the rollback body alone and the hash changes too. To change what a
            migration does, add a new one:
          </p>
          <ExecutableSnippet title={migImmutable.title} initialCode={migImmutable.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Failure leaves the ledger honest</h2>
          <p className="text-text-secondary mb-4">
            Each migration's body runs inside the <Code>migrate</Code> request. If a
            body fails, the request fails, everything it did rolls back, and the
            migration stays <Code>Pending</Code> - it is never marked applied by
            accident, and migrations after it are not attempted:
          </p>
          <ExecutableSnippet title={migFailingRegister.title} initialCode={migFailingRegister.code} />
          <ExecutableSnippet title={migFailingApply.title} initialCode={migFailingApply.code} />
          <ExecutableSnippet title={migFailingStatus.title} initialCode={migFailingStatus.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same holds in reverse: if a rollback body fails (say the namespace it
            drops was already removed by hand), the migration stays <Code>Applied</Code>.
            Fix the underlying state, then retry.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Migrations as files</h2>
          <p className="text-text-secondary mb-4">
            Embedded ReifyDB can load migrations at build time with{' '}
            <Code>with_migrations(...)</Code>. Pass a list of{' '}
            <Code>Migration::new(name, statements)</Code> values, a directory path, or
            both. Every source is registered and then applied before the database
            starts serving:
          </p>
          <CodeBlock language="rust" code={`let db = embedded::memory()
    .with_migrations(vec![
        Migration::new("001_namespace", vec!["create namespace shop"]),
        Migration::new("002_products", vec![
            "create table shop::products { id: int4, name: utf8 }",
        ]),
    ])
    .build()?;`} />
          <p className="text-text-secondary mt-4 mb-4">
            A directory source reads each <Code>.rql</Code> file (lowercase extension
            only; other files and subdirectories are ignored) as one complete{' '}
            <Code>create migration</Code> statement, in alphabetical filename order:
          </p>
          <RqlCodeBlock code={`create migration '002_create_table' {
    create table app_rb::items { id: int4 }
} rollback {
    drop table app_rb::items
};`} />
          <p className="text-text-secondary mt-4 mb-4">
            The same hash rule applies at startup: if a file's content no longer
            matches what the database registered under that name, the build fails with{' '}
            <Code>CA_049</Code> rather than starting on a diverged schema. A missing
            directory or a path that is a file fails the build too.
          </p>
        </section>

        <Callout variant="info" title="What goes in a migration">
          Anything an admin request can run: namespaces, tables, enums, dictionaries,
          ring buffers, series, views, policies, tests - and inserts for
          reference data. Because a migration body is a script, it can also use{' '}
          <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">control flow</Link>{' '}
          to backfill or transform existing rows.
        </Callout>
      </div>
    </Layout>
  );
}
