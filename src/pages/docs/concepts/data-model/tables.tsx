import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelTablesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Tables</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Tables hold authoritative, mutable state - the facts your application
            asserts directly. They are the primary storage shape: rows are inserted,
            updated, and deleted transactionally, and everything derived (views,
            subscriptions) ultimately sources from them or from the other storage
            shapes.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a table</h2>
          <p className="text-text-secondary mb-4">
            A table is a named set of typed columns inside a{' '}
            <Link to="/docs/concepts/data-model/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">namespace</Link>.
            Column types include integers (<Code>int1</Code> through <Code>int16</Code>,{' '}
            <Code>uint1</Code> through <Code>uint16</Code>), floats (<Code>float4</Code>,{' '}
            <Code>float8</Code>), <Code>bool</Code>, strings (<Code>utf8</Code>, with{' '}
            <Code>text</Code> as an alias), <Code>blob</Code>, and temporal types
            (<Code>date</Code>, <Code>time</Code>, <Code>datetime</Code>,{' '}
            <Code>duration</Code>). See{' '}
            <Link to="/docs/concepts/data-types" className="text-primary hover:text-primary-light font-medium transition-colors">Data Types</Link>{' '}
            for the full list. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-tables-create" />
          <p className="text-text-muted text-sm mt-3">
            Reads return the newest rows first by default; add <Code>sort</Code> for an
            explicit order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Optional columns</h2>
          <p className="text-text-secondary mb-4">
            Columns are non-nullable unless declared <Code>Option(type)</Code>. An
            optional column that was never set holds <Code>none</Code> - ReifyDB's
            explicit absent value, which queries can test for and which renders
            distinctly in results. See{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
          <ExampleSnippet id="dm-tables-option" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Auto-increment columns</h2>
          <p className="text-text-secondary mb-4">
            An integer column declared <Code>with {'{'} auto_increment {'}'}</Code> is
            assigned the next value of a per-column sequence on insert, so writers never
            need to coordinate IDs. The sequence itself can be inspected and
            repositioned - see{' '}
            <Link to="/docs/concepts/data-model/sequences" className="text-primary hover:text-primary-light font-medium transition-colors">Sequences</Link>.
          </p>
          <ExampleSnippet id="dm-tables-auto-increment" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Primary keys</h2>
          <p className="text-text-secondary mb-4">
            A primary key is declared as a separate statement after the table exists,
            and can span multiple columns:{' '}
            <Code>create primary key on ns::table {'{'} col1, col2 {'}'}</Code>.
          </p>
          <ExampleSnippet id="dm-tables-primary-key" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Updating and deleting</h2>
          <p className="text-text-secondary mb-4">
            <Code>update</Code> sets the listed fields and leaves every other column
            untouched; <Code>delete</Code> removes whatever matches the filter. Both
            take a <Code>filter</Code> to select rows, and both accept{' '}
            <Code>returning</Code> to hand back the affected rows in the same
            statement - useful when the write itself computes something you need, like
            a generated ID or the post-update value:
          </p>
          <ExampleSnippet id="dm-tables-update-returning" />
          <p className="text-text-secondary mt-4 mb-4">
            Without <Code>returning</Code>, mutations report what happened as a count:
          </p>
          <ExampleSnippet id="dm-tables-delete" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">System columns</h2>
          <p className="text-text-secondary mb-4">
            Every stored row carries engine-maintained columns prefixed with{' '}
            <Code>#</Code>. They are not returned by default; project them explicitly
            when you need them. <Code>#rownum</Code> is the row's stable number within
            its table:
          </p>
          <ExampleSnippet id="dm-tables-rownum" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Evolving the schema</h2>
          <p className="text-text-secondary mb-4">
            <Code>alter table</Code> adds and drops columns in place. Add new columns as{' '}
            <Code>Option(type)</Code> when existing rows have no value for them:
          </p>
          <ExampleSnippet id="dm-tables-alter" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">When a table is not the right shape</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Bounded recent history with automatic eviction: use a{' '}
                <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Time-ordered measurements and audit records: use a{' '}
                <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Repeated low-cardinality strings: intern them with a{' '}
                <Link to="/docs/concepts/data-model/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionary</Link>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                State computed from other state: never write it by hand - derive it with a{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Row lifetime">
          Tables keep rows until you delete them. To expire rows by age instead, attach
          a TTL - see{' '}
          <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
