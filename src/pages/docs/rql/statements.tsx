import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout, CodeBlock, RqlCodeBlock } from '../components';

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

function Details({ to, label }: { to: string; label: string }) {
  return (
    <p className="text-text-muted text-sm mt-3">
      Details: <L to={to}>{label}</L>
    </p>
  );
}

function Statement({ id, name, children }: { id: string; name: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">{name}</h2>
      {children}
    </section>
  );
}

const index: { id: string; name: string }[] = [
  { id: 'alter-sequence', name: 'alter sequence' },
  { id: 'alter-table', name: 'alter table' },
  { id: 'alter-policy', name: 'alter ... policy' },
  { id: 'alter-user', name: 'alter user' },
  { id: 'append', name: 'append' },
  { id: 'assert', name: 'assert' },
  { id: 'assignment', name: '$x = ...' },
  { id: 'break-continue', name: 'break / continue' },
  { id: 'call', name: 'call' },
  { id: 'create-authentication', name: 'create authentication' },
  { id: 'create-column-property', name: 'create column property' },
  { id: 'create-deferred-view', name: 'create deferred view' },
  { id: 'create-dictionary', name: 'create dictionary' },
  { id: 'create-enum', name: 'create enum' },
  { id: 'create-event', name: 'create event' },
  { id: 'create-handler', name: 'create handler' },
  { id: 'create-index', name: 'create index' },
  { id: 'create-migration', name: 'create migration' },
  { id: 'create-namespace', name: 'create namespace' },
  { id: 'create-primary-key', name: 'create primary key' },
  { id: 'create-procedure', name: 'create procedure' },
  { id: 'create-queue', name: 'create queue' },
  { id: 'create-relationship', name: 'create relationship' },
  { id: 'create-ringbuffer', name: 'create ringbuffer' },
  { id: 'create-role', name: 'create role' },
  { id: 'create-series', name: 'create series' },
  { id: 'create-service', name: 'create service' },
  { id: 'create-subscription', name: 'create subscription' },
  { id: 'create-table', name: 'create table' },
  { id: 'create-policy', name: 'create ... policy' },
  { id: 'create-tag', name: 'create tag' },
  { id: 'create-test', name: 'create test' },
  { id: 'create-transactional-view', name: 'create transactional view' },
  { id: 'create-user', name: 'create user' },
  { id: 'delete', name: 'delete' },
  { id: 'describe', name: 'describe' },
  { id: 'dispatch', name: 'dispatch' },
  { id: 'drop', name: 'drop' },
  { id: 'for', name: 'for' },
  { id: 'from', name: 'from' },
  { id: 'grant', name: 'grant' },
  { id: 'if', name: 'if' },
  { id: 'insert', name: 'insert' },
  { id: 'let', name: 'let' },
  { id: 'loop', name: 'loop' },
  { id: 'map', name: 'map' },
  { id: 'match', name: 'match' },
  { id: 'migrate', name: 'migrate' },
  { id: 'output', name: 'output' },
  { id: 'patch', name: 'patch' },
  { id: 'return', name: 'return' },
  { id: 'revoke', name: 'revoke' },
  { id: 'rollback-migration', name: 'rollback migration' },
  { id: 'run-tests', name: 'run tests' },
  { id: 'udf', name: 'udf' },
  { id: 'update', name: 'update' },
  { id: 'while', name: 'while' },
];

export function RqlStatementsPage() {
  return (
    <Layout
      title="Statement Reference"
      description="Every top-level RQL statement in one A-Z list: a one-line purpose, a syntax skeleton, and a link to the page that explains it."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Statement Reference</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            Every statement the RQL parser accepts at the top level of a request, A to Z.
            Each entry gives the purpose in one line, a skeleton that parses as written,
            and a link to the page with runnable examples. This page is an index, not a
            tutorial: the skeletons share the setup below, and every block that is safe
            to run in the playground has a Run button.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">How to read the skeletons</h2>
          <p className="text-text-secondary mb-4">
            The skeletons share one setup: a namespace <Code>ns</Code> with tables{' '}
            <Code>orders</Code> (<Code>id</Code>, <Code>customer_id</Code>,{' '}
            <Code>total</Code>, <Code>status</Code>) and <Code>customers</Code>{' '}
            (<Code>id</Code>, <Code>name</Code>). Statements end with a semicolon when
            another statement follows; the last one needs none. Every skeleton was run
            against the playground engine (<Code>@reifydb/wasm</Code> 0.8.1). Where the
            playground rejects a statement with a typed error the entry says so and gives
            the error; where it would trap the engine instead, the block is plain code
            with a warning and no Run button.
          </p>
          <ul className="flex flex-wrap gap-2 text-text-secondary">
            {index.map((entry) => (
              <li key={entry.id}>
                <a href={`#${entry.id}`} className="bg-bg-tertiary px-2 py-1 text-xs font-bold hover:text-primary transition-colors">
                  {entry.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Statement id="alter-sequence" name="alter sequence">
          <p className="text-text-secondary mb-4">
            Reposition the auto-increment sequence behind a column. The given value counts
            as already used, so the next insert gets the one after it.
          </p>
          <RqlCodeBlock code={`alter sequence ns::tickets::id set value 100`} />
          <Details to="/docs/concepts/data-model/sequences" label="Sequences" />
        </Statement>

        <Statement id="alter-table" name="alter table">
          <p className="text-text-secondary mb-4">
            Change a table's columns in place: add, rename, or drop one. In the playground
            build, adding or dropping a column does not rewrite the rows a table already
            holds, so the next read of a non-empty table fails with <Code>ENG_001</Code>;
            add and drop columns while the table is empty. Rename is safe at any time.
          </p>
          <RqlCodeBlock code={`alter table ns::orders add column note: Option(utf8);
alter table ns::orders rename column note to memo;
alter table ns::orders drop column memo`} />
          <Details to="/docs/scripting/schema/alter" label="Altering Schema" />
        </Statement>

        <Statement id="alter-policy" name="alter ... policy">
          <p className="text-text-secondary mb-4">
            Switch a policy off and on without dropping it. The kind keyword matches the
            one used at creation (<Code>table</Code>, <Code>view</Code>,{' '}
            <Code>namespace</Code>, <Code>ringbuffer</Code>, <Code>series</Code>,{' '}
            <Code>dictionary</Code>, <Code>procedure</Code>, <Code>function</Code>,{' '}
            <Code>session</Code>, <Code>feature</Code>, <Code>subscription</Code>).
          </p>
          <RqlCodeBlock code={`alter table policy hide_drafts disable;
alter table policy hide_drafts enable`} />
          <Details to="/docs/concepts/data-model/policies" label="Policies" />
        </Statement>

        <Statement id="alter-user" name="alter user">
          <p className="text-text-secondary mb-4">
            Set attribute values on an existing user. Every key must have been declared
            with <Code>create user attribute</Code> first.
          </p>
          <RqlCodeBlock code={`alter user alice { org_id: "acme" }`} />
          <Details to="/docs/scripting/access-control" label="Access Control" />
        </Statement>

        <Statement id="append" name="append">
          <p className="text-text-secondary mb-4">
            Concatenate rows. Inside a view definition, <Code>append {'{'} ... {'}'}</Code>{' '}
            adds the rows of a second pipeline after the current ones; operators inside
            the braces are chained with <Code>|</Code>. As a statement,{' '}
            <Code>append $var from $other</Code> pushes the rows of one frame variable
            onto another; the columns must match by name and position, otherwise{' '}
            <Code>RUNTIME_011</Code>.
          </p>
          <RqlCodeBlock code={`create deferred view ns::all_ids { id: int4 } as {
  from ns::orders | map { id }
  append { from ns::customers | map { id } }
};
let $rows = from ns::orders;
let $more = from ns::orders;
append $rows from $more;
from $rows map { id }`} />
          <div className="mt-4">
            <CodeBlock language="rql" code={`from ns::orders append { from ns::customers }`} />
          </div>
          <Callout variant="warning" title="Do not run append outside a view">
            The playground build executes <Code>append</Code> only inside a view. In an
            ad-hoc query it traps the engine with <Code>unreachable</Code> instead of
            returning an error, so the block above has no Run button. An inline list
            appends only to a frame whose columns come in the same order: a record
            literal's fields come out sorted by name, so appending one to a frame read
            from a table fails with <Code>RUNTIME_011</Code>.
          </Callout>
          <Details to="/docs/rql/transforms/append" label="append" />
        </Statement>

        <Statement id="assert" name="assert">
          <p className="text-text-secondary mb-4">
            Fail the request unless a condition holds. Standalone it checks one
            expression; after a pipeline it checks every row; <Code>assert error</Code>{' '}
            passes only if the block inside fails. The optional string is the failure
            message.
          </p>
          <RqlCodeBlock code={`assert { 1 + 1 == 2 } "arithmetic holds";
from ns::orders | assert { id > 0 };
assert error { from ns::nosuch }`} />
          <Details to="/docs/scripting/testing" label="Testing" />
        </Statement>

        <Statement id="assignment" name="$x = ...">
          <p className="text-text-secondary mb-4">
            Replace the value of a variable that <Code>let</Code> already declared.
            Assigning to an undeclared name is an error.
          </p>
          <RqlCodeBlock code={`let $n = 1;
$n = $n + 1;
map { n: $n }`} />
          <Details to="/docs/rql/variables" label="Variables" />
        </Statement>

        <Statement id="break-continue" name="break / continue">
          <p className="text-text-secondary mb-4">
            Inside <Code>loop</Code>, <Code>while</Code>, or <Code>for</Code>:{' '}
            <Code>break</Code> leaves the loop, <Code>continue</Code> skips to the next
            iteration. Both are usually the single statement of an <Code>if</Code>{' '}
            branch.
          </p>
          <RqlCodeBlock code={`let $sum = 0;
for $i in gen::series(1, 5) { if $i % 2 == 0 { continue }; $sum = $sum + $i };
let $i = 0;
loop { $i = $i + 1; if $i >= 3 { break } };
map { sum: $sum, i: $i }`} />
          <Details to="/docs/rql/control-flow/loop" label="Loop, Break & Continue" />
        </Statement>

        <Statement id="call" name="call">
          <p className="text-text-secondary mb-4">
            Run a procedure with positional arguments. The procedure's result, if it
            produces one, is the statement's result.
          </p>
          <RqlCodeBlock code={`call ns::mark_paid(2)`} />
          <Details to="/docs/scripting/procedures" label="Procedures" />
        </Statement>

        <Statement id="create-authentication" name="create authentication">
          <p className="text-text-secondary mb-4">
            Attach a login method to a user. <Code>method: token</Code> needs nothing
            else; <Code>method: password</Code> takes a <Code>password</Code> entry,
            separated by a semicolon.
          </p>
          <RqlCodeBlock code={`create authentication for alice { method: token }`} />
          <Details to="/docs/scripting/access-control" label="Access Control" />
        </Statement>

        <Statement id="create-column-property" name="create column property">
          <p className="text-text-secondary mb-4">
            Attach a property to one column of a table. The parser accepts{' '}
            <Code>saturation</Code> (what happens when arithmetic on the column
            overflows) and <Code>default</Code>, but only <Code>saturation</Code> runs in
            the playground build.
          </p>
          <RqlCodeBlock code={`create column property on ns::orders::total { saturation: none }`} />
          <Callout variant="warning" title="Do not run a default property in the playground">
            <Code>default</Code> parses but traps the engine with <Code>unreachable</Code>{' '}
            instead of returning an error, with a text or a numeric value alike.
          </Callout>
        </Statement>

        <Statement id="create-deferred-view" name="create deferred view">
          <p className="text-text-secondary mb-4">
            Define a view that is updated asynchronously after each commit. Columns are
            matched by name: a declared column the query does not produce reads as{' '}
            <Code>none</Code>, and a query column that is not declared is dropped.{' '}
            <Code>ringbuffer</Code> and{' '}
            <Code>series</Code> variants store the derived rows in that shape instead of
            a table and take that shape's <Code>with</Code> block.
          </p>
          <RqlCodeBlock code={`create deferred view ns::order_count { n: int8 } as {
  from ns::orders aggregate { n: math::count(id) } by {}
};
create deferred ringbuffer view ns::recent_paid { id: int4 } with { capacity: 10 } as {
  from ns::orders filter { status == "paid" } map { id }
};
create deferred series view ns::reading_log { ts: datetime, value: float8 } with { key: ts } as {
  from ns::readings map { ts, value }
}`} />
          <Details to="/docs/scripting/views/deferred" label="Deferred Views" />
        </Statement>

        <Statement id="create-dictionary" name="create dictionary">
          <p className="text-text-secondary mb-4">
            Define an interning table: <Code>for</Code> names the value type,{' '}
            <Code>as</Code> the unsigned id type the engine assigns.
          </p>
          <RqlCodeBlock code={`create dictionary ns::symbols for utf8 as uint2`} />
          <Details to="/docs/scripting/schema/dictionaries" label="Dictionaries" />
        </Statement>

        <Statement id="create-enum" name="create enum">
          <p className="text-text-secondary mb-4">
            Define a closed set of variants usable as a column type.
          </p>
          <RqlCodeBlock code={`create enum ns::status { Open, Paid }`} />
          <Details to="/docs/scripting/schema/enums" label="Enums" />
        </Statement>

        <Statement id="create-event" name="create event">
          <p className="text-text-secondary mb-4">
            Define an event type with one or more variants, each with an optional typed
            payload. Events are raised with <Code>dispatch</Code> and consumed by
            handlers.
          </p>
          <RqlCodeBlock code={`create event ns::order_event { Placed { id: int4 }, Cancelled }`} />
          <Details to="/docs/concepts/data-model/events" label="Events" />
        </Statement>

        <Statement id="create-handler" name="create handler">
          <p className="text-text-secondary mb-4">
            Run a block of statements whenever one event variant is dispatched. Payload
            fields are reachable as <Code>event_&lt;field&gt;</Code>. Handlers run inside
            the dispatching transaction.
          </p>
          <RqlCodeBlock code={`create handler ns::on_placed on ns::order_event::Placed {
  insert ns::customers [{ id: event_id + 100, name: "placed" }]
}`} />
          <Details to="/docs/concepts/data-model/handlers" label="Handlers" />
        </Statement>

        <Statement id="create-index" name="create index">
          <p className="text-text-secondary mb-4">
            Declare a secondary index, optionally <Code>unique</Code>, over one or more
            columns with a sort direction each. Parsed, but nothing past the parser runs
            it yet.
          </p>
          <CodeBlock language="rql" code={`create index open_orders on ns::orders { customer_id, status:desc };
create unique index order_ids on ns::orders { id }`} />
          <Callout variant="warning" title="Do not run create index in the playground">
            The playground build traps inside the physical planner with{' '}
            <Code>unreachable</Code> instead of returning an error. Use a primary key
            where you need uniqueness today.
          </Callout>
          <Details to="/docs/scripting/schema/indexes" label="Indexes" />
        </Statement>

        <Statement id="create-migration" name="create migration">
          <p className="text-text-secondary mb-4">
            Register a named, ordered schema change. The body runs when{' '}
            <Code>migrate</Code> reaches it; the optional <Code>rollback</Code> block is
            what <Code>rollback migration</Code> executes. Registering does not apply it.
          </p>
          <RqlCodeBlock code={`create migration '001_add_notes' {
  alter table ns::orders add column note: Option(utf8)
} rollback {
  alter table ns::orders drop column note
}`} />
          <Details to="/docs/scripting/migrations" label="Migrations" />
        </Statement>

        <Statement id="create-namespace" name="create namespace">
          <p className="text-text-secondary mb-4">
            Create the container every other object lives in. With{' '}
            <Code>if not exists</Code> an existing namespace is returned with{' '}
            <Code>created: false</Code> instead of an error.
          </p>
          <RqlCodeBlock code={`create namespace ns;
create namespace if not exists ns`} />
          <Details to="/docs/scripting/schema/namespaces" label="Namespaces" />
        </Statement>

        <Statement id="create-primary-key" name="create primary key">
          <p className="text-text-secondary mb-4">
            Declare the primary key of an existing table over one or more columns. It is
            the one index the engine maintains today.
          </p>
          <RqlCodeBlock code={`create primary key on ns::orders { id }`} />
          <Details to="/docs/scripting/schema/indexes" label="Indexes" />
        </Statement>

        <Statement id="create-procedure" name="create procedure">
          <p className="text-text-secondary mb-4">
            Store a named block of statements with typed parameters, invoked later with{' '}
            <Code>call</Code>. Parameters are read as <Code>$name</Code> inside the body.
          </p>
          <RqlCodeBlock code={`create procedure ns::mark_paid { order_id: int4 } as {
  update ns::orders { status: "paid" } filter { id == $order_id }
}`} />
          <Details to="/docs/scripting/procedures" label="Procedures" />
        </Statement>

        <Statement id="create-queue" name="create queue">
          <p className="text-text-secondary mb-4">
            Define a work queue with typed columns. The <Code>with</Code> block picks the
            dispatch mode (<Code>fifo</Code>, optionally partitioned) and may add{' '}
            <Code>deduplicate</Code>, <Code>retention</Code>, and <Code>retry</Code>{' '}
            settings.
          </p>
          <CodeBlock language="rql" code={`create queue ns::jobs { id: int4, payload: utf8 } with { fifo: {} }`} />
          <Callout variant="warning" title="Needs a newer engine than the playground runs">
            The playground build panics with <Code>unreachable</Code> on this statement
            instead of returning a typed error. Do not run it there.
          </Callout>
        </Statement>

        <Statement id="create-relationship" name="create relationship">
          <p className="text-text-secondary mb-4">
            Declare how a column in one table references a column in another, with a
            cardinality of <Code>1:1</Code>, <Code>N:1</Code>, <Code>1:N</Code>, or{' '}
            <Code>N:M</Code>. <Code>N:M</Code> requires a <Code>through</Code> junction
            table; the other cardinalities forbid one.
          </p>
          <CodeBlock language="rql" code={`create relationship order_customer on ns::orders(customer_id) references ns::customers(id) with { cardinality: "N:1" }`} />
          <Callout variant="warning" title="Needs a newer engine than the playground runs">
            The playground build panics with <Code>unreachable</Code> on this statement
            instead of returning a typed error. Do not run it there.
          </Callout>
        </Statement>

        <Statement id="create-ringbuffer" name="create ringbuffer">
          <p className="text-text-secondary mb-4">
            Define a store that keeps at most <Code>capacity</Code> rows and evicts the
            oldest on overflow. <Code>capacity</Code> is required.
          </p>
          <RqlCodeBlock code={`create ringbuffer ns::recent_errors { id: int4, message: utf8 } with { capacity: 100 }`} />
          <Details to="/docs/scripting/storage/ringbuffers" label="Ringbuffers" />
        </Statement>

        <Statement id="create-role" name="create role">
          <p className="text-text-secondary mb-4">
            Create a named role that users are granted into.
          </p>
          <RqlCodeBlock code={`create role editors`} />
          <Details to="/docs/scripting/access-control" label="Access Control" />
        </Statement>

        <Statement id="create-series" name="create series">
          <p className="text-text-secondary mb-4">
            Define a time-ordered store. <Code>with {'{'} key: col {'}'}</Code> is
            required and names the ordering column.
          </p>
          <RqlCodeBlock code={`create series ns::readings { ts: datetime, value: float8 } with { key: ts }`} />
          <Details to="/docs/scripting/storage/series" label="Series" />
        </Statement>

        <Statement id="create-service" name="create service">
          <p className="text-text-secondary mb-4">
            Register a non-human identity. It takes the same optional attribute block as{' '}
            <Code>create user</Code>.
          </p>
          <CodeBlock language="rql" code={`create service billing`} />
          <Callout variant="warning" title="Needs a newer engine than the playground runs">
            The playground build's parser panics on <Code>service</Code> (a trap in{' '}
            <Code>parse/create.rs</Code>), and its <Code>drop</Code> parser does not know
            the keyword at all (<Code>AST_005</Code>). Do not run it there.
          </Callout>
        </Statement>

        <Statement id="create-subscription" name="create subscription">
          <p className="text-text-secondary mb-4">
            Open a change stream over a query: every insert, update, and delete that
            affects the query's rows is appended to the stream with an operation tag.
          </p>
          <RqlCodeBlock code={`create subscription { id: int4 } as { from ns::orders }`} />
          <Callout variant="info" title="Needs a newer engine than the playground runs">
            The playground build has no subscription service and fails with{' '}
            <Code>INTERNAL_ERROR</Code> (SubscriptionService not registered).
          </Callout>
          <Details to="/docs/scripting/subscriptions" label="Subscriptions" />
        </Statement>

        <Statement id="create-table" name="create table">
          <p className="text-text-secondary mb-4">
            Create a table of typed columns. Column options such as{' '}
            <Code>auto_increment</Code> go in a per-column <Code>with</Code>; table
            options such as row TTL go in the trailing <Code>with</Code>.{' '}
            <Code>if not exists</Code> is accepted only before the name.
          </p>
          <RqlCodeBlock code={`create table ns::orders { id: int4, customer_id: int4, total: float8, status: utf8 };
create table if not exists ns::customers { id: int4, name: utf8 };
create table ns::tickets { id: int4 with { auto_increment }, title: utf8 };
create table ns::sessions { token: utf8 } with { row: { ttl: { duration: '30m' } } }`} />
          <Details to="/docs/scripting/schema/tables" label="Tables" />
        </Statement>

        <Statement id="create-policy" name="create ... policy">
          <p className="text-text-secondary mb-4">
            Attach rules to an object or to the session. A store policy (<Code>table</Code>,{' '}
            <Code>view</Code>, <Code>ringbuffer</Code>, <Code>series</Code>,{' '}
            <Code>dictionary</Code>, or <Code>namespace</Code> for everything in it)
            maps operation names to pipelines: <Code>from</Code> filters or masks reads,{' '}
            <Code>insert</Code>, <Code>update</Code>, and <Code>delete</Code> take a{' '}
            <Code>require</Code> block. <Code>procedure</Code> and <Code>function</Code>{' '}
            policies guard <Code>call</Code>; a <Code>session</Code> policy has no{' '}
            <Code>on</Code> target and guards <Code>query</Code>, <Code>command</Code>,{' '}
            <Code>admin</Code>, and <Code>subscription</Code>. <Code>feature</Code> and{' '}
            <Code>subscription</Code> policies parse too, but the engine accepts no
            operation name for them yet (<Code>CA_086</Code>), so only an empty body
            creates one.
          </p>
          <RqlCodeBlock code={`create table policy hide_drafts on ns::orders { from: { filter { status != "draft" } } };
create namespace policy ns_guard on ns { from: { filter { true } } };
create procedure policy paid_guard on ns::mark_paid { call: { require { true } } };
create session policy open_query { query: { require { true } } }`} />
          <Details to="/docs/concepts/data-model/policies" label="Policies" />
        </Statement>

        <Statement id="create-tag" name="create tag">
          <p className="text-text-secondary mb-4">
            Define a tagged union of variants with typed payloads, used to classify rows
            (for example the tag column of a series).
          </p>
          <RqlCodeBlock code={`create tag ns::origin { Sensor { location: utf8 }, Manual }`} />
          <Details to="/docs/concepts/data-model/tags" label="Tags" />
        </Statement>

        <Statement id="create-test" name="create test">
          <p className="text-text-secondary mb-4">
            Define a named test: a block of statements and assertions that runs in its
            own transaction and rolls back afterwards. <Code>create test procedure</Code>{' '}
            defines a helper callable only from tests.
          </p>
          <RqlCodeBlock code={`create test ns::orders_have_ids { from ns::orders | assert { id > 0 } };
create test procedure ns::seed as { insert ns::orders [{ id: 50, customer_id: 1, total: 1.0, status: "open" }] }`} />
          <Details to="/docs/scripting/testing" label="Testing" />
        </Statement>

        <Statement id="create-transactional-view" name="create transactional view">
          <p className="text-text-secondary mb-4">
            Define a view maintained inside the writing transaction: when a commit
            returns, the view is already current. In the playground build a bare{' '}
            <Code>create view</Code> is a synonym; in the current engine source it means
            a deferred view, so write the kind out. <Code>ringbuffer</Code> and{' '}
            <Code>series</Code> variants work as for deferred views.
          </p>
          <RqlCodeBlock code={`create transactional view ns::revenue { revenue: float8 } as {
  from ns::orders aggregate { revenue: math::sum(total) } by {}
};
create view ns::open_orders { id: int4, total: float8 } as {
  from ns::orders filter { status == "open" } map { id, total }
};
create transactional ringbuffer view ns::recent_open { id: int4 } with { capacity: 10 } as {
  from ns::orders filter { status == "open" } map { id }
}`} />
          <Details to="/docs/scripting/views/transactional" label="Transactional Views" />
        </Statement>

        <Statement id="create-user" name="create user">
          <p className="text-text-secondary mb-4">
            Register an identity. Attribute keys must be declared once with{' '}
            <Code>create user attribute</Code> before any user sets them.
          </p>
          <RqlCodeBlock code={`create user alice;
create user attribute org_id: utf8;
create user bob { org_id: "acme" }`} />
          <Details to="/docs/scripting/access-control" label="Access Control" />
        </Statement>

        <Statement id="delete" name="delete">
          <p className="text-text-secondary mb-4">
            Remove the rows a <Code>filter</Code> selects. The filter is mandatory
            (<Code>filter {'{'} true {'}'}</Code> is the explicit all-rows form);{' '}
            <Code>returning</Code> hands back the removed rows instead of a count.
          </p>
          <RqlCodeBlock code={`delete ns::orders filter { id == 3 };
delete ns::orders filter { id == 4 } returning { id }`} />
          <Details to="/docs/scripting/dml/delete" label="delete" />
        </Statement>

        <Statement id="describe" name="describe">
          <p className="text-text-secondary mb-4">
            Reserved for explaining a query instead of running it. The parser accepts a
            single query node inside the braces, but no engine build executes it yet.
          </p>
          <RqlCodeBlock code={`describe { from ns::orders }`} />
          <Callout variant="info" title="Needs a newer engine than the playground runs">
            The playground build rejects it at planning time with <Code>AST_009</Code>{' '}
            (unsupported query syntax: Describe), and a pipeline with more than one
            operator inside the braces fails to parse there (<Code>AST_005</Code>).
          </Callout>
        </Statement>

        <Statement id="dispatch" name="dispatch">
          <p className="text-text-secondary mb-4">
            Raise one variant of an event with its payload. Every handler on that variant
            runs before the statement returns; the result is the number of handlers that
            fired.
          </p>
          <RqlCodeBlock code={`dispatch ns::order_event::Placed { id: 1 }`} />
        </Statement>

        <Statement id="drop" name="drop">
          <p className="text-text-secondary mb-4">
            Remove an object by kind and name. <Code>if exists</Code> turns a missing
            object into a no-op, but never a missing namespace.{' '}
            <Code>drop namespace</Code> removes everything inside it.
          </p>
          <RqlCodeBlock code={`drop table if exists ns::sessions;
drop view ns::open_orders;
drop ringbuffer ns::recent_errors;
drop series ns::readings;
drop dictionary ns::symbols;
drop enum ns::status;
drop procedure ns::mark_paid;
drop handler ns::on_placed;
drop test ns::orders_have_ids;
drop table policy hide_drafts;
drop authentication for alice { method: token };
drop role editors;
drop user alice;
drop namespace ns`} />
          <Details to="/docs/scripting/schema/drop" label="Drop & Cleanup" />
        </Statement>

        <Statement id="for" name="for">
          <p className="text-text-secondary mb-4">
            Loop over a numeric range from <Code>gen::series</Code> or over the rows of a
            frame variable, with each row's columns reachable as <Code>$row.col</Code>.
            The frame must be bound with <Code>let</Code> first in the playground build.
          </p>
          <RqlCodeBlock code={`for $i in gen::series(1, 3) { insert ns::customers [{ id: $i + 10, name: "gen" }] };
let $rows = from ns::orders;
for $row in $rows { insert ns::customers [{ id: $row.id + 20, name: $row.status }] }`} />
          <Details to="/docs/rql/control-flow/for" label="For Loops" />
        </Statement>

        <Statement id="from" name="from">
          <p className="text-text-secondary mb-4">
            Start a query pipeline from a table, view, other store, inline rows, or a
            frame variable, then chain pipeline operators after it. The operators
            themselves (<Code>filter</Code>, <Code>map</Code>, <Code>sort</Code>,{' '}
            <Code>join</Code>, <Code>aggregate</Code>, ...) each have a page under{' '}
            <L to="/docs/rql/transforms">Pipeline Operators</L>.
          </p>
          <RqlCodeBlock code={`from ns::orders
filter { status == "open" }
sort { total: desc }
map { id, total }`} />
          <Details to="/docs/rql/transforms/from" label="from" />
        </Statement>

        <Statement id="grant" name="grant">
          <p className="text-text-secondary mb-4">
            Add a user to a role.
          </p>
          <RqlCodeBlock code={`grant editors to alice`} />
          <Details to="/docs/scripting/access-control" label="Access Control" />
        </Statement>

        <Statement id="if" name="if">
          <p className="text-text-secondary mb-4">
            Branch on a condition, with optional <Code>else if</Code> and{' '}
            <Code>else</Code>. As a statement it guards what runs; as the value of a{' '}
            <Code>let</Code> it yields the branch's last expression. Keep a statement
            branch to a single statement in the playground build: later statements in
            the block are dropped without an error.
          </p>
          <RqlCodeBlock code={`let $n = 2;
if $n > 1 { map { size: "big" } } else { map { size: "small" } };
let $label = if $n > 1 { "big" } else { "small" }`} />
          <Details to="/docs/rql/control-flow/conditionals" label="Conditionals" />
        </Statement>

        <Statement id="insert" name="insert">
          <p className="text-text-secondary mb-4">
            Write one or more records into a store. Fields are matched to columns by
            name; a field that matches no column is silently ignored.{' '}
            <Code>returning</Code> hands back the written rows instead of a count.
          </p>
          <RqlCodeBlock code={`insert ns::orders [
  { id: 1, customer_id: 1, total: 10.0, status: "open" },
  { id: 2, customer_id: 1, total: 20.0, status: "paid" }
];
insert ns::orders [{ id: 3, customer_id: 1, total: 5.0, status: "open" }] returning { id, total }`} />
          <Details to="/docs/scripting/dml/insert" label="insert" />
        </Statement>

        <Statement id="let" name="let">
          <p className="text-text-secondary mb-4">
            Bind a value to a <Code>$</Code>-prefixed name for the rest of the request.
            The value is an expression or a bare <Code>from</Code>, which captures a
            whole result set that <Code>from $var</Code> and <Code>for</Code> can read
            back.
          </p>
          <RqlCodeBlock code={`let $threshold = 15;
let $rows = from ns::orders;
from $rows filter { total > $threshold }`} />
          <Callout variant="warning" title="Bind a bare from, not a filtered pipeline">
            In the playground build, binding <Code>let $x = from t filter {'{'} ... {'}'}</Code>{' '}
            and then scanning <Code>from $x</Code> panics with <Code>unreachable</Code>.
            Bind the bare <Code>from</Code> and filter after <Code>from $x</Code>.
          </Callout>
          <Details to="/docs/rql/variables" label="Variables" />
        </Statement>

        <Statement id="loop" name="loop">
          <p className="text-text-secondary mb-4">
            Repeat a block until a <Code>break</Code> inside it runs. There is no
            condition, so a loop without a reachable <Code>break</Code> never ends.
          </p>
          <RqlCodeBlock code={`let $i = 0;
loop { $i = $i + 1; if $i >= 3 { break } };
map { i: $i }`} />
          <Details to="/docs/rql/control-flow/loop" label="Loop, Break & Continue" />
        </Statement>

        <Statement id="map" name="map">
          <p className="text-text-secondary mb-4">
            On its own, evaluate expressions into a one-row frame: the way to print a
            variable or compute a value. After a <Code>from</Code> it projects each row.
          </p>
          <RqlCodeBlock code={`map { answer: 6 * 7 }`} />
          <Details to="/docs/rql/transforms/map" label="map" />
        </Statement>

        <Statement id="match" name="match">
          <p className="text-text-secondary mb-4">
            Pick one of several values. With a subject, arms compare against it; without
            one, each arm is a condition. <Code>else</Code> is the fallback arm and arms
            use <Code>=&gt;</Code>.
          </p>
          <RqlCodeBlock code={`let $n = 2;
let $word = match $n { 1 => "one", 2 => "two", else => "many" };
let $size = match { $n > 1 => "big", else => "small" };
map { word: $word, size: $size }`} />
          <Details to="/docs/rql/control-flow/match" label="Match" />
        </Statement>

        <Statement id="migrate" name="migrate">
          <p className="text-text-secondary mb-4">
            Apply every registered migration that has not run yet, in the order they were
            registered, and return how many ran. <Code>migrate to</Code> stops after the
            named one. Running it again applies nothing.
          </p>
          <RqlCodeBlock code={`migrate;
migrate to '001_add_notes'`} />
          <Details to="/docs/scripting/migrations" label="Migrations" />
        </Statement>

        <Statement id="output" name="output">
          <p className="text-text-secondary mb-4">
            Prefix a statement to mark its result for output when it is not the last
            statement of the request. The playground build returns a single merged frame
            for the two statements below rather than one frame each, so do not rely on
            the shape of what comes back.
          </p>
          <RqlCodeBlock code={`output map { a: 1 };
map { b: 2 }`} />
        </Statement>

        <Statement id="patch" name="patch">
          <p className="text-text-secondary mb-4">
            Pipeline operator that sets columns on each row, adding a column when the
            name is new and overwriting it when it already exists (where{' '}
            <Code>extend</Code> would fail on the collision).
          </p>
          <RqlCodeBlock code={`from ns::orders patch { total: total * 2 }`} />
          <Details to="/docs/rql/transforms/patch" label="patch" />
        </Statement>

        <Statement id="return" name="return">
          <p className="text-text-secondary mb-4">
            Leave a <Code>udf</Code> body with a value. A <Code>return</Code> inside an{' '}
            <Code>if</Code> branch exits the whole function.
          </p>
          <RqlCodeBlock code={`udf check($v) { if $v > 100 { return "large" }; return "small" };
map { size: check(250) }`} />
          <Details to="/docs/rql/control-flow/closures" label="Closures & Functions" />
        </Statement>

        <Statement id="revoke" name="revoke">
          <p className="text-text-secondary mb-4">
            Remove a user from a role.
          </p>
          <RqlCodeBlock code={`revoke editors from alice`} />
          <Details to="/docs/scripting/access-control" label="Access Control" />
        </Statement>

        <Statement id="rollback-migration" name="rollback migration">
          <p className="text-text-secondary mb-4">
            Revert the most recently applied migration by running its{' '}
            <Code>rollback</Code> block; a migration without one cannot be reverted.{' '}
            <Code>rollback migration to</Code> reverts back to the named one.
          </p>
          <RqlCodeBlock code={`rollback migration;
rollback migration to '001_add_notes'`} />
          <Details to="/docs/scripting/migrations" label="Migrations" />
        </Statement>

        <Statement id="run-tests" name="run tests">
          <p className="text-text-secondary mb-4">
            Execute tests and return one row per test with its outcome.{' '}
            <Code>run tests</Code> runs everything, <Code>run tests ns</Code> one
            namespace, <Code>run test</Code> a single test. The result is an ordinary
            frame, so pipe it into <Code>map</Code> or <Code>filter</Code>.
          </p>
          <RqlCodeBlock code={`run tests;
run tests ns;
run test ns::orders_have_ids | map { name, outcome }`} />
          <Details to="/docs/scripting/testing" label="Testing" />
        </Statement>

        <Statement id="udf" name="udf">
          <p className="text-text-secondary mb-4">
            Define a named function for the rest of the request: parameters are{' '}
            <Code>$</Code>-variables, the body is a block that ends with{' '}
            <Code>return</Code>, and it is called like a built-in. Unlike a procedure it
            is not stored in the catalog.
          </p>
          <RqlCodeBlock code={`udf double($x) { return $x * 2 };
map { v: double(21) }`} />
          <Details to="/docs/rql/control-flow/closures" label="Closures & Functions" />
        </Statement>

        <Statement id="update" name="update">
          <p className="text-text-secondary mb-4">
            Set the listed fields on the rows a <Code>filter</Code> selects and leave
            every other column alone. The filter is mandatory; <Code>returning</Code>{' '}
            hands back the changed rows instead of a count.
          </p>
          <RqlCodeBlock code={`update ns::orders { status: "paid" } filter { id == 1 };
update ns::orders { status: "open" } filter { id == 1 } returning { id, status }`} />
          <Details to="/docs/scripting/dml/update" label="update" />
        </Statement>

        <Statement id="while" name="while">
          <p className="text-text-secondary mb-4">
            Repeat a block while a condition stays true. The condition is checked before
            every iteration, so a false condition runs the body zero times.
          </p>
          <RqlCodeBlock code={`let $i = 0;
while $i < 3 { $i = $i + 1 };
map { i: $i }`} />
          <Details to="/docs/rql/control-flow/while" label="While Loops" />
        </Statement>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Not listed: experimental statements</h2>
          <p className="text-text-secondary mb-4">
            The parser also knows <Code>create remote namespace</Code> and{' '}
            <Code>alter remote namespace</Code>, <Code>create source</Code>,{' '}
            <Code>create sink</Code>, <Code>create http binding</Code>,{' '}
            <Code>create grpc binding</Code>, <Code>create ws binding</Code>, and their{' '}
            <Code>drop</Code> forms. They belong to experimental features that the
            playground build does not run, so they have no skeleton here; see{' '}
            <L to="/docs/resources/roadmap">Roadmap &amp; Experimental</L>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
