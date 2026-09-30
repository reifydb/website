import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function IndexesPage() {
  return (
    <Layout
      title="Indexes"
      description="Indexes in RQL: the primary key as the one index the engine maintains today, its uniqueness and column type rules, and the create index statement that is parsed but not yet executed."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Indexes</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            An index is a structure the engine keeps in step with a table so that
            lookups by the indexed columns do not scan the table. In this release the
            primary key is the only index ReifyDB maintains. The general{' '}
            <Code>create index</Code> statement is parsed and planned, but no executor
            runs it yet. This page covers what works today and what the statement will
            look like, so nothing surprises you when it lands.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Primary keys</h2>
          <p className="text-text-secondary mb-4">
            <Code>create primary key on ns::table {'{'} col, ... {'}'}</Code> declares
            the key: a unique index over one or more columns. Every insert checks it,
            and an insert that repeats an existing key fails with <Code>INDEX_001</Code>{' '}
            and is rolled back in full. The{' '}
            <Link to="/docs/scripting/schema/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            page walks through it with runnable snippets.
          </p>
          <CodeBlock language="rql" code={`create primary key on shop::seats { row_no, seat_no }`} />
          <p className="text-text-secondary mt-4 mb-4">
            Three limits apply in this build:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>
              <strong>Only fixed-size columns can be keyed.</strong> A key over{' '}
              <Code>utf8</Code> or <Code>blob</Code> is accepted at creation, but every
              later write to the table fails with <Code>CA_009</Code>. Key on integers,
              uuids, dates, or booleans instead.
            </li>
            <li>
              <strong>Existing rows are not checked.</strong> Declaring a key on a table
              that already holds duplicates succeeds, and the duplicates stay. Declare
              the key before the first insert.
            </li>
            <li>
              <strong>Only inserts are checked.</strong> An <Code>update</Code> that makes
              two rows share a key is not rejected.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The create index statement</h2>
          <p className="text-text-secondary mb-4">
            The parser accepts the statement below. <Code>unique</Code> makes the index
            reject duplicate keys; each column may carry a sort direction; a{' '}
            <Code>filter</Code> restricts the index to the rows that match (a partial
            index), and <Code>map</Code> indexes an expression instead of a stored
            column:
          </p>
          <CodeBlock
            language="rql"
            code={`create [unique] index name on ns::table { col [:asc | :desc], ... }
[filter expr]
[map expr]`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Two statements in that shape:
          </p>
          <CodeBlock
            language="rql"
            code={`create unique index users_email on app::users { email }

create index open_orders on app::orders { customer_id, placed_at:desc }
filter status == "open"`}
          />
          <p className="text-text-secondary mt-4">
            As of 0.9 the statement stops after planning: there is no execution step
            for it, so it fails inside the engine rather than with a typed error. There
            is no <Code>drop index</Code>, and indexes are not listed in a system table.
            Where you need uniqueness today, use a primary key.
          </p>
          <Callout variant="warning" title="Do not run create index in the playground">
            The in-browser engine reaches the missing executor and panics, and a panic
            leaves the playground unusable until the page is reloaded. That is why the
            snippets on this page are not runnable.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Errors</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>
              <Code>INDEX_001</Code> - an insert repeats a primary key that is already
              present. The whole insert is rolled back, including rows that did not
              collide.
            </li>
            <li>
              <Code>CA_009</Code> - a write touches a table whose primary key includes a
              variable-length column (<Code>utf8</Code>, <Code>blob</Code>). Raised on
              the write, not when the key is created.
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
