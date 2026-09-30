import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function L({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

function Term({ name, to, children }: { name: string; to: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-bold tracking-tight">
        <L to={to}>{name}</L>
      </dt>
      <dd className="text-text-secondary mt-1">{children}</dd>
    </div>
  );
}

export function GlossaryPage() {
  return (
    <Layout
      title="Glossary"
      description="The terms used across the ReifyDB docs, each defined in one or two sentences and linked to the page that explains it in full."
    >
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2 font-bold">Resources</div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Glossary</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The words the rest of these docs use, in one or two sentences each. Every
            term links to the page that explains it in full. Terms are grouped by what
            they belong to, not alphabetically, so related words sit together.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Storage shapes</h2>
          <dl className="space-y-4">
            <Term name="Namespace" to="/docs/concepts/data-model/namespaces">
              The container every other object lives in. Tables, views, ring buffers,
              series, dictionaries, and types are addressed as{' '}
              <Code>namespace::object</Code>, and a namespace must exist before anything
              can be created in it.
            </Term>
            <Term name="Table" to="/docs/concepts/data-model/tables">
              Authoritative, mutable state: the facts your application asserts directly.
              Rows are inserted, updated, and deleted transactionally, and everything
              derived ultimately sources from tables or the other storage shapes.
            </Term>
            <Term name="Ring buffer" to="/docs/concepts/data-model/ring-buffers">
              A fixed-capacity store. When it is full, inserting a new row evicts the
              oldest one, so "keep the last N" is a property of the storage and needs no
              cleanup job.
            </Term>
            <Term name="Series" to="/docs/concepts/data-model/series">
              Rows ordered by a required key column, a timestamp or an integer. The shape
              for measurements, audit trails, and history: data that arrives in order,
              is queried by range, and grows without an upper bound.
            </Term>
            <Term name="Dictionary" to="/docs/concepts/data-model/dictionaries">
              Maps values of one type to compact ids of another, which is interning. A
              repeated string is stored once and every row that references it carries a
              small integer instead.
            </Term>
            <Term name="Sequence" to="/docs/concepts/data-model/sequences">
              The counter behind an <Code>auto_increment</Code> column. Every such column
              owns one; an insert that leaves the column out draws the next value, and{' '}
              <Code>alter sequence</Code> repositions the counter.
            </Term>
            <Term name="Primary key" to="/docs/concepts/data-model/tables">
              A uniqueness constraint over one or more columns, declared as a separate
              statement after the table exists. An insert that repeats a key fails with{' '}
              <Code>INDEX_001</Code>.
            </Term>
            <Term name="Index" to="/docs/scripting/schema/indexes">
              A structure the engine keeps in step with a table so lookups by the indexed
              columns do not scan it. In this release the primary key is the only index
              the engine maintains.
            </Term>
            <Term name="System column" to="/docs/concepts/data-model/tables">
              An engine-maintained column prefixed with <Code>#</Code>, such as{' '}
              <Code>#rownum</Code>. Not returned by default; project it explicitly.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Derived state</h2>
          <dl className="space-y-4">
            <Term name="View" to="/docs/concepts/data-model/views">
              Derived state the engine maintains for you. You declare a pipeline over
              source data; the engine builds a dataflow behind it and keeps the result
              materialized as the sources change. Reading a view is a lookup, never a
              recomputation.
            </Term>
            <Term name="Transactional view" to="/docs/scripting/views/transactional">
              A view maintained inside the transaction that writes its source. The table
              and the view change in one atomic step, and the write does the view's work
              before it commits.
            </Term>
            <Term name="Deferred view" to="/docs/scripting/views/deferred">
              A view maintained after the fact. Writes commit on their own; the view
              consumes the change log and updates asynchronously, so it is eventually
              consistent, usually within moments.
            </Term>
            <Term name="Flow" to="/docs/concepts/data-model/views">
              The dataflow the engine runs behind a view. Dependency errors name flows: a
              table a view reads cannot be dropped (<Code>CA_035</Code>), and neither can
              a view another view reads (<Code>CA_036</Code>).
            </Term>
            <Term name="Window" to="/docs/rql/transforms/window">
              <Code>aggregate</Code> over a moving stream: rows are sliced into buckets by
              time or by count and one aggregate row is emitted per bucket. It only
              exists inside a deferred view.
            </Term>
            <Term name="Subscription" to="/docs/concepts/data-model/subscriptions">
              A live query. A client registers a pipeline, receives the rows that match
              right now, and from then on receives every change to that result as it
              commits. Subscriptions need a server and do not exist in the browser
              playground.
            </Term>
            <Term name="Change log" to="/docs/concepts/durability">
              The ordered record of every committed write, also called CDC. Deferred
              views, subscriptions, and replicas consume it after commit.
            </Term>
            <Term name="Event" to="/docs/concepts/data-model/events">
              A declared set of variants, each with a typed payload, describing something
              that happens rather than something that is stored. <Code>dispatch</Code>{' '}
              raises one variant, and every handler bound to it runs inside the same
              transaction.
            </Term>
            <Term name="Handler" to="/docs/concepts/data-model/handlers">
              A block of statements bound to one variant of an event. It runs
              synchronously inside the dispatching transaction, so if it fails, the
              write that triggered it rolls back.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Types and values</h2>
          <dl className="space-y-4">
            <Term name="none" to="/docs/concepts/none">
              The missing value. ReifyDB has no NULL: <Code>none</Code> is typed (a
              missing <Code>int4</Code> is still an <Code>int4</Code>) and only exists
              where the schema says it may.
            </Term>
            <Term name="Option(type)" to="/docs/concepts/none">
              The declaration that lets a column hold <Code>none</Code>. Columns are
              required by default; inserting <Code>none</Code> into a required column
              fails with <Code>CONSTRAINT_007</Code>.
            </Term>
            <Term name="Data type" to="/docs/concepts/data-types">
              Every column and expression has a type, checked at plan time. Integers come
              in fixed widths, floats are binary, decimal is exact, and there are four
              temporal types. Values move between types by literal inference, arithmetic
              widening, and <Code>cast</Code>.
            </Term>
            <Term name="Enum" to="/docs/concepts/data-model/enums">
              A closed set of named variants, declared once and used as a column type.
              A column typed with an enum can only hold one of those variants, and
              variants may carry typed fields of their own.
            </Term>
            <Term name="Tag" to="/docs/concepts/data-model/tags">
              A closed set of labels attached to a series, so each entry carries one label
              without a column for every such distinction. The variant syntax is shared
              with enums and events.
            </Term>
            <Term name="Frame" to="/docs/rql/variables">
              The tabular result of a pipeline: columns and rows.{' '}
              <Code>let $rows = from ns::t</Code> captures a frame, a <Code>for</Code>{' '}
              loop iterates one, and a single-row frame's field reads as one value.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Queries and scripts</h2>
          <dl className="space-y-4">
            <Term name="RQL" to="/docs/rql">
              ReifyDB's query language. It is not a SQL dialect: a query is a
              top-to-bottom pipeline of operators rather than clauses, with its own
              literal and type system.
            </Term>
            <Term name="Pipeline" to="/docs/rql/transforms">
              What an RQL query is. It starts with a source, and every operator after it
              takes the rows the previous stage produced, transforms them, and hands the
              result to the next stage. You read it top to bottom in the order it runs.
            </Term>
            <Term name="Operator" to="/docs/rql/transforms">
              One stage of a pipeline: <Code>from</Code>, <Code>filter</Code>,{' '}
              <Code>map</Code>, <Code>extend</Code>, <Code>aggregate</Code>,{' '}
              <Code>sort</Code>, <Code>take</Code>, <Code>join</Code>,{' '}
              <Code>distinct</Code>, <Code>apply</Code>, <Code>window</Code>, and the
              rest. Each has its own page.
            </Term>
            <Term name="Expression" to="/docs/rql/expressions">
              Computes one value per row. It is what goes inside the braces of{' '}
              <Code>filter</Code>, <Code>map</Code>, <Code>extend</Code>, and{' '}
              <Code>aggregate</Code>, on the right of a <Code>let</Code>, and in the
              fields of an <Code>insert</Code> or <Code>update</Code>.
            </Term>
            <Term name="Variable" to="/docs/rql/variables">
              A value bound to a name with <Code>let</Code> and referenced as{' '}
              <Code>$name</Code> anywhere in the request. Variables turn a one-shot
              query into a script.
            </Term>
            <Term name="with clause" to="/docs/rql/transforms/with">
              <Code>with {'{'} ... {'}'}</Code> attaches an options block to the construct
              directly before it: a create statement, a column definition, or an
              operator. It never stands alone as a pipeline step.
            </Term>
            <Term name="Closure" to="/docs/rql/control-flow/closures">
              An anonymous function bound to a variable, or its named form declared with{' '}
              <Code>udf</Code>. Both live only for the request that defines them.
            </Term>
            <Term name="Keyword" to="/docs/resources/keywords">
              A word the tokenizer reserves, such as <Code>from</Code> or{' '}
              <Code>filter</Code>. Keywords are case-insensitive, and some can still be
              used as names.
            </Term>
            <Term name="Diagnostic" to="/docs/resources/errors">
              The structured error RQL returns: a stable code such as{' '}
              <Code>CAST_001</Code> or <Code>CA_004</Code>, a message, usually a{' '}
              <Code>HELP</Code> line, and often the source location that failed.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Routines</h2>
          <dl className="space-y-4">
            <Term name="Routine" to="/docs/routines">
              Everything callable. There are two kinds, functions and procedures, and
              both answer to the same <Code>namespace::name</Code> addressing.
            </Term>
            <Term name="Function" to="/docs/functions">
              A pure computation used inside expressions, such as{' '}
              <Code>math::sum</Code> or <Code>text::upper</Code>.
            </Term>
            <Term name="Procedure" to="/docs/concepts/data-model/procedures">
              Named, callable logic stored in the catalog next to the data it operates
              on. It is invoked with <Code>call</Code>, executes transactionally, may
              write, and is governed by policies like any other object.
            </Term>
            <Term name="apply" to="/docs/rql/transforms/apply">
              The pipeline stage that runs an operator the embedding application or a
              plugin registered under that name. Its main home is view definitions.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Transactions and durability</h2>
          <dl className="space-y-4">
            <Term name="Request" to="/docs/concepts/transactions">
              One round trip to the database, and exactly one transaction. A request
              may hold many statements; they all commit together or none of them do.
              There is no <Code>BEGIN</Code>, <Code>COMMIT</Code>, or{' '}
              <Code>ROLLBACK</Code>.
            </Term>
            <Term name="Query, command, admin" to="/docs/concepts/transactions">
              The three kinds of transaction and the three client entry points. A query
              only reads. A command writes data but cannot change schema. An admin
              transaction is the only kind that runs DDL, and it can write data too.
            </Term>
            <Term name="Commit version" to="/docs/concepts/transactions">
              The monotonically increasing stamp every committed transaction receives.
              Each commit produces a new version of the rows it touched instead of
              overwriting them (MVCC), and a query reads as of the newest committed
              version at the moment it starts.
            </Term>
            <Term name="Snapshot" to="/docs/concepts/transactions">
              The consistent state a transaction reads. It is pinned when the
              transaction starts, so a reader never sees a half-applied write and takes
              no locks.
            </Term>
            <Term name="Conflict" to="/docs/concepts/transactions">
              A command whose reads or writes overlap a transaction that committed since
              its snapshot aborts with <Code>TXN_001</Code>. The server retries it
              automatically, up to 10 attempts by default.
            </Term>
            <Term name="Flush" to="/docs/concepts/durability">
              The background step that moves committed data from the in-memory
              multi-version store to persistent storage. Commit is decoupled from disk:
              a committed write is visible at once and durable after the flush.
            </Term>
            <Term name="TTL" to="/docs/concepts/ttl">
              A time-to-live: an age bound on rows, declared once in the row settings.
              The engine removes rows that have not been written to for the duration,
              measured from the last write and collected by a background sweep.
            </Term>
            <Term name="Row settings" to="/docs/concepts/ttl">
              The <Code>row</Code> block inside <Code>with</Code> at creation, holding{' '}
              <Code>ttl</Code> and <Code>persistent</Code>. <Code>persistent: false</Code>{' '}
              keeps rows in memory only and requires a TTL. Row settings are fixed at
              creation.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Schema and operations</h2>
          <dl className="space-y-4">
            <Term name="DDL" to="/docs/scripting">
              The schema statements: <Code>create</Code>, <Code>alter</Code>,{' '}
              <Code>drop</Code>, and the rest. Only an admin transaction can run them.
            </Term>
            <Term name="Migration" to="/docs/scripting/migrations">
              A named block of RQL the database records before it runs. Registering it
              and applying it are separate steps, bodies are hashed and immutable, and
              a migration that declares a <Code>rollback</Code> block can be reverted.
            </Term>
            <Term name="Test" to="/docs/scripting/testing">
              A catalog object holding statements that end in assertions.{' '}
              <Code>run tests</Code> executes each one inside a transaction that is
              always rolled back, so a test leaves no trace.
            </Term>
            <Term name="System catalog" to="/docs/concepts/system-catalog">
              The virtual tables under <Code>system::</Code> that expose the catalog
              itself: namespaces, tables, migrations, configuration, and more. They are
              read with ordinary pipelines.
            </Term>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Access control</h2>
          <dl className="space-y-4">
            <Term name="Identity" to="/docs/scripting/access-control">
              A person or service that connects. Non-root identities are denied by
              default; root bypasses policies entirely.
            </Term>
            <Term name="Role" to="/docs/scripting/access-control">
              A named group that identities are granted into, so policies can target the
              group instead of each identity.
            </Term>
            <Term name="Policy" to="/docs/concepts/data-model/policies">
              Row-level security declared in the database. Because frontends query
              ReifyDB directly, policies are the access layer: one grants access and
              shapes what each operation may see and do.
            </Term>
          </dl>
        </section>

        <Callout variant="note" title="Missing a term?">
          If a page uses a word that is not here, the page that introduces it is the
          authority; this list only summarizes. For the words the parser itself reserves,
          see <L to="/docs/resources/keywords">Keywords</L>; for what an error code
          means, see <L to="/docs/resources/errors">Error Reference</L>.
        </Callout>
      </div>
    </Layout>
  );
}
