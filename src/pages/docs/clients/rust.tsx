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

export function RustClientPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Rust (Client)</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <Code>reifydb-client</Code> crate talks to a running ReifyDB server. Where{' '}
            <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink> hands you
            the engine in-process, this crate speaks the wire protocol: WebSocket for
            long-lived connections with live subscriptions, HTTP for plain
            request/response. Both transports run the same three statement kinds as every
            other surface - queries read, commands write, admin statements change schema
            and identities - and both return results as the same <Code>Frame</Code> type
            the embedded API uses. The client is async and runs on tokio.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Installation</h2>
          <p className="text-text-secondary mb-4">
            Transports are opt-in Cargo features and the default feature set is empty, so
            a bare <Code>reifydb-client = "0.8.1"</Code> compiles but exposes no client
            at all. Pick at least one transport:
          </p>
          <CodeBlock
            language="toml"
            code={`[dependencies]
reifydb-client = { version = "0.8.1", features = ["ws"] }
tokio = { version = "1", features = ["full"] }

# Or request/response only:
# reifydb-client = { version = "0.8.1", features = ["http"] }

# Both work together:
# reifydb-client = { version = "0.8.1", features = ["ws", "http"] }`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>ws</Code> feature provides <Code>WsClient</Code>, the{' '}
            <Code>http</Code> feature provides <Code>HttpClient</Code>. A{' '}
            <Code>grpc</Code> feature with a <Code>GrpcClient</Code> exists as well, but
            the stock <Code>reifydb</Code> server binary only wires up HTTP and
            WebSocket, so gRPC is only relevant if you assemble your own server with the
            gRPC subsystem enabled. The crate is versioned in lockstep with the engine:
            pair a 0.8.x client with a 0.8.x server.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Connecting</h2>
          <p className="text-text-secondary mb-4">
            Both clients connect with a URL and a{' '}
            <Code>WireFormat</Code> (<Code>Json</Code> is the readable default,{' '}
            <Code>Rbcf</Code> the binary alternative - see below). Against the default
            server the WebSocket endpoint is <Code>ws://localhost:8091</Code> and the
            HTTP endpoint is <Code>http://localhost:8090</Code>;{' '}
            <DocLink to="/docs/connect">Connect</DocLink> covers the port layout and the
            loopback-only admin listeners:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::{WireFormat, WsClient};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = WsClient::connect("ws://localhost:8091", WireFormat::Json).await?;

    let frames = client.query("MAP { answer: 42 }", None).await?;
    for frame in frames {
        println!("{}", frame);
    }

    client.close().await?;
    Ok(())
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>WsClient::connect</Code> opens one persistent socket and spawns a
            background task that owns it, so it must be created inside a tokio runtime.
            That one connection carries everything: queries, commands, binding calls, and
            subscription pushes. <Code>close()</Code> shuts it down gracefully; dropping
            the client attempts the same best-effort shutdown.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>HttpClient</Code> is the request/response equivalent - each statement
            is one HTTP POST, which suits scripts, serverless functions, and anywhere a
            long-lived socket is awkward. It carries the same query, command, admin, and
            login surface, but no subscriptions and no binding calls:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::{HttpClient, WireFormat};

let client = HttpClient::connect("http://localhost:8090", WireFormat::Json).await?;

let frames = client.query("MAP { answer: 42 }", None).await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>HttpClient</Code> builds its own connection pool with a 30 second
            request timeout; <Code>HttpClient::with_client(reqwest_client, url, format)</Code>{' '}
            reuses an existing <Code>reqwest::Client</Code> if your application already
            has one.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Authentication</h2>
          <p className="text-text-secondary mb-4">
            A fresh connection runs as the anonymous identity; what that identity may do
            is decided by policies on the server. To act as a real user, log in with
            whichever method the user has (creating users and their credentials is an
            admin operation, shown on <DocLink to="/docs/connect">Connect</DocLink>):
          </p>
          <CodeBlock
            language="rust"
            code={`// Password login: returns a session token plus the identity UUID.
let login = client.login_with_password("alice", "alice-pass").await?;
println!("token: {}, identity: {}", login.token, login.identity);

// Token login for users with token credentials:
let login = client.login_with_token("bob-secret-token").await?;

// Resume an existing session on a new connection:
client.authenticate(&login.token).await?;

// Revoke the session token server-side:
client.logout().await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Both login methods return a <Code>LoginResult</Code> with the session{' '}
            <Code>token</Code> and the <Code>identity</Code> UUID; every subsequent
            statement on the connection runs as that identity. The lower-level{' '}
            <Code>login(method, credentials)</Code> takes the method name and a{' '}
            <Code>HashMap</Code> of credential fields directly, and{' '}
            <Code>is_authenticated()</Code> reports the current state. One transport
            difference: on <Code>WsClient</Code>, <Code>authenticate(token)</Code> is
            async and validates the token with the server immediately; on{' '}
            <Code>HttpClient</Code> it is a plain setter that records the bearer token,
            which is then sent (and checked) with every request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Queries and commands</h2>
          <p className="text-text-secondary mb-4">
            <Code>query(rql, params)</Code> reads, <Code>command(rql, params)</Code>{' '}
            writes. Both take an <Code>Option&lt;Params&gt;</Code> and return{' '}
            <Code>Result&lt;Vec&lt;Frame&gt;, Error&gt;</Code> - the same columnar{' '}
            <Code>Frame</Code> the embedded API returns, with <Code>Display</Code>{' '}
            rendering the familiar ASCII table:
          </p>
          <CodeBlock
            language="rust"
            code={`client.command(
    r#"INSERT app::users [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ]"#,
    None,
).await?;

let frames = client.query("FROM app::users", None).await?;
for frame in frames {
    println!("{}", frame);
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Each method has a <Code>_with_meta</Code> twin -{' '}
            <Code>query_with_meta</Code>, <Code>command_with_meta</Code>,{' '}
            <Code>admin_with_meta</Code> - that returns the frames together with
            server-reported metadata: a request fingerprint and the server-side
            execution duration (over HTTP these arrive as <Code>x-fingerprint</Code> and{' '}
            <Code>x-duration</Code> response headers).
          </p>
          <p className="text-text-secondary mb-4">
            <Code>WsClient</Code> additionally has{' '}
            <Code>call(name, params)</Code>, which invokes a WS binding - a{' '}
            <DocLink to="/docs/concepts/data-model/procedures">procedure</DocLink>{' '}
            published under a globally-unique name with <Code>CREATE WS BINDING</Code> -
            without shipping any RQL text from the client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Admin statements</h2>
          <p className="text-text-secondary mb-4">
            The application endpoints (8090/8091) accept queries and commands only;
            admin statements such as <Code>CREATE TABLE</Code> are rejected there. The
            client's <Code>admin(rql, params)</Code> method works when the connection
            points at an admin listener, which the default server keeps on loopback
            (<Code>ws://127.0.0.1:9091</Code> for WebSocket,{' '}
            <Code>http://127.0.0.1:9090</Code> for HTTP - see{' '}
            <DocLink to="/docs/connect">Connect</DocLink>):
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::{WireFormat, WsClient};

// Same client type, admin listener. Loopback only by default.
let mut admin = WsClient::connect("ws://127.0.0.1:9091", WireFormat::Json).await?;
admin.authenticate(&token).await?;

admin.admin("CREATE NAMESPACE app", None).await?;
admin.admin("CREATE TABLE app::users { id: Int4, name: Utf8 }", None).await?;

admin.close().await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Admin listeners accept all three statement kinds, so a migration script can
            run its schema changes and seed data over one connection. The split exists
            so frontends can face the public ports while schema and identity changes
            stay reachable only from the machine itself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary mb-4">
            <Code>Params</Code> is the same type the embedded API uses, re-exported by
            this crate. The client methods take <Code>Option&lt;Params&gt;</Code>:{' '}
            <Code>None</Code> means no parameters, positional parameters are referenced
            as <Code>$1</Code>, <Code>$2</Code>, ... and built from a{' '}
            <Code>Vec&lt;Value&gt;</Code>, named parameters as <Code>$name</Code> from a{' '}
            <Code>HashMap&lt;String, Value&gt;</Code>:
          </p>
          <CodeBlock
            language="rust"
            code={`use std::collections::HashMap;

use reifydb_client::Value;

// Positional: $1, $2, ...
let frames = client.query(
    "MAP { total: $1 + $2 }",
    Some(vec![Value::Int4(40), Value::Int4(2)].into()),
).await?;

// Named: $name
let mut params = HashMap::new();
params.insert("name".to_string(), Value::Utf8("Alice".to_string()));
let frames = client.query(
    "FROM app::users FILTER name == $name",
    Some(params.into()),
).await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            On the wire, each parameter travels as a typed <Code>{'{type, value}'}</Code>{' '}
            pair, never as spliced RQL text - use parameters for anything that
            originates outside your program, exactly as you would to prevent SQL
            injection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Mapping rows to structs</h2>
          <p className="text-text-secondary mb-4">
            The crate re-exports the same <Code>FromFrame</Code> derive the embedded
            crate ships, so typed row extraction works identically on both sides of the
            wire:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::FromFrame;

#[derive(FromFrame, Debug)]
struct User {
    id: i32,
    name: String,
}

let frames = client.query("FROM app::users", None).await?;
for frame in &frames {
    let users: Vec<User> = User::from_frame(frame).unwrap();
    for user in &users {
        println!("{}: {}", user.id, user.name);
    }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Field names and types must match the frame's columns, and the{' '}
            <Code>#[frame(...)]</Code> attributes (<Code>column</Code>,{' '}
            <Code>optional</Code>, <Code>coerce</Code>, <Code>skip</Code>) adjust the
            mapping. The full mapping rules are documented on{' '}
            <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink> and apply
            unchanged here.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Subscriptions</h2>
          <p className="text-text-secondary mb-4">
            Subscriptions need the persistent connection, so they are{' '}
            <Code>WsClient</Code> only. <Code>subscribe(rql, config)</Code> registers a
            live{' '}
            <DocLink to="/docs/concepts/data-model/subscriptions">subscription</DocLink>{' '}
            over an RQL body and returns its id; changes are then pushed to the client
            and drained with <Code>recv()</Code>:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::{ChangeKind, SubscriptionConfig, WireFormat, WsClient};

let mut client = WsClient::connect("ws://localhost:8091", WireFormat::Json).await?;
client.authenticate(&token).await?;

let sub_id = client
    .subscribe("from app::users | map { id, name }", SubscriptionConfig::default())
    .await?;

// recv() waits for the next change; try_recv() polls without blocking.
while let Some(change) = client.recv().await {
    match change.kind {
        ChangeKind::Insert => print!("insert: "),
        ChangeKind::Update => print!("update: "),
        ChangeKind::Remove => print!("remove: "),
    }
    if let Some(frames) = change.frames {
        for frame in frames {
            println!("{}", frame);
        }
    }
}

client.unsubscribe(&sub_id).await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Each <Code>ChangePayload</Code> carries the <Code>subscription_id</Code> it
            belongs to, the change <Code>kind</Code> (insert, update, or remove), and
            the affected rows as decoded <Code>frames</Code>. The client derives the
            kind from the <Code>_op</Code> column the server attaches and strips that
            column before handing you the frames, so the rows look exactly like query
            results.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>SubscriptionConfig</Code> controls delivery.{' '}
            <Code>hydration.enabled</Code> defaults to <Code>true</Code>: the current
            contents of the source are delivered first, so subscribing to a populated
            table observes every existing row before forward changes;{' '}
            <Code>hydration.max_rows</Code> caps that snapshot. <Code>throttle</Code>{' '}
            sets a minimum interval between pushes, with changes buffered and delivered
            together when the interval elapses; <Code>linger</Code> holds a member's
            changes for a short window so closely-spaced changes coalesce into one
            envelope, and only takes effect inside a batch subscription. Both take{' '}
            <Code>Duration</Code> values:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::{HydrationConfig, SubscriptionConfig};

// Only changes committed after the subscription exists:
let config = SubscriptionConfig {
    hydration: HydrationConfig { enabled: false, max_rows: None },
    throttle: None,
    linger: None,
};
let sub_id = client.subscribe("from app::users", config).await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Under the hood the client wraps your query body in a{' '}
            <Code>CREATE SUBSCRIPTION WITH {'{ ... }'} AS {'{ body }'}</Code> statement,
            so the server-side semantics are exactly those of the{' '}
            <DocLink to="/docs/concepts/data-model/subscriptions">subscriptions</DocLink>{' '}
            concept page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Batch subscriptions</h2>
          <p className="text-text-secondary mb-4">
            A dashboard that watches ten queries does not want ten interleaved change
            streams. <Code>batch_subscribe</Code> registers several subscriptions as one
            group and returns a dedicated handle whose events arrive as coalesced
            per-tick envelopes, each containing the entries for every member that
            changed:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb_client::{BatchItem, BatchPushEvent, SubscriptionConfig};

let mut batch = client
    .batch_subscribe(&[
        BatchItem::new("from app::users", SubscriptionConfig::default()),
        BatchItem::new("from app::orders", SubscriptionConfig::default()),
    ])
    .await?;

// members() maps each query (by index) to its subscription id.
let batch_id = batch.batch_id().to_string();

while let Some(event) = batch.recv().await {
    match event {
        BatchPushEvent::Change(change) => {
            for entry in change.entries {
                println!("subscription {} changed ({:?})", entry.subscription_id, entry.kind);
                for frame in entry.frames.into_iter().flatten() {
                    println!("{}", frame);
                }
            }
        }
        BatchPushEvent::MemberClosed(m) => {
            println!("member {} closed", m.subscription_id);
        }
        BatchPushEvent::Closed(_) => break,
    }
}

client.batch_unsubscribe(&batch_id).await?;`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>batch_unsubscribe</Code> tears the whole group down server-side;
            individual members report <Code>MemberClosed</Code> if their underlying
            subscription ends first, and the handle's <Code>recv()</Code> returns{' '}
            <Code>None</Code> after the batch closes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Wire formats</h2>
          <p className="text-text-secondary mb-4">
            The second argument to <Code>connect</Code> picks the result encoding for
            the whole connection. <Code>WireFormat::Json</Code> asks the server for
            frames-shaped JSON - readable on the wire and the right default.{' '}
            <Code>WireFormat::Rbcf</Code> switches results (including subscription
            pushes over WebSocket) to RBCF, ReifyDB's binary columnar format, which is
            the compact choice for result-heavy workloads. Either way you receive
            decoded <Code>Frame</Code>s; the encoding never changes what a statement
            means or returns. The formats themselves are specified on{' '}
            <DocLink to="/docs/clients/wire-formats">Wire Formats</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Error handling</h2>
          <p className="text-text-secondary mb-4">
            Every method returns <Code>Result&lt;_, Error&gt;</Code> where{' '}
            <Code>Error</Code> is the same diagnostic wrapper the embedded API uses: a
            stable code, a message, the offending RQL fragment, and often a help text,
            all rendered by <Code>Display</Code>. Server-side failures - bad RQL, policy
            denials, transaction conflicts - arrive as these diagnostics. Note that
            unlike the embedded <Code>Session</Code>, the remote client has no built-in
            conflict retry: a <Code>TXN_001</Code> conflict comes back like any other
            error and retrying the command is up to you.
          </p>
          <Callout variant="warning" title="Pre-1.0 rough edges">
            Some client-side failure paths currently panic instead of returning{' '}
            <Code>Err</Code> - most notably failing to reach the server at{' '}
            <Code>connect</Code> time, a rejected login, and malformed protocol
            responses. Treat a panic from the client as a connectivity or configuration
            problem, and expect these paths to become proper errors before 1.0.
          </Callout>
        </section>

        <Callout variant="tip" title="Where next">
          <DocLink to="/docs/connect">Connect</DocLink> has the server-side half:
          starting the server, ports, and creating users to log in as. If your
          application is a single Rust process that owns its data, skip the wire
          entirely and use{' '}
          <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink> - the RQL
          and the <Code>Frame</Code> results are identical, so moving between the two
          later is mechanical.
        </Callout>
      </div>
    </Layout>
  );
}
