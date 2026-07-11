import { Link } from 'react-router-dom';
import { Layout } from './layout.tsx';
import { CodeBlock, Callout } from './components';

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

export function ConnectPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Connect
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB is one engine with two deployment shapes: embedded inside your Rust
            process, or as a server that clients reach over WebSocket and HTTP. This page
            shows the shortest working connection from each supported surface, plus the
            default ports and how authentication works. The per-client pages under{' '}
            <DocLink to="/docs/clients">Clients</DocLink> go deeper.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">No server yet? Use the browser</h2>
          <p className="text-text-secondary mb-4">
            The fastest connection is no connection. The{' '}
            <DocLink to="/playground">playground</DocLink> and every runnable snippet in
            these docs execute against a real ReifyDB engine compiled to WebAssembly,
            entirely in your browser. Nothing to install, nothing to configure. If you are
            evaluating RQL or the data model, start with the{' '}
            <DocLink to="/docs/quick-start">Quickstart</DocLink> and come back here when
            you want a database your application can talk to.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Endpoints and ports</h2>
          <p className="text-text-secondary mb-4">
            The <Code>reifydb</Code> server binary (see{' '}
            <DocLink to="/docs/installation">Installation</DocLink>) listens on two
            application endpoints and keeps administration on separate, loopback-only
            listeners:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>ws://localhost:8091</Code> - WebSocket. One persistent connection
                for queries, commands, and live subscriptions. This is the default choice
                for applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>http://localhost:8090</Code> - HTTP. Plain request/response. Right
                for serverless functions, scripts, and anywhere a long-lived socket is
                awkward. No subscriptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Admin listeners on loopback: <Code>127.0.0.1:9090</Code> (HTTP),{' '}
                <Code>127.0.0.1:9091</Code> (WebSocket), and <Code>127.0.0.1:9092</Code>{' '}
                (admin web UI).
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            The split exists because requests come in three kinds. A <em>query</em> reads,
            a <em>command</em> writes data, and an <em>admin</em> statement changes schema
            or identities. The application endpoints accept queries and commands only;
            admin statements are rejected there and must go through an admin listener.
            Frontends can face the public ports directly while <Code>CREATE TABLE</Code>{' '}
            and <Code>CREATE USER</Code> stay reachable only from the machine itself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">TypeScript / JavaScript</h2>
          <p className="text-text-secondary mb-4">
            <Code>@reifydb/client</Code> works in Node.js and the browser:
          </p>
          <CodeBlock
            language="bash"
            code={`npm install @reifydb/client @reifydb/core`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Connect over WebSocket, run a query, disconnect. The third argument describes
            the result shape you expect back, so the rows arrive as typed objects:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Client } from '@reifydb/client';
import { Shape } from '@reifydb/core';

const client = await Client.connect_ws('ws://localhost:8091');

const frames = await client.query(
  'MAP { answer: 42 }',
  {},
  [Shape.object({ answer: Shape.number() })],
);

console.log(frames[0][0].answer); // 42

client.disconnect();`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>Client.connect_http('http://localhost:8090')</Code> gives you the same{' '}
            <Code>query</Code> and <Code>command</Code> methods over plain HTTP, without
            subscriptions. Both accept options like <Code>timeout_ms</Code> and{' '}
            <Code>token</Code>. Details, React hooks, and the in-browser WASM build live
            on the <DocLink to="/docs/clients/typescript">TypeScript client page</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rust client</h2>
          <p className="text-text-secondary mb-4">
            The <Code>reifydb-client</Code> crate talks to a server over WebSocket or
            HTTP:
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
            <Code>HttpClient::connect("http://localhost:8090", WireFormat::Json)</Code> is
            the request/response equivalent. Subscriptions, batch subscriptions, and typed
            row extraction with <Code>FromFrame</Code> are covered on the{' '}
            <DocLink to="/docs/clients/rust">Rust client page</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rust embedded</h2>
          <p className="text-text-secondary mb-4">
            If your application is Rust, you can skip the network entirely. The{' '}
            <Code>reifydb</Code> crate runs the whole engine in-process, the way you would
            embed SQLite:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{Params, embedded};

fn main() {
    let db = embedded::memory().build().unwrap();

    let frames = db.command_as_root("MAP { answer: 42 }", Params::None).unwrap();
    for frame in frames {
        println!("{}", frame);
    }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>embedded::memory()</Code> keeps everything in memory;{' '}
            <Code>embedded::sqlite(config)</Code> persists to disk. There are no ports and
            no login: your process owns the engine, and the <Code>_as_root</Code> methods
            execute as the root identity. Sessions let you run work as other identities.
            See <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink> for the
            builder options.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Python</h2>
          <p className="text-text-secondary mb-4">
            A Python binding exists as an early-stage, embedded-only package: it runs the
            engine inside the Python process rather than connecting to a server. Expect
            its API to change. See the{' '}
            <DocLink to="/docs/clients/python">Python client page</DocLink> for current
            status.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Authentication</h2>
          <p className="text-text-secondary mb-4">
            A fresh connection to the server runs as the <em>anonymous</em> identity.
            What anonymous is allowed to do is decided by policies, not by the transport,
            so an open port is not an open database. To act as a real user, the client
            logs in and receives a session token.
          </p>
          <p className="text-text-secondary mb-4">
            Users and their credentials are created with admin statements, so they go
            through an admin listener:
          </p>
          <CodeBlock
            language="rql"
            code={`CREATE USER alice;
CREATE AUTHENTICATION FOR alice { method: password; password: 'alice-pass' };

CREATE USER bob;
CREATE AUTHENTICATION FOR bob { method: token; token: 'bob-secret-token' };`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Clients then authenticate with whichever method the user has. A successful
            login returns a session token; <Code>logout</Code> revokes it server-side:
          </p>
          <CodeBlock
            language="typescript"
            code={`const client = await Client.connect_ws('ws://localhost:8091');

const { token, identity } = await client.login_with_password('alice', 'alice-pass');
// or: await client.login_with_token('bob-secret-token');

// ... queries and commands now run as alice ...

await client.logout();`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            To resume a session on a new connection, pass the token up front:{' '}
            <Code>Client.connect_ws(url, {'{'} token {'}'})</Code>. The Rust client mirrors
            this with <Code>login_with_password</Code>, <Code>login_with_token</Code>, and{' '}
            <Code>authenticate(token)</Code>.
          </p>
          <Callout variant="note" title="Embedded skips all of this">
            Authentication gates the network boundary. An embedded database has no such
            boundary; your process already holds the engine and chooses which identity
            each operation runs as.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Choosing a connection</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Rust application, single process owns the state: <strong>embedded</strong>.
                No network hop, no auth surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Frontends, services, or anything long-lived that wants live data:{' '}
                <strong>WebSocket</strong> on 8091. Unlike HTTP, it carries
                subscriptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Short-lived scripts, serverless functions, curl: <strong>HTTP</strong> on
                8090.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Migrations, schema changes, user management: the <strong>admin</strong>{' '}
                listeners on loopback.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="tip" title="Where next">
          The <DocLink to="/docs/clients">client pages</DocLink> cover each library in
          depth, including wire formats and subscriptions. If you have not written any RQL
          yet, the <DocLink to="/docs/quick-start">Quickstart</DocLink> runs in your
          browser against a real engine.
        </Callout>
      </div>
    </Layout>
  );
}
