import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { CodeBlock, Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

export function RustEmbeddedClientPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Rust (Embedded)</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <Code>reifydb</Code> crate is the whole engine as a library. Add one
            dependency and your process owns a database: no server, no ports, no login,
            no serialization across a wire. This is the reference surface - every other
            client ultimately reaches the same engine this crate hands you directly. The
            API is synchronous; you do not need tokio or any async runtime to use it.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Installation</h2>
          <p className="text-text-secondary mb-4">
            One line in <Code>Cargo.toml</Code>. The crate is versioned in lockstep with
            the engine, because it <em>is</em> the engine:
          </p>
          <CodeBlock
            language="toml"
            code={`[dependencies]
reifydb = "0.8.1"`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The default feature set is the plain embedded engine: storage, transactions,
            RQL, events and handlers. Larger subsystems are opt-in Cargo features:{' '}
            <Code>sub_flow</Code> enables the streaming flow engine, which powers views
            and the in-process subscriptions shown below; <Code>sub_tracing</Code>,{' '}
            <Code>sub_profiler</Code>, <Code>sub_replication</Code>, and{' '}
            <Code>sub_raft</Code> add their respective subsystems. The{' '}
            <Code>sub_server_*</Code> features turn the same crate into the network
            server (<Code>server::memory()</Code> and friends) - that surface is covered
            on <DocLink to="/docs/clients">Clients</DocLink> and{' '}
            <DocLink to="/docs/connect">Connect</DocLink>, not here. If you want live
            subscriptions in-process, enable the flow engine:
          </p>
          <CodeBlock
            language="toml"
            code={`[dependencies]
reifydb = { version = "0.8.1", features = ["sub_flow"] }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Building a database</h2>
          <p className="text-text-secondary mb-4">
            Everything starts in the <Code>embedded</Code> module. Three factories choose
            the storage backend, each returning an <Code>EmbeddedBuilder</Code> whose{' '}
            <Code>build()</Code> produces a running <Code>Database</Code>:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{SqliteConfig, embedded};

// In memory only. Fast, and nothing survives the process.
let db = embedded::memory().build()?;

// Buffered SQLite persistence: commits are visible immediately,
// a background flusher migrates them to disk.
let db = embedded::sqlite(SqliteConfig::new("/var/lib/myapp/data")).build()?;

// No in-memory buffer: every commit is written to SQLite
// before it returns. Durable at commit, slower to write.
let db = embedded::sqlite_without_buffer(SqliteConfig::new("/var/lib/myapp/data")).build()?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>SqliteConfig::new(path)</Code> is the sensible default (WAL journal,
            normal synchronous mode). <Code>SqliteConfig::safe(path)</Code> trades speed
            for full synchronous writes, <Code>SqliteConfig::fast(path)</Code> does the
            opposite, and every field (journal mode, cache size, page size, mmap size,
            read pool size, and more) has a builder-style setter if the presets do not
            fit. What each backend actually persists, the write path, and exactly what
            survives a restart are documented on{' '}
            <DocLink to="/docs/concepts/durability">Durability &amp; Storage</DocLink> -
            the short version is that RQL behaves identically on all three; only the fate
            of committed bytes differs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Commands, queries, and admin</h2>
          <p className="text-text-secondary mb-4">
            Statements come in the same three kinds every ReifyDB surface uses: a{' '}
            <em>query</em> reads, a <em>command</em> writes data, and an <em>admin</em>{' '}
            statement changes schema or identities. The <Code>Database</Code> exposes one
            method per kind, each taking an RQL string and parameters and returning{' '}
            <Code>Result&lt;Vec&lt;Frame&gt;&gt;</Code>:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{Params, embedded};

fn main() -> Result<(), reifydb::Error> {
    let mut db = embedded::memory().build()?;

    // Admin: schema changes.
    db.admin_as_root("CREATE NAMESPACE app", Params::None)?;
    db.admin_as_root(
        "CREATE TABLE app::users { id: Int4, name: Utf8 }",
        Params::None,
    )?;

    // Command: writes.
    db.command_as_root(
        r#"INSERT app::users [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ]"#,
        Params::None,
    )?;

    // Query: reads.
    let frames = db.query_as_root("FROM app::users", Params::None)?;
    for frame in frames {
        println!("{}", frame);
    }

    db.stop()?;
    Ok(())
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>_as_root</Code> variants run as the root identity, which is the
            right default for a process that owns its database. Each has an{' '}
            <Code>_as(identity, ...)</Code> twin - <Code>query_as</Code>,{' '}
            <Code>command_as</Code>, <Code>admin_as</Code> - that executes as a specific{' '}
            <Code>IdentityId</Code> instead. There is no login anywhere: authentication
            gates the network boundary, and an embedded database has none. Your process
            holds the engine and simply chooses which identity each operation runs as.
          </p>
          <p className="text-text-secondary mb-4">
            Errors are <Code>reifydb::Error</Code>, a wrapper around the engine's
            diagnostic: a stable code (<Code>TXN_001</Code> is a transaction conflict), a
            message, the offending RQL fragment, and often a help text.{' '}
            <Code>Display</Code> renders the full diagnostic, and it implements{' '}
            <Code>std::error::Error</Code>, so <Code>?</Code> composes with whatever
            error handling your application already has.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary mb-4">
            Every execution method takes <Code>impl Into&lt;Params&gt;</Code>.{' '}
            <Code>Params::None</Code> means no parameters; positional parameters are
            referenced as <Code>$1</Code>, <Code>$2</Code>, ... (1-based) and built from
            a <Code>Vec</Code> or array of <Code>Value</Code>s; named parameters are
            referenced as <Code>$name</Code> and built from a{' '}
            <Code>HashMap&lt;String, Value&gt;</Code>:
          </p>
          <CodeBlock
            language="rust"
            code={`use std::collections::HashMap;

use reifydb::Value;

// Positional: $1, $2, ...
let frames = db.query_as_root(
    "MAP { total: $1 + $2 }",
    [Value::Int4(40), Value::Int4(2)],
)?;

// Named: $name
let mut params = HashMap::new();
params.insert("name".to_string(), Value::Utf8("Alice".to_string()));
let frames = db.query_as_root(
    "FROM app::users FILTER name == $name",
    params,
)?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Use parameters for anything that originates outside your program. String
            concatenation into RQL has the same injection problem it has in SQL;
            parameters are typed values and never re-parsed as syntax.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Sessions and conflict retries</h2>
          <p className="text-text-secondary mb-4">
            The direct <Code>command_as_root</Code> call executes exactly once: if two
            concurrent{' '}
            <DocLink to="/docs/concepts/transactions">transactions</DocLink> conflict,
            the loser gets a <Code>TXN_001</Code> error back and it is your problem. A{' '}
            <Code>Session</Code> bundles an identity with a retry strategy so contended
            write paths handle this for you. <Code>db.root_session()</Code> creates one
            as root, <Code>db.session(identity)</Code> as anyone else:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{Params, RetryStrategy};

let session = db.root_session();

// Commands and admin statements retry on transaction conflicts
// (up to 10 attempts with jittered exponential backoff by default).
let result = session.command(
    r#"UPDATE app::users { name: "Alicia" } FILTER id == 1"#,
    Params::None,
);
if let Some(e) = result.error {
    eprintln!("command failed: {}", e);
} else {
    for frame in result.frames {
        println!("{}", frame);
    }
}

// Opt out, or tune the strategy:
let session = db.root_session().with_retry(RetryStrategy::no_retry());`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Session methods return an <Code>ExecutionResult</Code> with{' '}
            <Code>frames</Code>, an optional <Code>error</Code>, and execution{' '}
            <Code>metrics</Code>, rather than a <Code>Result</Code>. Only genuine
            conflicts (<Code>TXN_001</Code>) are retried - any other error returns
            immediately, and <Code>query</Code> never retries because reads do not
            conflict. The default strategy is 10 attempts with jittered exponential
            backoff from 5ms up to a 200ms cap; <Code>RetryStrategy</Code> also offers{' '}
            <Code>no_retry()</Code>, <Code>with_fixed_backoff</Code>,{' '}
            <Code>with_exponential_backoff</Code>, and <Code>with_jittered_backoff</Code>{' '}
            constructors, and the <Code>Backoff</Code> enum if you want to assemble one
            by hand.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Mapping rows to structs</h2>
          <p className="text-text-secondary mb-4">
            Results arrive as <Code>Frame</Code>s: columnar tables with named, typed
            columns. <Code>Display</Code> renders one as the ASCII table you see in every
            example, <Code>frame.columns</Code> gives raw columnar access, and{' '}
            <Code>frame.to_rows()</Code> pivots to per-row <Code>(name, Value)</Code>{' '}
            pairs. For application code, derive <Code>FromFrame</Code> and skip the
            column-walking entirely:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{FromFrame, Params};

#[derive(FromFrame, Debug)]
struct User {
    id: i32,
    name: String,
}

let frames = db.query_as_root("FROM app::users", Params::None)?;
for frame in &frames {
    let users: Vec<User> = User::from_frame(frame).unwrap();
    for user in &users {
        println!("{}: {}", user.id, user.name);
    }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Field names must match column names and field types must match column types
            (<Code>Int4</Code> to <Code>i32</Code>, <Code>Utf8</Code> to{' '}
            <Code>String</Code>, and so on). Attributes adjust the mapping:{' '}
            <Code>#[frame(column = "other_name")]</Code> reads a differently named
            column, <Code>#[frame(optional)]</Code> makes the field an{' '}
            <Code>Option</Code> that tolerates missing columns and none values,{' '}
            <Code>#[frame(coerce)]</Code> allows widening type coercion, and{' '}
            <Code>#[frame(skip)]</Code> fills the field from <Code>Default</Code>{' '}
            instead of the frame. Failures return a <Code>FromFrameError</Code> naming
            the exact column and row that did not fit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">In-process subscriptions</h2>
          <p className="text-text-secondary mb-4">
            With the <Code>sub_flow</Code> feature enabled, the embedded database
            delivers live changes without any socket.{' '}
            <Code>subscribe_as_root(query, params, hydration)</Code> (and{' '}
            <Code>subscribe_as</Code> for other identities) creates a{' '}
            <DocLink to="/docs/concepts/data-model/subscriptions">subscription</DocLink>{' '}
            over an RQL body and returns a handle you drain:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{HydrationConfig, Params};

let sub = db.subscribe_as_root(
    "from app::users | map { id, name }",
    Params::None,
    HydrationConfig::default(),
)?;

db.command_as_root(
    r#"INSERT app::users [{ id: 3, name: "Carol" }]"#,
    Params::None,
)?;

// Non-blocking: returns whatever has been delivered so far.
for frame in sub.drain(usize::MAX) {
    println!("{}", frame);
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            With <Code>HydrationConfig::default()</Code> the current snapshot of the
            source is delivered first, so subscribing to an already-populated table
            still observes every existing row before forward changes; set{' '}
            <Code>enabled: false</Code> to receive only changes committed after the
            subscription exists. Each delivered row carries an <Code>_op</Code> column
            (insert = 1, update = 2, remove = 3). <Code>drain(max)</Code> is
            non-blocking and delivery is asynchronous - a real consumer polls it in a
            loop. Subscriptions are persistent objects: after a <Code>stop()</Code> and
            reopen, re-attach to the same subscription with{' '}
            <Code>db.subscription(id)</Code> (the old handle is stale; the id comes from{' '}
            <Code>sub.id()</Code>).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Builder options</h2>
          <p className="text-text-secondary mb-4">
            <Code>EmbeddedBuilder</Code> configures everything the engine loads before{' '}
            <Code>build()</Code>. The full surface today:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_migrations(source)</Code> - register schema migrations,
                applied during <Code>build()</Code>. See below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_config(key, value)</Code> / <Code>with_configs(...)</Code> -
                set system configuration at bootstrap, such as the{' '}
                <Code>ConfigKey::Threads*</Code> pool sizes. Applied on every build,
                overwriting previously persisted values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_runtime_config(RuntimeConfig)</Code> - the process runtime
                (clock and rng); the default is right unless you are injecting a mock
                clock in tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_routines(...)</Code> and <Code>with_handlers(...)</Code> -
                register native Rust functions and{' '}
                <DocLink to="/docs/concepts/data-model/handlers">handlers</DocLink> that
                RQL can call.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_transforms(...)</Code> - register custom transform operators
                with the extension registry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_procedure_dir(dir)</Code> (native targets) and{' '}
                <Code>with_wasm_procedure_dir(dir)</Code> - load{' '}
                <DocLink to="/docs/concepts/data-model/procedures">procedures</DocLink>{' '}
                from a directory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_auth(...)</Code> - configure the auth service (relevant
                mostly when the same builder later grows server subsystems).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>with_fast_shutdown()</Code> - skip the drain-and-flush pass on
                stop and drop. Right for throwaway test databases, wrong for anything
                whose data you want back.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Feature-gated subsystem hooks: <Code>with_flow(...)</Code>{' '}
                (<Code>sub_flow</Code>, custom flow operators),{' '}
                <Code>with_tracing(...)</Code> (<Code>sub_tracing</Code>),{' '}
                <Code>with_profiler(...)</Code> (<Code>sub_profiler</Code>),{' '}
                <Code>with_replication(...)</Code> (<Code>sub_replication</Code>), and
                the generic <Code>with_subsystem(factory)</Code>. Transaction
                interceptors hook in through the same builder as well.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            Notably absent: WebSocket or HTTP options. Those belong to the{' '}
            <Code>server::</Code> builder, which is the same crate behind the{' '}
            <Code>sub_server_*</Code> features. Swapping <Code>embedded::</Code> for{' '}
            <Code>server::</Code> keeps your in-process calls working and additionally
            serves remote clients.
          </p>
          <p className="text-text-secondary mb-4">
            Migrations are worth showing. A <Code>Migration</Code> is a named list of
            statements (optionally with a rollback body); a directory of{' '}
            <Code>.rql</Code> files works too and is loaded in file-name order.
            Migrations are recorded in the database on first encounter and applied in
            name order; already-applied ones are skipped, so the same builder code is
            safe to run on every start:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{Migration, SqliteConfig, embedded};

let db = embedded::sqlite(SqliteConfig::new("/var/lib/myapp/data"))
    .with_migrations(vec![
        Migration::new("001_create_app", vec![
            "CREATE NAMESPACE app",
            "CREATE TABLE app::users { id: Int4, name: Utf8 }",
        ]),
    ])
    .build()?;

// Or from a directory of .rql files, applied in file-name order:
// embedded::sqlite(config).with_migrations("migrations/").build()?;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Shutting down</h2>
          <p className="text-text-secondary mb-4">
            <Code>db.stop()</Code> is the clean shutdown: it drains the change-log
            consumers, flushes every committed write to the persistent store, and stops
            all subsystems. After a clean stop, a reopen of a SQLite-backed database
            sees every commit - the flush interval only matters for crashes, as{' '}
            <DocLink to="/docs/concepts/durability">Durability &amp; Storage</DocLink>{' '}
            explains. Dropping a running <Code>Database</Code> attempts the same
            graceful shutdown, so even <Code>drop(db)</Code> or falling off the end of{' '}
            <Code>main</Code> is safe; calling <Code>stop()</Code> yourself just makes
            the intent (and any error) explicit. <Code>stop_fast()</Code> and the{' '}
            <Code>with_fast_shutdown()</Code> builder flag skip the drain for throwaway
            databases.
          </p>
          <p className="text-text-secondary mb-4">
            For a long-running process, <Code>db.start_and_await_signal()</Code> blocks
            until SIGINT, SIGTERM, SIGQUIT, or SIGHUP arrives and then runs the clean
            shutdown; <Code>await_signal_with_shutdown(closure)</Code> lets you run
            your own teardown first.
          </p>
        </section>

        <Callout variant="tip" title="Where next">
          The <Code>examples</Code> directory in the ReifyDB repository is a set of
          runnable programs covering everything on this page and more - tables, enums,
          events and handlers, storage backends, interceptors, and export. If your
          architecture outgrows a single process, the{' '}
          <DocLink to="/docs/clients/rust">Rust client</DocLink> speaks to a server with
          the same three statement kinds, and <DocLink to="/docs/connect">Connect</DocLink>{' '}
          shows the shortest path to a running server.
        </Callout>
      </div>
    </Layout>
  );
}
