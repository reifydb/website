import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

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

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">{children}</th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2 border-b border-border-default align-top">{children}</td>;
}

export function ClientsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Clients</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            There is one engine and several ways in. A Rust process can embed it directly;
            everything else talks to the server over WebSocket or HTTP. This page is the
            map: which client fits your architecture, what each one supports today, and
            where each is in its life. The linked pages go deep per client; for the
            shortest working connection from each, see{' '}
            <DocLink to="/docs/connect">Connect</DocLink>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Embedded or remote</h2>
          <p className="text-text-secondary mb-4">
            The first decision is not which library but which shape. <strong>Embedded</strong>{' '}
            means the engine runs inside your process: no ports, no authentication surface,
            no serialization across a wire. Today that is a Rust-only option, because the
            engine is a Rust library. <strong>Remote</strong> means your application connects
            to the <Code>reifydb</Code> server, which exposes the same engine to any language
            over WebSocket (<Code>8091</Code>) and HTTP (<Code>8090</Code>), with admin
            statements confined to loopback-only listeners. The transports, ports, and login
            flow are covered on <DocLink to="/docs/connect">Connect</DocLink> and are the
            same for every remote client.
          </p>
          <p className="text-text-secondary mb-4">
            The rule of thumb: a single Rust process that owns its state should embed. A
            frontend, a fleet of services, or a mixed-language system should run the server
            and connect remotely. The two shapes execute identical RQL, so starting embedded
            and moving behind a server later does not change your queries - it changes how
            requests reach the engine and adds{' '}
            <DocLink to="/docs/concepts/data-model/policies">policies</DocLink> and login at
            the boundary.
          </p>
          <p className="text-text-secondary mb-4">
            There is a third shape for trying things: the engine compiled to WebAssembly
            runs entirely in the browser. The <DocLink to="/playground">playground</DocLink>{' '}
            and every runnable snippet in these docs use it. It needs no client library and
            no server at all.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">At a glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <Th>Client</Th>
                  <Th>Package</Th>
                  <Th>Talks to</Th>
                  <Th>Subscriptions</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <Td>
                    <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink>
                  </Td>
                  <Td>
                    <Code>reifydb</Code> crate
                  </Td>
                  <Td>The engine, in-process</Td>
                  <Td>Yes, in-process</Td>
                  <Td>Reference surface; it is the engine (0.8.1)</Td>
                </tr>
                <tr>
                  <Td>
                    <DocLink to="/docs/clients/rust">Rust (Client)</DocLink>
                  </Td>
                  <Td>
                    <Code>reifydb-client</Code> crate
                  </Td>
                  <Td>Server via WebSocket or HTTP</Td>
                  <Td>Yes, over WebSocket</Td>
                  <Td>Tracks the engine release (0.8.1)</Td>
                </tr>
                <tr>
                  <Td>
                    <DocLink to="/docs/clients/typescript">TypeScript / JavaScript</DocLink>
                  </Td>
                  <Td>
                    <Code>@reifydb/client</Code> on npm
                  </Td>
                  <Td>Server via WebSocket or HTTP; Node.js and browser</Td>
                  <Td>Yes, over WebSocket</Td>
                  <Td>Tracks the engine release (0.8.1)</Td>
                </tr>
                <tr>
                  <Td>
                    <DocLink to="/docs/clients/python">Python</DocLink>
                  </Td>
                  <Td>
                    <Code>reifydb</Code> (PyO3 binding)
                  </Td>
                  <Td>The engine, in-process (embedded only)</Td>
                  <Td>No</Td>
                  <Td>Early prototype (0.0.1), stale; expect a rewrite</Td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4">
            ReifyDB is pre-1.0. The Rust crates and the TypeScript packages are versioned in
            lockstep with the engine, so a 0.8.x client pairs with a 0.8.x server. All remote
            clients speak the same protocol: every request is a <em>query</em> (read), a{' '}
            <em>command</em> (write), or an <em>admin</em> statement (schema and identities,
            admin listeners only), and authentication is the same token-based login
            everywhere. Capabilities differ by transport, not by language: subscriptions
            need the persistent WebSocket connection, so no HTTP client has them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rust (Embedded)</h2>
          <p className="text-text-secondary mb-4">
            The <Code>reifydb</Code> crate is not a client in the strict sense - it is the
            whole engine as a library, embedded the way you would embed SQLite. Build a
            database with <Code>embedded::memory()</Code> for a purely in-memory engine or{' '}
            <Code>embedded::sqlite(config)</Code> for disk persistence, then run statements
            directly: <Code>query_as_root</Code>, <Code>command_as_root</Code>, and{' '}
            <Code>admin_as_root</Code>, or the <Code>_as(identity)</Code> variants to execute
            as a specific identity. Sessions (<Code>db.root_session()</Code>,{' '}
            <Code>db.session(identity)</Code>) bundle an identity with retry strategies, and
            in-process subscriptions deliver changes without any socket. Because it is the
            engine itself, this surface is always the most complete: migrations, event
            handlers, and custom flow operators are available here first.
          </p>
          <p className="text-text-secondary mb-4">
            The same crate also hosts the server builder (<Code>server::memory()</Code> and
            friends), so "embedded" and "runs the server" are one dependency: swap{' '}
            <Code>embedded::</Code> for <Code>server::</Code> and the same process serves
            WebSocket and HTTP clients while still calling the engine directly. Details on{' '}
            <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rust (Client)</h2>
          <p className="text-text-secondary mb-4">
            The <Code>reifydb-client</Code> crate connects to a running server. Transports
            are opt-in Cargo features: <Code>ws</Code> gives you <Code>WsClient</Code> (one
            persistent connection carrying queries, commands, procedure calls, and
            subscriptions, including batch subscriptions), and <Code>http</Code> gives you{' '}
            <Code>HttpClient</Code> (plain request/response, no subscriptions). Both connect
            with a wire format argument - <Code>WireFormat::Json</Code> is the default,{' '}
            <Code>WireFormat::Rbcf</Code> the binary alternative - and both carry the full
            authentication flow: <Code>login_with_password</Code>,{' '}
            <Code>login_with_token</Code>, <Code>authenticate(token)</Code>,{' '}
            <Code>logout</Code>.
          </p>
          <p className="text-text-secondary mb-4">
            Results come back as <Code>Frame</Code>s; derive <Code>FromFrame</Code> on a
            struct to extract typed rows instead of walking columns by hand. A gRPC client
            and server subsystem exist behind feature flags, but WebSocket and HTTP are the
            transports the default server binary exposes. Details on{' '}
            <DocLink to="/docs/clients/rust">Rust (Client)</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">TypeScript / JavaScript</h2>
          <p className="text-text-secondary mb-4">
            <Code>@reifydb/client</Code> runs in Node.js and the browser.{' '}
            <Code>Client.connect_ws(url)</Code> returns a WebSocket client with queries,
            commands, subscriptions, automatic reconnection, and the login methods;{' '}
            <Code>Client.connect_http(url)</Code> is the request/response equivalent without
            subscriptions. Its companion <Code>@reifydb/core</Code> provides the value types
            and the <Code>Shape</Code> system: pass a shape describing the result you expect
            and rows arrive as typed objects instead of raw frames.
          </p>
          <p className="text-text-secondary mb-4">
            Around the client sits the largest ecosystem of any language:{' '}
            <Code>@reifydb/react</Code> wraps queries, commands, and subscriptions in hooks
            (<Code>useQueryOne</Code>, <Code>useCommandMany</Code>,{' '}
            <Code>useSubscription</Code>, <Code>useConnection</Code>), and{' '}
            <Code>@reifydb/wasm</Code> packages the in-browser engine so tests and demos can
            run with no server. All packages ship together at the engine version. Details on{' '}
            <DocLink to="/docs/clients/typescript">TypeScript / JavaScript</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Python</h2>
          <p className="text-text-secondary mb-4">
            The Python binding is an early prototype and currently stale. It is a PyO3
            module at version 0.0.1 that embeds the engine in the Python process - there is
            no remote client - and exposes a single <Code>Embedded</Code> class with a{' '}
            <Code>tx()</Code> method. It was written against an older engine API and has not
            kept pace: it is excluded from the default workspace build and does not reflect
            how the current engine works. If Python is your main language today, run the
            server and use HTTP directly, or wait for the rewrite. Current status on{' '}
            <DocLink to="/docs/clients/python">Python</DocLink>.
          </p>
          <Callout variant="warning" title="Do not build on the Python binding yet">
            Its API will change completely when it is brought up to date with the current
            engine. Treat it as a preview of intent, not a foundation.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Wire formats</h2>
          <p className="text-text-secondary mb-4">
            Every remote client speaks the same protocol underneath: requests tagged as
            query, command, or admin, with parameters as typed{' '}
            <Code>{'{type, value}'}</Code> pairs. Result payloads come in three encodings.{' '}
            <strong>frames</strong> is the default - a columnar JSON layout that preserves
            column types. <strong>json</strong> is the row-shaped alternative, easiest to
            consume from curl or any language without a client library. <strong>RBCF</strong>{' '}
            (ReifyDB binary columnar format, <Code>application/vnd.reifydb.rbcf</Code>) is the
            compact binary option for result-heavy workloads. Clients choose per
            connection; the encoding never changes what a query means or returns. The{' '}
            <DocLink to="/docs/clients/wire-formats">Wire Formats</DocLink> page specifies
            both, which is also the place to start if you want to write a client for a
            language ReifyDB does not cover yet.
          </p>
        </section>

        <Callout variant="tip" title="Where next">
          Pick your client page above for installation and the full API. If you have not
          connected anything yet, <DocLink to="/docs/connect">Connect</DocLink> has the
          shortest working example for every surface, and the{' '}
          <DocLink to="/docs/quick-start">Quickstart</DocLink> needs no connection at all.
        </Callout>
      </div>
    </Layout>
  );
}
