import { sstAddColumnExample as sstAddColumn, sstAllTypesExample as sstAllTypes, sstAutoIncrementExample as sstAutoIncrement, sstAutoIncrementExplicitExample as sstAutoIncrementExplicit, sstCreateExample as sstCreate, sstDropColumnExample as sstDropColumn, sstDropExample as sstDrop, sstDropMissingColumnExample as sstDropMissingColumn, sstDuplicateExample as sstDuplicate, sstIfNotExistsExample as sstIfNotExists, sstOptionExample as sstOption, sstPrimaryKeyDuplicateExample as sstPrimaryKeyDuplicate, sstPrimaryKeyExample as sstPrimaryKey, sstRenameColumnExample as sstRenameColumn, sstRequiredExample as sstRequired, sstRowSettingsExample as sstRowSettings } from './tables.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TablesPage() {
  return (
    <Layout
      title="Tables"
      description="The create table statement in RQL: column types, optional columns, auto-increment, primary keys, row settings, idempotent creation, altering columns, and dropping tables."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Tables</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>create table</Code> declares a table: its qualified name, its columns,
            and any per-row settings. This page is the reference for that statement
            and for the <Code>alter</Code> and <Code>drop</Code> statements that change
            a table afterwards. For what a table <em>is</em> - versioned rows, how
            reads and writes interact, where rows are stored - see{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The statement</h2>
          <p className="text-text-secondary mb-4">
            A table lives in a namespace, so the name is always{' '}
            <Code>namespace::table</Code> and the namespace must exist first. The
            column block lists <Code>name: type</Code> pairs; the optional{' '}
            <Code>with</Code> block after it holds row settings:
          </p>
          <CodeBlock
            language="rql"
            code={`create table [if not exists] ns::name {
  col: type,
  col: Option(type),
  col: type with { auto_increment }
} [with { row: { ttl: { duration: '30d' } } }]`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Run the snippets on this page in order. The confirmation carries the
            catalog id the engine assigned and <Code>created: true</Code>:
          </p>
          <ExecutableSnippet title={sstCreate.title} initialCode={sstCreate.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Column types</h2>
          <p className="text-text-secondary mb-4">
            Every scalar type can be a column: signed and unsigned integers from 1 to
            16 bytes, both floats, booleans, strings (<Code>utf8</Code>, or{' '}
            <Code>text</Code>), binary <Code>blob</Code>, the four temporal types, the
            two uuid versions, and <Code>identity_id</Code>:
          </p>
          <ExecutableSnippet title={sstAllTypes.title} initialCode={sstAllTypes.code} />
          <p className="text-text-secondary mt-4">
            Ranges, literal syntax, and how values convert between types are on the{' '}
            <Link to="/docs/concepts/data-types" className="text-primary hover:text-primary-light font-medium transition-colors">Data Types</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Optional columns</h2>
          <p className="text-text-secondary mb-4">
            A column is required unless its type is wrapped in <Code>Option(...)</Code>.
            An insert may leave an optional column out, and the row then holds{' '}
            <Code>none</Code> there. A bare scan returns the newest row first; add a{' '}
            <Code>sort</Code> when the order matters:
          </p>
          <ExecutableSnippet title={sstOption.title} initialCode={sstOption.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Leaving out a required column is a constraint violation. The statement
            fails, and because a request is one transaction, everything before it in
            the same request is rolled back too:
          </p>
          <ExecutableSnippet title={sstRequired.title} initialCode={sstRequired.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Auto-increment</h2>
          <p className="text-text-secondary mb-4">
            <Code>with {'{'} auto_increment {'}'}</Code> on an integer column makes the
            engine fill it from a per-column{' '}
            <Link to="/docs/concepts/data-model/sequences" className="text-primary hover:text-primary-light font-medium transition-colors">sequence</Link>{' '}
            whenever an insert leaves it out:
          </p>
          <ExecutableSnippet title={sstAutoIncrement.title} initialCode={sstAutoIncrement.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An insert may still supply the value. The sequence does not skip past an
            explicit value: the next generated id here is 3, not 11, so mixing the two
            can produce a duplicate once the sequence catches up with a pinned value.
          </p>
          <ExecutableSnippet title={sstAutoIncrementExplicit.title} initialCode={sstAutoIncrementExplicit.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Primary keys</h2>
          <p className="text-text-secondary mb-4">
            A primary key is declared with its own statement after the table exists,
            over one or more columns. From then on every insert checks the key:
          </p>
          <ExecutableSnippet title={sstPrimaryKey.title} initialCode={sstPrimaryKey.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An insert that repeats a key fails with <Code>INDEX_001</Code>, and every
            row in that insert is rolled back, not only the colliding one:
          </p>
          <ExecutableSnippet title={sstPrimaryKeyDuplicate.title} initialCode={sstPrimaryKeyDuplicate.code} />
          <Callout variant="warning" title="What the key does not do in this build">
            Only fixed-size columns can be keyed: a key over <Code>utf8</Code> or{' '}
            <Code>blob</Code> is accepted, but every later write to the table fails with{' '}
            <Code>CA_009</Code>. Rows that already exist are not checked when the key is
            declared, and an <Code>update</Code> that makes two rows share a key is not
            rejected. Declare the key before the first insert, and keep it on integers,
            uuids, dates, or booleans. See{' '}
            <Link to="/docs/scripting/schema/indexes" className="text-primary hover:text-primary-light font-medium transition-colors">Indexes</Link>.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Row settings</h2>
          <p className="text-text-secondary mb-4">
            The <Code>with</Code> block after the columns configures the rows
            themselves. A TTL makes every row expire a fixed time after it was written:
          </p>
          <ExecutableSnippet title={sstRowSettings.title} initialCode={sstRowSettings.code} />
          <p className="text-text-secondary mt-4">
            Durations, how expiry runs, and what a reader sees are covered in{' '}
            <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Idempotent creation</h2>
          <p className="text-text-secondary mb-4">
            <Code>if not exists</Code> goes between <Code>table</Code> and the name.
            When the table is already there the statement succeeds, reports the existing
            id with <Code>created: false</Code>, and ignores the column list it was
            given - it does not compare or migrate the schema:
          </p>
          <ExecutableSnippet title={sstIfNotExists.title} initialCode={sstIfNotExists.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Without the guard the same statement is an error:
          </p>
          <ExecutableSnippet title={sstDuplicate.title} initialCode={sstDuplicate.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Altering a table</h2>
          <p className="text-text-secondary mb-4">
            <Code>alter table</Code> adds, drops, or renames one column per statement.
            A column added to an empty table behaves exactly as if it had been declared
            at creation:
          </p>
          <ExecutableSnippet title={sstAddColumn.title} initialCode={sstAddColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The confirmation of an <Code>alter</Code> names the operation and the
            column it touched:
          </p>
          <ExecutableSnippet title={sstDropColumn.title} initialCode={sstDropColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Renaming changes only the name; the stored values are untouched, and the
            rows read back under the new name:
          </p>
          <ExecutableSnippet title={sstRenameColumn.title} initialCode={sstRenameColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Naming a column the table does not have fails with <Code>CA_039</Code>:
          </p>
          <ExecutableSnippet title={sstDropMissingColumn.title} initialCode={sstDropMissingColumn.code} />
          <Callout variant="warning" title="Add and drop columns before the table holds rows">
            In this build, adding or dropping a column on a table that already holds
            rows does not rewrite those rows. Reads then fail with <Code>ENG_001</Code>{' '}
            (mismatched column count), and the table can become unreadable after the
            next insert. Rename is safe at any time. For a populated table, create the
            new table, copy the rows across, and drop the old one.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Dropping a table</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop table</Code> removes the table and every row in it. The
            confirmation has no catalog id, only what was dropped:
          </p>
          <ExecutableSnippet title={sstDrop.title} initialCode={sstDrop.code} />
          <p className="text-text-secondary mt-4">
            <Code>drop table if exists</Code> succeeds either way and reports{' '}
            <Code>dropped: false</Code> when there was nothing to remove. A table that a
            view still reads cannot be dropped (<Code>CA_035</Code>); drop the view
            first. The{' '}
            <Link to="/docs/scripting/schema/drop" className="text-primary hover:text-primary-light font-medium transition-colors">Drop &amp; Cleanup</Link>{' '}
            page covers the dependency rules for every object kind.
          </p>
        </section>
      </div>
    </Layout>
  );
}
