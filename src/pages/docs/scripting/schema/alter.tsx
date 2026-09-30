import { refAlterAddColumnExample as refAlterAddColumn, refAlterAddColumnPropertyExample as refAlterAddColumnProperty, refAlterAddDuplicateExample as refAlterAddDuplicate, refAlterDropColumnExample as refAlterDropColumn, refAlterDropPartitionExample as refAlterDropPartition, refAlterMissingColumnExample as refAlterMissingColumn, refAlterNotATableExample as refAlterNotATable, refAlterOneActionExample as refAlterOneAction, refAlterPartitionAfterDropExample as refAlterPartitionAfterDrop, refAlterPartitionAfterTruncateExample as refAlterPartitionAfterTruncate, refAlterPartitionSetupExample as refAlterPartitionSetup, refAlterPartitionValueStringExample as refAlterPartitionValueString, refAlterRenameColumnExample as refAlterRenameColumn, refAlterSequenceExample as refAlterSequence, refAlterSequenceNextExample as refAlterSequenceNext, refAlterSequenceNotAutoExample as refAlterSequenceNotAuto, refAlterSetupExample as refAlterSetup, refAlterTruncatePartitionExample as refAlterTruncatePartition } from './alter.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function AlterPage() {
  return (
    <Layout
      title="Alter"
      description="The alter statements in RQL: adding, dropping, and renaming table columns, truncating and dropping partitions, and repositioning auto-increment sequences."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Alter</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>alter</Code> changes an object that already exists. Two forms are
            covered here: <Code>alter table</Code>, which changes one column or one
            partition per statement, and <Code>alter sequence</Code>, which repositions
            the counter behind an auto-increment column. Both are DDL, so they only run
            in an{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">admin transaction</Link>.
            Creating a table is on the{' '}
            <Link to="/docs/scripting/schema/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            page; removing one is under{' '}
            <Link to="/docs/scripting/schema/drop" className="text-primary hover:text-primary-light font-medium transition-colors">Drop &amp; Cleanup</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The statement</h2>
          <p className="text-text-secondary mb-4">
            Every <Code>alter table</Code> names the table and then exactly one action.
            The table name must be qualified with its namespace; a bare name is looked
            up in <Code>default</Code>, not in the namespace you are working in:
          </p>
          <CodeBlock
            language="rql"
            code={`alter table ns::name add column col: type [with { ... }]
alter table ns::name drop column col
alter table ns::name rename column old to new
alter table ns::name truncate partition { col: "value" }
alter table ns::name drop partition { col: "value" }

alter sequence ns::table::column set value N`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The confirmation of an <Code>alter table</Code> names the operation, the
            table, and a detail column that depends on the action. Run the snippets on
            this page in order:
          </p>
          <ExecutableSnippet title={refAlterSetup.title} initialCode={refAlterSetup.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Adding a column</h2>
          <p className="text-text-secondary mb-4">
            <Code>add column</Code> takes one column declaration in the same syntax as{' '}
            <Code>create table</Code>. The new column goes at the end of the row:
          </p>
          <ExecutableSnippet title={refAlterAddColumn.title} initialCode={refAlterAddColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Column properties are accepted too. An <Code>auto_increment</Code> column
            added this way draws from a sequence of its own, exactly as if it had been
            declared at creation:
          </p>
          <ExecutableSnippet title={refAlterAddColumnProperty.title} initialCode={refAlterAddColumnProperty.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A name that is already on the table is rejected:
          </p>
          <ExecutableSnippet title={refAlterAddDuplicate.title} initialCode={refAlterAddDuplicate.code} />
          <Callout variant="warning" title="Add and drop columns only while the table is empty">
            In this build, adding or dropping a column does not rewrite the rows the
            table already holds. The next read fails with <Code>ENG_001</Code>{' '}
            (mismatched column count), and after one more insert a read can trap the
            engine outright. Make the change before the first insert, or create a new
            table, copy the rows across, and drop the old one. Rename is safe at any
            time, as the next snippet shows.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Renaming a column</h2>
          <p className="text-text-secondary mb-4">
            <Code>rename column old to new</Code> changes the name only. Stored values
            are untouched, and the rows read back under the new name straight away:
          </p>
          <ExecutableSnippet title={refAlterRenameColumn.title} initialCode={refAlterRenameColumn.code} />
          <Callout variant="warning" title="The new name is not checked">
            Renaming a column to a name the table already uses is accepted in this
            build, and the table is left with two columns of the same name. Nothing
            reports it. Check the target name yourself before renaming.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Dropping a column</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop column</Code> removes the column and, on an empty table, leaves
            nothing behind:
          </p>
          <ExecutableSnippet title={refAlterDropColumn.title} initialCode={refAlterDropColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Naming a column the table does not have fails with <Code>CA_039</Code>,
            for <Code>drop column</Code> and <Code>rename column</Code> alike:
          </p>
          <ExecutableSnippet title={refAlterMissingColumn.title} initialCode={refAlterMissingColumn.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">One action, one table</h2>
          <p className="text-text-secondary mb-4">
            A statement carries a single action. To change several columns, write
            several statements; they can share one request and commit together:
          </p>
          <ExecutableSnippet title={refAlterOneAction.title} initialCode={refAlterOneAction.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>alter table</Code> resolves its name among tables only. A view,
            series, or ring buffer of that name is not found, so derived and
            fixed-shape objects are never altered by accident. Change a view by dropping
            and recreating it:
          </p>
          <ExecutableSnippet title={refAlterNotATable.title} initialCode={refAlterNotATable.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Partitions</h2>
          <p className="text-text-secondary mb-4">
            A table created <Code>with {'{'} partition: {'{'} by: {'{'} col {'}'} {'}'} {'}'}</Code>{' '}
            keeps its rows grouped by that column's value. Two <Code>alter</Code>{' '}
            actions work on one such group at a time. Start with a table that has two
            partitions:
          </p>
          <ExecutableSnippet title={refAlterPartitionSetup.title} initialCode={refAlterPartitionSetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>truncate partition</Code> removes every row whose partition column
            equals the given value. The detail column reports how many rows went:
          </p>
          <ExecutableSnippet title={refAlterTruncatePartition.title} initialCode={refAlterTruncatePartition.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The rest of the table is untouched, and the truncated value is still a valid
            partition for new rows:
          </p>
          <ExecutableSnippet title={refAlterPartitionAfterTruncate.title} initialCode={refAlterPartitionAfterTruncate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop partition</Code> removes the rows the same way and also forgets
            the partition itself:
          </p>
          <ExecutableSnippet title={refAlterDropPartition.title} initialCode={refAlterDropPartition.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because partitions are created on demand, the difference is not visible
            from the outside in this build: inserting the value again simply recreates
            the partition. Truncating a value that has no rows succeeds with a count
            of 0.
          </p>
          <ExecutableSnippet title={refAlterPartitionAfterDrop.title} initialCode={refAlterPartitionAfterDrop.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The record after <Code>partition</Code> must bind the partition column to a
            string literal. Any other value is rejected with <Code>AST_009</Code>:
          </p>
          <ExecutableSnippet title={refAlterPartitionValueString.title} initialCode={refAlterPartitionValueString.code} />
          <Callout variant="warning" title="Three shapes that are reported as internal errors">
            Naming a column that is not the partition column, truncating a partition
            on a table that has no partitioning, or naming a partition column whose
            type is not <Code>utf8</Code> (a numeric partition column cannot be
            truncated or dropped in this build, whatever value you pass) fails with{' '}
            <Code>INTERNAL_ERROR</Code> rather than a typed catalog error. The request
            rolls back and the engine keeps running, but the message asks you to file
            a bug. Extra keys in the record beyond the partition column are ignored.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Altering a sequence</h2>
          <p className="text-text-secondary mb-4">
            Every <Code>auto_increment</Code> column has a{' '}
            <Link to="/docs/concepts/data-model/sequences" className="text-primary hover:text-primary-light font-medium transition-colors">sequence</Link>.{' '}
            <Code>alter sequence ns::table::column set value N</Code> sets the value
            the sequence considers already used, so the next insert draws{' '}
            <Code>N + 1</Code>. The name has three parts; leaving the namespace off
            resolves the table in the <Code>default</Code> namespace, not the current
            one:
          </p>
          <ExecutableSnippet title={refAlterSequence.title} initialCode={refAlterSequence.code} />
          <ExecutableSnippet title={refAlterSequenceNext.title} initialCode={refAlterSequenceNext.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>N</Code> is an unsigned number literal: a sign is a parse error, a
            fraction is dropped (<Code>1.5</Code> sets 1), and 0 restarts the sequence
            at 1. Moving a sequence below ids that already exist
            produces duplicates, because an auto-increment column is not a key - the
            sequences page shows that failure and the one safe reason to reposition (a
            bulk import that carried its own ids). Only auto-increment columns can be
            altered:
          </p>
          <ExecutableSnippet title={refAlterSequenceNotAuto.title} initialCode={refAlterSequenceNotAuto.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What alter does not cover</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A column's type. There is no <Code>alter column</Code>; add a new column
                and migrate the values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Row settings such as a TTL. They are fixed at creation; see{' '}
                <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Keys and column properties. They have their own <Code>create</Code>{' '}
                statements, covered under{' '}
                <Link to="/docs/scripting/schema/constraints" className="text-primary hover:text-primary-light font-medium transition-colors">Constraints</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Policies. <Code>alter table policy</Code> and its siblings belong to{' '}
                <Link to="/docs/scripting/access-control" className="text-primary hover:text-primary-light font-medium transition-colors">Access Control</Link>.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mt-4">
            <Code>alter remote namespace</Code> belongs to the experimental remote
            namespaces feature and is tracked on the{' '}
            <Link to="/docs/resources/roadmap" className="text-primary hover:text-primary-light font-medium transition-colors">roadmap</Link>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
